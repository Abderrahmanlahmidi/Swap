import { Module } from '@nestjs/common';
import { InventoryGatewayService } from './inventory.service';
import { InventoryGatewayController } from './inventory.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [InventoryGatewayService],
  providers: [InventoryGatewayController],
})
export class InventoryModule {}
