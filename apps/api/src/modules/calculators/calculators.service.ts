import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { registry } from '@govcalc/calculators';
import { SystemSettingsService } from '../system-settings/system-settings.service.js';
import { CalculationResult, CalculatorMetadata } from '@govcalc/types';
import { CalculateRequestDto } from './dto/calculate-request.dto.js';
import { ZodError } from 'zod';

@Injectable()
export class CalculatorsService {
  constructor(private readonly settingsService: SystemSettingsService) {}

  listAll(filters?: { search?: string; category?: string; isPremium?: boolean }): CalculatorMetadata[] {
    let list = registry.listAll();

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.nameUz.toLowerCase().includes(q) ||
          c.descriptionUz.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q)
      );
    }

    if (filters?.category) {
      list = list.filter((c) => c.categorySlug === filters.category);
    }

    if (filters?.isPremium !== undefined) {
      list = list.filter((c) => c.isPremium === filters.isPremium);
    }

    return list;
  }

  getBySlug(slug: string) {
    const calc = registry.getBySlug(slug) || registry.getByCode(slug);
    if (!calc) {
      throw new NotFoundException(`Kalkulyator topilmadi: ${slug}`);
    }

    const activeVersion = calc.versions.find((v) => v.status === 'PUBLISHED') || calc.versions[0];

    return {
      code: calc.code,
      slug: calc.slug,
      nameUz: calc.nameUz,
      nameRu: calc.nameRu,
      nameEn: calc.nameEn,
      categorySlug: calc.categorySlug,
      descriptionUz: calc.descriptionUz,
      descriptionRu: calc.descriptionRu,
      descriptionEn: calc.descriptionEn,
      isPremium: calc.isPremium,
      premiumPrice: calc.premiumPrice,
      estimatedMinutes: calc.estimatedMinutes,
      activeVersion: {
        version: activeVersion.version,
        versionCode: activeVersion.versionCode,
        effectiveFrom: activeVersion.effectiveFrom.toISOString(),
        status: activeVersion.status,
        inputFields: activeVersion.inputFields,
        legalSources: activeVersion.legalSources,
      },
    };
  }

  async calculate(slug: string, dto: CalculateRequestDto): Promise<CalculationResult> {
    const calc = registry.getBySlug(slug) || registry.getByCode(slug);
    if (!calc) {
      throw new NotFoundException(`Kalkulyator topilmadi: ${slug}`);
    }

    const targetDate = dto.targetDate ? new Date(dto.targetDate) : new Date();


    try {
      if (targetDate.getTime() > Date.now() + 86400000) throw new Error('Kelajakdagi stavka ma’lum emas');
      const context = this.settingsService.getCalculationContext(targetDate);
      return await registry.calculate(slug, dto.inputs, context, dto.versionCode);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const firstError = err.errors[0]?.message || 'Kiritilgan ma’lumotlarda xatolik bor';
        throw new BadRequestException({
          code: 'VALIDATION_ERROR',
          message: firstError,
          details: err.errors,
        });
      }
      throw new BadRequestException(err.message || 'Hisoblashda xatolik yuz berdi');
    }
  }
}
