import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateInventoryDto {
  @IsNumber()
  @IsOptional()
  totalStock?: number;

  @IsNumber()
  @IsOptional()
  availableStock?: number;

  @IsNumber()
  @IsOptional()
  reservedStock?: number;

  @IsString()
  @IsOptional()
  productId?: string;
}
