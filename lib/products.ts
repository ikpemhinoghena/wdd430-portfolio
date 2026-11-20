import type { Product, ProductCategory, ProductFilters, SearchPageParameters, SearchResults } from "@/types/search";
import { normalizePage, normalizeQuery, PROJECTS_PER_PAGE } from "./project-search";

export const productCategories: ProductCategory[] = ["Books", "Electronics", "Stationery"];

const demonstrationProducts: Product[] = [
  { id: 1, name: "Web Development Handbook", description: "A practical guide to building websites.", category: "Books", price: 25 },
  { id: 2, name: "TypeScript Pocket Guide", description: "A compact reference for typed JavaScript.", category: "Books", price: 18 },
  { id: 3, name: "Design Sketchbook", description: "Blank pages for planning web interfaces.", category: "Stationery", price: 12 },
  { id: 4, name: "Wireless Mouse", description: "A compact mouse for everyday computing.", category: "Electronics", price: 30 },
  { id: 5, name: "USB-C Hub", description: "Connect accessories to a laptop.", category: "Electronics", price: 45 },
  { id: 6, name: "Desk Notebook", description: "Lined pages for notes and project plans.", category: "Stationery", price: 8 },
  { id: 7, name: "Database Fundamentals", description: "An introduction to relational database design.", category: "Books", price: 35 },
  { id: 8, name: "Mechanical Keyboard", description: "A keyboard for comfortable daily typing.", category: "Electronics", price: 80 },
];

export function normalizeProductFilters(params: SearchPageParameters): ProductFilters {
  let validationError: string | undefined;
  function price(value: string | string[] | undefined): number | undefined {
    if (value === undefined || value === "") return undefined;
    if (typeof value !== "string" || !/^\d+(\.\d{1,2})?$/.test(value.trim()) || Number(value) > 1000000) {
      validationError = "Enter prices from 0 to 1,000,000 with at most two decimal places.";
      return undefined;
    }
    return Number(value);
  }
  const minPrice = price(params.minPrice);
  const maxPrice = price(params.maxPrice);
  const category = productCategories.find((value) => value === params.category);
  if (params.category && !category) validationError = "Choose one of the available categories.";
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    validationError = "Minimum price must not exceed maximum price.";
  }
  return { query: normalizeQuery(params.query), currentPage: normalizePage(params.page), category, minPrice, maxPrice, validationError };
}

export function searchProducts(filters: ProductFilters): SearchResults<Product> {
  const query = filters.query.toLowerCase();
  const matches = filters.validationError ? [] : demonstrationProducts.filter((product) =>
    `${product.name} ${product.description}`.toLowerCase().includes(query)
    && (!filters.category || product.category === filters.category)
    && (filters.minPrice === undefined || product.price >= filters.minPrice)
    && (filters.maxPrice === undefined || product.price <= filters.maxPrice)
  );
  const pageSize = PROJECTS_PER_PAGE;
  const totalResults = matches.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const currentPage = Math.min(filters.currentPage, Math.max(1, totalPages));
  return {
    items: matches.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    totalResults, totalPages, currentPage, pageSize, hasNextPage: currentPage < totalPages,
  };
}
