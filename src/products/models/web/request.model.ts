import { Paging } from './paging.model';

export type QueryParamsGetProducts = Pick<Paging, 'limit' | 'offset'> & {
  q: string;
  sort: string;
};
