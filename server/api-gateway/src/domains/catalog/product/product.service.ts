import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductGatewayService implements OnModuleInit {
  constructor(
    private readonly http: HttpService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  private baseUrl = process.env.CATALOG_SERVICE_URL;

  async createProduct(dto: CreateProductDto) {
    this.kafkaClient.emit('product.created', dto);
    return { message: 'Product creation event emitted' };
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
    this.kafkaClient.emit('product.updated', { id, ...dto });
    return { message: 'Product update event emitted' };
  }

  async deleteProduct(id: string) {
    this.kafkaClient.emit('product.deleted', { id });
    return { message: 'Product deletion event emitted' };
  }
}
