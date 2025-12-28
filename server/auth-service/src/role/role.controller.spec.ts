import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

jest.mock('../prisma/prisma.service');

describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;

  const mockRoleService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: mockRoleService,
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      const dto = { name: 'Admin', description: 'Administrator' };
      const result = {
        status: 201,
        message: 'Role created successfully',
        data: { id: 1, ...dto },
      };
      mockRoleService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(mockRoleService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const result = [{ id: 1, name: 'Admin' }];
      mockRoleService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockRoleService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single role', async () => {
      const result = { id: 1, name: 'Admin' };
      mockRoleService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
      expect(mockRoleService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const dto = { description: 'Updated' };
      const result = {
        status: 200,
        message: 'Role updated successfully',
        data: { id: 1, name: 'Admin', ...dto },
      };
      mockRoleService.update.mockResolvedValue(result);

      expect(await controller.update(1, dto)).toBe(result);
      expect(mockRoleService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('delete', () => {
    it('should delete a role', async () => {
      const result = {
        status: 200,
        message: 'Role deleted successfully',
        data: { id: 1, name: 'Admin' },
      };
      mockRoleService.delete.mockResolvedValue(result);

      expect(await controller.delete(1)).toBe(result);
      expect(mockRoleService.delete).toHaveBeenCalledWith(1);
    });
  });
});
