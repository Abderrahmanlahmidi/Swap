import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
            message: 'Order created successfully',
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
        if (!order) throw new NotFoundException('Order not found');
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
            message: 'Order updated successfully',
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
            message: 'Order deleted successfully',
            data: order,
        };
    }
}
