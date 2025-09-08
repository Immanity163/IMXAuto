// src/types/catalog.ts

export type Car = {
  id: string;
  country: string;
  title: string;
  price: number;
  engine: number | string;
  power: string;
  mileage: number | string;
  fuel: string;
  year: number;
  image: string;
  drive: string;
  brand: string;
  model: string;
  generation: string;
  transmission?: string;
};

export type CatalogQuery = {
  country?: string;
  brand?: string;
  model?: string;
  generation?: string;

  price_from?: number;
  price_to?: number;

  year_from?: number;
  year_to?: number;

  engine_from?: number;
  engine_to?: number;

  drive?: string;
  fuel?: string;
  kpp?: string;

  /** сортировка: новые/старые по ГОДУ, дешёвые/дорогие по ЦЕНЕ */
  sort?: 'new' | 'old' | 'cheap' | 'expensive';

  /** пагинация */
  limit?: number;
  page?: number;
};

export type CatalogResponse = {
  items: Car[];
  total: number;
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};
