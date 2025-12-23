import { Module } from '@nestjs/common';
import { InventoryGatewayService } from './inventory.service';
import { InventoryGatewayController } from './inventory.controller';

@Module({
  controllers: [InventoryGatewayService],
  providers: [InventoryGatewayController],
})
export class InventoryModule {}
