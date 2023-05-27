export interface BaseHttpResponse<T> {
  message: string;
  data?: T;
}
