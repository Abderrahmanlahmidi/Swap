import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

jest.mock('stripe');

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPaymentService = {
    processPayment: jest.fn().mockResolvedValue({}),
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

  describe('handleOrderCreated', () => {
    it('should call paymentService.processPayment', async () => {
      const data = { orderId: '1', amount: 100, currency: 'usd' };
      await controller.handleOrderCreated(data);
      expect(service.processPayment).toHaveBeenCalledWith(data);
    });
  });
});
