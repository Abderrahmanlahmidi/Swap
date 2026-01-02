import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryGatewayService implements OnModuleInit {
  constructor(
    private readonly http: HttpService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  private baseUrl = process.env.CATALOG_SERVICE_URL;

  async createInventory(dto: CreateInventoryDto) {
    this.kafkaClient.emit('inventory.created', dto);
    return { message: 'Inventory creation event emitted' };
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
    this.kafkaClient.emit('inventory.updated', { id, ...dto });
    return { message: 'Inventory update event emitted' };
  }

  async deleteInventory(id: string) {
    this.kafkaClient.emit('inventory.deleted', { id });
    return { message: 'Inventory deletion event emitted' };
  }
}
