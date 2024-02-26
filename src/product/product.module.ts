import { Module } from '@nestjs/common';
import ProductRepository from './product.repository';
import ProductController from './product.controller';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [ProductController],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
