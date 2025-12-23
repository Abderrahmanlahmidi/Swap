import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryGatewayService {
  constructor(private readonly http: HttpService) {}

  private baseUrl = process.env.CATALOG_SERVICE_URL;

  async createCategory(dto: CreateCategoryDto) {
    return firstValueFrom(
      this.http.post(`${this.baseUrl}/categories`, dto),
    ).then((res) => res.data);
  }

  async getCategories() {
    return firstValueFrom(this.http.get(`${this.baseUrl}/categories`)).then(
      (res) => res.data,
    );
  }

  async getCategory(id: string) {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/categories/${id}`),
    ).then((res) => res.data);
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    return firstValueFrom(
      this.http.patch(`${this.baseUrl}/categories/${id}`, dto),
    ).then((res) => res.data);
  }

  async deleteCategory(id: string) {
    return firstValueFrom(
      this.http.delete(`${this.baseUrl}/categories/${id}`),
    ).then((res) => res.data);
  }
}
