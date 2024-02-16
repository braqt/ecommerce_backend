import User from './user.model';
import Product from './product.model';
import PaymentMethod from './paymentMethod';
import OrderStatus from './orderStatus';
import PaymentStatus from './paymentStatus.model';

export default class Order {
  totalInCents: number;
  user: User;
  products: Product[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentState: PaymentStatus;
}
