import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import OrderService from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GetAccountOrdersDto, GetOrdersDto } from './dto/getOrders.dto';
import { SetOrderStatusDto, SetPaymentStatusDto } from './dto/updateOrder.dto';
import { FirebaseAuthGuard } from '../auth/guard/firebaseAuth.guard';
import { GetFirebaseUser } from '../auth/decorator/getFirebaseUser.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';

@Controller('orders')
export default class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  @UseGuards(FirebaseAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetFirebaseUser() firebaseUser: DecodedIdToken,
  ) {
    await this.orderService.createOrder(createOrderDto, firebaseUser.uid);
  }

  @Get('getOrder')
  @UseGuards(FirebaseAuthGuard)
  async getOrder(@GetFirebaseUser() firebaseUser: DecodedIdToken) {
    return await this.orderService.getOrder(firebaseUser.uid);
  }

  @Get('getOrders')
  @UseGuards(FirebaseAuthGuard)
  async getOrders(@Body() getOrdersDto: GetOrdersDto) {
    const { orders, count } = await this.orderService.getOrders(getOrdersDto);
    const pageNumberLimit = Math.ceil(count / getOrdersDto.pageSize);
    return { orders, pageNumberLimit };
  }

  @Post('setOrderStatus')
  @UseGuards(FirebaseAuthGuard)
  async setOrderStatus(@Body() setOrderStatusDto: SetOrderStatusDto) {
    await this.orderService.setOrderStatus(setOrderStatusDto);
  }

  @Post('setPaymentStatus')
  @UseGuards(FirebaseAuthGuard)
  async setPaymentStatus(@Body() setPaymentStatusDto: SetPaymentStatusDto) {
    await this.orderService.setPaymentStatus(setPaymentStatusDto);
  }

  @Get('getAccountOrders')
  @UseGuards(FirebaseAuthGuard)
  async getAccountOrders(
    @Body() getAccountOrdersDto: GetAccountOrdersDto,
    @GetFirebaseUser() firebaseUser: DecodedIdToken,
  ) {
    const { orders, count } = await this.orderService.getAccountOrders(
      firebaseUser.uid,
      getAccountOrdersDto,
    );
    const pageNumberLimit = Math.ceil(count / getAccountOrdersDto.pageSize);
    return { orders, pageNumberLimit };
  }
}
