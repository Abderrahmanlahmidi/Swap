import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CategoryController', () => {
    let controller: CategoryController;
    let service: CategoryService;

    const mockPrismaService = {
        category: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [
                CategoryService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        controller = module.get<CategoryController>(CategoryController);
        service = module.get<CategoryService>(CategoryService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a category', async () => {
            const dto = { name: 'Electronics', description: 'Gadgets' };
            const expectedResult = {
                status: 201,
                message: 'Category created successfully',
                data: { id: 'uuid', ...dto },
            };
            jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

            expect(await controller.create(dto)).toBe(expectedResult);
        });
    });

    describe('findAll', () => {
        it('should return an array of categories', async () => {
            const expectedResult = [{ id: 'uuid', name: 'Electronics' }];
            jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult as any);

            expect(await controller.findAll()).toBe(expectedResult);
        });
    });

    describe('findOne', () => {
        it('should return a single category', async () => {
            const id = 'uuid';
            const expectedResult = { id, name: 'Electronics' };
            jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult as any);

            expect(await controller.findOne(id)).toBe(expectedResult);
        });
    });

    describe('update', () => {
        it('should update a category', async () => {
            const id = 'uuid';
            const dto = { name: 'Updated name' };
            const expectedResult = {
                status: 200,
                message: 'Category updated successfully',
                data: { id, ...dto },
            };
            jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

            expect(await controller.update(id, dto)).toBe(expectedResult);
        });
    });

    describe('remove', () => {
        it('should delete a category', async () => {
            const id = 'uuid';
            const expectedResult = {
                status: 200,
                message: 'Category deleted successfully',
                data: { id, name: 'Electronics' },
            };
            jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

            expect(await controller.remove(id)).toBe(expectedResult);
        });
    });
});
