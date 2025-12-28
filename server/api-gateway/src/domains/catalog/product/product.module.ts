import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductGatewayService } from './product.service';
import { ProductGatewayController } from './product.controller';

@Module({
  imports: [HttpModule],
  providers: [ProductGatewayService],
  controllers: [ProductGatewayController],
})
export class ProductModule {}
