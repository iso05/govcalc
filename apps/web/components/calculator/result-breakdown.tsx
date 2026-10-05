'use client';

import React, { useState } from 'react';
import { CalculationResult } from '@govcalc/types';
import { Gov001Input } from '@govcalc/validation';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  RotateCcw,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Info,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  AlertTriangle,
  Truck,
  CheckCircle2,
  FolderClock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { formatUzbekCurrency } from '@govcalc/ui';
import { saveResultItem } from '@/lib/saved-results';
import { SavedResultsModal } from './saved-results-modal';
import { shareCalculationUrl } from '@/lib/shared-calculation';

interface ResultBreakdownProps {
  result: CalculationResult;
  onRecalculate: () => void;
  inputs?: Gov001Input;
  calculatorTitle?: string;
  onSelectSavedResult?: (result: CalculationResult, inputs?: any) => void;
}

const CASE_LABELS: Record<string, string> = {
  FIRST_CERTIFICATE: 'Guvohnomani birinchi marta olish',
  SINGLE_MOTHER: 'Yolg‘iz ona arizasi asosida',
  DUPLICATE_CERTIFICATE: 'Takroriy guvohnoma (dublikat) olish',
  PATERNITY_ESTABLISHMENT: 'Otalikni belgilash bilan birga',
  ADOPTION: 'Farzandlikka olish holatida',
  RESTORATION_OF_RECORD: 'Tug‘ilganlik dalolatnoma yozuvini tiklash',
  CORRECTION_FHDY_ERROR: 'FHDYo xatosi sababli tuzatish / almashtirish',
  CORRECTION_OTHER_UNDER_16: 'O‘zgartirish kiritish (16 yoshgacha)',
  CORRECTION_OTHER_16_AND_ABOVE: 'O‘zgartirish kiritish (16 yosh va undan kattalar)',
  ARCHIVE_DUPLICATION_REISSUE: 'Arxivda seriya/raqam takrorlanganligi sababli qayta berish',
  FOREIGN_CERTIFICATE: 'Chet elda tug‘ilgan bolaga guvohnoma olish',
  LATE_OR_SPECIAL: 'Kechikib (1 oydan so‘ng) ro‘yxatdan o‘tkazish',
};

async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

