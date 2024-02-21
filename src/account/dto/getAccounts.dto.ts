import { IsNotEmpty } from 'class-validator';

export class GetAccountsDto {
  @IsNotEmpty()
  pageNumber: number;

  @IsNotEmpty()
  pageSize: number;

  name: string;
}

export class GetAccountDto {
  @IsNotEmpty()
  id: number;
}
