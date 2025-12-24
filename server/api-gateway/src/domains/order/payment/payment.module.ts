import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentGatewayService } from './payment.service';
import { PaymentGatewayController } from './payment.controller';

@Module({
  imports: [HttpModule],
  providers: [PaymentGatewayService],
  controllers: [PaymentGatewayController],
})
export class PaymentModule {}