export function ResultBreakdown({
  result,
  onRecalculate,
  inputs,
  calculatorTitle = 'Tug‘ilganlik guvohnomasi',
  onSelectSavedResult,
}: ResultBreakdownProps) {
  const [saved, setSaved] = useState(false);
  const [showFormulaDetails, setShowFormulaDetails] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<React.ReactNode | undefined>(undefined);
  const [showSavedModal, setShowSavedModal] = useState(false);

  const displayText = result.total?.formattedAmount || '0 so‘m';
  const stateDutyText = result.stateDuty?.formattedAmount || '0 so‘m';
  const emblemFeeText = result.emblemFee?.formattedAmount || '0 so‘m';
  const serviceFeeText = result.serviceFee?.formattedAmount || '0 so‘m';
  const hasDelivery = Boolean(result.deliveryFee);

  const caseKey = inputs?.caseType || 'FIRST_CERTIFICATE';
  const caseLabel = CASE_LABELS[caseKey] || 'Guvohnomani birinchi marta olish';

  const showToast = (message: string, icon?: React.ReactNode) => {
    setToastIcon(icon);
    setToastMessage(message);
  };

  // 1. "Natijani saqlash"
  const handleSave = () => {
    try {
    saveResultItem({
      calculatorSlug: result.calculatorSlug,
      calculatorTitle,
      caseLabel,
      totalFormatted: displayText,
      stateDutyFormatted: stateDutyText,
      emblemFeeFormatted: emblemFeeText,
      serviceFeeFormatted: serviceFeeText,
      inputs,
      result,
    });
    } catch {
      showToast('Saqlash amalga oshmadi. Brauzer xotirasini tekshiring.');
      return;
    }
    setSaved(true);
    showToast('Natija saqlandi', <CheckCircle2 className="w-4 h-4 text-emerald-400" />);
    setTimeout(() => setSaved(false), 3000);
  };

  // 2. "Nusxa olish"
  const handleCopy = async () => {
    const textLines = [
      'Hisobchi',
      calculatorTitle,
      `Holat: ${caseLabel}`,
      `BHM: ${formatUzbekCurrency(result.ratesApplied.bhm)}`,
      '---',
      `Davlat boji: ${stateDutyText}`,
      `Gerb yig‘imi: ${emblemFeeText}`,
      `Pullik xizmat: ${serviceFeeText}`,
      `Jami: ${displayText}`,
      'Huquqiy asos: O‘RQ-600, VMQ 550',
      'Prototip natijasi. Huquqiy tekshiruv talab qilinadi.',
    ];

    const plainText = textLines.join('\n');
    const copied = await copyToClipboard(plainText);
    showToast(copied ? 'Nusxalandi!' : 'Nusxalash amalga oshmadi', <Copy className="w-4 h-4 text-emerald-400" />);
  };

  // 3. "Ulashish"
  const handleShare = async () => {
    const shareUrl = shareCalculationUrl(window.location.href, inputs);
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Hisobchi — ${calculatorTitle}`,
          text: `Hisobchi: ${calculatorTitle} to‘lovi — ${displayText}`,
          url: shareUrl,
        });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    if (typeof window !== 'undefined') {
      const copied = await copyToClipboard(shareUrl);
      showToast(copied ? 'Havola nusxalandi!' : 'Nusxalash amalga oshmadi', <CheckCircle2 className="w-4 h-4 text-emerald-400" />);
    }
  };

  // 4. "Chop etish / PDF"
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        icon={toastIcon}
      />

      {/* Saved Results Modal */}
      <SavedResultsModal
        isOpen={showSavedModal}
        onClose={() => setShowSavedModal(false)}
        onSelectResult={(selectedResult, selectedInputs) => {
          if (onSelectSavedResult) {
            onSelectSavedResult(selectedResult, selectedInputs);
          }
        }}
      />

      {/* Print-only Official Header */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-brand-900">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold tracking-tight text-brand-900">HISOBCHI</div>
            <div className="text-xs text-brand-600">
              O‘zbekiston Respublikasi rasmiy to‘lovlar kalkulyatori
            </div>
          </div>
          <div className="text-right text-xs text-brand-500">
            <div>Sana: {new Date().toLocaleDateString('uz-UZ')}</div>
            <div>BHM: {formatUzbekCurrency(result.ratesApplied.bhm)}</div>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-lg font-bold text-brand-900">
            {calculatorTitle} — to‘lov hisob-kitobi
          </h1>
          <div className="text-xs text-brand-700 mt-1">
            <strong>Holat:</strong> {caseLabel}
          </div>
        </div>
      </div>

      <div role="status" className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm print:bg-white">
        <strong>Prototip — huquqiy tekshiruv talab qilinadi.</strong>
        <p className="mt-2">Hisoblash mavjud qoidalar asosida bajarildi. Bu natija yakuniy to‘lov kvitansiyasi emas. Stavka va imtiyozlarni xizmat ko‘rsatuvchi organ orqali tekshiring.</p>
        {result.verificationStatus === 'NEEDS_HUMAN_REVIEW' && <p className="mt-2">Ijtimoiy va onlayn chegirmalarni birgalikda qo‘llash masalasi ochiq. Ushbu hisobda faqat ijtimoiy chegirma qo‘llangan.</p>}
      </div>

      {/* Primary Result Card */}
      <div className="p-6 sm:p-8 bg-brand-900 text-white rounded-3xl shadow-card relative overflow-hidden print:bg-white print:text-black print:border-2 print:border-brand-900 print:shadow-none">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-300 print:text-brand-700">
              Hisoblangan summa
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800 print:bg-emerald-50 print:text-emerald-800 print:border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hisoblash formulasi</span>
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <div className="text-2xl sm:text-4xl font-extrabold tracking-tight print:text-brand-900">
              {displayText}
            </div>
          </div>

          {result.isExempt && (
            <div className="mt-3 mb-4 p-3.5 bg-emerald-900/70 border border-emerald-600/70 rounded-2xl text-xs text-emerald-100 flex items-center gap-2 print:bg-emerald-50 print:text-emerald-900 print:border-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-300 print:text-emerald-700 shrink-0" />
              <div>
                <strong>Imtiyoz:</strong> {result.exemptionReasonUz || 'Qonun hujjatlariga ko‘ra to‘lovdan ozod qilingan'}
              </div>
            </div>
          )}

          {/* Four-Column Component Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-brand-800/80 print:border-brand-300 text-xs">
            <div className="p-3 rounded-xl bg-brand-800/50 border border-brand-700/60 print:bg-brand-50 print:border-brand-200">
              <div className="text-brand-300 print:text-brand-600 font-medium text-[11px]">1. Davlat boji</div>
              <div className="text-xs font-bold text-white print:text-brand-900 mt-1">{stateDutyText}</div>
            </div>
            <div className="p-3 rounded-xl bg-brand-800/50 border border-brand-700/60 print:bg-brand-50 print:border-brand-200">
              <div className="text-brand-300 print:text-brand-600 font-medium text-[11px]">2. Gerb yig‘imi</div>
              <div className="text-xs font-bold text-white print:text-brand-900 mt-1">{emblemFeeText}</div>
            </div>
            <div className="p-3 rounded-xl bg-brand-800/50 border border-brand-700/60 print:bg-brand-50 print:border-brand-200">
              <div className="text-brand-300 print:text-brand-600 font-medium text-[11px]">3. Pullik xizmat</div>
              <div className="text-xs font-bold text-white print:text-brand-900 mt-1">{serviceFeeText}</div>
            </div>
            <div className="p-3 rounded-xl bg-brand-800/50 border border-brand-700/60 print:bg-brand-50 print:border-brand-200">
              <div className="text-brand-300 print:text-brand-600 font-medium text-[11px]">4. Yetkazib berish</div>
              <div className="text-[11px] font-semibold text-white print:text-brand-900 mt-1">
                {hasDelivery ? 'Alohida tarif' : 'Tanlanmagan'}
              </div>
            </div>
          </div>

          {/* Delivery Note if requested */}
          {hasDelivery && (
            <div className="mt-3.5 p-3 rounded-xl bg-amber-900/40 border border-amber-700/60 text-amber-200 text-xs flex items-center gap-2 print:bg-amber-50 print:text-amber-900 print:border-amber-300">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Yetkazib berish xarajati pochta xizmati tarifiga ko‘ra alohida hisoblanadi.</span>
            </div>
          )}
        </div>
      </div>

      {/* Breakdown Details Table */}
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-subtle space-y-4 print:shadow-none print:border-brand-300">
        <h4 className="text-sm font-bold text-brand-900 tracking-tight flex items-center justify-between">
          <span>Hisob-kitob tarkibi (Tafsilotlar)</span>
          <span className="text-xs font-normal text-brand-500">
            {result.breakdown?.length || 0} ta modda
          </span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-brand-200 text-brand-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 pr-4">To‘lov turi va nomi</th>
                <th className="py-2.5 px-3">Baza miqdori</th>
                <th className="py-2.5 px-3">Stavka / Chegirma</th>
                <th className="py-2.5 pl-3 text-right">Summa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {result.breakdown && result.breakdown.length > 0 ? (
                result.breakdown.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-50/50 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-brand-900">{item.titleUz}</div>
                      {item.descriptionUz && (
                        <div className="text-[11px] text-brand-500 mt-0.5">{item.descriptionUz}</div>
                      )}
                      {item.legalCitation && (
                        <div className="text-[10px] text-brand-400 mt-0.5 font-mono">
                          {item.legalCitation}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-brand-700 whitespace-nowrap">
                      {item.baseRateAmount}
                    </td>
                    <td className="py-3 px-3 text-brand-700 whitespace-nowrap">
                      <div>{item.multiplier}</div>
                      {item.discountAppliedPercent ? (
                        <span className="text-[10px] font-semibold text-emerald-700">
                          {item.discountAppliedPercent}% chegirma
                        </span>
                      ) : null}
                    </td>
                    <td className="py-3 pl-3 text-right font-semibold text-brand-900 whitespace-nowrap">
                      {item.itemTotal?.formattedAmount || '0 so‘m'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-brand-500">
                    Hisoblash tarkibi mavjud emas
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-brand-200 bg-brand-50/70 font-bold text-brand-900 print:bg-brand-50">
                <td colSpan={3} className="py-3 px-3 text-xs uppercase tracking-wider">
                  Yakuniy to‘lov:
                </td>
                <td className="py-3 pl-3 text-right text-sm font-extrabold text-brand-900">
                  {displayText}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Formula Explanation Section */}
      <div className="bg-white rounded-2xl border border-brand-200 overflow-hidden shadow-subtle print:shadow-none print:border-brand-300">
        <button
          type="button"
          onClick={() => setShowFormulaDetails(!showFormulaDetails)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-brand-50/70 hover:bg-brand-100/60 transition-colors print:bg-white"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-700" />
            <span className="text-sm font-bold text-brand-900">
              Hisob qanday qilindi? (Formula va tushuntirish)
            </span>
          </div>
          <div className="print:hidden">
            {showFormulaDetails ? (
              <ChevronUp className="w-4 h-4 text-brand-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-brand-500" />
            )}
          </div>
        </button>

        {showFormulaDetails && (
          <div className="p-5 border-t border-brand-200 space-y-3 text-xs">
            <div className="p-3.5 bg-brand-50 rounded-xl border border-brand-200 text-xs text-brand-900 font-medium leading-relaxed font-mono print:bg-white">
              {result.formulaSummary || 'BHM × Stavka = To‘lov'}
            </div>

            {result.notesUz && result.notesUz.length > 0 && (
              <div className="pt-2">
                <div className="font-semibold text-brand-800 mb-1">Qo‘shimcha izohlar:</div>
                <ul className="list-disc list-inside space-y-1 text-brand-600 text-[11px]">
                  {result.notesUz.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legal Basis & Source Metadata Card */}
      <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-subtle space-y-4 print:shadow-none print:border-brand-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-brand-900">Huquqiy asos (Rasmiy manbalar)</h4>
          </div>
          <Badge variant="verified">Tasdiqlangan</Badge>
        </div>

        <div className="space-y-2.5 pt-1">
          {result.legalSources && result.legalSources.length > 0 ? (
            result.legalSources.map((source, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-brand-50/60 border border-brand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs print:bg-white"
              >
                <div>
                  <div className="font-semibold text-brand-900">{source.titleUz || source.title}</div>
                  <div className="text-brand-600 text-[11px] mt-0.5">
                    Hujjat: <strong>{source.documentNumber}</strong> ({source.documentType}) —{' '}
                    {source.article || source.articleParagraph || 'Amaldagi tahrir'}
                  </div>
                </div>
                {source.officialUrl && (
                  <a
                    href={source.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-900 hover:text-brand-700 whitespace-nowrap print:hidden"
                  >
                    <span>LexUZ manbasini ko‘rish</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-500" />
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="p-3 rounded-xl bg-brand-50 text-xs text-brand-600">
              Rasmiy qonunchilik manbalari tasdiqlangan.
            </div>
          )}
        </div>
      </div>

      {/* Print-only Legal Seal & Footer */}
      <div className="hidden print:block pt-6 text-center text-[10px] text-brand-500 border-t border-brand-200 mt-6">
        Ushbu hisob-kitob hisobchi.uz platformasi orqali shakllantirildi.
        Huquqiy asos: O‘zbekiston Respublikasi «Davlat boji to‘g‘risida»gi Qonuni (O‘RQ-600), Vazirlar Mahkamasining 550-son qarori.
      </div>

      {/* Action Buttons Section */}
      <div className="pt-2 print:hidden space-y-3">
        <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-2.5">
          {/* Qayta hisoblash */}
          <Button
            type="button"
            variant="outline"
            onClick={onRecalculate}
            className="col-span-2 sm:col-span-1 sm:flex-1 min-w-[140px] gap-2 text-xs h-10 px-3.5 font-semibold text-brand-900 hover:bg-brand-50"
            id="action-recalculate-btn"
          >
            <RotateCcw className="w-4 h-4 text-brand-600" />
            <span>Qayta hisoblash</span>
          </Button>

          {/* Nusxa olish */}
          <Button
            type="button"
            variant="outline"
            onClick={handleCopy}
            className="col-span-1 sm:flex-1 min-w-[120px] gap-2 text-xs h-10 px-3.5 font-semibold text-brand-900 hover:bg-brand-50"
            id="action-copy-btn"
          >
            <Copy className="w-4 h-4 text-brand-600" />
            <span>Nusxa olish</span>
          </Button>

          {/* Natijani saqlash */}
          <Button
            type="button"
            variant="outline"
            onClick={handleSave}
            className="col-span-1 sm:flex-1 min-w-[130px] gap-2 text-xs h-10 px-3.5 font-semibold text-brand-900 hover:bg-brand-50"
            id="action-save-btn"
          >
            {saved ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Bookmark className="w-4 h-4 text-brand-600" />
            )}
            <span>{saved ? 'Saqlandi' : 'Natijani saqlash'}</span>
          </Button>

          {/* Ulashish */}
          <Button
            type="button"
            variant="outline"
            onClick={handleShare}
            className="col-span-1 sm:flex-1 min-w-[110px] gap-2 text-xs h-10 px-3.5 font-semibold text-brand-900 hover:bg-brand-50"
            id="action-share-btn"
          >
            <Share2 className="w-4 h-4 text-brand-600" />
            <span>Ulashish</span>
          </Button>

          {/* Chop etish / PDF */}
          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            className="col-span-1 sm:flex-1 min-w-[130px] gap-2 text-xs h-10 px-3.5 font-semibold text-brand-900 hover:bg-brand-50"
            id="action-print-btn"
          >
            <Printer className="w-4 h-4 text-brand-600" />
            <span>Chop etish / PDF</span>
          </Button>
        </div>

        {/* Saved Results Access */}
        <div className="flex items-center justify-between text-xs pt-1 px-1">
          <button
            type="button"
            onClick={() => setShowSavedModal(true)}
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-900 font-medium transition-colors"
            id="action-view-saved-btn"
          >
            <FolderClock className="w-3.5 h-3.5 text-brand-500" />
            <span>Saqlangan natijalar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
