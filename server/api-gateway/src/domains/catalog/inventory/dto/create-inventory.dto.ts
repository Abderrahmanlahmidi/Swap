import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsNumber()
  totalStock: number;

  @IsNumber()
  availableStock: number;

  @IsNumber()
  reservedStock: number;

  @IsString()
  @IsNotEmpty()
  productId: string;
}
