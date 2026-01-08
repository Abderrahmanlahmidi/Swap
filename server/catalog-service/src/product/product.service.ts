import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PRODUCT_MESSAGES } from './constants/product.constants';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async create(body: any) {
        const product = await this.prisma.product.create({
            data: { ...body },
            include: { category: true },
        });
        return {
            status: 201,
            message: PRODUCT_MESSAGES.PRODUCT_CREATED,
            data: product,
        };
    }

    async findAll() {
        return this.prisma.product.findMany({
            include: { category: true, inventory: true },
        });
    }

    async findOne(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true, inventory: true },
        });
        if (!product) throw new NotFoundException(PRODUCT_MESSAGES.PRODUCT_NOT_FOUND);
        return product;
    }

    async update(id: string, body: any) {
        await this.findOne(id);
        const product = await this.prisma.product.update({
            where: { id },
            data: { ...body },
            include: { category: true },
        });
        return {
            status: 200,
            message: PRODUCT_MESSAGES.PRODUCT_UPDATED,
            data: product,
        };
    }

    async remove(id: string) {
        await this.findOne(id);
        const product = await this.prisma.product.delete({
            where: { id },
        });
        return {
            status: 200,
            message: PRODUCT_MESSAGES.PRODUCT_DELETED,
            data: product,
        };
    }
}
