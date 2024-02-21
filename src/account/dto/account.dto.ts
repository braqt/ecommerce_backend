import { IsEmail, IsNotEmpty } from 'class-validator';

export default class AccountDto {
  @IsNotEmpty()
  firebaseAuthID: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
