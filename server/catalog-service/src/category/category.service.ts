import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CATEGORY_MESSAGES } from './constants/category.constants';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async create(body: any) {
    const { name, description } = body;
    const category = await this.prisma.category.create({
      data: { name, description },
    });
    return {
      status: 201,
      message: CATEGORY_MESSAGES.CATEGORY_CREATED,
      data: category,
    };
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException(CATEGORY_MESSAGES.CATEGORY_NOT_FOUND);
    return category;
  }

  async update(id: string, body: any) {
    await this.findOne(id);
    const category = await this.prisma.category.update({
      where: { id },
      data: { ...body },
    });
    return {
      status: 200,
      message: CATEGORY_MESSAGES.CATEGORY_UPDATED,
      data: category,
    };
  }

  async remove(id: string) {
    await this.findOne(id);
    const category = await this.prisma.category.delete({
      where: { id },
    });
    return {
      status: 200,
      message: CATEGORY_MESSAGES.CATEGORY_DELETED,
      data: category,
    };
  }
}
