import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPaymentService = {
    processPayment: jest.fn().mockResolvedValue({ message: 'initiated' }),
    getPayments: jest.fn().mockResolvedValue([{ id: '1' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [{ provide: PaymentService, useValue: mockPaymentService }],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('processPayment', () => {
    it('should call service.processPayment', async () => {
      const dto = { orderId: '123', amount: 100, currency: 'usd' };
      const result = await controller.processPayment(dto);
      expect(service.processPayment).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ message: 'initiated' });
    });
  });

  describe('getPayments', () => {
    it('should call service.getPayments', async () => {
      const result = await controller.getPayments();
      expect(service.getPayments).toHaveBeenCalled();
      expect(result).toEqual([{ id: '1' }]);
    });
  });
});
