import { Test, TestingModule } from '@nestjs/testing';
import { CategoryGatewayService } from './category.service';

describe('CategoryGatewayController', () => {
  let controller: CategoryGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryGatewayService],
    }).compile();

    controller = module.get<CategoryGatewayService>(CategoryGatewayService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
