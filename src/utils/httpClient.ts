import { ErrorHTTP, IHttpClient } from '@common';
import { logger } from './logger';

/**
 * HttpClient is the responsable to make HTTP request to servers
 */
export class HttpClient implements IHttpClient {
  /**
   * Make GET request to a URL
   * T: Query request type.
   * K: Response type
   * @param {string} urlBase
   * @param {T} params all params that you need pass to the request example {q: "cafe"}
   * @returns
   */
  async get<T extends object, K extends object>(urlBase: string, params?: T | undefined): Promise<K> {
    try {
      let url = urlBase;
      if (params && Object.keys(params).length !== 0)
        url = `${url}?${new URLSearchParams(params as Record<string, string>)}`;
      logger.info(`Making request to ${url}`);
      const response = await fetch(url);
      const body = (await response.json()) as K & { message?: string };
      logger.info(`Response status: ${response.status}`);
      if (response.status !== 200) throw new ErrorHTTP(response.status, body.message as string);
      return body as K;
    } catch (error) {
      logger.error(error);
      const { status } = error as { status: number };
      throw new ErrorHTTP(status || 500, error as string);
    }
  }
}
