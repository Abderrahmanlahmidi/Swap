import { Module } from '@nestjs/common';
import { CategoryGatewayService } from './category.service';
import { CategoryGatewayController } from './category.controller';

@Module({
  controllers: [CategoryGatewayController],
  providers: [CategoryGatewayService],
})
export class CategoryModule {}
