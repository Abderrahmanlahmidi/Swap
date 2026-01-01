import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InventoryGatewayController } from './inventory.controller';
import { InventoryGatewayService } from './inventory.service';

@Module({
  imports: [HttpModule],
  controllers: [InventoryGatewayController],
  providers: [InventoryGatewayService],
})
export class InventoryModule {}
