import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';

@Controller('order-items')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) { }

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
