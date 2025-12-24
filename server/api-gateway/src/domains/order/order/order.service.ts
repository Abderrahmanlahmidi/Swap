import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderGatewayService {
  constructor(private readonly http: HttpService) {}

  private baseUrl = process.env.ORDER_SERVICE_URL;

  async createOrder(dto: CreateOrderDto) {
    const res = await firstValueFrom(
      this.http.post(`${this.baseUrl}/orders`, dto),
    );
    return res.data;
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
    const res = await firstValueFrom(
      this.http.patch(`${this.baseUrl}/orders/${id}`, dto),
    );
    return res.data;
  }

  async deleteOrder(id: string) {
    const res = await firstValueFrom(
      this.http.delete(`${this.baseUrl}/orders/${id}`),
    );
    return res.data;
  }
}
