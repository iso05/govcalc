import { Gov001Input, Gov001InputSchema, Gov001Case } from '@govcalc/validation';
import { CalculatorDefinition } from '../engine/interfaces';
import { D, toMoney, zeroMoney } from '../engine/decimal';

import { CalculationBreakdownItem, LegalSourceReference } from '@govcalc/types';

export const GOV001_LEGAL_SOURCES: LegalSourceReference[] = [
  {
    id: 'LEX-ORQ-600',
    code: 'LEX-ORQ-600',
    title: 'O‘zbekiston Respublikasining "Davlat boji to‘g‘risida"gi Qonuni',
    titleUz: 'O‘zbekiston Respublikasining "Davlat boji to‘g‘risida"gi Qonuni',
    documentType: 'Qonun',
    documentNumber: 'O‘RQ-600',
    publicationDate: '2020-01-06',
    effectiveFrom: '2020-01-07',
    effectiveDate: '2020-01-07',
    officialUrl: 'https://lex.uz/docs/-4680944?ONDATE=09.09.2026+00',
    article: '5, 6, 12, 15, 22, 22¹, 22²-moddalar va Davlat boji stavkalari ilovasi (5-band)',
    articleParagraph: '5, 6, 12, 15, 22, 22¹, 22²-moddalar va Ilova 5-band',
    status: 'NEEDS_REVIEW',
    verificationStatus: 'NEEDS_REVIEW',
    lastVerifiedAt: '2026-09-15',
  },
  {
    id: 'LEX-VMQ-550',
    code: 'LEX-VMQ-550',
    title: 'Vazirlar Mahkamasining "Nikoh, oila va fuqarolik holati dalolatnomalarini qayd etish sohasidagi normativ-huquqiy hujjatlarni tizimlashtirish to‘g‘risida"gi Qarori',
    titleUz: 'Vazirlar Mahkamasining "Nikoh, oila va fuqarolik holati dalolatnomalarini qayd etish sohasidagi normativ-huquqiy hujjatlarni tizimlashtirish to‘g‘risida"gi Qarori',
    documentType: 'Vazirlar Mahkamasi Qarori',
    documentNumber: '550-son',
    publicationDate: '2023-10-20',
    effectiveFrom: '2023-10-23',
    effectiveDate: '2023-10-23',
    officialUrl: 'https://lex.uz/uz/docs/-6638940',
    article: '3-band (Gerb yig‘imi 15%, YIDXP 90% imtiyozi, raqamlashtirish imtiyozi) va 4-ilova (Pochta xizmati)',
    articleParagraph: '3-band va 4-ilova',
    status: 'NEEDS_REVIEW',
    verificationStatus: 'NEEDS_REVIEW',
    lastVerifiedAt: '2026-09-16',
  },
  {
    id: 'LEX-VMQ-362',
    code: 'LEX-VMQ-362',
    title: 'Vazirlar Mahkamasining "Vazirlar Mahkamasining ayrim qarorlariga o‘zgartirish va qo‘shimchalar kiritish to‘g‘risida"gi Qarori',
    titleUz: 'Vazirlar Mahkamasining "Vazirlar Mahkamasining ayrim qarorlariga o‘zgartirish va qo‘shimchalar kiritish to‘g‘risida"gi Qarori',
    documentType: 'Vazirlar Mahkamasi Qarori',
    documentNumber: '362-son',
    publicationDate: '2025-06-12',
    effectiveFrom: '2025-06-13',
    effectiveDate: '2025-06-13',
    officialUrl: 'https://lex.uz/uz/docs/-6638940#-7589534',
    article: '3-band tahriri (Favqulodda ofat jabrlanuvchilariga takroriy guvohnoma gerb yig‘imidan ozod, YIDXP 90% qoidasi)',
    articleParagraph: '3-band',
    status: 'NEEDS_REVIEW',
    verificationStatus: 'NEEDS_REVIEW',
    lastVerifiedAt: '2026-09-16',
  },
  {
    id: 'EFHDYO-PAY',
    code: 'EFHDYO-PAY',
    title: 'O‘zbekiston Respublikasi Adliya vazirligi FHDY To‘lovlar Jadvali',
    titleUz: 'O‘zbekiston Respublikasi Adliya vazirligi FHDY To‘lovlar Jadvali',
    documentType: 'Idoraviy Qoida',
    documentNumber: 'e-FHDYO Tarifi',
    publicationDate: '2023-10-20',
    effectiveFrom: '2023-10-23',
    effectiveDate: '2023-10-23',
    officialUrl: 'https://www.e-fhdyo.uz/Payment/index',
    article: 'I, V, VI, XI, XII bo‘limlar stavkalari',
    articleParagraph: 'I, V, VI, XI, XII bo‘limlar',
    status: 'NEEDS_REVIEW',
    verificationStatus: 'NEEDS_REVIEW',
    lastVerifiedAt: '2026-09-16',
  },
  {
    id: 'MYGOV-913',
    code: 'MYGOV-913',
    title: 'Yagona interaktiv davlat xizmatlari portali: Tug‘ilganlik haqidagi guvohnomani olish',
    titleUz: 'Yagona interaktiv davlat xizmatlari portali: Tug‘ilganlik haqidagi guvohnomani olish',
    documentType: 'Idoraviy Qoida',
    documentNumber: 'YIDXP-913',
    publicationDate: '2023-10-20',
    effectiveFrom: '2023-10-23',
    effectiveDate: '2023-10-23',
    officialUrl: 'https://my.gov.uz/uz/service/913',
    article: 'Xizmat narxi (Gerb yig‘imi 0.135 BHM)',
    articleParagraph: 'Xizmat narxi',
    status: 'NEEDS_REVIEW',
    verificationStatus: 'NEEDS_REVIEW',
    lastVerifiedAt: '2026-09-16',
  },
  {
    id: 'MYGOV-865',
    code: 'MYGOV-865',
    title: 'Yagona interaktiv davlat xizmatlari portali: Tug‘ilganlik haqida takroriy guvohnoma',
    titleUz: 'Yagona interaktiv davlat xizmatlari portali: Tug‘ilganlik haqida takroriy guvohnoma',
    documentType: 'Idoraviy Qoida',
    documentNumber: 'YIDXP-865',
    publicationDate: '2023-10-20',
    effectiveFrom: '2023-10-23',
    effectiveDate: '2023-10-23',
    officialUrl: 'https://my.gov.uz/uz/service/865',
    article: 'Xizmat narxi (Davlat boji 0.135 BHM + Gerb yig‘imi 0.135 BHM)',
    articleParagraph: 'Xizmat narxi',
    status: 'NEEDS_REVIEW',
    verificationStatus: 'NEEDS_REVIEW',
    lastVerifiedAt: '2026-09-16',
  },
];

