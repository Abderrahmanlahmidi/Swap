import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from '../../../../enums/order.status.enum';

export class CreateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
