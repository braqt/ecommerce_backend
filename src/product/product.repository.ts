import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductParams,
  GetProductsParams,
  GetProductsResult,
  Product,
} from './product.interfaces';
import { Prisma } from '@prisma/client';
import { GetProductDto } from './dto/getProducts.dto';
import { CartProduct } from '../order/dto/createOrder.dto';

@Injectable()
export default class ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async createProduct({
    name,
    description,
    quantity,
    priceInCents,
    discountPercentage,
    finalPriceInCents,
    imagesUrl,
  }: CreateProductParams) {
    const product = await this.prismaService.product.create({
      data: {
        name,
        description,
        quantity,
        priceInCents,
        discountPercentage,
        finalPriceInCents,
      },
    });
    const createManyData = imagesUrl.map((image) => ({
      url: image,
      productId: product.id,
    }));

    await this.prismaService.image.createMany({ data: createManyData });
  }

  async getProducts({
    pageNumber,
    pageSize,
    name,
  }: GetProductsParams): Promise<GetProductsResult> {
    const query: Prisma.ProductFindManyArgs = {
      select: {
        id: true,
        name: true,
        description: true,
        priceInCents: true,
        finalPriceInCents: true,
        discountPercentage: true,
        quantity: true,
      },
      where: name ? { name: { contains: name } } : {},
      orderBy: { createdAt: 'desc' },
      skip: pageSize * (pageNumber - 1),
      take: pageSize,
    };
    const [products, count] = await this.prismaService.$transaction([
      this.prismaService.product.findMany({
        ...query,
        select: {
          ...query.select,
          images: {
            select: {
              url: true,
            },
          },
        },
      }),
      this.prismaService.product.count({ where: query.where }),
    ]);
    return { products, count };
  }

  async getProduct({ id }: GetProductDto): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      select: {
        name: true,
        description: true,
        priceInCents: true,
        finalPriceInCents: true,
        discountPercentage: true,
        quantity: true,
        images: {
          select: { url: true },
        },
      },
      where: { id },
    });

    return product;
  }

  async subtractManyProductQuantity(products: CartProduct[]): Promise<void> {
    let updateProductPromises = [];
    for (const product of products) {
      updateProductPromises.push(
        this.prismaService.product.update({
          data: { quantity: { decrement: product.quantity } },
          where: { id: product.id },
        }),
      );
    }
    await this.prismaService.$transaction(updateProductPromises);
  }
}
