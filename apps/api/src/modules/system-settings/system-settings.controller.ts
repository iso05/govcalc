import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SystemSettingsService } from './system-settings.service.js';

@ApiTags('System Settings')
@Controller('system-settings')
export class SystemSettingsController {
  constructor(private readonly settingsService: SystemSettingsService) {}

  @Get('rates')
  @ApiOperation({ summary: 'Get current official BHM and minimum wage baseline rates' })
  getCurrentRates() {
    return {
      success: true,
      data: this.settingsService.getCurrentRates(),
    };
  }
}
