import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpService: HttpService;
  let kafkaClient: ClientKafka;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockKafkaClient = {
    connect: jest.fn().mockResolvedValue(null),
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: 'KAFKA_SERVICE', useValue: mockKafkaClient },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    httpService = module.get<HttpService>(HttpService);
    kafkaClient = module.get<ClientKafka>('KAFKA_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processPayment', () => {
    it('should emit order.created event via kafka', async () => {
      const dto = { orderId: '123', amount: 1000, currency: 'usd' };
      const result = await service.processPayment(dto);

      expect(kafkaClient.emit).toHaveBeenCalledWith('order.created', dto);
      expect(result).toEqual({ message: 'Payment processing initiated' });
    });
  });

  describe('getPayments', () => {
    it('should fetch payments via http', async () => {
      const mockResult = { data: [{ id: 'p1' }] };
      mockHttpService.get.mockReturnValue(of(mockResult));

      const result = await service.getPayments();

      expect(httpService.get).toHaveBeenCalled();
      expect(result).toEqual(mockResult.data);
    });
  });
});
