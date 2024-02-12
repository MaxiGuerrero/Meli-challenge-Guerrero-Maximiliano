type HttpParams<T extends object> = T;

export interface IHttpClient {
  get<T extends object, K extends object>(url: string, params?: HttpParams<T>): Promise<K>;
}
