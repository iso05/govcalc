import {
  CalculationContext,
  CalculationResult,
  CalculatorMetadata,
} from '@govcalc/types';
import { CalculatorDefinition, CalculatorVersionDefinition } from './interfaces';
import { D, toMoney, zeroMoney } from './decimal';

export class CalculatorRegistry {
  private static instance: CalculatorRegistry;
  private calculatorsByCode = new Map<string, CalculatorDefinition<any>>();
  private calculatorsBySlug = new Map<string, CalculatorDefinition<any>>();

  private constructor() {}

  public static getInstance(): CalculatorRegistry {
    if (!CalculatorRegistry.instance) {
      CalculatorRegistry.instance = new CalculatorRegistry();
    }
    return CalculatorRegistry.instance;
  }

  public register(definition: CalculatorDefinition<any>): void {
    this.calculatorsByCode.set(definition.code, definition);
    this.calculatorsBySlug.set(definition.slug, definition);
  }

  public getByCode(code: string): CalculatorDefinition<any> | undefined {
    return this.calculatorsByCode.get(code);
  }

  public getBySlug(slug: string): CalculatorDefinition<any> | undefined {
    if (slug === 'tugilganlik-guvohnomasi') {
      return this.calculatorsBySlug.get('fhdyo-tugilganlik-guvohnomasi') || this.calculatorsByCode.get('GOV-001');
    }
    return this.calculatorsBySlug.get(slug);
  }

  public listAll(): CalculatorMetadata[] {
    const list: CalculatorMetadata[] = [];
    for (const def of this.calculatorsByCode.values()) {
      const activeVersion = def.versions.find((v) => v.status === 'PUBLISHED') || def.versions[0];
      list.push({
        id: def.code,
        code: def.code,
        slug: def.slug,
        nameUz: def.nameUz,
        nameRu: def.nameRu,
        nameEn: def.nameEn,
        descriptionUz: def.descriptionUz,
        categorySlug: def.categorySlug,
        isPremium: def.isPremium,
        premiumPrice: def.premiumPrice,
        estimatedMinutes: def.estimatedMinutes,
        activeVersionCode: activeVersion ? activeVersion.versionCode : 'v1',
        effectiveFrom: activeVersion ? activeVersion.effectiveFrom.toISOString() : new Date().toISOString(),
        legalSourcesCount: activeVersion ? activeVersion.legalSources.length : 0,
      });
    }
    return list;
  }

  public async calculate(
    slugOrCode: string,
    rawInputs: unknown,
    context: CalculationContext,
    targetVersionCode?: string
  ): Promise<CalculationResult> {
    if (!Number.isFinite(context.calculationDate.getTime())) throw new Error('Hisoblash sanasi noto‘g‘ri');
    const calculator = this.getBySlug(slugOrCode) || this.getByCode(slugOrCode);
    if (!calculator) {
      throw new Error(`Kalkulyator topilmadi: "${slugOrCode}"`);
    }

    let versionDef: CalculatorVersionDefinition<any> | undefined;
    if (targetVersionCode) {
      versionDef = calculator.versions.find((v) => v.versionCode === targetVersionCode);
    } else {
      // Find active version for current context date
      const calcTime = context.calculationDate.getTime();
      versionDef = calculator.versions.find((v) => {
        const fromTime = v.effectiveFrom.getTime();
        const toTime = v.effectiveTo ? v.effectiveTo.getTime() : Infinity;
        return v.status === 'PUBLISHED' && calcTime >= fromTime && calcTime <= toTime;
      });

    }

    if (!versionDef) {
      throw new Error(`Kalkulyator versiyasi topilmadi: ${calculator.code}`);
    }

    // 1. Validate inputs using version schema
    const validatedInputs = versionDef.inputSchema.parse(rawInputs);

    // 2. Execute calculation
    const output = await versionDef.calculate(validatedInputs, context);

    let stateDutyTotal = D(0);
    let emblemFeeTotal = D(0);
    let serviceFeeTotal = D(0);
    let hasDelivery = false;

    for (const item of output.items) {
      if (item.paymentType === 'STATE_DUTY' || item.feeCategory === 'state_duty') {
        stateDutyTotal = stateDutyTotal.add(D(item.itemTotal.amount || 0));
      } else if (item.paymentType === 'EMBLEM_FEE' || item.feeCategory === 'emblem_fee') {
        emblemFeeTotal = emblemFeeTotal.add(D(item.itemTotal.amount || 0));
      } else if (item.paymentType === 'SERVICE_FEE' || item.feeCategory === 'service_fee') {
        serviceFeeTotal = serviceFeeTotal.add(D(item.itemTotal.amount || 0));
      } else if (item.paymentType === 'DELIVERY_FEE' || item.feeCategory === 'delivery_fee') {
        hasDelivery = true;
      }
    }

    // 3. Assemble complete explainable result
    return {
      calculatorCode: calculator.code,
      calculatorSlug: calculator.slug,
      calculatorNameUz: calculator.nameUz,
      versionCode: versionDef.versionCode,
      total: toMoney(output.totalAmount, context.currency),
      stateDuty: toMoney(stateDutyTotal, context.currency),
      emblemFee: toMoney(emblemFeeTotal, context.currency),
      serviceFee: toMoney(serviceFeeTotal, context.currency),
      deliveryFee: hasDelivery ? zeroMoney(context.currency, 'Alohida hisoblanadi') : undefined,
      formulaSummary: output.formulaSummary,
      breakdown: output.items,
      legalSources: versionDef.legalSources,
      verificationStatus: output.verificationStatus === 'NEEDS_HUMAN_REVIEW' ? 'NEEDS_HUMAN_REVIEW' : 'NEEDS_REVIEW',
      ratesApplied: {
        bhm: context.bhm,
        minimumWage: context.minimumWage,
        currency: context.currency,
        effectiveDate: context.calculationDate.toISOString(),
      },
      calculatedAt: new Date().toISOString(),
      notesUz: [...(output.notesUz || []), 'Prototip: amaldagi stavkalar, imtiyozlar va tarixiy qoidalar bo‘yicha huquqiy tekshiruv talab qilinadi. Natija to‘lov kvitansiyasi emas.'],
      isExempt: output.isExempt,
      exemptionReasonUz: output.exemptionReasonUz,
    };
  }
}

export const registry = CalculatorRegistry.getInstance();
