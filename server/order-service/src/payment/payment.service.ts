import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) { }

    async create(body: any) {
        const payment = await this.prisma.payment.create({
            data: { ...body },
            include: { order: true },
        });
        return {
            status: 201,
            message: 'Payment record created successfully',
            data: payment,
        };
    }

    async findByOrder(orderId: string) {
        return this.prisma.payment.findMany({
            where: { orderId },
            include: { order: true },
        });
    }

    async findOne(id: string) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: { order: true },
        });
        if (!payment) throw new NotFoundException('Payment record not found');
        return payment;
    }

    async update(id: string, body: any) {
        await this.findOne(id);
        const payment = await this.prisma.payment.update({
            where: { id },
            data: { ...body },
            include: { order: true },
        });
        return {
            status: 200,
            message: 'Payment record updated successfully',
            data: payment,
        };
    }

    async remove(id: string) {
        await this.findOne(id);
        const payment = await this.prisma.payment.delete({
            where: { id },
        });
        return {
            status: 200,
            message: 'Payment record deleted successfully',
            data: payment,
        };
    }
}
