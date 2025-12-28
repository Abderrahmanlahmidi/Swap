import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrderController', () => {
    let controller: OrderController;
    let service: OrderService;

    const mockPrismaService = {
        order: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [
                OrderService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController);
        service = module.get<OrderService>(OrderService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create an order', async () => {
            const dto = { userId: 1, totalPrice: 100, status: 'PENDING' };
            const expectedResult = {
                status: 201,
                message: 'Order created successfully',
                data: { id: 'order-uuid', ...dto },
            };
            jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

            expect(await controller.create(dto)).toBe(expectedResult);
        });
    });

    describe('findAll', () => {
        it('should return an array of orders', async () => {
            const expectedResult = [{ id: 'order-uuid', userId: 1 }];
            jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult as any);

            expect(await controller.findAll()).toBe(expectedResult);
        });
    });

    describe('findOne', () => {
        it('should return a single order', async () => {
            const id = 'order-uuid';
            const expectedResult = { id, userId: 1 };
            jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult as any);

            expect(await controller.findOne(id)).toBe(expectedResult);
        });
    });

    describe('update', () => {
        it('should update an order', async () => {
            const id = 'order-uuid';
            const dto = { status: 'CONFIRMED' };
            const expectedResult = {
                status: 200,
                message: 'Order updated successfully',
                data: { id, ...dto },
            };
            jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

            expect(await controller.update(id, dto)).toBe(expectedResult);
        });
    });

    describe('remove', () => {
        it('should delete an order', async () => {
            const id = 'order-uuid';
            const expectedResult = {
                status: 200,
                message: 'Order deleted successfully',
                data: { id, userId: 1 },
            };
            jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

            expect(await controller.remove(id)).toBe(expectedResult);
        });
    });
});
