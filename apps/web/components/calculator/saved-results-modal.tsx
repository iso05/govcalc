'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  SavedResultItem,
  getSavedResults,
  removeSavedResultItem,
  clearAllSavedResults,
} from '@/lib/saved-results';
import { CalculationResult } from '@govcalc/types';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface SavedResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: CalculationResult, inputs?: any) => void;
}

export function SavedResultsModal({
  isOpen,
  onClose,
  onSelectResult,
}: SavedResultsModalProps) {
  const [items, setItems] = useState<SavedResultItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setItems(getSavedResults());
    }
  }, [isOpen]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = removeSavedResultItem(id);
    setItems(updated);
  };

  const handleClearAll = () => {
    clearAllSavedResults();
    setItems([]);
  };

  const handleOpenItem = (item: SavedResultItem) => {
    onSelectResult(item.result, item.inputs);
    onClose();
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-brand-900" />
          <span>Saqlangan natijalar</span>
          {items.length > 0 && (
            <span className="text-xs font-semibold text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          )}
        </div>
      }
      description="Brauzeringizda saqlangan oldingi hisob-kitoblar ro‘yxati (login talab etilmaydi):"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-brand-200 bg-brand-50/50">
            <Bookmark className="w-8 h-8 text-brand-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-brand-900">
              Hozircha saqlangan natijalar yo‘q
            </div>
            <p className="text-xs text-brand-500 mt-1 max-w-sm mx-auto">
              Hisoblashni amalga oshirib, «Natijani saqlash» tugmasini bossangiz, natijalar shu yerda ko‘rinadi.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-xs pb-1 border-b border-brand-100">
              <span className="text-brand-500 font-medium">Oxirgi saqlangan hisoblar</span>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-red-600 hover:text-red-700 font-medium hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Barchasini tozalash</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenItem(item)}
                  className="p-4 rounded-2xl border border-brand-200 bg-white hover:border-brand-900 hover:shadow-subtle cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-brand-900">
                        {item.calculatorTitle || 'Tug‘ilganlik guvohnomasi'}
                      </span>
                      <span className="text-[10px] text-brand-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.savedAt)}
                      </span>
                    </div>

                    <div className="text-xs text-brand-600">
                      <strong>Holat:</strong> {item.caseLabel}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-brand-500">
                      <span>Davlat boji: {item.stateDutyFormatted}</span>
                      <span>•</span>
                      <span>Gerb: {item.emblemFeeFormatted}</span>
                      {item.serviceFeeFormatted && item.serviceFeeFormatted !== '0 so‘m' && (
                        <>
                          <span>•</span>
                          <span>Xizmat: {item.serviceFeeFormatted}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-brand-100">
                    <div className="text-right">
                      <div className="text-xs text-brand-400 font-medium">Jami summa</div>
                      <div className="text-sm font-extrabold text-brand-900">
                        {item.totalFormatted}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleOpenItem(item)}
                        className="gap-1 text-xs px-3 py-1.5"
                      >
                        <span>Ochish</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(item.id, e)}
                        className="p-1.5 rounded-lg text-brand-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="O‘chirish"
                        aria-label="O‘chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="pt-2 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Yopish
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
