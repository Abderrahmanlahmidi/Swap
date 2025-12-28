import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { PrismaService } from '../prisma/prisma.service';

describe('InventoryController', () => {
    let controller: InventoryController;
    let service: InventoryService;

    const mockPrismaService = {
        inventory: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InventoryController],
            providers: [
                InventoryService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        controller = module.get<InventoryController>(InventoryController);
        service = module.get<InventoryService>(InventoryService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create an inventory record', async () => {
            const dto = { productId: 'prod-uuid', totalStock: 100, availableStock: 100, reservedStock: 0 };
            const expectedResult = {
                status: 201,
                message: 'Inventory record created successfully',
                data: { id: 'inv-uuid', ...dto },
            };
            jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

            expect(await controller.create(dto)).toBe(expectedResult);
        });
    });

    describe('findAll', () => {
        it('should return an array of inventory records', async () => {
            const expectedResult = [{ id: 'inv-uuid', productId: 'prod-uuid' }];
            jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult as any);

            expect(await controller.findAll()).toBe(expectedResult);
        });
    });

    describe('findOne', () => {
        it('should return a single inventory record', async () => {
            const id = 'inv-uuid';
            const expectedResult = { id, productId: 'prod-uuid' };
            jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult as any);

            expect(await controller.findOne(id)).toBe(expectedResult);
        });
    });

    describe('update', () => {
        it('should update an inventory record', async () => {
            const id = 'inv-uuid';
            const dto = { availableStock: 90 };
            const expectedResult = {
                status: 200,
                message: 'Inventory record updated successfully',
                data: { id, ...dto },
            };
            jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

            expect(await controller.update(id, dto)).toBe(expectedResult);
        });
    });

    describe('remove', () => {
        it('should delete an inventory record', async () => {
            const id = 'inv-uuid';
            const expectedResult = {
                status: 200,
                message: 'Inventory record deleted successfully',
                data: { id, productId: 'prod-uuid' },
            };
            jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

            expect(await controller.remove(id)).toBe(expectedResult);
        });
    });
});
