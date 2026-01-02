import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentGatewayService implements OnModuleInit {
  constructor(
    private readonly http: HttpService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  private baseUrl = process.env.ORDER_SERVICE_URL;

  async createPayment(dto: CreatePaymentDto) {
    this.kafkaClient.emit('payment.created', dto);
    return { message: 'Payment creation event emitted' };
  }

  async getPaymentsByOrder(orderId: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/payments/order/${orderId}`),
    );
    return res.data;
  }

  async getPayment(id: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/payments/${id}`),
    );
    return res.data;
  }

  async updatePayment(id: string, dto: UpdatePaymentDto) {
    this.kafkaClient.emit('payment.updated', { id, ...dto });
    return { message: 'Payment update event emitted' };
  }

  async deletePayment(id: string) {
    this.kafkaClient.emit('payment.deleted', { id });
    return { message: 'Payment deletion event emitted' };
  }
}
