import { HttpClient } from '../httpClient';

const httpClient = new HttpClient();

// mocking fetch
global.fetch = jest.fn((url: string | URL | Request) => {
  console.log(url);
  return Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ data: 'data' }),
  }) as unknown as Promise<Response>;
});

describe('#get', () => {
  test('Getting response successfully', async () => {
    // Arrange
    const url = 'url';
    const params = {
      param1: 'param1',
    };
    // Act
    const response = await httpClient.get(url, params);
    // Assert
    expect(response).toEqual({ data: 'data' });
    expect(global.fetch).toHaveBeenCalledWith(`${url}?${new URLSearchParams(params as Record<string, string>)}`);
  });
  test('Getting an fatal error', async () => {
    // Arrange
    const url = 'url';
    const params = {
      param1: 'param1',
    };
    global.fetch = jest.fn((uri: string | URL | Request) => {
      console.log(uri);
      throw new Error('error');
    });
    try {
      // Act
      await httpClient.get(url, params);
    } catch (error) {
      // Assert
      expect(error).toHaveProperty('message', 'error');
      expect(error).toHaveProperty('status', 500);
    }
  });
  test('Getting an error 400', async () => {
    // Arrange
    const url = 'url';
    const params = {
      param1: 'param1',
    };
    global.fetch = jest.fn((uri: string | URL | Request) => {
      console.log(uri);
      return Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ message: 'Not found' }),
      }) as unknown as Promise<Response>;
    });
    try {
      // Act
      await httpClient.get(url, params);
    } catch (error) {
      // Assert
      expect(error).toHaveProperty('message', 'Not found');
      expect(error).toHaveProperty('status', 400);
    }
  });
});
