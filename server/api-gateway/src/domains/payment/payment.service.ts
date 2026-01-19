import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService implements OnModuleInit {
  constructor(
    private readonly http: HttpService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  private baseUrl = process.env.PAYMENT_SERVICE_URL;

  async processPayment(dto: CreatePaymentDto) {
    this.kafkaClient.emit('order.created', dto);
    return { message: 'Payment processing initiated' };
  }

  async getPayments() {
    const res = await firstValueFrom(this.http.get(`${this.baseUrl}/payment`));
    return res.data;
  }
}
