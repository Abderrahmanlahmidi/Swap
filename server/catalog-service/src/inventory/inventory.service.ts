import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { INVENTORY_MESSAGES } from './constants/inventory.constants';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) { }

  async create(body: any) {
    const inventory = await this.prisma.inventory.create({
      data: { ...body },
      include: { product: true },
    });
    return {
      status: 201,
      message: INVENTORY_MESSAGES.INVENTORY_CREATED,
      data: inventory,
    };
  }

  async findAll() {
    return this.prisma.inventory.findMany({
      include: { product: true },
    });
  }

  async findOne(id: string) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!inventory) throw new NotFoundException(INVENTORY_MESSAGES.INVENTORY_NOT_FOUND);
    return inventory;
  }

  async update(id: string, body: any) {
    await this.findOne(id);
    const inventory = await this.prisma.inventory.update({
      where: { id },
      data: { ...body },
      include: { product: true },
    });
    return {
      status: 200,
      message: INVENTORY_MESSAGES.INVENTORY_UPDATED,
      data: inventory,
    };
  }

  async remove(id: string) {
    await this.findOne(id);
    const inventory = await this.prisma.inventory.delete({
      where: { id },
    });
    return {
      status: 200,
      message: INVENTORY_MESSAGES.INVENTORY_DELETED,
      data: inventory,
    };
  }
}
