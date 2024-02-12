import { productService } from '@products/services';
import { ProductController } from './products.controller';

const productController = new ProductController(productService);

export { productController };
