import { httpClient } from '@utils';
import { ProductService } from './products.service';

export const productService = new ProductService(httpClient);
