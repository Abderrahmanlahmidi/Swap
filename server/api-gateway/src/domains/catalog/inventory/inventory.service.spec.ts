import { Test, TestingModule } from '@nestjs/testing';
import { InventoryGatewayService } from './inventory.service';

describe('InventoryGatewayService', () => {
  let service: InventoryGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryGatewayService],
    }).compile();

    service = module.get<InventoryGatewayService>(InventoryGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
