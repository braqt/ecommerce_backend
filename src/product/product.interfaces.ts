export interface Product {
  name: string;
  description: string;
  priceInCents: number;
  finalPriceInCents: number;
  discountPercentage: number;
  quantity: number;
  images: { url: string }[];
}

export interface CreateProductParams {
  name: string;
  description: string;
  quantity: number;
  priceInCents: number;
  discountPercentage: number;
  finalPriceInCents: number;
  imagesUrl: string[];
}

export interface GetProductsParams {
  pageNumber: number;
  pageSize: number;
  name?: string;
}

export interface GetProductsResult {
  products: Product[];
  count: number;
}
