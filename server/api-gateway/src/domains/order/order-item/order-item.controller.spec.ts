import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemGatewayController } from './order-item.controller';

describe('OrderItemGatewayController', () => {
  let controller: OrderItemGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemGatewayController],
    }).compile();

    controller = module.get<OrderItemGatewayController>(
      OrderItemGatewayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
