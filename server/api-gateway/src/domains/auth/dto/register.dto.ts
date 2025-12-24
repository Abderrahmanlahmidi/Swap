import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,

} from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
