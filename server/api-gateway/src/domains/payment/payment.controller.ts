import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  processPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.processPayment(dto);
  }

  @Get()
  getPayments() {
    return this.paymentService.getPayments();
  }
}
