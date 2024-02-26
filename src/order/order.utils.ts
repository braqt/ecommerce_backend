import { OrderStatus, PaymentMethod, PaymentStatus } from './order.enums';

export const paymentMethodToID = (paymentMethod: PaymentMethod) => {
  if (paymentMethod == PaymentMethod.CASH) {
    return 1;
  }
};

export const paymentStatusToID = (paymentStatus: PaymentStatus) => {
  if (paymentStatus == PaymentStatus.PAID) {
    return 1;
  }
  if (paymentStatus == PaymentStatus.WAITING_FOR_PAYMENT) {
    return 2;
  }
};

export const orderStatusToID = (orderStatus: OrderStatus) => {
  if (orderStatus == OrderStatus.PREPARED) {
    return 1;
  }
  if (orderStatus == OrderStatus.NOT_PREPARED) {
    return 2;
  }
  if (orderStatus == OrderStatus.COMPLETED) {
    return 3;
  }
  if (orderStatus == OrderStatus.NOT_COMPLETED) {
    return 4;
  }
};
