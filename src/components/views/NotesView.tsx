import React, { useState } from 'react';
import { GradeLevel, LessonNote } from '../../types';
import { LESSON_NOTES, ASSETS, EXTERNAL_LINKS } from '../../data/portalData';

interface Props {
  selectedGradeFilter: GradeLevel;
  onSelectGradeFilter: (grade: GradeLevel) => void;
  onOpenNote: (note: LessonNote) => void;
  onOpenWorksheet: (note: LessonNote) => void;
  onOpenSpreadsheet: (note: LessonNote) => void;
  completedNotes: string[];
}

export const NotesView: React.FC<Props> = ({
  selectedGradeFilter,
  onSelectGradeFilter,
  onOpenNote,
  onOpenWorksheet,
  onOpenSpreadsheet,
  completedNotes
}) => {
  const [activeTab, setActiveTab] = useState<GradeLevel>(
    selectedGradeFilter === 'all' ? '1' : selectedGradeFilter
  );

  const gradeTabs: { id: GradeLevel; label: string; icon: string }[] = [
    { id: 'anaokulu', label: 'Anaokulu', icon: 'child_care' },
    { id: '1', label: '1. Sınıf', icon: 'looks_one' },
    { id: '2', label: '2. Sınıf', icon: 'looks_two' },
    { id: '3', label: '3. Sınıf', icon: 'looks_3' },
    { id: '4', label: '4. Sınıf', icon: 'looks_4' },
    { id: '5', label: '5. Sınıf', icon: 'looks_5' },
    { id: '6', label: '6. Sınıf', icon: 'looks_6' }
  ];

  const handleTabChange = (grade: GradeLevel) => {
    setActiveTab(grade);
    onSelectGradeFilter(grade);
  };

  // Filter notes
  const filteredNotes = LESSON_NOTES.filter((note) => {
    if (activeTab === 'all') return true;
    if (activeTab === '1-2') return note.grade === '1' || note.grade === '2';
    if (activeTab === '3-4') return note.grade === '3' || note.grade === '4';
    if (activeTab === '5-6') return note.grade === '5' || note.grade === '6';
    return note.grade === activeTab;
  });

  // Fallback if no specific notes for that tab
  const displayNotes = filteredNotes.length > 0 ? filteredNotes : LESSON_NOTES;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header & Robot Guide Matching Image 5 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0058be] tracking-tight">
              Ders Notlarım 📝
            </h1>
            <a
              href={EXTERNAL_LINKS.LESSON_NOTES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">table_chart</span>
              Ders Notları Google E-Tablosu ↗
            </a>
          </div>
          <p className="text-base text-[#424754] max-w-2xl">
            Seçtiğin sınıfa ait konu anlatımlarını, çalışma sayfalarını ve Google E-Tablo ders notlarını burada
            bulabilirsin.
          </p>
        </div>

        {/* Robot Guide Widget Matching Image 5 */}
        <div className="flex items-center gap-4 shrink-0 bg-white p-4 rounded-2xl shadow-sm border-2 border-[#d8e2ff] animate-mascot-float">
          <div className="bg-[#0058be] text-white px-4 py-3 rounded-2xl rounded-br-none shadow-md font-bold text-xs md:text-sm relative max-w-xs text-center">
            Haydi gel, öğrendiklerimizi tekrar edelim!
            <div className="absolute -bottom-2 right-4 w-3 h-3 bg-[#0058be] rotate-45"></div>
          </div>
          <div className="w-16 h-16 bg-[#fea619] rounded-full flex items-center justify-center border-4 border-white shadow-md p-1 shrink-0 overflow-hidden">
            <img
              src={ASSETS.robotAvatarRound}
              alt="Robot Rehber"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Grade Tabs (Pills style for kids) Matching Image 5 */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex gap-3 min-w-max">
          {gradeTabs.map((tab) => {
            const isActive =
              activeTab === tab.id ||
              (activeTab === '1-2' && (tab.id === '1' || tab.id === '2')) ||
              (activeTab === '3-4' && (tab.id === '3' || tab.id === '4')) ||
              (activeTab === '5-6' && (tab.id === '5' || tab.id === '6'));

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0058be] text-white shadow-md shadow-blue-500/20 border-b-4 border-[#004395] translate-y-[-2px]'
                    : 'bg-[#e1e2ec] text-[#424754] hover:bg-[#d8d9e3] hover:text-[#191b23]'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Grid (Bento style) Matching Image 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayNotes.map((note) => {
          const isDone = completedNotes.includes(note.id);

          return (
            <div
              key={note.id}
              className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,88,190,0.08)] hover:shadow-[0_8px_32px_rgba(0,88,190,0.15)] hover:scale-[1.01] transition-all duration-200 flex flex-col h-full border-2 border-[#d8e2ff] relative overflow-hidden"
            >
              {/* Completed Check Badge */}
              {isDone && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Tamamlandı
                </div>
              )}

              {/* Icon Container */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                style={{ backgroundColor: note.iconBg, color: note.iconColor }}
              >
                <span className="material-symbols-outlined text-3xl icon-filled">{note.icon}</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl font-extrabold text-[#191b23] mb-2 leading-snug">
                {note.title}
              </h2>
              <p className="text-sm text-[#424754] mb-6 flex-1 leading-relaxed">
                {note.summary}
              </p>

              {/* Interactive Buttons Matching Image 5 */}
              <div className="flex flex-col gap-3 mt-auto">
                <a
                  href={EXTERNAL_LINKS.LESSON_NOTES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[54px] bg-[#0058be] text-white rounded-2xl font-bold text-base flex justify-center items-center gap-2 border-b-4 border-[#004395] hover:bg-[#004395] active:border-b-0 active:translate-y-1 transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-xl">table_chart</span>
                  Ders Notlarım (E-Tablo) ↗
                </a>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => onOpenNote(note)}
                    className="flex-1 min-h-[46px] bg-[#eef2ff] hover:bg-[#dbe4ff] text-[#0058be] rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 active:scale-95 transition-all border border-[#adc6ff]"
                  >
                    <span className="material-symbols-outlined text-base">menu_book</span>
                    Özeti Oku
                  </button>

                  <button
                    onClick={() => onOpenWorksheet(note)}
                    className="flex-1 min-h-[46px] bg-[#fea619] text-[#684000] rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 hover:bg-[#ffb95f] active:scale-95 transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-lg">assignment</span>
                    Çalışma Yap
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
