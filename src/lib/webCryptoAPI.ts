import { neverGuard } from './misc-util.js';

function bufferToB64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return globalThis.btoa(binary);
}

export type SignEncodeMethod = 'hex' | 'base64';
export type SignAlgorithm = 'SHA-256' | 'SHA-512';

/**
 * Similar to node crypto's `createHash()` function
 */
export async function hashMessage(
  message: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
): Promise<string> {
  const encoder = new TextEncoder();

  const buffer = await globalThis.crypto.subtle.digest(
    algorithm,
    encoder.encode(message),
  );

  switch (method) {
    case 'hex': {
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    }
    case 'base64': {
      return bufferToB64(buffer);
    }
    default: {
      throw neverGuard(method, `Unhandled sign method: "${method}"`);
    }
  }
}

/**
 * Sign a message, with a secret, using the Web Crypto API
 */
export async function signMessage(
  message: string,
  secret: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
): Promise<string> {
  const encoder = new TextEncoder();

  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign'],
  );

  const buffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message),
  );

  switch (method) {
    case 'hex': {
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    }
    case 'base64': {
      return bufferToB64(buffer);
    }
    default: {
      throw neverGuard(method, `Unhandled sign method: "${method}"`);
    }
  }
}

export function checkWebCryptoAPISupported() {
  if (!globalThis.crypto) {
    throw new Error(
      `Web Crypto API unavailable. Authentication will not work.

Are you using an old Node.js release? Refer to the current Node.js LTS version. Node.js v18 reached end of life in April 2025! You should be using Node LTS or newer (v22 or above)!`,
    );
  }
}
