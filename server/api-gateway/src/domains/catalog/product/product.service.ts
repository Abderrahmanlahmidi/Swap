import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_ENDPOINTS, PRODUCT_TOPICS, KAFKA_CONFIG } from './constants/product.constants';

@Injectable()
export class ProductGatewayService implements OnModuleInit {
  constructor(
    private readonly http: HttpService,
    @Inject(KAFKA_CONFIG.KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) { }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  private baseUrl = process.env.CATALOG_SERVICE_URL;

  async createProduct(dto: CreateProductDto) {
    this.kafkaClient.emit(PRODUCT_TOPICS.PRODUCT_CREATED, dto);
    return { message: 'Product creation event emitted' };
  }

  async getProducts() {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}${PRODUCT_ENDPOINTS.PRODUCTS}`),
    );
    return res.data;
  }

  async getProduct(id: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}${PRODUCT_ENDPOINTS.PRODUCTS}/${id}`),
    );
    return res.data;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    this.kafkaClient.emit(PRODUCT_TOPICS.PRODUCT_UPDATED, { id, ...dto });
    return { message: 'Product update event emitted' };
  }

  async deleteProduct(id: string) {
    this.kafkaClient.emit(PRODUCT_TOPICS.PRODUCT_DELETED, { id });
    return { message: 'Product deletion event emitted' };
  }
}
