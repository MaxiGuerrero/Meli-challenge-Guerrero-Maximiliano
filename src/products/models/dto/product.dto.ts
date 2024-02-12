import { Author } from '../author.model';
import { Product } from '../product.model';
import { Paging } from '../web/paging.model';

export type DTOGetProducts = {
  paging: Paging;
  categories: string[];
  items: Product[];
};

export type DTOProductById = {
  author: Author;
  item: Product & {
    sold_quantity: number;
    description: string;
  };
};
