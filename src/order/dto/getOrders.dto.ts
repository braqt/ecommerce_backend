import { IsNotEmpty } from 'class-validator';

export class GetOrdersDto {
  @IsNotEmpty()
  pageNumber: number;

  @IsNotEmpty()
  pageSize: number;

  clientName: string;

  orderNumber: number;
}

export class GetOrderDto {
  @IsNotEmpty()
  id: number;
}

export class GetAccountOrdersDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  pageNumber: number;

  @IsNotEmpty()
  pageSize: number;
}
