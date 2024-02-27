export interface CreateOrderParams {
  totalInCents: bigint;
  accountId: number;
  orderStatusId: number;
  paymentStatusId: number;
  paymentMethodId: number;
  products: {
    id: number;
    quantity: number;
  }[];
}

export interface Order {
  id: number;
  totalInCents: bigint;
  account: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    accountStatistics: {
      totalSpentInCents: bigint;
      lastOrderCompletedDate: Date;
      numberOfCompletedOrders: number;
    };
  };
  orderStatus: {
    name: string;
  };
  paymentStatus: {
    name: string;
  };
  paymentMethod: {
    name: string;
  };
  productsOnOrders: {
    product: {
      name: string;
      images: { url: string }[];
      finalPriceInCents: bigint;
    };
    quantity: number;
  }[];
}

export interface OrderWithNoAccountStatisticsNoProducts {
  id: number;
  totalInCents: bigint;
  account: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
  };
  orderStatus: {
    name: string;
  };
  paymentStatus: {
    name: string;
  };
  paymentMethod: {
    name: string;
  };
}

export interface OrderWithNoAccountNoProducts {
  id: number;
  totalInCents: bigint;
  orderStatus: {
    name: string;
  };
  paymentStatus: {
    name: string;
  };
  paymentMethod: {
    name: string;
  };
}

export interface GetOrdersResult {
  orders: OrderWithNoAccountStatisticsNoProducts[];
  count: number;
}

export interface GetAccountOrdersResult {
  orders: OrderWithNoAccountNoProducts[];
  count: number;
}
