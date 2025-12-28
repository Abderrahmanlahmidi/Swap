import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

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
