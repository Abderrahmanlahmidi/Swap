import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
