import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductGatewayService {
  constructor(private readonly http: HttpService) {}

  private baseUrl = process.env.CATALOG_SERVICE_URL;

  async createProduct(dto: CreateProductDto) {
    const res = await firstValueFrom(
      this.http.post(`${this.baseUrl}/products`, dto),
    );
    return res.data;
  }

  async getProducts() {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/products`),
    );
    return res.data;
  }

  async getProduct(id: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/products/${id}`),
    );
    return res.data;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const res = await firstValueFrom(
      this.http.patch(`${this.baseUrl}/products/${id}`, dto),
    );
    return res.data;
  }

  async deleteProduct(id: string) {
    const res = await firstValueFrom(
      this.http.delete(`${this.baseUrl}/products/${id}`),
    );
    return res.data;
  }
}
