import { Module } from '@nestjs/common';
import { SystemSettingsModule } from './modules/system-settings/system-settings.module.js';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { LegalSourcesModule } from './modules/legal-sources/legal-sources.module.js';
import { CalculatorsModule } from './modules/calculators/calculators.module.js';

@Module({
  imports: [
    SystemSettingsModule,
    CategoriesModule,
    LegalSourcesModule,
    CalculatorsModule,
  ],
})
export class AppModule {}
