type AvailableFiltersCategory = {
  id: 'category';
  name: string;
  type: string;
  values: {
    id: string;
    name: string;
    results: number;
  }[];
};

export type APIMercadoLibreProductsResponse = {
  paging: {
    total: number;
    primary_results: number;
    offset: number;
    limit: number;
  };
  results: {
    id: string;
    title: string;
    price: number;
    currency_id: string;
    available_quantity: number;
    thumbnail: string;
    condition: string;
    shipping: {
      free_shipping: boolean;
    };
  }[];
  available_filters: AvailableFiltersCategory[];
};

export type APIMercadoLibreProductByIdResponse = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  initial_quantity: number;
  pictures: {
    url: string;
  }[];
  condition: string;
  shipping: {
    free_shipping: boolean;
  };
  sold_quantity: number;
  descriptions: string[];
  seller_contact: {
    contact: string;
    other_info: string;
  };
};

export type APIMercadoLibreDescriptionProductById = {
  text: string;
  plain_text: string;
};
