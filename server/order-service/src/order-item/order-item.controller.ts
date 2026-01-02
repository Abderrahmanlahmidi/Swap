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
import { OrderItemService } from './order-item.service';

@Controller('order-items')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) { }

    @EventPattern('orderItem.created')
    handleOrderItemCreated(@Payload() data: any) {
        return this.orderItemService.create(data);
    }

    @EventPattern('orderItem.updated')
    handleOrderItemUpdated(@Payload() data: any) {
        const { id, ...dto } = data;
        return this.orderItemService.update(id, dto);
    }

    @EventPattern('orderItem.deleted')
    handleOrderItemDeleted(@Payload() data: any) {
        return this.orderItemService.remove(data.id);
    }

    @Post()
    create(@Body() body: any) {
        return this.orderItemService.create(body);
    }

    @Get('order/:orderId')
    findByOrder(@Param('orderId') orderId: string) {
        return this.orderItemService.findByOrder(orderId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.orderItemService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderItemService.remove(id);
    }
}
