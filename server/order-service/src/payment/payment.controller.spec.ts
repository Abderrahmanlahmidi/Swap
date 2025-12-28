import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PaymentController', () => {
    let controller: PaymentController;
    let service: PaymentService;

    const mockPrismaService = {
        payment: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PaymentController],
            providers: [
                PaymentService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        controller = module.get<PaymentController>(PaymentController);
        service = module.get<PaymentService>(PaymentService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a payment record', async () => {
            const dto = { orderId: 'order-uuid', amount: 100, method: 'CREDIT_CARD', status: 'PENDING' };
            const expectedResult = {
                status: 201,
                message: 'Payment record created successfully',
                data: { id: 'pay-uuid', ...dto },
            };
            jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

            expect(await controller.create(dto)).toBe(expectedResult);
        });
    });

    describe('findByOrder', () => {
        it('should return payments for an order', async () => {
            const orderId = 'order-uuid';
            const expectedResult = [{ id: 'pay-uuid', orderId }];
            jest.spyOn(service, 'findByOrder').mockResolvedValue(expectedResult as any);

            expect(await controller.findByOrder(orderId)).toBe(expectedResult);
        });
    });

    describe('findOne', () => {
        it('should return a single payment record', async () => {
            const id = 'pay-uuid';
            const expectedResult = { id, amount: 100 };
            jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult as any);

            expect(await controller.findOne(id)).toBe(expectedResult);
        });
    });

    describe('update', () => {
        it('should update a payment record', async () => {
            const id = 'pay-uuid';
            const dto = { status: 'COMPLETED' };
            const expectedResult = {
                status: 200,
                message: 'Payment record updated successfully',
                data: { id, ...dto },
            };
            jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

            expect(await controller.update(id, dto)).toBe(expectedResult);
        });
    });

    describe('remove', () => {
        it('should delete a payment record', async () => {
            const id = 'pay-uuid';
            const expectedResult = {
                status: 200,
                message: 'Payment record deleted successfully',
                data: { id, amount: 100 },
            };
            jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

            expect(await controller.remove(id)).toBe(expectedResult);
        });
    });
});
