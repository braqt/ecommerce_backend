import { Module } from '@nestjs/common';
import OrderService from './order.service';
import OrderController from './order.controller';
import OrderRepository from './order.repository';
import { ProductModule } from '../product/product.module';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [AccountModule, ProductModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
