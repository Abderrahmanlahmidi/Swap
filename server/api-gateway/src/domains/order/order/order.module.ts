import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderGatewayService } from './order.service';
import { OrderGatewayController } from './order.controller';

@Module({
  imports: [HttpModule],
  providers: [OrderGatewayService],
  controllers: [OrderGatewayController],
})
export class OrderModule {}
