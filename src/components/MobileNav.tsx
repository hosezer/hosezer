import React from 'react';
import { PageId, AuthUser } from '../types';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenProfile: () => void;
  onLogout?: () => void;
  currentUser?: AuthUser | null;
}

export const MobileNav: React.FC<Props> = ({
  activePage,
  onNavigate,
  onOpenProfile,
  onLogout,
  currentUser,
}) => {
  const isTeacher = currentUser?.role === 'teacher';

  return (
    <>
      {/* Mobile Top Nav */}
      <nav className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center px-4 py-3 bg-white shadow-sm border-b border-slate-200">
        <div className="font-extrabold text-base text-[#0058be] truncate max-w-[200px] flex items-center gap-2">
          <span className="material-symbols-outlined text-xl text-[#0058be] icon-filled">smart_toy</span>
          <span className="truncate">Hilal Sezer Portalı</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProfile}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#0058be]"
            title="Profilim"
          >
            <span className="material-symbols-outlined text-2xl">account_circle</span>
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-full hover:bg-red-50 text-slate-500 hover:text-red-600"
              title="Çıkış Yap"
            >
              <span className="material-symbols-outlined text-2xl">logout</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white border-t border-slate-200 pb-safe">
        <div className="flex justify-around items-center px-2 py-1.5">
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center p-1 transition-colors ${
              activePage === 'home' ? 'text-[#0058be]' : 'text-slate-500'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                activePage === 'home' ? 'icon-filled' : ''
              }`}
            >
              home
            </span>
            <span className="text-[10px] font-bold mt-0.5">Ana Sayfa</span>
          </button>

          <button
            onClick={() => onNavigate('notes')}
            className={`flex flex-col items-center p-1 transition-colors ${
              activePage === 'notes' ? 'text-[#0058be]' : 'text-slate-500'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                activePage === 'notes' ? 'icon-filled' : ''
              }`}
            >
              menu_book
            </span>
            <span className="text-[10px] font-bold mt-0.5">Notlar</span>
          </button>

          <button
            onClick={() => onNavigate('activities')}
            className={`flex flex-col items-center p-1 transition-colors ${
              activePage === 'activities' ? 'text-[#0058be]' : 'text-slate-500'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                activePage === 'activities' ? 'icon-filled' : ''
              }`}
            >
              sports_esports
            </span>
            <span className="text-[10px] font-bold mt-0.5">Etkinlik</span>
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className={`flex flex-col items-center p-1 transition-colors ${
              activePage === 'chat' ? 'text-[#0058be]' : 'text-slate-500'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                activePage === 'chat' ? 'icon-filled' : ''
              }`}
            >
              chat
            </span>
            <span className="text-[10px] font-bold mt-0.5">Mesajlar</span>
          </button>

          {isTeacher ? (
            <button
              onClick={() => onNavigate('teacher_panel')}
              className={`flex flex-col items-center p-1 transition-colors ${
                activePage === 'teacher_panel' ? 'text-[#0058be]' : 'text-slate-500'
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl ${
                  activePage === 'teacher_panel' ? 'icon-filled' : ''
                }`}
              >
                shield_person
              </span>
              <span className="text-[10px] font-bold mt-0.5">Öğretmen</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('competitions')}
              className={`flex flex-col items-center p-1 transition-colors ${
                activePage === 'competitions' ? 'text-[#0058be]' : 'text-slate-500'
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl ${
                  activePage === 'competitions' ? 'icon-filled' : ''
                }`}
              >
                emoji_events
              </span>
              <span className="text-[10px] font-bold mt-0.5">Yarışma</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
