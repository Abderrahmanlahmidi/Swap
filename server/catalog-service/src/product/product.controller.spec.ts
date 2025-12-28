import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductController', () => {
    let controller: ProductController;
    let service: ProductService;

    const mockPrismaService = {
        product: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                ProductService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a product', async () => {
            const dto = { name: 'Phone', price: 999, categoryId: 'cat-uuid', adminId: 1 };
            const expectedResult = {
                status: 201,
                message: 'Product created successfully',
                data: { id: 'prod-uuid', ...dto },
            };
            jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

            expect(await controller.create(dto)).toBe(expectedResult);
        });
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            const expectedResult = [{ id: 'prod-uuid', name: 'Phone' }];
            jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult as any);

            expect(await controller.findAll()).toBe(expectedResult);
        });
    });

    describe('findOne', () => {
        it('should return a single product', async () => {
            const id = 'prod-uuid';
            const expectedResult = { id, name: 'Phone' };
            jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult as any);

            expect(await controller.findOne(id)).toBe(expectedResult);
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            const id = 'prod-uuid';
            const dto = { name: 'Updated Phone' };
            const expectedResult = {
                status: 200,
                message: 'Product updated successfully',
                data: { id, ...dto },
            };
            jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

            expect(await controller.update(id, dto)).toBe(expectedResult);
        });
    });

    describe('remove', () => {
        it('should delete a product', async () => {
            const id = 'prod-uuid';
            const expectedResult = {
                status: 200,
                message: 'Product deleted successfully',
                data: { id, name: 'Phone' },
            };
            jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

            expect(await controller.remove(id)).toBe(expectedResult);
        });
    });
});
