import { Module } from '@nestjs/common';
import ProductRepository from './product.repository';
import ProductController from './product.controller';
import { ImageModule } from '../image/image.module';
import ProductService from './product.service';

@Module({
  imports: [ImageModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
