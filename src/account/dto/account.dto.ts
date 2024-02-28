import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../auth/auth.enum';

export default class AccountDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
