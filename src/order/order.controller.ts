import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import OrderService from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GetOrderDto, GetOrdersDto } from './dto/getOrders.dto';

@Controller('orders')
export default class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request,
  ) {
    if (!req.headers.authorization) {
      throw new BadRequestException('authorization header it is not defined');
    }
    await this.orderService.createOrder(
      createOrderDto,
      req.headers.authorization,
    );
  }

  @Get('getOrder')
  async getOrder(@Body() getOrderDto: GetOrderDto, @Req() req: Request) {
    if (!req.headers.authorization) {
      throw new BadRequestException('authorization header it is not defined');
    }
    return await this.orderService.getOrder(getOrderDto);
  }

  @Get('getOrders')
  async getOrders(@Body() getOrderDto: GetOrdersDto, @Req() req: Request) {
    if (!req.headers.authorization) {
      throw new BadRequestException('authorization header it is not defined');
    }
    const { orders, count } = await this.orderService.getOrders(getOrderDto);
    const pageNumberLimit = Math.ceil(count / getOrderDto.pageSize);
    return { orders, pageNumberLimit };
  }
}
