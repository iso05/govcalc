import { Injectable } from '@nestjs/common';
import { CalculationContext } from '@govcalc/types';
import { CURRENT_BHM, getBhmForDate } from '@govcalc/config';

@Injectable()
export class SystemSettingsService {

  private currency = 'UZS' as const;

  getCurrentRates() {
    const current = getBhmForDate();
    return {
      bhm: current.value,
      status: current.status,
      sourceUrl: current.sourceUrl,
      currency: this.currency,
      effectiveDate: `${current.effectiveFrom}T00:00:00.000Z`,
    };
  }

  getCalculationContext(targetDate?: Date): CalculationContext {
    const date = targetDate || new Date();
    const resolvedBhm = getBhmForDate(date);
    return {
      calculationDate: date,
      bhm: resolvedBhm.value,

      currency: this.currency,
    };
  }
}
