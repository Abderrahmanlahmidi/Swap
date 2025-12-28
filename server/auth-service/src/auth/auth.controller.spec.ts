import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';

jest.mock('../prisma/prisma.service');

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const dto = { email: 'test@example.com', password: 'password', firstName: 'John', lastName: 'Doe', phone: '123' };
      const result = { id: 1, ...dto, role: 'Client' };
      mockAuthService.register.mockResolvedValue(result);

      const response = await controller.register(dto);
      expect(response).toEqual({ status: 201, message: 'User registered successfully' });
      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    });

    it('should handle errors during registration', async () => {
      mockAuthService.register.mockRejectedValue(new Error('Error'));
      await expect(controller.register({})).rejects.toThrow('Internal server error');
    });
  });

  describe('login', () => {
    it('should login a user and set cookie', async () => {
      const dto = { email: 'test@example.com', password: 'password' };
      const serviceResult = {
        userId: 1,
        role: 'Client',
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      };
      mockAuthService.login.mockResolvedValue(serviceResult);

      const result = await controller.login(dto, mockResponse);

      expect(mockAuthService.login).toHaveBeenCalledWith(dto.email, dto.password);
      expect(mockResponse.cookie).toHaveBeenCalledWith('refreshToken', 'refresh_token', expect.any(Object));
      expect(result).toEqual({
        status: 200,
        message: 'Login successful',
        user: { id: 1, role: 'Client' },
        accessToken: 'access_token',
      });
    });
  });
});
