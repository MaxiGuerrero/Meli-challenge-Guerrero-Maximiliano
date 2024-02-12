import { ProductService } from '@products/services/products.service';
import { ErrorHTTP, IHttpClient } from '@common';
import { mockApiProducts, mockApiProductById, mockApiDescription } from '@mock';
import { httpClientMock } from '../mock/httpClient.mock';
import { getAllProductsExpected, getProductByIdExpected } from '../mock/response-expected-service.mock';

const productService = new ProductService(httpClientMock as unknown as IHttpClient);

describe('#getProducts', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('Recive response from httpClient and return transformed data', async () => {
    // Arrange
    const site = 'MLA';
    const query = 'query';
    const paging = {
      limit: 5,
      offset: 3,
    };
    const sort = {
      sort: 'price',
      sort_dir: 'asc',
    };
    const url = `https://api.mercadolibre.com/sites/${site}/search`;
    httpClientMock.get.mockReturnValueOnce(mockApiProducts);
    // Act
    const response = await productService.getProducts(site, query, paging, sort);
    // Assert
    expect(response).toEqual(getAllProductsExpected);
    expect(httpClientMock.get).toHaveBeenCalledWith(url, {
      q: query,
      offset: paging.offset,
      limit: paging.limit,
      sort: `${sort.sort}_${sort.sort_dir}`,
    });
  });

  test('Recive error from httpClient', async () => {
    // Arrange
    const site = 'MLA';
    const query = 'query';
    const paging = {
      limit: 5,
      offset: 3,
    };
    const sort = {
      sort: 'price',
      sort_dir: 'asc',
    };
    httpClientMock.get.mockImplementation(() => {
      throw new ErrorHTTP(404, 'An error');
    });
    const url = `https://api.mercadolibre.com/sites/${site}/search`;
    try {
      // Act
      await productService.getProducts(site, query, paging, sort);
      // Assert
      expect(httpClientMock.get).toHaveBeenCalledWith(url, {
        q: query,
        offset: paging.offset,
        limit: paging.limit,
        sort: `${sort.sort}_${sort.sort_dir}`,
      });
    } catch (error) {
      expect(error).toHaveProperty('message', 'An error');
      expect(error).toHaveProperty('status', 404);
      expect(httpClientMock.get).toHaveBeenCalledWith(url, {
        q: query,
        offset: paging.offset,
        limit: paging.limit,
        sort: `${sort.sort}_${sort.sort_dir}`,
      });
    }
  });

  test('Response API meli Without categories', async () => {
    // Arrange
    const site = 'MLA';
    const query = 'query';
    const paging = {
      limit: 5,
      offset: 3,
    };
    const sort = {
      sort: 'price',
      sort_dir: 'asc',
    };
    httpClientMock.get.mockReturnValueOnce({ ...mockApiProducts, available_filters: [] });
    const url = `https://api.mercadolibre.com/sites/${site}/search`;
    const responseExpected = { ...getAllProductsExpected, categories: [] };
    // Act
    const response = await productService.getProducts(site, query, paging, sort);
    // Assert
    expect(response).toEqual(responseExpected);
    expect(httpClientMock.get).toHaveBeenCalledWith(url, {
      q: query,
      offset: paging.offset,
      limit: paging.limit,
      sort: `${sort.sort}_${sort.sort_dir}`,
    });
  });

  test('Recive response from data mocked and return transformed data', async () => {
    // Arrange
    const site = 'MLA';
    const query = 'query';
    const paging = {
      limit: 5,
      offset: 3,
    };
    const sort = {
      sort: 'price',
      sort_dir: 'asc',
    };
    const goFake = true;
    httpClientMock.get.mockReturnValueOnce(mockApiProducts);
    // Act
    const response = await productService.getProducts(site, query, paging, sort, goFake);
    // Assert
    expect(response).toEqual(getAllProductsExpected);
    expect(httpClientMock.get).not.toHaveBeenCalled();
  });
});

describe('#getProductById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('Get product successfully', async () => {
    // Arrange
    const id = '1';
    httpClientMock.get.mockReturnValueOnce(mockApiProductById);
    httpClientMock.get.mockReturnValueOnce(mockApiDescription);
    // Act
    const response = await productService.getProductById(id);
    // Assert
    expect(response).toEqual(getProductByIdExpected);
    expect(httpClientMock.get).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/${id}`);
    expect(httpClientMock.get).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/${id}/description`);
  });
  test('Get product via mock', async () => {
    // Arrange
    const id = '1';
    const goFake = true;
    // Act
    const response = await productService.getProductById(id, goFake);
    // Assert
    expect(response).toEqual(getProductByIdExpected);
    expect(httpClientMock.get).not.toHaveBeenCalled();
    expect(httpClientMock.get).not.toHaveBeenCalled();
  });
});
