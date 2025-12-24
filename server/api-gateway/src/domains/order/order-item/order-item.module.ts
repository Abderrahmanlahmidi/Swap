import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderItemGatewayService } from './order-item.service';
import { OrderItemGatewayController } from './order-item.controller';

@Module({
  imports: [HttpModule],
  providers: [OrderItemGatewayService],
  controllers: [OrderItemGatewayController],
})
export class OrderItemModule {}
