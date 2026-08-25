import React, { useState } from 'react';
import { LessonNote } from '../../types';
import confetti from 'canvas-confetti';

interface Props {
  note: LessonNote | null;
  onClose: () => void;
  onOpenWorksheet: (note: LessonNote) => void;
  onOpenSpreadsheet?: (note: LessonNote) => void;
  onCompleteLesson: (noteId: string) => void;
  isCompleted: boolean;
}

export const LessonReaderModal: React.FC<Props> = ({
  note,
  onClose,
  onOpenWorksheet,
  onOpenSpreadsheet,
  onCompleteLesson,
  isCompleted
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  if (!note) return null;

  const handleSelectOption = (qIndex: number, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleFinishQuiz = () => {
    setShowQuizResults(true);
    let allCorrect = true;
    note.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] !== q.correctIndex) {
        allCorrect = false;
      }
    });

    if (allCorrect || Object.keys(selectedAnswers).length === note.quiz.length) {
      setCompleted(true);
      onCompleteLesson(note.id);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: note.iconColor }}
            >
              <span className="material-symbols-outlined text-3xl icon-filled">{note.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  {note.gradeLabel}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {note.readingTime}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800 mt-1">{note.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
          {/* Summary Box */}
          <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 text-2xl mt-0.5">lightbulb</span>
            <div>
              <h4 className="font-bold text-blue-900 text-sm">Öğrenme Özeti</h4>
              <p className="text-blue-800 text-sm mt-0.5">{note.summary}</p>
            </div>
          </div>

          {/* Lesson Sections */}
          <div className="space-y-6">
            {note.sections.map((section, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70">
                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  {section.title}
                </h3>
                <p className="text-slate-700 text-base leading-relaxed mb-3">{section.text}</p>
                {section.bulletPoints && (
                  <ul className="space-y-2 pl-2">
                    {section.bulletPoints.map((item, bIdx) => (
                      <li key={bIdx} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.tips && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-medium text-amber-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-sm">tips_and_updates</span>
                    {section.tips}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Interactive Mini Quiz */}
          {note.quiz && note.quiz.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-2 border-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-indigo-600 icon-filled">quiz</span>
                <h3 className="text-lg font-extrabold text-indigo-950">Öğrendiklerimizi Test Edelim!</h3>
              </div>

              <div className="space-y-6">
                {note.quiz.map((q, qIdx) => {
                  const userAns = selectedAnswers[qIdx];
                  const isAnswered = userAns !== undefined;
                  const isCorrect = userAns === q.correctIndex;

                  return (
                    <div key={qIdx} className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
                      <p className="font-bold text-slate-800 mb-3 text-sm">
                        {qIdx + 1}. {q.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAns === optIdx;
                          let btnStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';

                          if (showQuizResults) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-100 text-emerald-800 border-emerald-400 font-bold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-100 text-rose-800 border-rose-400';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-blue-600 text-white border-blue-600 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(qIdx, optIdx)}
                              className={`p-3 text-left rounded-xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {showQuizResults && optIdx === q.correctIndex && (
                                <span className="material-symbols-outlined text-emerald-600 text-sm font-bold">check_circle</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {showQuizResults && (
                        <div className={`mt-3 p-2.5 rounded-lg text-xs flex items-center gap-1.5 ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                          <span className="material-symbols-outlined text-sm">{isCorrect ? 'celebration' : 'info'}</span>
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!showQuizResults ? (
                <button
                  onClick={handleFinishQuiz}
                  className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">check</span>
                  Cevaplarımı Kontrol Et (+50 Puan)
                </button>
              ) : (
                <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-2xl">verified</span>
                    <span className="text-emerald-900 font-bold text-sm">Harika iş çıkardın! +50 Puan kazandın.</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenWorksheet(note);
              }}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-lg">assignment</span>
              Çalışma Tablosu
            </button>
            {note.spreadsheetData && onOpenSpreadsheet && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSpreadsheet(note);
                }}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-sm flex items-center gap-1.5 transition-colors border border-slate-300"
              >
                <span className="material-symbols-outlined text-lg">grid_on</span>
                E-Tablo
              </button>
            )}
          </div>

          <button
            onClick={() => {
              if (!completed) {
                setCompleted(true);
                onCompleteLesson(note.id);
                confetti();
              }
              onClose();
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">check_circle</span>
            {completed ? 'Tamamlandı (Kapat)' : 'Dersi Bitir'}
          </button>
        </div>
      </div>
    </div>
  );
};
