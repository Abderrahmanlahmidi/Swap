import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domains/auth/auth.module';
import { CategoryModule } from './domains/catalog/category/category.module';
import { InventoryModule } from './domains/catalog/inventory/inventory.module';
import { ProductModule } from './domains/catalog/product/product.module';
import { OrderModule } from './domains/order/order/order.module';
import { OrderItemModule } from './domains/order/order-item/order-item.module';
import { PaymentModule } from './domains/payment/payment.module';
import { JwtStrategy } from './domains/auth/jwt.strategy';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CategoryModule,
    InventoryModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    PaymentModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
