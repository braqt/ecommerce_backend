import { Injectable } from '@nestjs/common';
import {
  CreateProductParams,
  GetProductsParams,
  GetProductsResult,
  Product,
} from './product.interfaces';
import { GetProductDto } from './dto/getProducts.dto';
import { CartProduct } from '../order/dto/createOrder.dto';
import ProductRepository from './product.repository';

@Injectable()
export default class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct({
    name,
    description,
    quantity,
    priceInCents,
    discountPercentage,
    finalPriceInCents,
    imagesUrl,
  }: CreateProductParams) {
    await this.productRepository.createProduct({
      name,
      description,
      quantity,
      priceInCents,
      discountPercentage,
      finalPriceInCents,
      imagesUrl,
    });
  }

  async getProducts(params: GetProductsParams): Promise<GetProductsResult> {
    return this.productRepository.getProducts(params);
  }

  async getProduct({ id }: GetProductDto): Promise<Product> {
    return await this.productRepository.getProduct({ id });
  }

  async subtractManyProductQuantity(products: CartProduct[]): Promise<void> {
    await this.productRepository.subtractManyProductQuantity(products);
  }
}
