import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderGatewayService implements OnModuleInit {
  constructor(
    private readonly http: HttpService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  private baseUrl = process.env.ORDER_SERVICE_URL;

  async createOrder(dto: CreateOrderDto) {
    this.kafkaClient.emit('order.created', dto);
    return { message: 'Order creation event emitted' };
  }

  async getOrders() {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/orders`),
    );
    return res.data;
  }

  async getOrder(id: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/orders/${id}`),
    );
    return res.data;
  }

  async updateOrder(id: string, dto: UpdateOrderDto) {
    this.kafkaClient.emit('order.updated', { id, ...dto });
    return { message: 'Order update event emitted' };
  }

  async deleteOrder(id: string) {
    this.kafkaClient.emit('order.deleted', { id });
    return { message: 'Order deletion event emitted' };
  }
}
