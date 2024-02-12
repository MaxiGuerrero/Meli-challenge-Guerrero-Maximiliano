import { authTokenMiddleware } from '@middlewares';
import { Request, Response } from 'express';
import { tokenAuth } from '@config';

const resMock = {
  status: 200,
} as unknown as Response;
const nextMock = jest.fn();

test('Token si not correct must return code 401 and message "Unauthorized"', () => {
  // Arrange
  const reqMock = {
    headers: { 'x-auth-token': '123456' },
  } as unknown as Request;
  try {
    // Act
    authTokenMiddleware(reqMock, resMock, nextMock);
  } catch (error) {
    // Assert
    expect(nextMock).toEqual({ status: 401, message: 'Unauthorized' });
  }
});

test('Token is correct must call next function', () => {
  // Arrange
  const reqMock = {
    headers: { 'x-auth-token': tokenAuth[0] },
  } as unknown as Request;
  // Act
  authTokenMiddleware(reqMock, resMock, nextMock);
  // Assert
  expect(nextMock).toHaveBeenCalled();
});

test('Token for get mock data is correct must call next function and inject goMock flag in body request', () => {
  // Arrange
  const reqMock = {
    headers: { 'x-auth-token': tokenAuth[1] },
  } as unknown as Request;
  // Act
  authTokenMiddleware(reqMock, resMock, nextMock);
  // Assert
  expect(nextMock).toHaveBeenCalled();
  expect(reqMock.body).toHaveProperty('goFake', true);
});
