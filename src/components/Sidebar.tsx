import React from 'react';
import { PageId } from '../types';
import { ASSETS, EXTERNAL_LINKS } from '../data/portalData';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<Props> = ({ activePage, onNavigate, onLogout }) => {
  const navItems: { id: PageId; label: string; icon: string }[] = [
    { id: 'home', label: 'Ana Sayfa', icon: 'home' },
    { id: 'notes', label: 'Notlar', icon: 'menu_book' },
    { id: 'resources', label: 'Kaynaklar', icon: 'folder_open' },
    { id: 'activities', label: 'Etkinlikler', icon: 'sports_esports' },
    { id: 'competitions', label: 'Yarışmalar', icon: 'emoji_events' },
    { id: 'about', label: 'Hakkında', icon: 'info' }
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 w-64 bg-[#f9f9ff] border-r border-[#e1e2ec] shadow-md">
      {/* Brand Header */}
      <div className="p-6 flex flex-col items-center border-b border-[#e6e7f2]">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full bg-[#2170e4] p-1 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
            <img
              src={ASSETS.robotAvatarRound}
              alt="Hilal Sezer Bilişim Portalı Maskotu"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px]">
            ✓
          </span>
        </div>
        <h1 className="font-extrabold text-xl text-[#0058be] text-center tracking-tight">
          Bilişim Portalı
        </h1>
        <p className="text-xs font-semibold text-[#424754] mt-1 text-center">
          Keşfet • Öğren • Kodla
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 text-left ${
                isActive
                  ? 'bg-[#2170e4] text-white shadow-md shadow-blue-500/20 translate-x-1'
                  : 'text-[#424754] hover:bg-[#e6e7f2] hover:text-[#0058be]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl ${isActive ? 'icon-filled' : ''}`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.id === 'competitions' && (
                <span className="ml-auto text-[10px] uppercase font-extrabold bg-[#fea619] text-[#684000] px-2 py-0.5 rounded-full shadow-sm">
                  Aktif
                </span>
              )}
            </button>
          );
        })}

        {/* Quick External Links Section */}
        <div className="pt-4 mt-2 border-t border-[#e6e7f2] space-y-1">
          <p className="text-[11px] font-extrabold text-slate-400 px-3 uppercase tracking-wider">
            Doğrudan Bağlantılar
          </p>
          <a
            href={EXTERNAL_LINKS.LESSON_NOTES}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">table_chart</span>
            <span>Ders Notlarım (E-Tablo)</span>
            <span className="material-symbols-outlined text-xs ml-auto">open_in_new</span>
          </a>
          <a
            href={EXTERNAL_LINKS.RESOURCES}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">folder_open</span>
            <span>Kaynaklar (Drive)</span>
            <span className="material-symbols-outlined text-xs ml-auto">open_in_new</span>
          </a>
          <a
            href={EXTERNAL_LINKS.ACTIVITIES}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-700 hover:bg-amber-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">sports_esports</span>
            <span>Etkinlikler (Drive)</span>
            <span className="material-symbols-outlined text-xs ml-auto">open_in_new</span>
          </a>
        </div>
      </nav>

      {/* Teacher Footer Tag & Logout */}
      <div className="p-4 border-t border-[#e6e7f2] bg-white/50 space-y-2">
        <div className="flex items-center gap-3 p-2 bg-blue-50/80 rounded-xl border border-blue-100">
          <span className="material-symbols-outlined text-blue-600 text-xl">school</span>
          <div className="text-xs flex-1 min-w-0">
            <p className="font-extrabold text-[#0058be] truncate">Hilal Sezer</p>
            <p className="text-[11px] text-[#424754] truncate">Bilişim Öğretmeni</p>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-xs transition-colors"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Çıkış Yap</span>
          </button>
        )}
      </div>
    </aside>
  );
};
