import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @EventPattern('category.created')
  handleCategoryCreated(@Payload() data: any) {
    return this.categoryService.create(data);
  }

  @EventPattern('category.updated')
  handleCategoryUpdated(@Payload() data: any) {
    const { id, ...dto } = data;
    return this.categoryService.update(id, dto);
  }

  @EventPattern('category.deleted')
  handleCategoryDeleted(@Payload() data: any) {
    return this.categoryService.remove(data.id);
  }

  @Post()
  create(@Body() body: any) {
    return this.categoryService.create(body);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
