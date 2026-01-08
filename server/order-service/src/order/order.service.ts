import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ORDER_MESSAGES } from './constants/order.constants';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    async create(body: any) {
        const order = await this.prisma.order.create({
            data: { ...body },
            include: { items: true, payment: true },
        });
        return {
            status: 201,
            message: ORDER_MESSAGES.ORDER_CREATED,
            data: order,
        };
    }

    async findAll() {
        return this.prisma.order.findMany({
            include: { items: true, payment: true },
        });
    }

    async findOne(id: string) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { items: true, payment: true },
        });
        if (!order) throw new NotFoundException(ORDER_MESSAGES.ORDER_NOT_FOUND);
        return order;
    }

    async update(id: string, body: any) {
        await this.findOne(id);
        const order = await this.prisma.order.update({
            where: { id },
            data: { ...body },
            include: { items: true, payment: true },
        });
        return {
            status: 200,
            message: ORDER_MESSAGES.ORDER_UPDATED,
            data: order,
        };
    }

    async remove(id: string) {
        await this.findOne(id);
        const order = await this.prisma.order.delete({
            where: { id },
        });
        return {
            status: 200,
            message: ORDER_MESSAGES.ORDER_DELETED,
            data: order,
        };
    }
}
