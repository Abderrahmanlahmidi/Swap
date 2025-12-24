import { Test, TestingModule } from '@nestjs/testing';
import { OrderGatewayController } from './order.controller';

describe('OrderGatewayController', () => {
  let controller: OrderGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderGatewayController],
    }).compile();

    controller = module.get<OrderGatewayController>(OrderGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
