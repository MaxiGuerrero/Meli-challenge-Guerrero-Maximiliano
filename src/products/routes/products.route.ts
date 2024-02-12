import { Router } from 'express';
import { productController } from '../controllers';

const router = Router();

router.get('/products/:site', productController.getProducts);
router.get('/product/:id', productController.getProductById);

export default router;
