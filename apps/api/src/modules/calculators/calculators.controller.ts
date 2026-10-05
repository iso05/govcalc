import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CalculatorsService } from './calculators.service.js';
import { CalculateRequestDto } from './dto/calculate-request.dto.js';

@ApiTags('Calculators')
@Controller('calculators')
export class CalculatorsController {
  constructor(private readonly calculatorsService: CalculatorsService) {}

  @Get()
  @ApiOperation({ summary: 'List available calculators with search and category filters' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'isPremium', required: false, type: Boolean })
  listAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('isPremium') isPremium?: string
  ) {
    const parsedPremium = isPremium !== undefined ? isPremium === 'true' : undefined;
    return {
      success: true,
      data: this.calculatorsService.listAll({ search, category, isPremium: parsedPremium }),
    };
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get calculator metadata, fields schema, and active version' })
  getBySlug(@Param('slug') slug: string) {
    return {
      success: true,
      data: this.calculatorsService.getBySlug(slug),
    };
  }

  @Post(':slug/calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Execute an explainable calculation' })
  @ApiResponse({ status: 200, description: 'Calculation completed successfully' })
  async calculate(@Param('slug') slug: string, @Body() dto: CalculateRequestDto) {
    const result = await this.calculatorsService.calculate(slug, dto);
    return {
      success: true,
      data: result,
    };
  }
}
