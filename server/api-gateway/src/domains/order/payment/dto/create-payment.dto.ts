import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from '../../../../enums/payment.status.enum';


export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  amount: number;

  @IsString()
  method: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