export const gov001Definition: CalculatorDefinition<Gov001Input> = {
  code: 'GOV-001',
  slug: 'fhdyo-tugilganlik-guvohnomasi',
  nameUz: 'Tug‘ilganlik guvohnomasi',
  nameRu: 'Свидетельство о рождении',
  nameEn: 'Birth Certificate',
  categorySlug: 'hujjatlar',
  descriptionUz:
    'Tug‘ilganlik guvohnomasi bilan bog‘liq to‘lovlarni holatingizga qarab hisoblang.',
  isPremium: false,
  estimatedMinutes: 2,
  versions: [
    {
      version: 'v1',
      versionCode: 'GOV-001-v1',
      effectiveFrom: new Date('2020-01-07'),
      effectiveTo: null,
      status: 'PUBLISHED',
      inputSchema: Gov001InputSchema,
      legalSources: GOV001_LEGAL_SOURCES,
      inputFields: [
        {
          key: 'caseType',
          labelUz: 'Holatni tanlang',
          type: 'SELECT',
          required: true,
          defaultValue: 'FIRST_CERTIFICATE',
          options: [
            {
              value: 'FIRST_CERTIFICATE',
              labelUz: 'Birinchi marta tug‘ilganlik guvohnomasini olish (umumiy tartibda)',
              descriptionUz: 'Davlat boji undirilmaydi. Gerb yig‘imi to‘lanadi.',
            },
            {
              value: 'SINGLE_MOTHER',
              labelUz: 'Yolg‘iz ona arizasi asosida',
              descriptionUz: 'Davlat boji undirilmaydi. Gerb yig‘imi (15% BHM) to‘lanadi. FHDYO bo‘limida murojaat qilinganda 5% xizmat haqi olinadi.',
            },
            {
              value: 'LATE_OR_SPECIAL',
              labelUz: 'Tug‘ilish muddati o‘tib ketgan / alohida holat',
              descriptionUz: 'Muddati o‘tib murojaat qilinganda FHDYO bo‘limida xizmat haqi olinadi.',
            },
            {
              value: 'PATERNITY_ESTABLISHMENT',
              labelUz: 'Otalikni belgilash arizasi bilan birga',
              descriptionUz: 'Otalikni belgilash davlat bojidan ozod, FHDYO xizmat haqi olinadi.',
            },
            {
              value: 'ADOPTION',
              labelUz: 'Farzandlikka olish munosabati bilan',
              descriptionUz: 'Davlat boji va pullik xizmat to‘liq ozod.',
            },
            {
              value: 'DUPLICATE_CERTIFICATE',
              labelUz: 'Takroriy (dublikat) guvohnoma olish',
              descriptionUz: 'Davlat boji va Gerb yig‘imi to‘lanadi.',
            },
            {
              value: 'RESTORATION_OF_RECORD',
              labelUz: 'Tug‘ilganlik yozuvini tiklash',
              descriptionUz: 'Dalolatnoma yozuvini tiklash boji va gerb yig‘imi to‘lanadi.',
            },
            {
              value: 'CORRECTION_FHDY_ERROR',
              labelUz: 'FHDYO organi xatosi sababli tuzatish/o‘zgartirish',
              descriptionUz: 'Davlat boji va xizmat haqi olinmaydi. Yangi blank uchun gerb yig‘imi (15% BHM) to‘lanadi.',
            },
            {
              value: 'CORRECTION_OTHER_UNDER_16',
              labelUz: 'Boshqa sabab bilan tuzatish/o‘zgartirish (16 yoshgacha)',
              descriptionUz: 'Davlat boji va 16 yoshgacha xizmat haqi to‘lanadi.',
            },
            {
              value: 'CORRECTION_OTHER_16_AND_ABOVE',
              labelUz: 'Boshqa sabab bilan tuzatish/o‘zgartirish (16 yoshdan katta)',
              descriptionUz: 'Davlat boji va 16 yoshdan katta xizmat haqi to‘lanadi.',
            },
            {
              value: 'ARCHIVE_DUPLICATION_REISSUE',
              labelUz: 'Arxiv raqamlashtirishda takrorlangan seriya/raqamni almashtirish',
              descriptionUz: 'Arxiv raqamlashtirishda takrorlangan seriya/raqamni qayta rasmiylashtirish to‘liq bepul (VMQ 550 3-band).',
            },
            {
              value: 'FOREIGN_CERTIFICATE',
              labelUz: 'Chet elda berilgan tug‘ilganlik hujjatini qayd ettirish',
              descriptionUz: 'FHDYOda ro‘yxatga olish xizmati haqi to‘lanadi.',
            },
          ],
        },
        {
          key: 'channel',
          labelUz: 'Ariza berish usuli',
          type: 'RADIO',
          required: true,
          defaultValue: 'ONLINE_YIDXP',
          options: [
            {
              value: 'ONLINE_YIDXP',
              labelUz: 'YIDXP (my.gov.uz) orqali onlayn',
              descriptionUz: '10% chegirma qo‘llaniladi (to‘lov 90% miqdorida).',
            },
            {
              value: 'OFFLINE_FHDYO',
              labelUz: 'FHDYO bo‘limiga bevosita borib',
              descriptionUz: 'Stavkalar to‘liq 100% miqdorida qo‘llaniladi.',
            },
          ],
        },
        {
          key: 'socialDiscount',
          labelUz: 'Ijtimoiy imtiyoz mavjudligi (50% chegirma)',
          type: 'CHECKBOX',
          required: false,
          defaultValue: false,
          helpTextUz:
            'Ijtimoiy himoya yagona reyestriga kiritilgan fuqarolar va I hamda II guruh nogironligi bo‘lgan shaxslarga 50% chegirma beriladi (O‘RQ-600 22²-modda).',
        },
        {
          key: 'specialExemption',
          labelUz: 'Maxsus imtiyozli holat (100% ozod qilish)',
          type: 'SELECT',
          required: false,
          defaultValue: 'none',
          options: [
            { value: 'none', labelUz: 'Mavjud emas' },
            {
              value: 'orphan',
              labelUz: 'Yetim bola yoki ota-ona qaramog‘idan mahrum bo‘lgan bola (To‘liq ozod)',
              descriptionUz: 'O‘RQ-600 12-modda va VMQ 550 3-band bo‘yicha to‘liq bepul.',
            },
            {
              value: 'natural_disaster',
              labelUz: 'Tabiiy ofat jabrlanuvchisi (To‘liq ozod)',
              descriptionUz: 'Favqulodda vaziyat natijasida jabrlanganda bepul.',
            },
            {
              value: 'technological_disaster',
              labelUz: 'Texnogen ofat yoki yong‘in jabrlanuvchisi (To‘liq ozod)',
              descriptionUz: 'Turar joy yong‘ini yoki avariya natijasida hujjat yo‘qolganda bepul.',
            },
            {
              value: 'rehabilitation',
              labelUz: 'Reabilitatsiya qilingan qarindosh bo‘yicha',
              descriptionUz: 'Takroriy guvohnoma davlat bojidan ozod.',
            },
          ],
        },
        {
          key: 'deliveryOption',
          labelUz: 'Yetkazib berish usuli',
          type: 'RADIO',
          required: false,
          defaultValue: 'none',
          options: [
            {
              value: 'none',
              labelUz: 'O‘zi borib olish (FHDYO bo‘limidan)',
              descriptionUz: 'Yetkazib berish xarajatisiz.',
            },
            {
              value: 'postal',
              labelUz: 'Pochta orqali manzilga yetkazish',
              descriptionUz: 'Yetkazib berish xarajati pochta xizmati tarifiga ko‘ra alohida hisoblanadi.',
            },
          ],
        },
      ],
      calculate(rawInputs, context) {
        // Resolve date-versioned BHM
        const bhmDecimal = D(context.bhm);
        if (!bhmDecimal.isFinite() || bhmDecimal.lte(0)) throw new Error('BHM musbat son bo‘lishi kerak');

        // Normalize inputs
        let caseType: Gov001Case = 'FIRST_CERTIFICATE';
        if (rawInputs.caseType) {
          caseType = rawInputs.caseType;
        } else if (rawInputs.serviceType) {
          switch (rawInputs.serviceType) {
            case 'single_mother':
              caseType = 'SINGLE_MOTHER';
              break;
            case 'initial_delayed':
              caseType = 'LATE_OR_SPECIAL';
              break;
            case 'duplicate_copy':
              caseType = 'DUPLICATE_CERTIFICATE';
              break;
            case 'certificate_with_change':
              caseType = 'CORRECTION_OTHER_UNDER_16';
              break;
            default:
              caseType = 'FIRST_CERTIFICATE';
          }
        }

        const channel = rawInputs.channel || 'ONLINE_YIDXP';
        const isOnline = channel === 'ONLINE_YIDXP';
        const hasSocialDiscount = Boolean(rawInputs.socialDiscount || rawInputs.isSocialExempt);
        const specialExemption = rawInputs.specialExemption || 'none';
        const deliveryOption = rawInputs.deliveryOption || 'none';

        // Modifiers
        const isOrphan = specialExemption === 'orphan';
        const isDisaster = specialExemption === 'natural_disaster' || specialExemption === 'technological_disaster';
        const isRehabilitation = specialExemption === 'rehabilitation';

        // 1. STATE_DUTY (Davlat boji) Resolution
        let stateDutyBaseRate = D(0);
        let stateDutyLegalCitation = 'O‘RQ-600 12-modda 2-band (Davlat bojidan ozod)';
        let stateDutyLegalUrl = 'https://lex.uz/docs/-4680944?ONDATE=09.09.2026+00';
        let stateDutyExempt = false;
        let stateDutyExemptionReason = '';

        if (caseType === 'DUPLICATE_CERTIFICATE') {
          stateDutyBaseRate = D('0.15'); // 15% BHM
          stateDutyLegalCitation = 'O‘RQ-600 Ilova 5(d)-band (Takroriy guvohnoma davlat boji — 15% BHM)';
          if (isOrphan) {
            stateDutyExempt = true;
            stateDutyBaseRate = D(0);
            stateDutyExemptionReason = 'O‘RQ-600 12-modda 1-band (Yetim bolalar uchun takroriy guvohnoma davlat bojidan ozod)';
          } else if (isDisaster) {
            stateDutyExempt = true;
            stateDutyBaseRate = D(0);
            stateDutyExemptionReason = 'O‘RQ-600 12-modda 5-band (Favqulodda ofat jabrlanuvchilari takroriy guvohnoma davlat bojidan ozod)';
          } else if (isRehabilitation) {
            stateDutyExempt = true;
            stateDutyBaseRate = D(0);
            stateDutyExemptionReason = 'O‘RQ-600 12-modda 4-band (Reabilitatsiya qilinganlar bo‘yicha takroriy guvohnoma davlat bojidan ozod)';
          }
        } else if (
          caseType === 'RESTORATION_OF_RECORD' ||
          caseType === 'CORRECTION_OTHER_UNDER_16' ||
          caseType === 'CORRECTION_OTHER_16_AND_ABOVE'
        ) {
          stateDutyBaseRate = D('0.10'); // 10% BHM (O‘RQ-600 Ilova 5(g)-band)
          stateDutyLegalCitation = 'O‘RQ-600 Ilova 5(g)-band (Yozuvni tuzatish/tiklash davlat boji — 10% BHM)';
        } else {
          // All other birth cases (FIRST, SINGLE_MOTHER, LATE, PATERNITY, ADOPTION, ARCHIVE, FHDY_ERROR, FOREIGN)
          stateDutyBaseRate = D(0);
          stateDutyExempt = true;
          if (caseType === 'CORRECTION_FHDY_ERROR') {
            stateDutyExemptionReason = 'O‘RQ-600 12-modda 2-band (FHDYo organi xatosi sababli tuzatishda davlat boji to‘liq ozod)';
          } else if (caseType === 'SINGLE_MOTHER') {
            stateDutyExemptionReason = 'O‘RQ-600 12-modda 2-band (Yolg‘iz ona arizasiga ko‘ra davlat bojidan to‘liq ozod)';
          } else {
            stateDutyExemptionReason = 'O‘RQ-600 12-modda 2-band (Tug‘ilish qayd etilganligi uchun davlat boji undirilmaydi)';
          }
        }

        // Apply channel / social discount to state duty
        let stateDutyMultiplier = stateDutyBaseRate;
        let stateDutyDiscountNote = '';
        if (!stateDutyExempt && !stateDutyBaseRate.isZero()) {
          if (hasSocialDiscount) {
            stateDutyMultiplier = stateDutyBaseRate.mul(D('0.50'));
            stateDutyDiscountNote = '50% ijtimoiy chegirma qo‘llanildi (O‘RQ-600 22²-modda)';
          } else if (isOnline) {
            stateDutyMultiplier = stateDutyBaseRate.mul(D('0.90'));
            stateDutyDiscountNote = 'YIDXP 90% qoidasi qo‘llanildi (O‘RQ-600 22¹-modda)';
          }
        }
        const stateDutyAmount = bhmDecimal.mul(stateDutyMultiplier);

        // 2. EMBLEM_FEE (Gerb yig‘imi) Resolution
        let emblemFeeBaseRate = D('0.15'); // Standard 15% BHM (VMQ 550 3-band)
        let emblemFeeLegalCitation = 'VMQ 550-son qaror 3-band (Gerb yig‘imi — 15% BHM)';
        let emblemFeeLegalUrl = 'https://lex.uz/uz/docs/-6638940';
        let emblemFeeExempt = false;
        let emblemFeeExemptionReason = '';

        if (caseType === 'ARCHIVE_DUPLICATION_REISSUE') {
          emblemFeeBaseRate = D(0);
          emblemFeeExempt = true;
          emblemFeeExemptionReason = 'VMQ 550 3-band 4-xatboshi (Arxiv raqamlashtirishda takrorlangan seriya/raqamni almashtirish bepul)';
        } else if (isOrphan) {
          emblemFeeBaseRate = D(0);
          emblemFeeExempt = true;
          emblemFeeExemptionReason = 'VMQ 550 3-band 2-xatboshi (Yetim bolalar uchun gerb yig‘imidan ozod)';
        } else if (isDisaster) {
          emblemFeeBaseRate = D(0);
          emblemFeeExempt = true;
          emblemFeeExemptionReason = 'VMQ 550 3-band 2-xatboshi (Favqulodda ofat jabrlanuvchilariga takroriy guvohnoma gerb yig‘imidan ozod)';
        }

        let emblemFeeMultiplier = emblemFeeBaseRate;
        let emblemDiscountNote = '';
        if (!emblemFeeExempt && !emblemFeeBaseRate.isZero()) {
          if (hasSocialDiscount) {
            emblemFeeMultiplier = emblemFeeBaseRate.mul(D('0.50'));
            emblemDiscountNote = '50% ijtimoiy chegirma qo‘llanildi (O‘RQ-600 22²-modda)';
          } else if (isOnline) {
            emblemFeeMultiplier = emblemFeeBaseRate.mul(D('0.90')); // 0.15 * 0.9 = 0.135 BHM
            emblemDiscountNote = 'YIDXP 90% qoidasi qo‘llanildi (VMQ 550 3-band 3-xatboshi)';
          }
        }
        const emblemFeeAmount = bhmDecimal.mul(emblemFeeMultiplier);

        // 3. SERVICE_FEE (Pullik xizmat) Resolution
        let serviceFeeBaseRate = D(0);
        let serviceFeeLegalCitation = 'Adliya vazirligi e-FHDYO To‘lovlar Jadvali';
        let serviceFeeLegalUrl = 'https://www.e-fhdyo.uz/Payment/index';
        let serviceFeeTitle = 'FHDYO pullik xizmati';

        if (isOnline) {
          // On YIDXP, portal does NOT charge the FHDYO counter service fee
          serviceFeeBaseRate = D(0);
        } else {
          // Offline in-person application at FHDYO department
          switch (caseType) {
            case 'SINGLE_MOTHER':
              serviceFeeBaseRate = D('0.05'); // 5% BHM (e-FHDYO jadvali I.2-band)
              serviceFeeTitle = 'FHDYO arizani ko‘rib chiqish xizmat haqi (5% BHM)';
              break;
            case 'LATE_OR_SPECIAL':
              serviceFeeBaseRate = D('0.05'); // 5% BHM (e-FHDYO jadvali I.3-band)
              serviceFeeTitle = 'FHDYO arizani ko‘rib chiqish xizmat haqi (5% BHM)';
              break;
            case 'PATERNITY_ESTABLISHMENT':
              serviceFeeBaseRate = D('0.50'); // 50% BHM (e-FHDYO jadvali I.4-band)
              serviceFeeTitle = 'FHDYO otalikni belgilash xizmat haqi (50% BHM)';
              break;
            case 'DUPLICATE_CERTIFICATE':
              serviceFeeBaseRate = D('0.10'); // 10% BHM (e-FHDYO jadvali XI.1-band)
              serviceFeeTitle = 'Takroriy guvohnoma berish bo‘yicha FHDYO xizmati (10% BHM)';
              break;
            case 'RESTORATION_OF_RECORD':
              serviceFeeBaseRate = D('0.20'); // 20% BHM (e-FHDYO jadvali V.1-band)
              serviceFeeTitle = 'Dalolatnoma yozuvini tiklash xizmati (20% BHM)';
              break;
            case 'CORRECTION_OTHER_UNDER_16':
              serviceFeeBaseRate = D('0.10'); // 10% BHM (e-FHDYO jadvali VI.1-band)
              serviceFeeTitle = 'Dalolatnoma yozuvini tuzatish xizmati (16 yoshgacha, 10% BHM)';
              break;
            case 'CORRECTION_OTHER_16_AND_ABOVE':
              serviceFeeBaseRate = D('0.20'); // 20% BHM (e-FHDYO jadvali VI.2-band)
              serviceFeeTitle = 'Dalolatnoma yozuvini tuzatish xizmati (16 yoshdan katta, 20% BHM)';
              break;
            case 'FOREIGN_CERTIFICATE':
              serviceFeeBaseRate = D('0.20'); // 20% BHM (e-FHDYO jadvali XII.1-band)
              serviceFeeTitle = 'Chet el guvohnomasini ro‘yxatga olish xizmati (20% BHM)';
              break;
            default:
              serviceFeeBaseRate = D(0);
          }
        }

        const serviceFeeMultiplier = hasSocialDiscount
          ? serviceFeeBaseRate.mul(D('0.50'))
          : serviceFeeBaseRate;
        const serviceFeeAmount = bhmDecimal.mul(serviceFeeMultiplier);

        // 4. DELIVERY_FEE (Pochta xizmati) Resolution
        const hasPostalDelivery = deliveryOption === 'postal';

        // Total Amount
        const totalAmount = stateDutyAmount.add(emblemFeeAmount).add(serviceFeeAmount);

        // Assemble breakdown items
        const items: CalculationBreakdownItem[] = [];
        let sortIdx = 1;

        // Breakdown Item 1: State Duty
        items.push({
          id: 'item-state-duty',
          titleUz: 'Davlat boji',
          descriptionUz: stateDutyExempt
            ? stateDutyExemptionReason
            : stateDutyDiscountNote || `BHMning ${stateDutyMultiplier.mul(100).toString()}% miqdorida`,
          paymentType: 'STATE_DUTY',
          feeCategory: 'state_duty',
          baseRateAmount: bhmDecimal.toFixed(2),
          multiplier: stateDutyMultiplier.toFixed(4),
          itemTotal: stateDutyExempt ? zeroMoney('UZS', '0 so‘m (Ozod)') : toMoney(stateDutyAmount),
          discountAppliedPercent: hasSocialDiscount ? '50%' : isOnline && !stateDutyBaseRate.isZero() ? '10%' : undefined,
          isExempt: stateDutyExempt,
          legalCitation: stateDutyLegalCitation,
          legalUrl: stateDutyLegalUrl,
          sortOrder: sortIdx++,
        });

        // Breakdown Item 2: Emblem Fee
        items.push({
          id: 'item-emblem-fee',
          titleUz: 'Gerb yig‘imi',
          descriptionUz: emblemFeeExempt
            ? emblemFeeExemptionReason
            : emblemDiscountNote || `BHMning ${emblemFeeMultiplier.mul(100).toString()}% miqdorida`,
          paymentType: 'EMBLEM_FEE',
          feeCategory: 'emblem_fee',
          baseRateAmount: bhmDecimal.toFixed(2),
          multiplier: emblemFeeMultiplier.toFixed(4),
          itemTotal: emblemFeeExempt ? zeroMoney('UZS', '0 so‘m (Ozod)') : toMoney(emblemFeeAmount),
          discountAppliedPercent: hasSocialDiscount ? '50%' : isOnline && !emblemFeeBaseRate.isZero() ? '10%' : undefined,
          isExempt: emblemFeeExempt,
          legalCitation: emblemFeeLegalCitation,
          legalUrl: emblemFeeLegalUrl,
          sortOrder: sortIdx++,
        });

        // Breakdown Item 3: Service Fee (if applicable or offline)
        if (!serviceFeeBaseRate.isZero() || !isOnline) {
          items.push({
            id: 'item-service-fee',
            titleUz: serviceFeeTitle,
            descriptionUz: serviceFeeBaseRate.isZero()
              ? 'Ushbu holatda FHDYO pullik xizmati olinmaydi'
              : hasSocialDiscount
              ? 'FHDYO bo‘limida ko‘rsatiladigan xizmat (50% chegirma bilan)'
              : 'FHDYO bo‘limida ko‘rsatiladigan xizmat haqi',
            paymentType: 'SERVICE_FEE',
            feeCategory: 'service_fee',
            baseRateAmount: bhmDecimal.toFixed(2),
            multiplier: serviceFeeMultiplier.toFixed(4),
            itemTotal: serviceFeeBaseRate.isZero() ? zeroMoney('UZS', '0 so‘m') : toMoney(serviceFeeAmount),
            discountAppliedPercent: hasSocialDiscount ? '50%' : undefined,
            isExempt: serviceFeeBaseRate.isZero(),
            legalCitation: serviceFeeLegalCitation,
            legalUrl: serviceFeeLegalUrl,
            sortOrder: sortIdx++,
          });
        }

        // Breakdown Item 4: Delivery Fee (if requested)
        if (hasPostalDelivery) {
          items.push({
            id: 'item-postal-delivery',
            titleUz: 'Pochta orqali yetkazib berish xizmati',
            descriptionUz: 'Yetkazib berish xarajati pochta xizmati tarifiga ko‘ra alohida hisoblanadi.',
            paymentType: 'DELIVERY_FEE',
            feeCategory: 'delivery_fee',
            baseRateAmount: '—',
            multiplier: '—',
            itemTotal: zeroMoney('UZS', 'Alohida hisoblanadi'),
            legalCitation: 'VMQ 550-son qaror 4-ilova (Kompleks xizmatlar ko‘rsatish reglamenti)',
            legalUrl: 'https://lex.uz/uz/docs/-6638940',
            sortOrder: sortIdx++,
          });
        }

        // Notes and explanations
        const notesUz: string[] = [
          `Hisobda qo‘llangan BHM: ${bhmDecimal.toString()} so‘m. Stavka va amal qilish sanasini rasmiy manbadan tekshiring.`,
        ];

        if (isOnline) {
          notesUz.push(hasSocialDiscount ? 'Onlayn va ijtimoiy chegirma kesishuvi tekshirilishi kerak; bu hisobda faqat 50% ijtimoiy chegirma qo‘llangan.' : 'YIDXP (my.gov.uz) uchun bazaviy stavkaning 90 foizi hisoblandi (10% chegirma).');
        } else {
          notesUz.push('FHDYO bo‘limiga bevosita murojaat qilingani sababli stavkalar 100% miqdorida hisoblandi.');
        }

        if (hasSocialDiscount) {
          notesUz.push('Ijtimoiy himoya reyestri / nogironlik bo‘yicha 50% chegirma hisobga olindi (O‘RQ-600 22²-modda).');
          if (isOnline) {
            notesUz.push(
              'DIQQAT: YIDXP (90%) va Ijtimoiy (50%) chegirmalari kesishuvida 50% ijtimoiy imtiyoz stavkasi qo‘llanildi (STATUS: NEEDS_HUMAN_REVIEW).'
            );
          }
        }

        if (hasPostalDelivery) {
          notesUz.push('Yetkazib berish xarajati pochta xizmati tarifiga ko‘ra alohida hisoblanadi.');
        }

        // Formula Summary
        let formulaSummary = '';
        if (totalAmount.isZero()) {
          formulaSummary = '0 so‘m (To‘liq ozod qilingan)';
        } else {
          const parts: string[] = [];
          if (!stateDutyAmount.isZero()) {
            parts.push(`Davlat boji: ${stateDutyAmount.toString()} so‘m (${bhmDecimal.toString()} × ${stateDutyMultiplier.toString()})`);
          }
          if (!emblemFeeAmount.isZero()) {
            parts.push(`Gerb yig‘imi: ${emblemFeeAmount.toString()} so‘m (${bhmDecimal.toString()} × ${emblemFeeMultiplier.toString()})`);
          }
          if (!serviceFeeAmount.isZero()) {
            parts.push(`Pullik xizmat: ${serviceFeeAmount.toString()} so‘m (${bhmDecimal.toString()} × ${serviceFeeMultiplier.toString()})`);
          }
          formulaSummary = parts.join(' + ') + ` = ${totalAmount.toString()} so‘m`;
          if (hasPostalDelivery) {
            formulaSummary += ' (Yetkazib berish alohida)';
          }
        }

        const isFullyExempt = totalAmount.isZero();
        let exemptionReasonUz: string | undefined;
        if (isFullyExempt) {
          if (caseType === 'ARCHIVE_DUPLICATION_REISSUE') {
            exemptionReasonUz = 'VMQ 550 3-band (Arxiv raqamlashtirishda takrorlangan seriya/raqamni qayta berish bepul)';
          } else if (isOrphan) {
            exemptionReasonUz = 'Yetim bolalar va ota-ona qaramog‘idan mahrum bo‘lgan bolalar uchun to‘lovlardan to‘liq ozod (O‘RQ-600 12-modda, VMQ 550 3-band)';
          } else if (isDisaster) {
            exemptionReasonUz = 'Tabiiy yoki texnogen ofat (yong‘in va h.k.) jabrlanuvchilariga takroriy guvohnoma to‘liq bepul beriladi (O‘RQ-600 12-modda 5-band, VMQ 550 3-band)';
          } else {
            exemptionReasonUz = 'Qonunchilikka muvofiq to‘liq ozod qilingan';
          }
        }

        return {
          totalAmount,
          formulaSummary,
          items,
          isExempt: isFullyExempt,
          exemptionReasonUz,
          verificationStatus: hasSocialDiscount && isOnline ? 'NEEDS_HUMAN_REVIEW' : 'VERIFIED',
          notesUz,
        };
      },
    },
  ],
};
