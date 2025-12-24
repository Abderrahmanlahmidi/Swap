import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemGatewayService {
  constructor(private readonly http: HttpService) {}

  private baseUrl = process.env.ORDER_SERVICE_URL;

  async createOrderItem(dto: CreateOrderItemDto) {
    const res = await firstValueFrom(
      this.http.post(`${this.baseUrl}/order-items`, dto),
    );
    return res.data;
  }

  async getOrderItemsByOrder(orderId: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/order-items/order/${orderId}`),
    );
    return res.data;
  }

  async updateOrderItem(id: string, dto: UpdateOrderItemDto) {
    const res = await firstValueFrom(
      this.http.patch(`${this.baseUrl}/order-items/${id}`, dto),
    );
    return res.data;
  }

  async deleteOrderItem(id: string) {
    const res = await firstValueFrom(
      this.http.delete(`${this.baseUrl}/order-items/${id}`),
    );
    return res.data;
  }
}
