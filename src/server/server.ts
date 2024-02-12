import { logger } from '@utils';
import cors from 'cors';
import express, { Express, Router, RequestHandler, ErrorRequestHandler } from 'express';
import { middleware } from 'express-openapi-validator';
import audit from 'express-requests-logger';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

export class Server {
  private app: Express;

  /**
   * Create express server setting configuration
   * @param port
   * @param router
   * @param customMiddlewares
   */
  constructor(
    private readonly port: number,
    private readonly routers: Router[],
    private readonly customGlobalMiddlewares: RequestHandler[]
  ) {
    this.app = express();
    this.setServerConfig();
  }

  setServerConfig(): void {
    // Setting Cors * as default
    this.app.use(cors());
    // Setting parsing to json
    this.app.use(express.json());
    // Setting configuration swagger
    const dirSwagger = process.env.DIR_SWAGGER || './src/docs/swagger.yml';
    const swaggerDocument = YAML.load(dirSwagger);
    if (process.env.NODE_ENV !== 'production') {
      const urlApi = process.env.URL_API || `http://localhost:${this.port}`;
      swaggerDocument.servers = [
        {
          url: urlApi,
          description: 'Default',
        },
      ];
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      // Validate requests against defined OpenApi spec
      this.app.use(
        middleware({
          apiSpec: swaggerDocument,
          validateResponses: false,
          validateRequests: true,
          validateSecurity: false,
        })
      );
    }
    // Setting audit requests
    this.app.use(
      audit({
        logger,
        excludeURLs: ['docs', 'png', 'js', 'css'],
      })
    );
    // Setting all custom middlewares recivied via constructor
    if (this.customGlobalMiddlewares.length !== 0) this.app.use(this.customGlobalMiddlewares);
    // Setting all routes injected recivied via constructor
    this.app.use(this.routers);
    // Setting error handler
    this.app.use(errorHandler);
  }

  start(): void {
    this.app.listen(this.port, () => {
      logger.info(`⚡ Listening on ${this.port}`);
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, _) =>
  res.status(error.status || 500).send({ error: error.message || 'Server unanvailable' });
