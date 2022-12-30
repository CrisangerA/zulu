import morgan from 'morgan';
import helmet from 'helmet';
import express, { Express } from 'express';
// config
import injector from './src/config/di';
import {HandleExceptionsMiddleware} from './src/config/middleware';
// routes
import ProductController from './src/modules/product/infrastructure/product.controller';

export default class Main {
  private app: Express;
  constructor() {
    this.app = express();
  }

  private config() {
    this.app.set('PORT', process.env.PORT);
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(express.json());
  }
  private routes() {
    const productController = injector.injectClass(ProductController);
    const handleExceptionsMiddleware = injector.injectClass(HandleExceptionsMiddleware);

    this.app.use('/api', productController.routes());
    this.app.use(handleExceptionsMiddleware.intercep);
  }
  private initialize() {
    this.config();
    this.routes();
  }

  public run(): Promise<void> {
    return new Promise((resolve) => {
      this.initialize();
      this.app.listen(this.app.get('PORT'), () => {
        console.log('!!! DB connected and server listening on port ' + this.app.get('PORT'));
        resolve();
      });
    });
  }
}