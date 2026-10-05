'use client';

import React, { useEffect, useState } from 'react';
import { readSharedCalculation } from '@/lib/shared-calculation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Gov001InputSchema, Gov001Input } from '@govcalc/validation';
import { CalculationResult, CalculatorInputField } from '@govcalc/types';
import { executeCalculation } from '@/lib/api';


import { ResultBreakdown } from './result-breakdown';
import { SavedResultsModal } from './saved-results-modal';
import { ArrowRight, AlertCircle, Info, Sparkles, Building2, Globe, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalculatorFormProps {
  slug: string;
  fields?: CalculatorInputField[];
  calculatorTitle?: string;
}

const CASE_OPTIONS = [
  {
    value: 'FIRST_CERTIFICATE',
    title: 'Guvohnomani birinchi marta olish',
    desc: 'Bola tug‘ilgandan so‘ng birinchi marta ro‘yxatdan o‘tkazish (Davlat boji olinmaydi, faqat gerb yig‘imi)',
    badge: 'Eng ko‘p uchraydigan',
  },
  {
    value: 'SINGLE_MOTHER',
    title: 'Yolg‘iz ona arizasi asosida',
    desc: 'Ona arizasiga ko‘ra bola tug‘ilishini ro‘yxatga olish (to‘lov qismlari alohida ko‘rsatiladi)',
  },
  {
    value: 'DUPLICATE_CERTIFICATE',
    title: 'Takroriy guvohnoma (dublikat) olish',
    desc: 'Yo‘qolgan, yaroqsiz bo‘lgan yoki qo‘shimcha nusxa olish uchun ariza (Davlat boji 15% BHM + Gerb yig‘imi 15% BHM)',
  },
  {
    value: 'PATERNITY_ESTABLISHMENT',
    title: 'Otalikni belgilash bilan birga',
    desc: 'Otalikni belgilash dalolatnomasini qayd etish bilan guvohnoma berish',
  },
  {
    value: 'ADOPTION',
    title: 'Farzandlikka olish holatida',
    desc: 'Farzandlikka olish dalolatnomasini qayd etish bilan guvohnoma berish',
  },
  {
    value: 'RESTORATION_OF_RECORD',
    title: 'Tug‘ilganlik dalolatnoma yozuvini tiklash',
    desc: 'Tug‘ilganlik yozuvi yo‘qolgan yoki topilmaganda tiklash (Davlat boji 10% BHM + Gerb yig‘imi)',
  },
  {
    value: 'CORRECTION_FHDY_ERROR',
    title: 'FHDYo xatosi sababli tuzatish / almashtirish',
    desc: 'FHDYo organi xatosini tuzatish: boj, xizmat haqi va gerb yig‘imi alohida hisoblanadi',
    badge: '100% Bepul',
  },
  {
    value: 'CORRECTION_OTHER_UNDER_16',
    title: 'O‘zgartirish kiritish (16 yoshgacha bolalar)',
    desc: 'Familiya, ism, ota ismi yoki boshqa ma’lumotlarni o‘zgartirish (Davlat boji 10% BHM + Gerb yig‘imi)',
  },
  {
    value: 'CORRECTION_OTHER_16_AND_ABOVE',
    title: 'O‘zgartirish kiritish (16 yosh va undan kattalar)',
    desc: '16 yoshga to‘lgandan so‘ng o‘zgartirish kiritish (Davlat boji 10% BHM + Gerb yig‘imi)',
  },
  {
    value: 'ARCHIVE_DUPLICATION_REISSUE',
    title: 'Arxivda seriya/raqam takrorlanganligi sababli qayta berish',
    desc: 'Raqamlashtirish jarayonida takrorlangan guvohnomalarni almashtirish (100% BEPUL)',
    badge: '100% Bepul',
  },
  {
    value: 'FOREIGN_CERTIFICATE',
    title: 'Chet elda tug‘ilgan bolaga guvohnoma olish',
    desc: 'Chet davlatda tug‘ilgan O‘zbekiston fuqarosi bo‘lgan bolani FHDYo da ro‘yxatga olish',
  },
  {
    value: 'LATE_OR_SPECIAL',
    title: 'Kechikib (1 oydan so‘ng) ro‘yxatdan o‘tkazish',
    desc: 'Bola tug‘ilgandan 1 oy o‘tib ariza berilganda (Davlat boji olinmaydi, faqat gerb yig‘imi)',
  },
];

export function CalculatorForm({ slug, fields, calculatorTitle }: CalculatorFormProps) {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [lastInputs, setLastInputs] = useState<Gov001Input | null>(null);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Gov001Input>({
    resolver: zodResolver(Gov001InputSchema),
    defaultValues: {
      caseType: 'FIRST_CERTIFICATE',
      channel: 'ONLINE_YIDXP',
      specialExemption: 'none',
      socialDiscount: false,
      deliveryOption: 'none',
    },
  });

  const selectedChannel = watch('channel');
  useEffect(() => {
    const shared = readSharedCalculation(window.location.search);
    if (shared) reset(shared);
  }, [reset]);

  const onSubmit = async (data: Gov001Input) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const calcResult = await executeCalculation(slug, data as any);

      setLastInputs(data);
      setResult(calcResult);
    } catch (err: any) {
      setServerError(err.message || 'Hisoblash jarayonida kutilmagan xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecalculate = () => {
    setResult(null);
  };

  const handleSelectSavedResult = (savedResult: CalculationResult, savedInputs?: any) => {
    setResult(savedResult);
    if (savedInputs) {
      setLastInputs(savedInputs);
      reset(savedInputs);
    }
  };

  if (result) {
    return (
      <ResultBreakdown
        result={result}
        onRecalculate={handleRecalculate}
        inputs={lastInputs || undefined}
        calculatorTitle={calculatorTitle}
        onSelectSavedResult={handleSelectSavedResult}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Saved Results Modal */}
      <SavedResultsModal
        isOpen={showSavedModal}
        onClose={() => setShowSavedModal(false)}
        onSelectResult={handleSelectSavedResult}
      />

      <div className="bg-white rounded-3xl border border-brand-200 p-6 sm:p-8 shadow-subtle">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-100">
          <div className="text-xs font-semibold text-brand-600">
            To‘lov miqdorini hisoblash uchun ma’lumotlarni kiriting
          </div>
          <button
            type="button"
            onClick={() => setShowSavedModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-xl border border-brand-200 transition-colors"
            id="form-view-saved-btn"
          >
            <Bookmark className="w-3.5 h-3.5 text-brand-600" />
            <span>Saqlangan natijalar</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-700">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Xatolik:</div>
              <div>{serverError}</div>
            </div>
          </div>
        )}

        {/* Channel Selection (YIDXP Online vs Offline FHDYO) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-900 mb-2">
            Murojaat qilish usuli (Ariza topshirish joyi) <span className="text-red-500">*</span>
          </label>
          <Controller
            name="channel"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    field.value === 'ONLINE_YIDXP'
                      ? 'border-brand-900 bg-brand-50/70 ring-1 ring-brand-900 shadow-subtle'
                      : 'border-brand-200 hover:border-brand-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    id="channel-online-yidxp"
                    value="ONLINE_YIDXP"
                    checked={field.value === 'ONLINE_YIDXP'}
                    onChange={() => field.onChange('ONLINE_YIDXP')}
                    className="mt-1 h-4 w-4 text-brand-900 focus:ring-brand-900 border-brand-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-brand-900 text-xs sm:text-sm">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span>YIDXP (my.gov.uz) orqali onlayn</span>
                    </div>
                    <p className="text-[11px] text-brand-600 mt-1 leading-relaxed">
                      O‘RQ-600 22¹-modda va VMQ-550 bo‘yicha <strong>10% chegirma</strong> qo‘llanadi.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    field.value === 'OFFLINE_FHDYO'
                      ? 'border-brand-900 bg-brand-50/70 ring-1 ring-brand-900 shadow-subtle'
                      : 'border-brand-200 hover:border-brand-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    id="channel-offline-fhdyo"
                    value="OFFLINE_FHDYO"
                    checked={field.value === 'OFFLINE_FHDYO'}
                    onChange={() => field.onChange('OFFLINE_FHDYO')}
                    className="mt-1 h-4 w-4 text-brand-900 focus:ring-brand-900 border-brand-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-brand-900 text-xs sm:text-sm">
                      <Building2 className="w-4 h-4 text-brand-600" />
                      <span>FHDYo bo‘limiga borgan holda</span>
                    </div>
                    <p className="text-[11px] text-brand-600 mt-1 leading-relaxed">
                      Bo‘limda qabul qilinadi. Chegirmasiz to‘liq stavka va e-FHDYo xizmat tarifi.
                    </p>
                  </div>
                </label>
              </div>
            )}
          />
        </div>

        {/* Main Case Selection Question */}
        <div>
          <label className="block text-sm font-bold text-brand-900 mb-1">
            Guvohnoma bilan bog‘liq vaziyatni tanlang <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-brand-500 mb-3">
            O‘zingizga mos huquqiy holatni belgilang:
          </p>

          <Controller
            name="caseType"
            control={control}
            render={({ field }) => (
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {CASE_OPTIONS.map((option) => {
                  const isSelected = field.value === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex items-start justify-between p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-900 bg-brand-50/70 ring-1 ring-brand-900 shadow-subtle'
                          : 'border-brand-200 hover:border-brand-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="caseTypeRadio"
                          value={option.value}
                          checked={isSelected}
                          onChange={() => field.onChange(option.value)}
                          className="mt-1 h-4 w-4 text-brand-900 focus:ring-brand-900 border-brand-300"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-brand-900">
                              {option.title}
                            </span>
                            {option.badge && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                {option.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-brand-600 mt-0.5 leading-relaxed">
                            {option.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          />
          {errors.caseType && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.caseType.message}
            </p>
          )}
        </div>

        {/* Special Exemption (Orphan / Disaster / State ward) */}
        <div className="pt-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-900 mb-1.5">
            Maxsus imtiyoz mavjudmi?
          </label>
          <Controller
            name="specialExemption"
            control={control}
            render={({ field }) => (
              <select
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-brand-300 bg-white text-brand-900 focus:outline-none focus:ring-1 focus:ring-brand-900"
              >
                <option value="none">Yo‘q, maxsus imtiyoz mavjud emas</option>
                <option value="orphan">
                  To‘liq davlat ta’minotidagi shaxs / Yetim bola (Boj va yig‘imlardan to‘liq ozod)
                </option>
                <option value="natural_disaster">
                  Tabiiy yoki texnogen ofat oqibatida yo‘qotilgan (Davlat bojidan ozod)
                </option>
                <option value="rehabilitation">
                  Qayta reabilitatsiya qilingan yoki oqlangan shaxs
                </option>
              </select>
            )}
          />
        </div>

        {/* Delivery Option */}
        <div className="pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-900 mb-2">
            Guvohnomani olish usuli
          </label>
          <Controller
            name="deliveryOption"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    value: 'none',
                    title: 'O‘zi borib olish',
                    desc: 'FHDYo bo‘limidan bevosita qabul qilish',
                  },
                  {
                    value: 'postal',
                    title: 'Pochta orqali yetkazish',
                    desc: 'O‘zbekiston pochtasi orqali manzilga yetkaziladi',
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      field.value === option.value
                        ? 'border-brand-900 bg-brand-50/70 ring-1 ring-brand-900'
                        : 'border-brand-200 hover:border-brand-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        id={`delivery-opt-${option.value}`}
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                        className="h-4 w-4 text-brand-900 focus:ring-brand-900 border-brand-300"
                      />
                      <div>
                        <div className="text-xs font-bold text-brand-900">{option.title}</div>
                        <div className="text-[11px] text-brand-500">{option.desc}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          />
        </div>

        {/* Social Discount Checkbox (O‘RQ-600 22²-modda) */}
        <div className="pt-2 border-t border-brand-100">
          <Controller
            name="socialDiscount"
            control={control}
            render={({ field }) => (
              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-brand-200 bg-brand-50/50 hover:bg-brand-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  id="socialDiscount-checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-brand-300 text-brand-900 focus:ring-brand-900"
                />
                <div>
                  <div className="text-xs font-bold text-brand-900">
                    «Ijtimoiy himoya yagona reyestri»da ro‘yxatga olingan yoki I va II guruh nogironligi mavjud (50% chegirma)
                  </div>
                  <div className="text-[11px] text-brand-600 mt-0.5 leading-relaxed">
                    O‘zbekiston Respublikasining «Davlat boji to‘g‘risida»gi Qonuni 22²-moddasiga ko‘ra, davlat bojidan 50 foiz miqdorida chegirma qo‘llaniladi.
                  </div>
                </div>
              </label>
            )}
          />
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <Button
            type="submit"
            id="calculate-submit-btn"
            isLoading={isSubmitting}
            className="w-full py-3.5 text-sm gap-2"
          >
            <span>To‘lovni hisoblash</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
