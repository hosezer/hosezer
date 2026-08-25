import React, { useState, useEffect, useRef } from 'react';
import { PageId, StudentProfile, LessonNote, LearningModule, Competition } from '../types';
import { LESSON_NOTES, LEARNING_MODULES, COMPETITIONS } from '../data/portalData';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  profile: StudentProfile;
  onOpenProfile: () => void;
  onSelectNote: (note: LessonNote) => void;
  onSelectModule: (mod: LearningModule) => void;
  onSelectCompetition: (comp: Competition) => void;
  onLogout?: () => void;
}

export const TopHeader: React.FC<Props> = ({
  activePage,
  onNavigate,
  profile,
  onOpenProfile,
  onSelectNote,
  onSelectModule,
  onSelectCompetition,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const topNavTabs: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'notes', label: 'Ders Notları' },
    { id: 'resources', label: 'Kaynaklar' },
    { id: 'activities', label: 'Etkinlikler' },
    { id: 'competitions', label: 'Yarışmalar' },
    { id: 'about', label: 'Hakkında' }
  ];

  // Search Results
  const matchingNotes = searchQuery.trim()
    ? LESSON_NOTES.filter((n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchingModules = searchQuery.trim()
    ? LEARNING_MODULES.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.details.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchingCompetitions = searchQuery.trim()
    ? COMPETITIONS.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const hasResults =
    matchingNotes.length > 0 || matchingModules.length > 0 || matchingCompetitions.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = (page: PageId) => {
    switch (page) {
      case 'home':
        return 'Ana Sayfa';
      case 'notes':
        return 'Ders Notlarım';
      case 'resources':
        return 'Kaynaklar & Modüller';
      case 'activities':
        return 'Eğlenceli Etkinlikler';
      case 'competitions':
        return 'Kodlama Yarışmaları';
      case 'about':
        return 'Öğretmen & Portal Hakkında';
    }
  };

  return (
    <header className="hidden md:flex fixed top-0 left-64 right-0 z-30 bg-white/90 backdrop-blur-md px-6 py-3.5 justify-between items-center border-b border-[#e1e2ec] shadow-xs">
      {/* Left Title & Breadcrumb */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-extrabold text-[#0058be] tracking-tight">
          {getPageTitle(activePage)}
        </h1>

        {/* Secondary Top Navigation Tabs */}
        <div className="hidden xl:flex items-center gap-1 bg-[#f2f3fd] p-1 rounded-2xl border border-[#d8e2ff]">
          {topNavTabs.map((tab) => {
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#2170e4] text-white shadow-xs'
                    : 'text-[#424754] hover:text-[#0058be] hover:bg-white/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Controls: Search, Points & Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar with Dropdown */}
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Konu, ders veya yarışma ara..."
              className="bg-[#f2f3fd] border-2 border-[#c2c6d6] rounded-full py-2 pl-10 pr-4 w-64 focus:w-80 focus:border-[#0058be] focus:bg-white focus:outline-none text-xs font-semibold text-[#191b23] transition-all"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#424754] text-lg">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Live Search Modal Results */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border-2 border-blue-100 p-4 max-h-[80vh] overflow-y-auto z-50 animate-fadeIn">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Arama Sonuçları</div>

              {!hasResults ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  "{searchQuery}" için sonuç bulunamadı.
                </div>
              ) : (
                <div className="space-y-4">
                  {matchingNotes.length > 0 && (
                    <div>
                      <div className="text-[11px] font-extrabold text-blue-700 uppercase mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">menu_book</span>
                        Ders Notları ({matchingNotes.length})
                      </div>
                      <div className="space-y-1">
                        {matchingNotes.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => {
                              onSelectNote(n);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full text-left p-2 rounded-xl hover:bg-blue-50 flex items-center justify-between text-xs transition-colors"
                          >
                            <span className="font-bold text-slate-800">{n.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                              {n.gradeLabel}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingModules.length > 0 && (
                    <div>
                      <div className="text-[11px] font-extrabold text-emerald-700 uppercase mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">folder_open</span>
                        Modüller ({matchingModules.length})
                      </div>
                      <div className="space-y-1">
                        {matchingModules.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => {
                              onSelectModule(m);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full text-left p-2 rounded-xl hover:bg-emerald-50 flex items-center justify-between text-xs transition-colors"
                          >
                            <span className="font-bold text-slate-800">
                              {m.number}. {m.title}
                            </span>
                            <span className="text-[10px] text-slate-500">Modül</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingCompetitions.length > 0 && (
                    <div>
                      <div className="text-[11px] font-extrabold text-amber-700 uppercase mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">emoji_events</span>
                        Yarışmalar ({matchingCompetitions.length})
                      </div>
                      <div className="space-y-1">
                        {matchingCompetitions.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              onSelectCompetition(c);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full text-left p-2 rounded-xl hover:bg-amber-50 flex items-center justify-between text-xs transition-colors"
                          >
                            <span className="font-bold text-slate-800">{c.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                              Katıl
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Student Points Pill */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 bg-[#f2f3fd] hover:bg-[#d8e2ff] border border-[#d8e2ff] px-3.5 py-1.5 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[#fea619] text-base icon-filled">bolt</span>
          <span className="text-xs font-extrabold text-[#0058be]">{profile.points} Puan</span>
        </button>

        {/* Profile Avatar Button */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#f2f3fd] transition-colors border border-transparent hover:border-[#d8e2ff]"
          title="Öğrenci Profili"
        >
          <span className="material-symbols-outlined text-[#0058be] text-3xl">account_circle</span>
        </button>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-xs transition-colors border border-slate-200"
            title="Güvenli Çıkış Yap"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span className="hidden xl:inline">Çıkış</span>
          </button>
        )}
      </div>
    </header>
  );
};
