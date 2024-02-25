export interface Product {
  name: string;
  description: string;
  priceInCents: bigint;
  finalPriceInCents: bigint;
  discountPercentage: number;
  quantity: number;
  images: { url: string }[];
}

export interface ProductWithId extends Product {
  id: number;
}

export interface CreateProductParams {
  name: string;
  description: string;
  quantity: number;
  priceInCents: bigint;
  discountPercentage: number;
  finalPriceInCents: bigint;
  imagesUrl: string[];
}

export interface GetProductsParams {
  pageNumber: number;
  pageSize: number;
  name?: string;
}

export interface GetProductsResult {
  products: ProductWithId[];
  count: number;
}
