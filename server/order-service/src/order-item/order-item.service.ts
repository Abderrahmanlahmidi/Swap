import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ORDER_ITEM_MESSAGES } from './constants/order-item.constants';

@Injectable()
export class OrderItemService {
    constructor(private prisma: PrismaService) { }

    async create(body: any) {
        const item = await this.prisma.orderItem.create({
            data: { ...body },
        });
        return {
            status: 201,
            message: ORDER_ITEM_MESSAGES.ORDER_ITEM_CREATED,
            data: item,
        };
    }

    async findByOrder(orderId: string) {
        return this.prisma.orderItem.findMany({
            where: { orderId },
        });
    }

    async update(id: string, body: any) {
        const item = await this.prisma.orderItem.update({
            where: { id },
            data: { ...body },
        });
        return {
            status: 200,
            message: ORDER_ITEM_MESSAGES.ORDER_ITEM_UPDATED,
            data: item,
        };
    }

    async remove(id: string) {
        const item = await this.prisma.orderItem.delete({
            where: { id },
        });
        return {
            status: 200,
            message: ORDER_ITEM_MESSAGES.ORDER_ITEM_REMOVED,
            data: item,
        };
    }
}
