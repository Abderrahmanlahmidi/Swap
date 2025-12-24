import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentGatewayService {
  constructor(private readonly http: HttpService) {}

  private baseUrl = process.env.ORDER_SERVICE_URL;

  async createPayment(dto: CreatePaymentDto) {
    const res = await firstValueFrom(
      this.http.post(`${this.baseUrl}/payments`, dto),
    );
    return res.data;
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
    const res = await firstValueFrom(
      this.http.patch(`${this.baseUrl}/payments/${id}`, dto),
    );
    return res.data;
  }

  async deletePayment(id: string) {
    const res = await firstValueFrom(
      this.http.delete(`${this.baseUrl}/payments/${id}`),
    );
    return res.data;
  }
}
