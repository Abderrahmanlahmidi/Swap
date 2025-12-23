import { Test, TestingModule } from '@nestjs/testing';
import { CategoryGatewayService } from './category.service';

describe('CategoryGatewayService', () => {
  let service: CategoryGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryGatewayService],
    }).compile();

    service = module.get<CategoryGatewayService>(CategoryGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
