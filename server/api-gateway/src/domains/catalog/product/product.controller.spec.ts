import { Test, TestingModule } from '@nestjs/testing';
import { ProductGatewayController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductGatewayController],
    }).compile();

    controller = module.get<ProductGatewayController>(ProductGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
