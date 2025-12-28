import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    create(@Body() body: any) {
        return this.orderService.create(body);
    }

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.orderService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }
}
