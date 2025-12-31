import { Image } from "./commonType";

export interface CategoryRequestParams {
  locale: string;
  limit: number;
  offset: number;
}

export interface CategoryResponse {
  categories: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: Category[];
  };
}

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}
