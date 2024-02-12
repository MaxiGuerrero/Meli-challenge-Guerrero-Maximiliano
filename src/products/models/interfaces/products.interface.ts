import { DTOGetProducts, DTOProductById } from '../dto';
import { Sort } from '../web';
import { Paging } from '../web/paging.model';

export interface IProductService {
  /**
   * Get all products from mercado libre API by site selected
   * @param site
   * @param query
   * @param paging
   * @param sort
   * @param gofake
   */
  getProducts(
    site: string,
    query: string,
    paging: Pick<Paging, 'limit' | 'offset'>,
    sort: Sort,
    goFake?: boolean
  ): Promise<DTOGetProducts>;

  /**
   * Get product By id from mercado libre API
   * @param id
   * @param goFake
   */
  getProductById(id: string, goFake?: boolean): Promise<DTOProductById>;
}
