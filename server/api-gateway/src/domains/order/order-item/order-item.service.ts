import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemGatewayService implements OnModuleInit {
  constructor(
    private readonly http: HttpService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  private baseUrl = process.env.ORDER_SERVICE_URL;

  async createOrderItem(dto: CreateOrderItemDto) {
    this.kafkaClient.emit('orderItem.created', dto);
    return { message: 'Order item creation event emitted' };
  }

  async getOrderItemsByOrder(orderId: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/order-items/order/${orderId}`),
    );
    return res.data;
  }

  async updateOrderItem(id: string, dto: UpdateOrderItemDto) {
    this.kafkaClient.emit('orderItem.updated', { id, ...dto });
    return { message: 'Order item update event emitted' };
  }

  async deleteOrderItem(id: string) {
    this.kafkaClient.emit('orderItem.deleted', { id });
    return { message: 'Order item deletion event emitted' };
  }
}
