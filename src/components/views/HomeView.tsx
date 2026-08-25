import React from 'react';
import { PageId, GradeLevel, LessonNote, Competition } from '../../types';
import { ASSETS, COMPETITIONS, LESSON_NOTES, EXTERNAL_LINKS } from '../../data/portalData';

interface Props {
  onNavigate: (page: PageId) => void;
  onSelectGradeFilter: (grade: GradeLevel) => void;
  onOpenNote: (note: LessonNote) => void;
  onOpenCompetition: (comp: Competition) => void;
}

export const HomeView: React.FC<Props> = ({
  onNavigate,
  onSelectGradeFilter,
  onOpenNote,
  onOpenCompetition
}) => {
  const handleOpenExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGradeClick = (grade: GradeLevel, targetPage: PageId) => {
    onSelectGradeFilter(grade);
    onNavigate(targetPage);
  };

  const handleOpenCompetitionByName = (name: 'scratch' | 'cubetto') => {
    const comp = COMPETITIONS.find((c) =>
      name === 'scratch' ? c.id === 'comp-scratch' : c.id === 'comp-cubetto'
    );
    if (comp) {
      onOpenCompetition(comp);
    } else {
      onNavigate('competitions');
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section with Mascot Matching Image 1 */}
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-[#ecedf7] overflow-visible">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#191b23] tracking-tight leading-tight">
            Hilal Sezer Öğretmenin <br />
            <span className="text-[#0058be]">Bilişim Portalı 🚀</span>
          </h2>
          <p className="text-xl md:text-2xl font-bold text-[#fea619]">
            Keşfet • Öğren • Kodla • Yarış!
          </p>
          <p className="text-sm md:text-base text-[#424754] max-w-xl">
            Okul öncesinden 6. sınıfa kadar tüm bilişim ders notları, etkileşimli kodlama oyunları,
            çalışma tabloları ve heyecan verici ödüllü yarışmalar seni bekliyor!
          </p>
          
          {/* Quick Direct Access Links */}
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href={EXTERNAL_LINKS.LESSON_NOTES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0058be] text-xs font-bold rounded-xl border border-blue-200 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-base">table_chart</span>
              Ders Notlarım (E-Tablo) ↗
            </a>
            <a
              href={EXTERNAL_LINKS.RESOURCES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-base">folder_open</span>
              Kaynaklar (Drive) ↗
            </a>
            <a
              href={EXTERNAL_LINKS.ACTIVITIES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-200 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-base">sports_esports</span>
              Etkinlikler (Drive) ↗
            </a>
          </div>
        </div>

        {/* Mascot & Speech Bubble */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 flex items-center justify-center animate-mascot-float">
          {/* Mascot Bubble */}
          <div className="absolute -top-8 -left-12 md:-left-16 bg-[#0058be] text-white text-xs md:text-sm font-bold p-3.5 md:p-4 rounded-2xl rounded-br-none shadow-lg z-20 w-44 md:w-48 text-center">
            Hoş geldin! Bugün ne öğrenmek istersin?
            <div className="absolute -bottom-2 right-4 w-3.5 h-3.5 bg-[#0058be] rotate-45"></div>
          </div>

          {/* Mascot Image Container */}
          <div className="w-full h-full bg-[#f2f3fd] rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center p-2">
            <img
              src={ASSETS.robotAvatarRound}
              alt="Bilişim Rehberi Robot"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Grade Selection Bento Grid Matching Image 1 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ANAOKULU Card */}
        <div className="group relative bg-[#fff0f5] rounded-3xl p-8 shadow-[0_4px_20px_rgba(255,182,193,0.2)] border-2 border-[#ffb6c1] hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(255,182,193,0.35)] transition-all duration-300 overflow-hidden flex flex-col min-h-[300px]">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/40 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#d87093]">
              <span className="material-symbols-outlined text-4xl icon-filled">child_care</span>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#d87093] tracking-wide">ANAOKULU</h3>
              <p className="text-xs text-[#d87093]/80 font-medium">Temel Bilgisayar & Eğlenceli Boyama</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 mb-6 flex-1 relative z-10">
            Minik eller için fare tutma, renkli şekilleri eşleştirme, yön tuşları ve ekransız kodlama keşifleri.
          </p>

          <div className="mt-auto flex flex-wrap gap-3 relative z-10">
            <a
              href={EXTERNAL_LINKS.RESOURCES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#d87093] font-bold text-sm px-6 py-3 rounded-full shadow-sm hover:bg-[#ffe4e1] border-b-2 border-[#ffb6c1] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Kaynaklar ↗
            </a>
            <a
              href={EXTERNAL_LINKS.LESSON_NOTES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#d87093] font-bold text-sm px-6 py-3 rounded-full shadow-sm hover:bg-[#ffe4e1] border-b-2 border-[#ffb6c1] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Notlar ↗
            </a>
            <a
              href={EXTERNAL_LINKS.ACTIVITIES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d87093] text-white font-bold text-sm px-6 py-3 rounded-full shadow-sm hover:bg-[#c71585] border-b-2 border-[#c71585] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Etkinlikler ↗
            </a>
          </div>
        </div>

        {/* 1-2. SINIFLAR Card */}
        <div className="group relative bg-[#f0fff4] rounded-3xl p-8 shadow-[0_4px_20px_rgba(152,251,152,0.2)] border-2 border-[#98fb98] hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(152,251,152,0.35)] transition-all duration-300 overflow-hidden flex flex-col min-h-[300px]">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/40 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2e8b57]">
              <span className="material-symbols-outlined text-4xl icon-filled">extension</span>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#2e8b57] tracking-wide">1-2. SINIFLAR</h3>
              <p className="text-xs text-[#2e8b57]/80 font-medium">Donanım, Klavye & Cubetto Robotik</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 mb-6 flex-1 relative z-10">
            Bilgisayar parçaları, hızlı fare hareketleri, klavye tuşları ve blok yönlendirme alıştırmaları.
          </p>

          <div className="mt-auto flex flex-wrap gap-2.5 relative z-10">
            <a
              href={EXTERNAL_LINKS.RESOURCES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#2e8b57] font-bold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[#e0f8e0] border-b-2 border-[#98fb98] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Kaynaklar ↗
            </a>
            <a
              href={EXTERNAL_LINKS.LESSON_NOTES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#2e8b57] font-bold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[#e0f8e0] border-b-2 border-[#98fb98] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Notlar ↗
            </a>
            <a
              href={EXTERNAL_LINKS.ACTIVITIES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2e8b57] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[#228b22] border-b-2 border-[#228b22] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Etkinlikler ↗
            </a>
            <button
              onClick={() => handleOpenCompetitionByName('cubetto')}
              className="bg-[#fea619] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[#e69500] border-b-2 border-[#e69500] active:translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Cubetto Yarışması 🤖
            </button>
          </div>
        </div>

        {/* 3-4. SINIFLAR Card */}
        <div className="group relative bg-[#f0f8ff] rounded-3xl p-8 shadow-[0_4px_20px_rgba(135,206,235,0.2)] border-2 border-[#87ceeb] hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(135,206,235,0.35)] transition-all duration-300 overflow-hidden flex flex-col min-h-[300px]">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/40 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#4682b4]">
              <span className="material-symbols-outlined text-4xl icon-filled">code_blocks</span>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#4682b4] tracking-wide">3-4. SINIFLAR</h3>
              <p className="text-xs text-[#4682b4]/80 font-medium">Algoritma, Akış Şeması & Scratch</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 mb-6 flex-1 relative z-10">
            Problem çözme adımları, temel algoritmalar, Scratch bloklarıyla ilk oyun tasarımları ve animasyonlar.
          </p>

          <div className="mt-auto flex flex-wrap gap-2.5 relative z-10">
            <a
              href={EXTERNAL_LINKS.RESOURCES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#4682b4] font-bold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[#e6f2ff] border-b-2 border-[#87ceeb] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Kaynaklar ↗
            </a>
            <a
              href={EXTERNAL_LINKS.LESSON_NOTES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#4682b4] font-bold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[#e6f2ff] border-b-2 border-[#87ceeb] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Notlar ↗
            </a>
            <a
              href={EXTERNAL_LINKS.ACTIVITIES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4682b4] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[#4169e1] border-b-2 border-[#4169e1] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Etkinlikler ↗
            </a>
            <button
              onClick={() => handleOpenCompetitionByName('scratch')}
              className="bg-[#fea619] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[#e69500] border-b-2 border-[#e69500] active:translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Scratch Yarışması 🏆
            </button>
          </div>
        </div>

        {/* 5-6. SINIFLAR Card */}
        <div className="group relative bg-[#f4f4f9] rounded-3xl p-8 shadow-[0_4px_20px_rgba(72,61,139,0.15)] border-2 border-[#9370db] hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(72,61,139,0.25)] transition-all duration-300 overflow-hidden flex flex-col min-h-[300px]">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/40 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#483d8b]">
              <span className="material-symbols-outlined text-4xl icon-filled">devices</span>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#483d8b] tracking-wide">5-6. SINIFLAR</h3>
              <p className="text-xs text-[#483d8b]/80 font-medium">İleri Bilişim, E-Tablo, Robotik & AI</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 mb-6 flex-1 relative z-10">
            12 ana modül: Donanım, Yazılım, Siber Güvenlik, Dijital Vatandaşlık, RoboFootball ve Yapay Zekâ dünyası.
          </p>

          <div className="mt-auto flex flex-wrap gap-3 relative z-10">
            <button
              onClick={() => handleGradeClick('5', 'resources')}
              className="bg-white text-[#483d8b] font-bold text-sm px-6 py-3 rounded-full shadow-sm hover:bg-[#e6e6fa] border-b-2 border-[#9370db] active:translate-y-0.5 transition-all"
            >
              5. Sınıf Modülleri
            </button>
            <button
              onClick={() => handleGradeClick('6', 'resources')}
              className="bg-white text-[#483d8b] font-bold text-sm px-6 py-3 rounded-full shadow-sm hover:bg-[#e6e6fa] border-b-2 border-[#9370db] active:translate-y-0.5 transition-all"
            >
              6. Sınıf Modülleri
            </button>
            <a
              href={EXTERNAL_LINKS.LESSON_NOTES}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#483d8b] text-white font-bold text-sm px-6 py-3 rounded-full shadow-sm hover:bg-[#191970] border-b-2 border-[#191970] active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
            >
              Ders Notlarım ↗
            </a>
          </div>
        </div>
      </section>

      {/* Quick Access Highlights */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Öğrenci Rehberi
          </div>
          <h3 className="text-2xl font-extrabold">Öğrendikçe Puan Kazan, Rozetleri Topla!</h3>
          <p className="text-sm text-blue-100 max-w-lg">
            Ders notlarını oku, çalışma tablolarını tamamla, kodlama etkinliklerinde rekor kır ve sınıf birincisi ol!
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => onNavigate('activities')}
            className="px-6 py-3 bg-white text-[#0058be] font-extrabold rounded-2xl shadow-lg hover:bg-blue-50 transition-all text-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined">sports_esports</span>
            Oyunlara Başla
          </button>
          <button
            onClick={() => onNavigate('competitions')}
            className="px-6 py-3 bg-[#fea619] hover:bg-amber-600 text-white font-extrabold rounded-2xl shadow-lg transition-all text-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined">emoji_events</span>
            Yarışmalara Katıl
          </button>
        </div>
      </section>
    </div>
  );
};
