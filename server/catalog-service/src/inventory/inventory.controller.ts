import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventories')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

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
