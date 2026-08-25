import React, { useState } from 'react';
import { LessonNote } from '../../types';

interface Props {
  note: LessonNote | null;
  onClose: () => void;
}

export const SpreadsheetModal: React.FC<Props> = ({ note, onClose }) => {
  if (!note || !note.spreadsheetData) return null;

  const initialRows = note.spreadsheetData.rows;
  const [rows, setRows] = useState<(string | number)[][]>(initialRows);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const handleCellChange = (rIdx: number, cIdx: number, val: string) => {
    const newRows = [...rows.map((r) => [...r])];
    const num = Number(val);
    newRows[rIdx][cIdx] = isNaN(num) || val === '' ? val : num;
    setRows(newRows);
  };

  // Calculate sum if any numerical column
  const getColumnSum = (cIdx: number) => {
    let sum = 0;
    let hasNum = false;
    rows.forEach((row) => {
      const val = row[cIdx];
      if (typeof val === 'number') {
        sum += val;
        hasNum = true;
      }
    });
    return hasNum ? sum : null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-emerald-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl">grid_on</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  İnteraktif E-Tablo Görüntüleyici
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Excel / Sheets Eğitimi
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-800">{note.title} - Tablo Uygulaması</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Toolbar & Formula Bar */}
        <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center gap-4 text-xs font-mono text-slate-700">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-300">
            <span className="font-bold text-emerald-700">Hücre:</span>
            <span>{selectedCell ? `${String.fromCharCode(65 + selectedCell.c)}${selectedCell.r + 1}` : 'A1'}</span>
          </div>
          <div className="flex-1 bg-white px-3 py-1.5 rounded-lg border border-slate-300 flex items-center gap-2">
            <span className="font-bold text-slate-400">fx</span>
            <span className="text-slate-600">
              {selectedCell ? String(rows[selectedCell.r]?.[selectedCell.c] ?? '') : note.spreadsheetData.activityPrompt}
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-auto flex-1 bg-slate-50">
          <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-base">info</span>
            <span>{note.spreadsheetData.activityPrompt} Hücrelere tıklayarak değerleri değiştirebilirsiniz.</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-sm">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider">
                  <th className="p-3 w-12 text-center border-r border-emerald-700/50 bg-emerald-700/50">#</th>
                  {note.spreadsheetData.columns.map((col, idx) => (
                    <th key={idx} className="p-3 border-r border-emerald-500/50 last:border-none">
                      <div className="flex items-center justify-between">
                        <span>{col}</span>
                        <span className="text-[10px] text-emerald-200 font-mono ml-2">[{String.fromCharCode(65 + idx)}]</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-2.5 text-center font-mono text-xs bg-slate-100 text-slate-500 font-bold border-r border-slate-300">
                      {rIdx + 1}
                    </td>
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        onClick={() => setSelectedCell({ r: rIdx, c: cIdx })}
                        className={`p-1.5 border-r border-slate-200 last:border-none ${
                          selectedCell?.r === rIdx && selectedCell?.c === cIdx
                            ? 'ring-2 ring-emerald-500 ring-inset bg-emerald-50'
                            : ''
                        }`}
                      >
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                          className="w-full px-2 py-1 bg-transparent rounded focus:outline-none text-slate-800 text-sm"
                        />
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Auto summary row */}
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-800">
                  <td className="p-2.5 text-center font-mono text-xs text-slate-600 bg-slate-200 border-r border-slate-300">∑</td>
                  {note.spreadsheetData.columns.map((_, cIdx) => {
                    const sum = getColumnSum(cIdx);
                    return (
                      <td key={cIdx} className="p-3 border-r border-slate-200 last:border-none text-sm">
                        {cIdx === 0 ? 'Toplam Değerler:' : sum !== null ? <span className="text-emerald-700 font-mono">{sum}</span> : '-'}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">Formül ipucu: =TOPLA(C1:C6) fonksiyonu seçili sütundaki sayıları toplar.</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
