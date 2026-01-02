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
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @EventPattern('order.created')
    handleOrderCreated(@Payload() data: any) {
        return this.orderService.create(data);
    }

    @EventPattern('order.updated')
    handleOrderUpdated(@Payload() data: any) {
        const { id, ...dto } = data;
        return this.orderService.update(id, dto);
    }

    @EventPattern('order.deleted')
    handleOrderDeleted(@Payload() data: any) {
        return this.orderService.remove(data.id);
    }

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
