import React, { useState } from 'react';
import { LearningModule, LessonNote, Competition, PageId } from '../../types';
import { LEARNING_MODULES, LESSON_NOTES, COMPETITIONS, ASSETS, EXTERNAL_LINKS } from '../../data/portalData';

interface Props {
  onOpenNote: (note: LessonNote) => void;
  onOpenWorksheet: (note: LessonNote) => void;
  onOpenCompetition: (comp: Competition) => void;
  onNavigate: (page: PageId) => void;
}

export const ResourcesView: React.FC<Props> = ({
  onOpenNote,
  onOpenWorksheet,
  onOpenCompetition,
  onNavigate
}) => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  const handleActionClick = (module: LearningModule, actionType: 'note' | 'worksheet' | 'activity' | 'comp') => {
    if (actionType === 'comp') {
      const comp = COMPETITIONS.find((c) =>
        module.id === 'mod-05' ? c.id === 'comp-scratch' : c.id === 'comp-robofootball'
      );
      if (comp) {
        onOpenCompetition(comp);
      } else {
        onNavigate('competitions');
      }
      return;
    }

    if (actionType === 'activity') {
      window.open(EXTERNAL_LINKS.ACTIVITIES, '_blank', 'noopener,noreferrer');
      return;
    }

    if (actionType === 'note') {
      window.open(EXTERNAL_LINKS.LESSON_NOTES, '_blank', 'noopener,noreferrer');
      return;
    }

    // Match or find appropriate lesson note for worksheet
    let matchedNote = LESSON_NOTES.find(
      (n) => n.title.toLowerCase().includes(module.title.toLowerCase().substring(0, 5))
    );
    if (!matchedNote) {
      matchedNote = LESSON_NOTES[0];
    }

    if (actionType === 'worksheet') {
      onOpenWorksheet(matchedNote);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section Matching Image 7 */}
      <section className="relative w-full rounded-[32px] overflow-hidden bg-[#d8e2ff] shadow-sm border border-blue-200">
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.class6HeroBg}
            alt="6. Sınıf Bilişim Arka Plan"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#d8e2ff] via-[#d8e2ff]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full text-[#004395] font-bold text-xs shadow-sm border-2 border-white/60">
              <span className="material-symbols-outlined text-sm">school</span>
              6. Sınıf Modülü
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-[#001a42] tracking-tight">
              6. Sınıf Bilişim Dünyası <span className="inline-block hover:scale-110 transition-transform cursor-default">💻</span>
            </h1>

            <p className="text-base md:text-lg text-[#004395] font-medium max-w-xl">
              Algoritmaların gücünü keşfet, kendi oyunlarını kodla ve geleceğin teknolojilerini öğrenmeye başla!
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={EXTERNAL_LINKS.RESOURCES}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0058be] hover:bg-[#004395] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">folder_open</span>
                Google Drive Kaynaklar ↗
              </a>
              <a
                href={EXTERNAL_LINKS.ACTIVITIES}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">sports_esports</span>
                Google Drive Etkinlikler ↗
              </a>
              <a
                href={EXTERNAL_LINKS.LESSON_NOTES}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">table_chart</span>
                Ders Notlarım E-Tablosu ↗
              </a>
            </div>
          </div>

          {/* Robot Guide Bubble Matching Image 7 */}
          <div className="hidden md:flex flex-col items-center animate-mascot-float">
            <div className="bg-white text-[#191b23] p-4 rounded-3xl rounded-br-none shadow-md mb-2 relative border-2 border-[#adc6ff] text-xs font-bold max-w-[210px] text-center">
              "İleri seviye bilişim yolculuğuna hazır mısın?"
              <div className="absolute -bottom-2 right-4 w-3.5 h-3.5 bg-white border-b-2 border-r-2 border-[#adc6ff] rotate-45"></div>
            </div>

            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md p-1 bg-white">
              <img
                src={ASSETS.robotAvatarExcited}
                alt="Robot Rehber"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Topic Grid Section Matching Image 7 */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#191b23]">Öğrenme Modülleri</h2>
          <div className="h-1 flex-grow mx-8 bg-[#e6e7f2] rounded-full overflow-hidden hidden sm:block">
            <div className="h-full bg-[#4edea3] w-1/3 rounded-full"></div>
          </div>
          <span className="text-xs font-bold text-[#424754] bg-[#ecedf7] px-4 py-1.5 rounded-full border border-slate-200">
            12 Modül
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_MODULES.map((mod) => {
            // Check if special competition highlight card (Mod 05 or Mod 08)
            if (mod.isSpecialCompetition) {
              return (
                <div
                  key={mod.id}
                  className="bg-[#ffddb8]/50 rounded-[28px] p-8 shadow-[0_4px_20px_rgba(254,166,25,0.2)] border-2 border-[#855300] hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(254,166,25,0.4)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#855300]/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#855300] flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
                      <span className="material-symbols-outlined text-3xl icon-filled">emoji_events</span>
                    </div>
                    <span className="text-2xl font-extrabold text-[#855300]/40 font-mono">
                      {mod.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#653e00] mb-2 relative z-10">
                    {mod.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#653e00]/80 mb-6 relative z-10">
                    {mod.competitionDesc}
                  </p>

                  <div className="mt-auto pt-4 relative z-10">
                    <button
                      onClick={() => handleActionClick(mod, 'comp')}
                      className="bg-[#855300] text-white hover:bg-[#653e00] active:translate-y-0.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 w-full justify-center shadow-md"
                    >
                      <span className="material-symbols-outlined text-lg">rocket_launch</span>
                      Katıl
                    </button>
                  </div>
                </div>
              );
            }

            // Regular Learning Module Card
            return (
              <div
                key={mod.id}
                className="bg-white rounded-[28px] p-8 shadow-[0_4px_20px_rgba(0,90,194,0.08)] border-2 border-[#adc6ff]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,90,194,0.15)] transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: mod.iconBg, color: mod.iconColor }}
                  >
                    <span className="material-symbols-outlined text-3xl icon-filled">{mod.icon}</span>
                  </div>
                  <span className="text-2xl font-extrabold text-slate-300 font-mono">
                    {mod.number}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-[#191b23] mb-2 group-hover:text-[#0058be] transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-[#424754] mb-6 flex-1 line-clamp-2 leading-relaxed">
                  {mod.details.desc}
                </p>

                <div className="mt-auto pt-2 flex flex-wrap gap-2">
                  {mod.hasResource && (
                    <a
                      href={EXTERNAL_LINKS.RESOURCES}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#ecedf7] hover:bg-[#2170e4] hover:text-white text-[#424754] px-3 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">folder_open</span>
                      Kaynaklar ↗
                    </a>
                  )}

                  {mod.hasNote && (
                    <a
                      href={EXTERNAL_LINKS.LESSON_NOTES}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#ecedf7] hover:bg-[#2170e4] hover:text-white text-[#424754] px-3 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">table_chart</span>
                      Notlar ↗
                    </a>
                  )}

                  {mod.hasWorksheet && (
                    <button
                      onClick={() => handleActionClick(mod, 'worksheet')}
                      className="bg-[#ecedf7] hover:bg-[#fea619] hover:text-[#684000] text-[#424754] px-3 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">assignment</span>
                      Çalışma
                    </button>
                  )}

                  {mod.hasActivity && (
                    <a
                      href={EXTERNAL_LINKS.ACTIVITIES}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#ecedf7] hover:bg-[#006947] hover:text-white text-[#424754] px-3 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">sports_esports</span>
                      Etkinlikler ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Module Details & Resource Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: selectedModule.iconColor }}
                >
                  <span className="material-symbols-outlined text-2xl icon-filled">{selectedModule.icon}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600">Modül {selectedModule.number}</span>
                  <h3 className="text-xl font-extrabold text-slate-800">{selectedModule.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <p>{selectedModule.details.desc}</p>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Kazanımlar ve Öğrenilecekler:</h4>
                <ul className="space-y-1 pl-2">
                  {selectedModule.details.objectives.map((obj, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="text-blue-500 font-bold">✓</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Ders Materyalleri:</h4>
                <div className="space-y-2">
                  <a
                    href={EXTERNAL_LINKS.RESOURCES}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100 border border-blue-200 flex items-center justify-between text-xs font-bold text-blue-900 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600 text-base">folder_open</span>
                      <span>Google Drive Kaynak Klasörünü Aç</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                  {selectedModule.details.resourceLinks.map((res, i) => (
                    <a
                      key={i}
                      href={EXTERNAL_LINKS.RESOURCES}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100 border border-blue-200 flex items-center justify-between text-xs font-bold text-blue-900 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 text-base">
                          {res.type === 'video' ? 'smart_display' : res.type === 'pdf' ? 'picture_as_pdf' : 'link'}
                        </span>
                        <span>{res.title}</span>
                      </div>
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedModule(null)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
