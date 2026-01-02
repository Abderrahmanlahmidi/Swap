import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryGatewayService implements OnModuleInit {
  constructor(
    private readonly http: HttpService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  private baseUrl = process.env.CATALOG_SERVICE_URL;

  createCategory(dto: CreateCategoryDto) {
    this.kafkaClient.emit('category.created', dto);
    return { message: 'Category creation event emitted' };
  }

  async getCategories() {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/categories`),
    );
    return res.data;
  }

  async getCategory(id: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/categories/${id}`),
    );
    return res.data;
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    this.kafkaClient.emit('category.updated', { id, ...dto });
    return { message: 'Category update event emitted' };
  }

  deleteCategory(id: string) {
    this.kafkaClient.emit('category.deleted', { id });
    return { message: 'Category deletion event emitted' };
  }
}
