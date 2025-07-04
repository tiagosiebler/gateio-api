import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import https from 'https';

import { neverGuard } from './misc-util.js';
import {
  CHANNEL_ID,
  getRestBaseUrl,
  RestClientOptions,
  serializeParams,
} from './requestUtils.js';
import {
  hashMessage,
  SignAlgorithm,
  SignEncodeMethod,
  signMessage,
} from './webCryptoAPI.js';

const MISSING_API_KEYS_ERROR =
  'API Key, Secret & Application ID are ALL required to use the authenticated REST client';

/**
 * Used to switch how authentication/requests work under the hood
 */
export const REST_CLIENT_TYPE_ENUM = {
  main: 'main',
} as const;

export type RestClientType =
  (typeof REST_CLIENT_TYPE_ENUM)[keyof typeof REST_CLIENT_TYPE_ENUM];

interface SignedRequest<T extends object | undefined = {}> {
  originalParams: T;
  paramsWithSign?: T & { sign: string };
  serializedParams: string;
  sign: string;
  queryParamsWithSign: string;
  timestamp: number;
  recvWindow: number;
}

interface UnsignedRequest<T extends object | undefined = {}> {
  originalParams: T;
  paramsWithSign: T;
}

type SignMethod = 'gateV4';

/**
 * Some requests require some params to be in the query string and some in the body. Some even support passing params via headers.
 * This type anticipates these are possible in any combination.
 *
 * The request builder will automatically handle where parameters should go.
 */
type ParamsInQueryBodyOrHeader = {
  query?: object;
  body?: object;
  headers?: object;
};

/**
 * Enables:
 * - Detailed request/response logging
 * - Full request dump in any exceptions thrown from API responses
 */
const ENABLE_HTTP_TRACE =
  typeof process === 'object' &&
  typeof process.env === 'object' &&
  process.env.GATETRACE;

if (ENABLE_HTTP_TRACE) {
  axios.interceptors.request.use((request) => {
    console.log(
      new Date(),
      'Starting Request',
      JSON.stringify(
        {
          url: request.url,
          method: request.method,
          params: request.params,
          data: request.data,
        },
        null,
        2,
      ),
    );
    return request;
  });
  axios.interceptors.response.use((response) => {
    console.log(new Date(), 'Response:', {
      // request: {
      //   url: response.config.url,
      //   method: response.config.method,
      //   data: response.config.data,
      //   headers: response.config.headers,
      // },
      response: {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      },
    });
    return response;
  });
}

/**
 * Impure, mutates params to remove any values that have a key but are undefined.
 */
function deleteUndefinedValues(params?: any): void {
  if (!params) {
    return;
  }

  for (const key in params) {
    const value = params[key];
    if (typeof value === 'undefined') {
      delete params[key];
    }
  }
}

export abstract class BaseRestClient {
  private options: RestClientOptions;
  private baseUrl: string;
  private baseUrlPath: string;
  private globalRequestOptions: AxiosRequestConfig;
  private apiKey: string | undefined;
  private apiSecret: string | undefined;

  /** Defines the client type (affecting how requests & signatures behave) */
  abstract getClientType(): RestClientType;

  /**
   * Create an instance of the REST client. Pass API credentials in the object in the first parameter.
   * @param {RestClientOptions} [restClientOptions={}] options to configure REST API connectivity
   * @param {AxiosRequestConfig} [networkOptions={}] HTTP networking options for axios
   */
  constructor(
    restClientOptions: RestClientOptions = {},
    networkOptions: AxiosRequestConfig = {},
  ) {
    this.options = {
      recvWindow: 5000,
      /** Throw errors if any request params are empty */
      strictParamValidation: false,
      ...restClientOptions,
    };

    this.globalRequestOptions = {
      /** in ms == 5 minutes by default */
      timeout: 1000 * 60 * 5,
      /** inject custom rquest options based on axios specs - see axios docs for more guidance on AxiosRequestConfig: https://github.com/axios/axios#request-config */
      ...networkOptions,
      headers: {
        'Content-Type': 'application/json',
        'X-Gate-Channel-Id': CHANNEL_ID,
        locale: 'en-US',
      },
    };

    // If enabled, configure a https agent with keepAlive enabled
    if (this.options.keepAlive) {
      // Extract existing https agent parameters, if provided, to prevent the keepAlive flag from overwriting an existing https agent completely
      const existingHttpsAgent = this.globalRequestOptions.httpsAgent as
        | https.Agent
        | undefined;
      const existingAgentOptions = existingHttpsAgent?.options || {};

      // For more advanced configuration, raise an issue on GitHub or use the "networkOptions"
      // parameter to define a custom httpsAgent with the desired properties
      this.globalRequestOptions.httpsAgent = new https.Agent({
        ...existingAgentOptions,
        keepAlive: true,
        keepAliveMsecs: this.options.keepAliveMsecs,
      });
    }

    this.baseUrl = getRestBaseUrl(restClientOptions);
    this.baseUrlPath = new URL(this.baseUrl).pathname;

    this.apiKey = this.options.apiKey;
    this.apiSecret = this.options.apiSecret;

    // Throw if one of the 3 values is missing, but at least one of them is set
    const credentials = [this.apiKey, this.apiSecret];
    if (
      credentials.includes(undefined) &&
      credentials.some((v) => typeof v === 'string')
    ) {
      throw new Error(MISSING_API_KEYS_ERROR);
    }
  }

