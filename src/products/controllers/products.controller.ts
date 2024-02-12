import { IProductService } from '@products/models';
import { logger } from '@utils';
import { NextFunction, Request, Response } from 'express';

export class ProductController {
  constructor(private readonly productService: IProductService) {}

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { site } = req.params;
      const { query, limit, offset, sort, sort_dir } = req.query;
      const { goFake } = req.body;
      const dto = await this.productService.getProducts(
        site,
        query as string,
        {
          limit: Number(limit),
          offset: Number(offset),
        },
        {
          sort: sort as string,
          sort_dir: sort_dir as string,
        },
        goFake
      );
      return res.json(dto);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { goFake } = req.body;
      const dto = await this.productService.getProductById(id, goFake);
      return res.json(dto);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
