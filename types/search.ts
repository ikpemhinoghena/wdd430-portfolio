export interface SearchParameters {
  query: string;
}

export interface PaginationParameters {
  currentPage: number;
  pageSize: number;
}

export interface FilterParameters extends SearchParameters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
}

export interface SearchResults<T> extends PaginationParameters {
  items: T[];
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
}

export type ProductCategory = "Books" | "Electronics" | "Stationery";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
}

export interface ProductFilters extends FilterParameters {
  currentPage: number;
  validationError?: string;
}

export interface SearchPageParameters {
  [key: string]: string | string[] | undefined;
}
