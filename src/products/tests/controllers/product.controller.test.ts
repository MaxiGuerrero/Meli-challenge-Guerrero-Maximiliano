import { ProductController } from '@products/controllers/products.controller';
import { Request, Response } from 'express';
import { ErrorHTTP } from '@common';
import { getAllProductsExpected, getProductByIdExpected } from '../mock/response-expected-service.mock';

const productServiceMock = {
  getProducts: jest.fn(),
  getProductById: jest.fn(),
};

const productController = new ProductController(productServiceMock);

describe('#getProducts', () => {
  beforeEach(() => jest.resetAllMocks());
  test('get products from Meli API successfully, must return response json', async () => {
    // Arrange
    const reqMock = {
      params: { site: 'MLA' },
      query: { query: ':search', limit: '1', offset: '2', sort: 'price', price_dir: 'asc' },
      body: { goFake: false },
    } as unknown as Request;
    const resMock = {
      status: 200,
      json: jest.fn((data) => data),
    } as unknown as Response;
    const nextMock = jest.fn();
    productServiceMock.getProducts.mockReturnValueOnce(getAllProductsExpected);
    // Act
    const response = await productController.getProducts(reqMock, resMock, nextMock);
    // Assert
    expect(response).toEqual(getAllProductsExpected);
    expect(productServiceMock.getProducts).toHaveBeenCalled();
  });
  test('Error in service, must return code distinct to 200 and message error', async () => {
    // Arrange
    const reqMock = {
      params: { site: 'MLA' },
      query: { query: ':search', limit: '1', offset: '2', sort: 'price', price_dir: 'asc' },
      body: { goFake: false },
    } as unknown as Request;
    const resMock = {
      status: 200,
      json: jest.fn((data) => data),
    } as unknown as Response;
    const nextMock = jest.fn((error) => error);
    productServiceMock.getProducts.mockImplementation(() => {
      throw new ErrorHTTP(500, 'error');
    });

    try {
      // Act
      await productController.getProducts(reqMock, resMock, nextMock);
    } catch (error) {
      // Assert
      expect(nextMock).toEqual({ status: 500, message: 'error' });
    }
  });
});

describe('#getProductById', () => {
  beforeEach(() => jest.resetAllMocks());
  test('get product by id succesfully, must return response', async () => {
    // Arrange
    const reqMock = {
      params: { id: '1' },
      body: { goFake: false },
    } as unknown as Request;
    const resMock = {
      status: 200,
      json: jest.fn((data) => data),
    } as unknown as Response;
    const nextMock = jest.fn();
    productServiceMock.getProductById.mockReturnValueOnce(getProductByIdExpected);
    // Act
    const response = await productController.getProductById(reqMock, resMock, nextMock);
    // Assert
    expect(response).toEqual(getProductByIdExpected);
    expect(productServiceMock.getProductById).toHaveBeenCalled();
  });
  test('Error in service, must return code distinct to 200 and message error', async () => {
    // Arrange
    const reqMock = {
      params: { id: '1' },
      body: { goFake: false },
    } as unknown as Request;
    const resMock = {
      status: 200,
      json: jest.fn((data) => data),
    } as unknown as Response;
    const nextMock = jest.fn();
    productServiceMock.getProductById.mockImplementation(() => {
      throw new ErrorHTTP(500, 'error');
    });
    try {
      // Act
      await productController.getProductById(reqMock, resMock, nextMock);
    } catch (error) {
      // Assert
      expect(nextMock).toEqual({ status: 500, message: 'error' });
    }
  });
});
