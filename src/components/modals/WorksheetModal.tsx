import React, { useState } from 'react';
import { LessonNote } from '../../types';
import confetti from 'canvas-confetti';

interface Props {
  note: LessonNote | null;
  onClose: () => void;
  onSaveProgress?: (answers: Record<number, string>) => void;
}

export const WorksheetModal: React.FC<Props> = ({ note, onClose }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!note) return null;

  const handleTextChange = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-amber-200 overflow-hidden print:m-0 print:max-w-none print:shadow-none">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">assignment</span>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                Çalışma Tablosu • {note.gradeLabel}
              </span>
              <h2 className="text-xl font-extrabold text-slate-800">{note.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors print:hidden"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-sm text-amber-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600">edit_note</span>
            <span>{note.worksheet.instructions}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {note.worksheet.questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  {idx + 1}. {q.text}
                </label>

                {q.answerType === 'choice' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <label
                        key={oIdx}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          answers[q.id] === opt
                            ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                            : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={(e) => handleTextChange(q.id, e.target.value)}
                          className="text-amber-500 focus:ring-amber-400 h-4 w-4"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.answerType === 'text' && (
                  <textarea
                    rows={3}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    placeholder="Cevabını buraya yaz..."
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  />
                )}
              </div>
            ))}

            {isSubmitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800">
                <span className="material-symbols-outlined text-3xl text-emerald-600">task_alt</span>
                <div>
                  <h4 className="font-bold text-sm">Çalışma Tablon Kaydedildi!</h4>
                  <p className="text-xs mt-0.5">Öğretmenin incelemesi için cevapların sisteme iletildi.</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm flex items-center gap-2 border border-slate-300 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">print</span>
                Yazdır / PDF Al
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">send</span>
                Öğretmene Gönder (+30 Puan)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
