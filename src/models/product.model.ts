import Image from './image.model';

export default class Product {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  finalPriceInCents: number;
  discountPercentage: number;
  quantity: number;
  images: Image[];
}
