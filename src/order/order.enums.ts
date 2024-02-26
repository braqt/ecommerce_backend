export enum PaymentMethod {
  CASH = 'CASH',
}

export enum PaymentStatus {
  PAID = 'PAID',
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
}

export enum OrderStatus {
  PREPARED = 'PREPARED',
  NOT_PREPARED = 'NOT_PREPARED',
  COMPLETED = 'COMPLETED',
  NOT_COMPLETED = 'NOT_COMPLETED',
}
