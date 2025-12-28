import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryGatewayService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { UserRole } from '../../../enums/user-role.enum';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles } from '../../../decorators/roles.decorators';

@Controller('categories')
export class CategoryGatewayController {
  constructor(private readonly categoryService: CategoryGatewayService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN || UserRole.CLIENT)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get()
  findAll() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.getCategory(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
