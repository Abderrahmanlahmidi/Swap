import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { InventoryGatewayService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventories')
export class InventoryGatewayController {
  constructor(private readonly inventoryService: InventoryGatewayService) {}

  @Post()
  create(@Body() dto: CreateInventoryDto) {
    return this.inventoryService.createInventory(dto);
  }

  @Get()
  findAll() {
    return this.inventoryService.getInventories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.getInventory(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.inventoryService.updateInventory(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.deleteInventory(id);
  }
}
