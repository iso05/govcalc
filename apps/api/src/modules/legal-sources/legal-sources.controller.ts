import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LegalSourcesService } from './legal-sources.service.js';

@ApiTags('Legal Sources')
@Controller('legal-sources')
export class LegalSourcesController {
  constructor(private readonly legalSourcesService: LegalSourcesService) {}

  @Get()
  @ApiOperation({ summary: 'List all verified official legal sources' })
  findAll() {
    return {
      success: true,
      data: this.legalSourcesService.findAll(),
    };
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get legal source details by code (e.g. LEX-4622285)' })
  findByCode(@Param('code') code: string) {
    const source = this.legalSourcesService.findByCode(code);
    if (!source) {
      throw new NotFoundException(`Qonuniy manba topilmadi: ${code}`);
    }
    return {
      success: true,
      data: source,
    };
  }
}
