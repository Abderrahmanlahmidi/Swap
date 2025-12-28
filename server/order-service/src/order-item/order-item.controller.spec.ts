import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrderItemController', () => {
    let controller: OrderItemController;
    let service: OrderItemService;

    const mockPrismaService = {
        orderItem: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderItemController],
            providers: [
                OrderItemService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        controller = module.get<OrderItemController>(OrderItemController);
        service = module.get<OrderItemService>(OrderItemService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should add an order item', async () => {
            const dto = { orderId: 'order-uuid', productId: 'prod-uuid', quantity: 2, price: 50 };
            const expectedResult = {
                status: 201,
                message: 'Order item added successfully',
                data: { id: 'item-uuid', ...dto },
            };
            jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

            expect(await controller.create(dto)).toBe(expectedResult);
        });
    });

    describe('findByOrder', () => {
        it('should return items for an order', async () => {
            const orderId = 'order-uuid';
            const expectedResult = [{ id: 'item-uuid', orderId }];
            jest.spyOn(service, 'findByOrder').mockResolvedValue(expectedResult as any);

            expect(await controller.findByOrder(orderId)).toBe(expectedResult);
        });
    });

    describe('update', () => {
        it('should update an order item', async () => {
            const id = 'item-uuid';
            const dto = { quantity: 3 };
            const expectedResult = {
                status: 200,
                message: 'Order item updated successfully',
                data: { id, ...dto },
            };
            jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

            expect(await controller.update(id, dto)).toBe(expectedResult);
        });
    });

    describe('remove', () => {
        it('should remove an order item', async () => {
            const id = 'item-uuid';
            const expectedResult = {
                status: 200,
                message: 'Order item removed successfully',
                data: { id, productId: 'prod-uuid' },
            };
            jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

            expect(await controller.remove(id)).toBe(expectedResult);
        });
    });
});
