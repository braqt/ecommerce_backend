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
import {
  GetAccountOrdersDto,
  GetOrderDto,
  GetOrdersDto,
} from './dto/getOrders.dto';
import { SetOrderStatusDto, SetPaymentStatusDto } from './dto/updateOrder.dto';

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
  async getOrders(@Body() getOrdersDto: GetOrdersDto, @Req() req: Request) {
    if (!req.headers.authorization) {
      throw new BadRequestException('authorization header it is not defined');
    }
    const { orders, count } = await this.orderService.getOrders(getOrdersDto);
    const pageNumberLimit = Math.ceil(count / getOrdersDto.pageSize);
    return { orders, pageNumberLimit };
  }

  @Post('setOrderStatus')
  async setOrderStatus(
    @Body() setOrderStatusDto: SetOrderStatusDto,
    @Req() req: Request,
  ) {
    if (!req.headers.authorization) {
      throw new BadRequestException('authorization header it is not defined');
    }
    await this.orderService.setOrderStatus(setOrderStatusDto);
  }

  @Post('setPaymentStatus')
  async setPaymentStatus(
    @Body() setPaymentStatusDto: SetPaymentStatusDto,
    @Req() req: Request,
  ) {
    if (!req.headers.authorization) {
      throw new BadRequestException('authorization header it is not defined');
    }
    await this.orderService.setPaymentStatus(setPaymentStatusDto);
  }

  @Get('getAccountOrders')
  async getAccountOrders(
    @Body() getAccountOrdersDto: GetAccountOrdersDto,
    @Req() req: Request,
  ) {
    if (!req.headers.authorization) {
      throw new BadRequestException('authorization header it is not defined');
    }
    const { orders, count } =
      await this.orderService.getAccountOrders(getAccountOrdersDto);
    const pageNumberLimit = Math.ceil(count / getAccountOrdersDto.pageSize);
    return { orders, pageNumberLimit };
  }
}
