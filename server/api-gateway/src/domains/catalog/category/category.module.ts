import { Module } from '@nestjs/common';
import { CategoryGatewayService } from './category.service';
import { CategoryGatewayController } from './category.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CategoryGatewayController],
  providers: [CategoryGatewayService],
})
export class CategoryModule {}
