import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';

@Controller('inventories')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @EventPattern('inventory.created')
    handleInventoryCreated(@Payload() data: any) {
        return this.inventoryService.create(data);
    }

    @EventPattern('inventory.updated')
    handleInventoryUpdated(@Payload() data: any) {
        const { id, ...dto } = data;
        return this.inventoryService.update(id, dto);
    }

    @EventPattern('inventory.deleted')
    handleInventoryDeleted(@Payload() data: any) {
        return this.inventoryService.remove(data.id);
    }

    @Post()
    create(@Body() body: any) {
        return this.inventoryService.create(body);
    }

    @Get()
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.inventoryService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id);
    }
}
