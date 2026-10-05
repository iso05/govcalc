import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service.js';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List all official calculation categories' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  findAll() {
    return {
      success: true,
      data: this.categoriesService.findAll(),
    };
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get category details by slug' })
  findOne(@Param('slug') slug: string) {
    const category = this.categoriesService.findBySlug(slug);
    if (!category) {
      throw new NotFoundException(`Kategoriya topilmadi: ${slug}`);
    }
    return {
      success: true,
      data: category,
    };
  }
}
