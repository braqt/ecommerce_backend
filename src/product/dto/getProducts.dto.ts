import { IsNotEmpty } from 'class-validator';

export class GetProductsDto {
  @IsNotEmpty()
  pageNumber: number;

  @IsNotEmpty()
  pageSize: number;

  name: string;
}

export class GetProductDto {
  @IsNotEmpty()
  id: number;
}
