import { IHttpClient } from '@common';
import { mockApiDescription, mockApiProductById, mockApiProducts } from '@mock';
import {
  DTOGetProducts,
  IProductService,
  Paging,
  QueryParamsGetProducts,
  Sort,
  DTOProductById,
  APIMercadoLibreDescriptionProductById,
  APIMercadoLibreProductByIdResponse,
  APIMercadoLibreProductsResponse,
} from '@products/models';
/**
 * Service that's responsable of call to an Mercado libre API and sorting all data that has been received.
 */
export class ProductService implements IProductService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getProducts(
    site: string,
    query: string,
    paging: Pick<Paging, 'limit' | 'offset'>,
    sort: Sort,
    goFake?: boolean
  ): Promise<DTOGetProducts> {
    const responseProduct = !goFake
      ? await this.httpClient.get<QueryParamsGetProducts, APIMercadoLibreProductsResponse>(
          `https://api.mercadolibre.com/sites/${site}/search`,
          {
            q: query,
            offset: paging.offset,
            limit: paging.limit,
            sort: `${sort.sort}_${sort.sort_dir}`,
          }
        )
      : mockApiProducts;
    const categoryFilter = responseProduct.available_filters.find((filter) => filter.id === 'category');
    const dtoProducts: DTOGetProducts = {
      paging: responseProduct.paging,
      categories: categoryFilter ? categoryFilter.values.map((v) => v.name) : [],
      items: responseProduct.results.map((product) => ({
        id: product.id,
        title: product.title,
        price: {
          amount: product.available_quantity,
          currency: product.currency_id,
          decimals: product.price,
        },
        picture: product.thumbnail,
        condition: product.condition,
        free_shipping: product.shipping.free_shipping,
      })),
    };
    return dtoProducts;
  }

  async getProductById(id: string, goFake?: boolean): Promise<DTOProductById> {
    const responseProduct = !goFake
      ? await this.httpClient.get<object, APIMercadoLibreProductByIdResponse>(
          `https://api.mercadolibre.com/items/${id}`
        )
      : (mockApiProductById as unknown as APIMercadoLibreProductByIdResponse);
    const responseDescription = !goFake
      ? await this.httpClient.get<object, APIMercadoLibreDescriptionProductById>(
          `https://api.mercadolibre.com/items/${id}/description`
        )
      : (mockApiDescription as APIMercadoLibreDescriptionProductById);
    const dtoProduct: DTOProductById = {
      author: {
        name: responseProduct.seller_contact ? responseProduct.seller_contact.contact.split(' ')[0] : '',
        lastname: responseProduct.seller_contact ? responseProduct.seller_contact.contact.split(' ')[1] : '',
      },
      item: {
        id: responseProduct.id,
        title: responseProduct.title,
        price: {
          amount: responseProduct.initial_quantity,
          currency: responseProduct.currency_id,
          decimals: responseProduct.price,
        },
        picture: responseProduct.pictures.length !== 0 ? responseProduct.pictures[0].url : '',
        condition: responseProduct.condition,
        free_shipping: responseProduct.shipping.free_shipping,
        sold_quantity: responseProduct.sold_quantity,
        description: responseDescription.plain_text,
      },
    };
    return dtoProduct;
  }
}
