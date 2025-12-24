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
import { PaymentGatewayService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles } from '../../../decorators/roles.decorators';
import { UserRole } from '../../../enums/user-role.enum';

@Controller('payments')
export class PaymentGatewayController {
  constructor(private readonly paymentService: PaymentGatewayService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN || UserRole.CLIENT)
  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.paymentService.getPaymentsByOrder(orderId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.getPayment(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    return this.paymentService.updatePayment(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.deletePayment(id);
  }
}
