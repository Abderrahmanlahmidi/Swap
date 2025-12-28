import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post()
    create(@Body() body: any) {
        return this.paymentService.create(body);
    }

    @Get('order/:orderId')
    findByOrder(@Param('orderId') orderId: string) {
        return this.paymentService.findByOrder(orderId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.paymentService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentService.remove(id);
    }
}
