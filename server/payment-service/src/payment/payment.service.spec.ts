import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: jest.fn().mockResolvedValue({
        id: 'pi_test',
        client_secret: 'secret_test',
      }),
    },
  }));
});

describe('PaymentService', () => {
  let service: PaymentService;
  let prisma: PrismaService;
  let kafka: ClientKafka;

  const mockPrismaService = {
    payment: {
      create: jest.fn().mockResolvedValue({}),
    },
  };

  const mockKafkaClient = {
    emit: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test_key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: 'KAFKA_SERVICE', useValue: mockKafkaClient },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    prisma = module.get<PrismaService>(PrismaService);
    kafka = module.get<ClientKafka>('KAFKA_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processPayment', () => {
    it('should create a payment intent, save to database and emit to kafka', async () => {
      const paymentData = {
        orderId: 'order_123',
        amount: 1000,
        currency: 'usd',
      };

      await service.processPayment(paymentData);

      // Verify Prisma call
      expect(mockPrismaService.payment.create).toHaveBeenCalledWith({
        data: {
          orderId: paymentData.orderId,
          amount: paymentData.amount / 100,
          currency: paymentData.currency,
          method: 'card',
          status: 'PENDING',
          stripePaymentIntentId: 'pi_test',
        },
      });

      // Verify Kafka emit
      expect(mockKafkaClient.emit).toHaveBeenCalledWith('payment.result', {
        orderId: paymentData.orderId,
        paymentIntentId: 'pi_test',
        status: 'PENDING',
        clientSecret: 'secret_test',
      });
    });
  });
});
