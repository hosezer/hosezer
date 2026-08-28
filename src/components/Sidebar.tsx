import React from 'react';
import { PageId, AuthUser } from '../types';
import { ASSETS, EXTERNAL_LINKS } from '../data/portalData';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onLogout?: () => void;
  currentUser?: AuthUser | null;
}

export const Sidebar: React.FC<Props> = ({ activePage, onNavigate, onLogout, currentUser }) => {
  const isTeacher = currentUser?.role === 'teacher';

  const navItems: { id: PageId; label: string; icon: string; badge?: string }[] = [
    { id: 'home', label: 'Ana Sayfa', icon: 'home' },
    { id: 'notes', label: 'Ders Notları', icon: 'menu_book' },
    { id: 'resources', label: 'Kaynaklar', icon: 'folder_open' },
    { id: 'activities', label: 'Etkinlikler & Oyun', icon: 'sports_esports' },
    { id: 'competitions', label: 'Yarışmalar', icon: 'emoji_events', badge: 'Aktif' },
    { id: 'chat', label: isTeacher ? 'Öğrenci Mesajları' : 'Öğretmene Sor', icon: 'chat' },
  ];

  if (isTeacher) {
    navItems.push({
      id: 'teacher_panel',
      label: 'Öğrenci Hareketleri & SQL',
      icon: 'shield_person',
      badge: 'Yönetim',
    });
  }

  navItems.push({ id: 'about', label: 'Hakkında', icon: 'info' });

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 w-64 bg-[#f9f9ff] border-r border-[#e1e2ec] shadow-md">
      {/* Brand Header */}
      <div className="p-5 flex flex-col items-center border-b border-[#e6e7f2]">
        <div className="relative mb-2.5">
          <div className="w-16 h-16 rounded-2xl bg-[#2170e4] p-1 border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
            <img
              src={ASSETS.robotAvatarRound}
              alt="Hilal Sezer Bilişim Portalı Maskotu"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
            ✓
          </span>
        </div>
        <h1 className="font-extrabold text-lg text-[#0058be] text-center tracking-tight leading-tight">
          Hilal Sezer Portalı
        </h1>
        <p className="text-[11px] font-semibold text-[#424754] text-center">
          Bilişim • Kodlama • Robotik
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-3 px-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all duration-200 text-left cursor-pointer ${
                isActive
                  ? 'bg-[#2170e4] text-white shadow-md shadow-blue-500/20 translate-x-1'
                  : 'text-[#424754] hover:bg-[#e6e7f2] hover:text-[#0058be]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${isActive ? 'icon-filled' : ''}`}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span
                  className={`ml-auto text-[9px] uppercase font-black px-2 py-0.5 rounded-full ${
                    item.id === 'teacher_panel'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-[#fea619] text-[#684000]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Direct Links */}
        <div className="pt-3 mt-2 border-t border-[#e6e7f2] space-y-1">
          <p className="text-[10px] font-extrabold text-slate-400 px-3 uppercase tracking-wider">
            Doğrudan Bağlantılar
          </p>
          <a
            href={EXTERNAL_LINKS.LESSON_NOTES}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">table_chart</span>
            <span className="truncate">Ders Notlarım (E-Tablo)</span>
            <span className="material-symbols-outlined text-xs ml-auto">open_in_new</span>
          </a>
          <a
            href={EXTERNAL_LINKS.RESOURCES}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">folder_open</span>
            <span className="truncate">Kaynaklar (Drive)</span>
            <span className="material-symbols-outlined text-xs ml-auto">open_in_new</span>
          </a>
          <a
            href={EXTERNAL_LINKS.ACTIVITIES}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold text-amber-700 hover:bg-amber-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">sports_esports</span>
            <span className="truncate">Etkinlikler (Drive)</span>
            <span className="material-symbols-outlined text-xs ml-auto">open_in_new</span>
          </a>
        </div>
      </nav>

      {/* User Info & Logout Footer */}
      <div className="p-3.5 border-t border-[#e6e7f2] bg-white/60 space-y-2">
        <div className="flex items-center gap-2.5 p-2 bg-blue-50/80 rounded-xl border border-blue-100">
          <div className="w-8 h-8 rounded-lg bg-[#0058be] text-white flex items-center justify-center font-bold text-xs shrink-0">
            <span className="material-symbols-outlined text-base">
              {isTeacher ? 'school' : 'account_circle'}
            </span>
          </div>
          <div className="text-xs flex-1 min-w-0">
            <p className="font-extrabold text-[#0058be] truncate">
              {currentUser?.name || 'Hilal Sezer'}
            </p>
            <p className="text-[10px] text-[#424754] truncate">
              {isTeacher ? 'Bilişim Öğretmeni' : `${currentUser?.grade || 'Öğrenci'} • @${currentUser?.username || ''}`}
            </p>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Çıkış Yap</span>
          </button>
        )}
      </div>
    </aside>
  );
};
