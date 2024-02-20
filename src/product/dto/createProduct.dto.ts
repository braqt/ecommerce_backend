import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  discountPercentage: number;

  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;
}
