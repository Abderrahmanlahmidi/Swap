import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemGatewayService } from './order-item.service';

describe('OrderItemGatewayService', () => {
  let service: OrderItemGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemGatewayService],
    }).compile();

    service = module.get<OrderItemGatewayService>(OrderItemGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
