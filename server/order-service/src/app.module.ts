import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
