import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import OrderRepository from './order.repository';
import ProductRepository from '../product/product.repository';
import {
  orderStatusToID,
  paymentMethodToID,
  paymentStatusToID,
} from './order.utils';
import { OrderStatus, PaymentStatus } from './order.enums';
import AccountRepository from '../account/account.repository';
import { GetAccountOrdersDto, GetOrdersDto } from './dto/getOrders.dto';
import {
  GetAccountOrdersResult,
  GetOrdersResult,
  Order,
} from './order.interfaces';
import { SetOrderStatusDto, SetPaymentStatusDto } from './dto/updateOrder.dto';

@Injectable()
export default class OrderService {
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private accountRepository: AccountRepository,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    firebaseUID: string,
  ): Promise<void> {
    let totalInCents = 0n;
    let productIds = [];
    for (let cartProduct of createOrderDto.cartProducts) {
      const product = await this.productRepository.getProduct({
        id: cartProduct.id,
      });
      totalInCents =
        BigInt(totalInCents) +
        product.finalPriceInCents * BigInt(cartProduct.quantity);
      productIds.push(cartProduct.id);
    }
    const orderStatusId = orderStatusToID(OrderStatus.NOT_PREPARED);
    const paymentStatusId = paymentStatusToID(
      PaymentStatus.WAITING_FOR_PAYMENT,
    );
    const paymentMethodId = paymentMethodToID(createOrderDto.paymentMethod);
    const account =
      await this.accountRepository.getAccountByFirebaseAuthID(firebaseUID);
    await this.orderRepository.createOrder({
      totalInCents,
      accountId: account.id,
      orderStatusId,
      paymentStatusId,
      paymentMethodId,
      products: createOrderDto.cartProducts,
    });
    await this.productRepository.subtractManyProductQuantity(
      createOrderDto.cartProducts,
    );
  }

  async getOrder(firebaseUID: string): Promise<Order> {
    return await this.orderRepository.getOrder(firebaseUID);
  }

  async getOrders({
    pageNumber,
    pageSize,
    clientName,
    orderNumber,
  }: GetOrdersDto): Promise<GetOrdersResult> {
    return await this.orderRepository.getOrders({
      pageNumber,
      pageSize,
      clientName,
      orderNumber,
    });
  }

  async setOrderStatus({
    orderNumber,
    orderStatus,
  }: SetOrderStatusDto): Promise<void> {
    const orderStatusId = orderStatusToID(orderStatus);
    await this.orderRepository.setOrderStatus(orderNumber, orderStatusId);
  }

  async setPaymentStatus({
    orderNumber,
    paymentStatus,
  }: SetPaymentStatusDto): Promise<void> {
    await this.orderRepository.setPaymentStatus(
      orderNumber,
      paymentStatusToID(paymentStatus),
    );
  }

  async getAccountOrders(
    firebaseUID: string,
    { pageNumber, pageSize }: GetAccountOrdersDto,
  ): Promise<GetAccountOrdersResult> {
    return await this.orderRepository.getAccountOrders({
      firebaseUID,
      pageNumber,
      pageSize,
    });
  }
}
