import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import ProductRepository from './product.repository';
import ImageService from '../image/image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { GetProductDto, GetProductsDto } from './dto/getProducts.dto';

@Controller('products')
export default class ProductController {
  constructor(
    private productRepository: ProductRepository,
    private imageService: ImageService,
  ) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async createProduct(
    @Body() body: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files.length == 0) {
      throw new BadRequestException(
        "at least one file is needed in the 'files' attribute of the form data",
      );
    }
    const createProductDto = plainToClass(CreateProductDto, body);
    const imagesBuffer = files.map((file) => file.buffer);
    const imagesUrl = await this.imageService.uploadImages(imagesBuffer);
    const priceInCents = createProductDto.price * 1000;
    const finalPriceInCents =
      priceInCents - (priceInCents * createProductDto.discountPercentage) / 100;
    await this.productRepository.createProduct({
      name: createProductDto.name,
      description: createProductDto.description,
      quantity: createProductDto.quantity,
      priceInCents,
      discountPercentage: createProductDto.discountPercentage,
      finalPriceInCents,
      imagesUrl,
    });
  }

  @Get('getAllProducts')
  async getAllProducts(@Body() getProductsDto: GetProductsDto) {
    const { products, count } =
      await this.productRepository.getProducts(getProductsDto);
    const pageNumberLimit = Math.ceil(count / getProductsDto.pageSize);
    return { products, pageNumberLimit };
  }

  @Get('getProduct')
  async getProduct(@Body() getProductDto: GetProductDto) {
    return await this.productRepository.getProduct(getProductDto);
  }
}
