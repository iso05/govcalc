import { Module } from '@nestjs/common';
import { LegalSourcesController } from './legal-sources.controller.js';
import { LegalSourcesService } from './legal-sources.service.js';

@Module({
  controllers: [LegalSourcesController],
  providers: [LegalSourcesService],
  exports: [LegalSourcesService],
})
export class LegalSourcesModule {}
