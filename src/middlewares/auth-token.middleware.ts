import { Request, Response, NextFunction } from 'express';
import { tokenAuth } from '@config';
import { ErrorHTTP } from '@common';

const authTokenMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const token = req.headers['x-auth-token'] as string | undefined;
  const tokenIndex = tokenAuth.findIndex((t) => t === token);
  // If not found token in the array of tokenAuth... just reject request.
  if (tokenIndex === -1) return next(new ErrorHTTP(401, 'Unauthorized'));
  // If token is found in the array and is the index position 1, send request to fake service by flag
  if (tokenIndex === 1) {
    req.body = { ...req.body, goFake: true };
    return next();
  }
  return next();
};

export { authTokenMiddleware };