  /**
   * Timestamp used to sign the request. Override this method to implement your own timestamp/sync mechanism
   */
  getSignTimestampMs(): number {
    return Date.now();
  }

  protected get(endpoint: string, params?: object) {
    const isPublicAPI = true;
    // GET only supports params in the query string
    return this._call('GET', endpoint, { query: params }, isPublicAPI);
  }

  protected post(endpoint: string, params?: ParamsInQueryBodyOrHeader) {
    const isPublicAPI = true;
    return this._call('POST', endpoint, params, isPublicAPI);
  }

  protected getPrivate(endpoint: string, params?: object) {
    const isPublicAPI = false;
    // GET only supports params in the query string
    return this._call('GET', endpoint, { query: params }, isPublicAPI);
  }

  protected postPrivate(endpoint: string, params?: ParamsInQueryBodyOrHeader) {
    const isPublicAPI = false;
    return this._call('POST', endpoint, params, isPublicAPI);
  }

  protected deletePrivate(
    endpoint: string,
    params?: ParamsInQueryBodyOrHeader,
  ) {
    const isPublicAPI = false;
    return this._call('DELETE', endpoint, params, isPublicAPI);
  }

  protected putPrivate(endpoint: string, params?: ParamsInQueryBodyOrHeader) {
    const isPublicAPI = false;
    return this._call('PUT', endpoint, params, isPublicAPI);
  }

  // protected patchPrivate(endpoint: string, params?: any) {
  protected patchPrivate(endpoint: string, params?: ParamsInQueryBodyOrHeader) {
    const isPublicAPI = false;
    return this._call('PATCH', endpoint, params, isPublicAPI);
  }

  /**
   * @private Make a HTTP request to a specific endpoint. Private endpoint API calls are automatically signed.
   */
  private async _call(
    method: Method,
    endpoint: string,
    params?: ParamsInQueryBodyOrHeader,
    isPublicApi?: boolean,
  ): Promise<any> {
    // Sanity check to make sure it's only ever prefixed by one forward slash
    const requestUrl = [this.baseUrl, endpoint].join(
      endpoint.startsWith('/') ? '' : '/',
    );

    // Build a request and handle signature process
    const options = await this.buildRequest(
      method,
      endpoint,
      requestUrl,
      params,
      isPublicApi,
    );

    if (ENABLE_HTTP_TRACE) {
      console.log('full request: ', options);
    }

    // Dispatch request
    return axios(options)
      .then((response) => {
        // See: https://www.gate.io/docs/developers/apiv4/en/#return-format
        if (response.status >= 200 && response.status <= 204) {
          // Throw API rejections by parsing the response code from the body
          if (
            typeof response.data?.code === 'number' &&
            response.data?.code !== 1000
          ) {
            throw { response };
          }
          return response.data;
        }
        throw { response };
      })
      .catch((e) => this.parseException(e, options));
  }

  /**
   * @private generic handler to parse request exceptions
   */
  parseException(e: any, request: AxiosRequestConfig<any>): unknown {
    if (this.options.parseExceptions === false) {
      throw e;
    }

    // Something happened in setting up the request that triggered an error
    if (!e.response) {
      if (!e.request) {
        throw e.message;
      }

      // request made but no response received
      throw e;
    }

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const response: AxiosResponse = e.response;
    // console.error('err: ', response?.data);

    const debugData = ENABLE_HTTP_TRACE ? { fullRequest: request } : {};

    throw {
      code: response.status,
      message: response.statusText,
      body: response.data,
      headers: response.headers,
      requestOptions: {
        ...this.options,
        // Prevent credentials from leaking into error messages
        apiKey: 'omittedFromError',
        apiMemo: 'omittedFromError',
        apiSecret: 'omittedFromError',
        reqUrl: request.url,
        reqBody: request.data,
      },
      ...debugData,
    };
  }

