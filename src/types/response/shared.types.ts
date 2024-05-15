export interface APIResponse<TData = {}> {
  success: boolean;
  data: TData;
  timestamp: number;
}
