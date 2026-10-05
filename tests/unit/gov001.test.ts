import { describe, it, expect } from 'vitest';
import { registry } from '@govcalc/calculators';
import { getBhmForDate } from '@govcalc/config';
import { CalculationContext } from '@govcalc/types';

describe('GOV-001 Tug‘ilganlik guvohnomasi Legal Engine & Test Matrix', () => {
  const currentContext: CalculationContext = {
    calculationDate: new Date('2026-09-15T10:00:00.000Z'),
    bhm: '440000.00',
    minimumWage: '1150000.00',
    currency: 'UZS',
  };

  it('1. First certificate online via YIDXP: 10% discount on Emblem fee -> 59,400 UZS (State duty is 0)', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('59400.00');
    expect(res.isExempt).toBe(false);
    expect(res.verificationStatus).toBe('NEEDS_REVIEW');
  });

  it('2. First certificate offline at FHDYO: full rate -> 66,000 UZS (no discount, State duty 0)', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'OFFLINE_FHDYO',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('66000.00');
    expect(res.total.amount).toBe('66000.00');
  });

  it('3. Single mother application: online via YIDXP -> State duty 0, Emblem fee 59,400 UZS (VMQ 550 3-band, ORQ-600 12-modda)', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'SINGLE_MOTHER',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('59400.00');
    expect(res.isExempt).toBe(false);
  });

  it('3b. Single mother application: offline at FHDYO -> State duty 0, Emblem 66,000 + Service 22,000 (5%) -> 88,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'SINGLE_MOTHER',
      channel: 'OFFLINE_FHDYO',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('66000.00');
    expect(res.serviceFee?.amount).toBe('22000.00');
    expect(res.total.amount).toBe('88000.00');
  });

  it('4. Duplicate certificate online via YIDXP: 15% duty (59,400) + 15% emblem (59,400) -> 118,800 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'DUPLICATE_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('59400.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('118800.00');
    expect(res.total.formattedAmount).toBe('118 800 so‘m');
  });

  it('5. Duplicate certificate offline at FHDYO: 66,000 duty (15%) + 66,000 emblem (15%) + 44,000 service fee (10%) -> 176,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'DUPLICATE_CERTIFICATE',
      channel: 'OFFLINE_FHDYO',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('66000.00');
    expect(res.emblemFee?.amount).toBe('66000.00');
    expect(res.serviceFee?.amount).toBe('44000.00'); // 10% BHM e-FHDYO tariff XI.1
    expect(res.total.amount).toBe('176000.00');
  });

  it('6. FHDYO clerical error correction: duty 0, service 0, emblem fee 15% (59,400 online, 66,000 offline)', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'CORRECTION_FHDY_ERROR',
      channel: 'OFFLINE_FHDYO',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.serviceFee?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('66000.00');
    expect(res.total.amount).toBe('66000.00');
  });

  it('7. Archive duplication reissue (digitization series duplicate): 100% EXEMPT -> 0 UZS (VMQ 550 3-band 4-xatboshi)', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'ARCHIVE_DUPLICATION_REISSUE',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('0.00');
    expect(res.total.amount).toBe('0.00');
    expect(res.isExempt).toBe(true);
  });

  it('8. Paternity establishment online via YIDXP: 0 duty + 59,400 emblem -> 59,400 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'PATERNITY_ESTABLISHMENT',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('59400.00');
  });

  it('9. Paternity establishment offline: 0 duty + 66,000 emblem + 220,000 service (50%) -> 286,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'PATERNITY_ESTABLISHMENT',
      channel: 'OFFLINE_FHDYO',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('66000.00');
    expect(res.serviceFee?.amount).toBe('220000.00');
    expect(res.total.amount).toBe('286000.00');
  });

  it('10. Adoption online via YIDXP: 0 duty + 59,400 emblem -> 59,400 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'ADOPTION',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('59400.00');
  });

  it('11. Restoration of record on YIDXP: 10% duty (39,600) + 15% emblem (59,400) -> 99,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'RESTORATION_OF_RECORD',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('39600.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('99000.00');
  });

  it('12. Correction under 16 on YIDXP: 10% duty (39,600) + 15% emblem (59,400) -> 99,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'CORRECTION_OTHER_UNDER_16',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('39600.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('99000.00');
  });

  it('13. Correction 16 and above on YIDXP: 10% duty (39,600) + 15% emblem (59,400) -> 99,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'CORRECTION_OTHER_16_AND_ABOVE',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('39600.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('99000.00');
  });

  it('14. Late registration on YIDXP: 0 duty + 59,400 emblem -> 59,400 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'LATE_OR_SPECIAL',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('59400.00');
  });

  it('15. Foreign birth certificate registration on YIDXP: 0 duty + 59,400 emblem -> 59,400 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FOREIGN_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('59400.00');
    expect(res.total.amount).toBe('59400.00');
  });

  it('16. Special exemption orphan / state custody: 100% EXEMPT -> 0 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'DUPLICATE_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
      specialExemption: 'orphan',
    }, currentContext);

    expect(res.total.amount).toBe('0.00');
    expect(res.isExempt).toBe(true);
  });

  it('17. Special exemption natural disaster on duplicate: duty AND emblem fee EXEMPT -> 0 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'DUPLICATE_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
      specialExemption: 'natural_disaster',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('0.00');
    expect(res.total.amount).toBe('0.00');
    expect(res.isExempt).toBe(true);
    expect(res.exemptionReasonUz).toContain('Tabiiy yoki texnogen ofat');
  });

  it('18. Social discount (50% on duty, emblem, and service) for duplicate offline: duty 33,000 + emblem 33,000 + service 22,000 = 88,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'DUPLICATE_CERTIFICATE',
      channel: 'OFFLINE_FHDYO',
      socialDiscount: true,
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('33000.00');
    expect(res.emblemFee?.amount).toBe('33000.00');
    expect(res.serviceFee?.amount).toBe('22000.00');
    expect(res.total.amount).toBe('88000.00');
  });

  it('18b. Social discount (50% on emblem fee) for first certificate: 15% BHM = 66,000 -> 50% chegirma -> 33,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'OFFLINE_FHDYO',
      socialDiscount: true,
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('0.00');
    expect(res.emblemFee?.amount).toBe('33000.00');
    expect(res.total.amount).toBe('33000.00');
  });

  it('19. Delivery option adds delivery disclaimer item and delivery fee note', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
      deliveryOption: 'postal',
    }, currentContext);

    expect(res.deliveryFee).toBeDefined();
    expect(res.deliveryFee?.formattedAmount).toBe('Alohida hisoblanadi');
    const deliveryItem = res.breakdown.find((b) => b.paymentType === 'DELIVERY_FEE');
    expect(deliveryItem).toBeDefined();
    expect(deliveryItem?.descriptionUz).toContain('Yetkazib berish xarajati pochta xizmati tarifiga ko‘ra alohida hisoblanadi.');
  });

  it('20. Historical BHM 2024-05-01 (BHM = 340,000 UZS): first certificate YIDXP -> 340,000 * 15% * 0.9 = 45,900 UZS', async () => {
    const histContext: CalculationContext = {
      calculationDate: new Date('2024-05-01T10:00:00.000Z'),
      bhm: '340000.00',
      minimumWage: '1050000.00',
      currency: 'UZS',
    };

    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
    }, histContext);

    expect(res.emblemFee?.amount).toBe('45900.00');
    expect(res.total.amount).toBe('45900.00');
  });

  it('21. Historical BHM 2025-08-01 (BHM = 412,000 UZS): first certificate YIDXP -> 412,000 * 15% * 0.9 = 55,620 UZS', async () => {
    const histContext: CalculationContext = {
      calculationDate: new Date('2025-08-01T10:00:00.000Z'),
      bhm: '412000.00',
      minimumWage: '1150000.00',
      currency: 'UZS',
    };

    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
    }, histContext);

    expect(res.emblemFee?.amount).toBe('55620.00');
    expect(res.total.amount).toBe('55620.00');
  });

  it('22. getBhmForDate helper properly resolves versioned BHM', () => {
    expect(getBhmForDate('2026-09-15').value).toBe('440000.00');
    expect(getBhmForDate('2025-06-01').value).toBe('375000.00');
    expect(getBhmForDate('2024-05-01').value).toBe('340000.00');
    expect(getBhmForDate('2023-08-01').value).toBe('330000.00');
    expect(getBhmForDate('2022-10-01').value).toBe('300000.00');
  });

  it('23. Backwards compatibility: serviceType = "initial_timely" maps to FIRST_CERTIFICATE', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      serviceType: 'initial_timely',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.total.amount).toBe('59400.00');
  });

  it('24. Backwards compatibility: serviceType = "single_mother" maps to SINGLE_MOTHER', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      serviceType: 'single_mother',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.total.amount).toBe('59400.00');
    expect(res.isExempt).toBe(false);
  });

  it('25. Backwards compatibility: serviceType = "duplicate_copy" maps to DUPLICATE_CERTIFICATE', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      serviceType: 'duplicate_copy',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.total.amount).toBe('118800.00');
  });

  it('26. Both social discount and YIDXP discount on state duty triggers NEEDS_HUMAN_REVIEW flag', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'DUPLICATE_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
      socialDiscount: true,
    }, currentContext);

    expect(res.verificationStatus).toBe('NEEDS_HUMAN_REVIEW');
    expect(res.notesUz?.some((n) => n.includes('NEEDS_HUMAN_REVIEW'))).toBe(true);
  });

  it('27. Decimal precision: no floating point rounding artifacts', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'DUPLICATE_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    // Checks exact 2 decimal places string
    expect(res.total.amount).toMatch(/^\d+\.\d{2}$/);
    expect(res.stateDuty?.amount).toMatch(/^\d+\.\d{2}$/);
    expect(res.emblemFee?.amount).toMatch(/^\d+\.\d{2}$/);
  });

  it('28. Breakdown items have legal citations and official URLs', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.legalSources.length).toBeGreaterThanOrEqual(2);
    expect(res.legalSources.some((s) => s.documentNumber === 'O‘RQ-600')).toBe(true);
    expect(res.legalSources.some((s) => s.officialUrl?.includes('lex.uz'))).toBe(true);
  });

  it('29. Formatted amount uses correct Uzbek currency notation (e.g. "59 400 so‘m")', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
    }, currentContext);

    expect(res.total.formattedAmount).toBe('59 400 so‘m');
  });

  it('30. Correction 16 and above offline: 10% duty (44,000) + 15% emblem (66,000) + service fee 20% (88,000) -> 198,000 UZS', async () => {
    const res = await registry.calculate('tugilganlik-guvohnomasi', {
      caseType: 'CORRECTION_OTHER_16_AND_ABOVE',
      channel: 'OFFLINE_FHDYO',
    }, currentContext);

    expect(res.stateDuty?.amount).toBe('44000.00');
    expect(res.emblemFee?.amount).toBe('66000.00');
    expect(res.serviceFee?.amount).toBe('88000.00');
    expect(res.total.amount).toBe('198000.00');
  });
});
