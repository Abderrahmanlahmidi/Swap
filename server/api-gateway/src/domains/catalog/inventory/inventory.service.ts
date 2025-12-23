import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryGatewayService {
  constructor(private readonly http: HttpService) {}

  private baseUrl = process.env.CATALOG_SERVICE_URL;

  async createInventory(dto: CreateInventoryDto) {
    const res = await firstValueFrom(
      this.http.post(`${this.baseUrl}/inventories`, dto),
    );
    return res.data;
  }

  async getInventories() {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/inventories`),
    );
    return res.data;
  }

  async getInventory(id: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/inventories/${id}`),
    );
    return res.data;
  }

  async updateInventory(id: string, dto: UpdateInventoryDto) {
    const res = await firstValueFrom(
      this.http.patch(`${this.baseUrl}/inventories/${id}`, dto),
    );
    return res.data;
  }

  async deleteInventory(id: string) {
    const res = await firstValueFrom(
      this.http.delete(`${this.baseUrl}/inventories/${id}`),
    );
    return res.data;
  }
}
