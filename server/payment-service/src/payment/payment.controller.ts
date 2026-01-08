import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @EventPattern('order.created')
    async handleOrderCreated(@Payload() data: any) {
        return this.paymentService.processPayment(data);
    }
}
