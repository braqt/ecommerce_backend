import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import ImageService from '../image/image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { GetProductDto, GetProductsDto } from './dto/getProducts.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/auth.enum';
import { FirebaseAuthGuard } from '../auth/guard/firebaseAuth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import ProductService from './product.service';

@Controller('products')
export default class ProductController {
  constructor(
    private productService: ProductService,
    private imageService: ImageService,
  ) {}

  @Post('create')
  @Roles([Role.SELLER])
  @UseGuards(FirebaseAuthGuard, RolesGuard)
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
    const priceInCents = BigInt(createProductDto.price) * 1000n;
    const finalPriceInCents =
      priceInCents -
      (priceInCents * BigInt(createProductDto.discountPercentage)) / 100n;
    await this.productService.createProduct({
      name: createProductDto.name,
      description: createProductDto.description,
      quantity: createProductDto.quantity,
      priceInCents,
      discountPercentage: createProductDto.discountPercentage,
      finalPriceInCents,
      imagesUrl,
    });
  }

  @Get('getProducts')
  async getProducts(@Body() getProductsDto: GetProductsDto) {
    const { products, count } =
      await this.productService.getProducts(getProductsDto);
    const pageNumberLimit = Math.ceil(count / getProductsDto.pageSize);
    return { products, pageNumberLimit };
  }

  @Get('getProduct')
  async getProduct(@Body() getProductDto: GetProductDto) {
    return await this.productService.getProduct(getProductDto);
  }
}
