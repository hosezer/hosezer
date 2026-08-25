import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { ASSETS } from '../../data/portalData';

interface Props {
  profile: StudentProfile;
  onClose: () => void;
  onUpdateName: (name: string, grade: string) => void;
}

export const ProfileModal: React.FC<Props> = ({ profile, onClose, onUpdateName }) => {
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState(profile.grade);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateName(name, grade);
    setIsEditing(false);
  };

  const badges = [
    { title: 'İlk Kod Kaşifi', desc: 'Portala ilk giriş yapıldı', icon: 'explore', earned: true, color: '#0058be' },
    { title: 'Ders Notu Kurdu', desc: '2 ders notu tamamlandı', icon: 'menu_book', earned: profile.completedNotes.length >= 2, color: '#006947' },
    { title: 'Süper Test Ustası', desc: 'Bölüm sonu quizleri çözüldü', icon: 'verified', earned: profile.completedQuizzes.length >= 1, color: '#fea619' },
    { title: 'Yarışmacı Ruh', desc: 'Kodlama yarışmasına katılım sağlandı', icon: 'military_tech', earned: profile.joinedCompetitions.length >= 1, color: '#855300' },
    { title: 'Geleceğin Mühendisi', desc: 'Robotik ve AI modülleri incelendi', icon: 'smart_toy', earned: profile.points > 300, color: '#9370db' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ASSETS.robotAvatarRound}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-2 border-white shadow-md bg-white object-cover"
            />
            <div>
              <h2 className="text-xl font-extrabold">{profile.name}</h2>
              <p className="text-xs text-blue-100 font-medium">Öğrenci Profili • {profile.grade}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl">
              <span className="material-symbols-outlined text-blue-600 text-2xl icon-filled">bolt</span>
              <div className="text-xl font-extrabold text-blue-900 mt-0.5">{profile.points}</div>
              <div className="text-[11px] font-bold text-blue-600">Bilişim Puanı</div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
              <span className="material-symbols-outlined text-amber-500 text-2xl icon-filled">star</span>
              <div className="text-xl font-extrabold text-amber-900 mt-0.5">{profile.stars}</div>
              <div className="text-[11px] font-bold text-amber-600">Yıldızlar</div>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <span className="material-symbols-outlined text-emerald-600 text-2xl icon-filled">school</span>
              <div className="text-xl font-extrabold text-emerald-900 mt-0.5">{profile.completedNotes.length}</div>
              <div className="text-[11px] font-bold text-emerald-600">Tamamlanan Ders</div>
            </div>
          </div>

          {/* Profile Edit */}
          {isEditing ? (
            <form onSubmit={handleSave} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <h4 className="font-bold text-xs text-slate-700 uppercase">Bilgileri Güncelle</h4>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Adın Soyadın</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Sınıfın</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl text-sm"
                >
                  <option value="Anaokulu">Anaokulu</option>
                  <option value="1. Sınıf">1. Sınıf</option>
                  <option value="2. Sınıf">2. Sınıf</option>
                  <option value="3. Sınıf">3. Sınıf</option>
                  <option value="4. Sınıf">4. Sınıf</option>
                  <option value="5. Sınıf">5. Sınıf</option>
                  <option value="6. Sınıf">6. Sınıf</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-800">{profile.name}</span> • {profile.grade}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                Düzenle
              </button>
            </div>
          )}

          {/* Badges Section */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">military_tech</span>
              Kazanılan Rozetler
            </h3>
            <div className="space-y-2">
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    b.earned
                      ? 'bg-white border-blue-200 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: b.earned ? b.color : '#94a3b8' }}
                    >
                      <span className="material-symbols-outlined text-xl">{b.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{b.title}</h4>
                      <p className="text-[11px] text-slate-500">{b.desc}</p>
                    </div>
                  </div>
                  {b.earned ? (
                    <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-slate-400 text-lg">lock</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
