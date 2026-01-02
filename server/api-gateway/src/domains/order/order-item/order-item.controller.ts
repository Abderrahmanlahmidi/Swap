import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { OrderItemGatewayService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles } from '../../../decorators/roles.decorators';
import { UserRole } from '../../../enums/user-role.enum';

@Controller('order-items')
export class OrderItemGatewayController {
  constructor(private readonly orderItemService: OrderItemGatewayService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @Post()
  create(@Body() dto: CreateOrderItemDto) {
    return this.orderItemService.createOrderItem(dto);
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.orderItemService.getOrderItemsByOrder(orderId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderItemDto) {
    return this.orderItemService.updateOrderItem(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.deleteOrderItem(id);
  }
}