  /**
   * @private sign request and set recv window
   */
  private async signRequest<
    T extends ParamsInQueryBodyOrHeader | undefined = {},
  >(
    data: T,
    endpoint: string,
    method: Method,
    signMethod: SignMethod,
  ): Promise<SignedRequest<T>> {
    const timestamp = +(this.getSignTimestampMs() / 1000).toFixed(0); // in seconds

    const res: SignedRequest<T> = {
      originalParams: {
        // recvWindow: this.options.recvWindow,
        ...data,
      },

      sign: '',
      timestamp,
      recvWindow: 0,
      serializedParams: '',
      queryParamsWithSign: '',
    };

    if (!this.apiKey || !this.apiSecret) {
      return res;
    }

    // It's possible to override the recv window on a per rquest level
    const strictParamValidation = this.options.strictParamValidation;
    const encodeQueryStringValues = true;

    if (signMethod === 'gateV4') {
      const signEncoding: SignEncodeMethod = 'hex';
      const signAlgoritm: SignAlgorithm = 'SHA-512';

      const queryStringToSign = data?.query
        ? serializeParams(
            res.originalParams?.query,
            strictParamValidation,
            encodeQueryStringValues,
            '',
          )
        : '';

      const requestBodyToHash = res.originalParams?.body
        ? JSON.stringify(res.originalParams?.body)
        : '';

      const hashedRequestBody = await hashMessage(
        requestBodyToHash,
        signEncoding,
        signAlgoritm,
      );

      const toSign = [
        method,
        this.baseUrlPath + endpoint,
        queryStringToSign,
        hashedRequestBody,
        timestamp,
      ].join('\n');

      // console.log('sign params: ', {
      //   requestBodyToHash,
      //   paramsStr: toSign,
      //   url: this.baseUrl,
      //   urlPath: this.baseUrlPath,
      // });

      res.sign = await this.signMessage(
        toSign,
        this.apiSecret,
        signEncoding,
        signAlgoritm,
      );
      res.queryParamsWithSign = queryStringToSign;
      return res;
    }

    console.error(
      new Date(),
      neverGuard(signMethod, `Unhandled sign method: "${signMessage}"`),
    );

    return res;
  }

  private async signMessage(
    paramsStr: string,
    secret: string,
    method: 'hex' | 'base64',
    algorithm: SignAlgorithm,
  ): Promise<string> {
    if (typeof this.options.customSignMessageFn === 'function') {
      return this.options.customSignMessageFn(paramsStr, secret);
    }
    return await signMessage(paramsStr, secret, method, algorithm);
  }

  private async prepareSignParams<
    TParams extends ParamsInQueryBodyOrHeader | undefined,
  >(
    method: Method,
    endpoint: string,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: true,
  ): Promise<UnsignedRequest<TParams>>;
  private async prepareSignParams<
    TParams extends ParamsInQueryBodyOrHeader | undefined,
  >(
    method: Method,
    endpoint: string,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: false | undefined,
  ): Promise<SignedRequest<TParams>>;
  private async prepareSignParams<
    TParams extends ParamsInQueryBodyOrHeader | undefined,
  >(
    method: Method,
    endpoint: string,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: boolean,
  ) {
    if (isPublicApi) {
      return {
        originalParams: params,
        paramsWithSign: params,
      };
    }

    if (!this.apiKey || !this.apiSecret) {
      throw new Error(MISSING_API_KEYS_ERROR);
    }

    return this.signRequest(params, endpoint, method, signMethod);
  }

  /** Returns an axios request object. Handles signing process automatically if this is a private API call */
  private async buildRequest(
    method: Method,
    endpoint: string,
    url: string,
    params?: ParamsInQueryBodyOrHeader,
    isPublicApi?: boolean,
  ): Promise<AxiosRequestConfig> {
    const options: AxiosRequestConfig = {
      ...this.globalRequestOptions,
      url: url,
      method: method,
      headers: {
        ...params?.headers,
        ...this.globalRequestOptions.headers,
      },
    };

    deleteUndefinedValues(params);
    deleteUndefinedValues(params?.body);
    deleteUndefinedValues(params?.query);
    deleteUndefinedValues(params?.headers);

    if (!isPublicApi && (!this.apiKey || !this.apiSecret)) {
      throw new Error(
        'API Key & Secret are both required for private endpoints',
      );
    }

    if (isPublicApi || !this.apiKey || !this.apiSecret) {
      return {
        ...options,
        params: params?.query || params?.body || params,
      };
    }

    const signResult = await this.prepareSignParams(
      method,
      endpoint,
      'gateV4',
      params,
      isPublicApi,
    );

    const authHeaders = {
      KEY: this.apiKey,
      SIGN: signResult.sign,
      Timestamp: signResult.timestamp,
    };

    const urlWithQueryParams =
      options.url + '?' + signResult.queryParamsWithSign;

    if (method === 'GET' || !params?.body) {
      return {
        ...options,
        headers: {
          ...authHeaders,
          ...options.headers,
        },
        url: urlWithQueryParams,
      };
    }

    return {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
      },
      url: params?.query ? urlWithQueryParams : options.url,
      data: signResult.originalParams.body,
    };
  }
}
