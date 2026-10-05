import { Module } from '@nestjs/common';
import { CalculatorsController } from './calculators.controller.js';
import { CalculatorsService } from './calculators.service.js';
import { SystemSettingsModule } from '../system-settings/system-settings.module.js';

@Module({
  imports: [SystemSettingsModule],
  controllers: [CalculatorsController],
  providers: [CalculatorsService],
  exports: [CalculatorsService],
})
export class CalculatorsModule {}
