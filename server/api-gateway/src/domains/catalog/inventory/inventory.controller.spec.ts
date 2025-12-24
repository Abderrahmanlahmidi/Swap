import { Test, TestingModule } from '@nestjs/testing';
import { InventoryGatewayController } from './inventory.controller';

describe('InventoryGatewayController', () => {
  let controller: InventoryGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryGatewayController],
    }).compile();

    controller = module.get<InventoryGatewayController>(
      InventoryGatewayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
