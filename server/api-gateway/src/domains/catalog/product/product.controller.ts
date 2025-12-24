import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductGatewayService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles } from '../../../decorators/roles.decorators';
import { UserRole } from '../../../enums/user-role.enum';

@Controller('products')
export class ProductGatewayController {
  constructor(private readonly productService: ProductGatewayService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN || UserRole.CLIENT)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  findAll() {
    return this.productService.getProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
