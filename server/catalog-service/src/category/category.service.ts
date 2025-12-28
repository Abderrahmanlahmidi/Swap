import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
            message: 'Category created successfully',
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
        if (!category) throw new NotFoundException('Category not found');
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
            message: 'Category updated successfully',
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
            message: 'Category deleted successfully',
            data: category,
        };
    }
}
