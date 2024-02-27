import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus, PaymentStatus } from '../order.enums';

export class SetOrderStatusDto {
  @IsNotEmpty()
  @IsNumber()
  orderNumber: number;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}

export class SetPaymentStatusDto {
  @IsNotEmpty()
  @IsNumber()
  orderNumber: number;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
