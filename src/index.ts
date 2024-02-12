import { Server } from '@server';
import { productRoutes } from '@products';
import { authTokenMiddleware } from '@middlewares';

(async () => {
  const routes = [...(await productRoutes)];
  const customGlobalMiddlewares = [authTokenMiddleware];
  const server = new Server(8080, routes, customGlobalMiddlewares);
  server.start();
})();
