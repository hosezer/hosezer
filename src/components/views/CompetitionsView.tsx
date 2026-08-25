import React from 'react';
import { Competition } from '../../types';
import { COMPETITIONS, ASSETS } from '../../data/portalData';

interface Props {
  onOpenCompetition: (comp: Competition) => void;
  joinedCompetitions: string[];
}

export const CompetitionsView: React.FC<Props> = ({
  onOpenCompetition,
  joinedCompetitions
}) => {
  const mainCompetition = COMPETITIONS[0]; // Scratch Kodlama Yarışması

  const leaderboard = [
    { rank: 1, name: 'Zeynep Kaya', grade: '6-A', project: 'Siber Labirent Oyunu', score: '98 Puan', icon: '🥇' },
    { rank: 2, name: 'Emir Demir', grade: '5-B', project: 'Gezegen Savunucusu', score: '95 Puan', icon: '🥈' },
    { rank: 3, name: 'Elif Su Yılmaz', grade: '6-C', project: 'Çevre Koruma Macerası', score: '93 Puan', icon: '🥉' },
    { rank: 4, name: 'Ahmet Çelik', grade: '5-A', project: 'Robo-Matematik Koşusu', score: '90 Puan', icon: '⭐' },
    { rank: 5, name: 'Selin Aydın', grade: '4-A', project: 'Cubetto Çiftlik Rotası', score: '89 Puan', icon: '⭐' }
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Banner Matching Image 3 */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#003da5] via-[#0058be] to-[#2170e4] text-white p-8 md:p-14 shadow-xl border-4 border-white/20">
        {/* Background decorative glowing orbs */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#fea619]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-300/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#fea619] text-[#684000] px-4 py-1.5 rounded-full font-extrabold text-xs shadow-md">
              <span className="material-symbols-outlined text-base icon-filled">emoji_events</span>
              Dönem Sonu Büyük Turnuvası
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Scratch Kodlama <br />
              <span className="text-[#ffddb8]">Yarışması 🏆</span>
            </h1>

            {/* Speech bubble quote matching Image 3 */}
            <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-sm md:text-base font-medium max-w-lg text-blue-50 shadow-inner">
              "Hayalindeki oyunu tasarla, büyük ödülleri kazan! Son başvuru tarihini kaçırma."
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenCompetition(mainCompetition)}
                className="bg-[#fea619] hover:bg-[#ffb95f] text-[#684000] px-8 py-4 rounded-2xl font-extrabold text-base shadow-lg shadow-amber-900/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                {joinedCompetitions.includes(mainCompetition.id) ? 'Başvurun Alındı ✓' : 'Hemen Katıl'}
              </button>

              <div className="text-xs font-semibold text-blue-100 flex items-center gap-1 bg-black/20 px-4 py-3 rounded-2xl">
                <span className="material-symbols-outlined text-sm">event</span>
                Son Katılım: {mainCompetition.deadline}
              </div>
            </div>
          </div>

          {/* 3D Space Suit Robot Mascot Matching Image 3 */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 flex items-center justify-center animate-mascot-float">
            <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-full border-4 border-white/40 p-3 shadow-2xl flex items-center justify-center overflow-hidden">
              <img
                src={ASSETS.robotHeroCompetition}
                alt="Yarışma Şampiyon Robotu"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Golden Star badge */}
            <div className="absolute -bottom-2 -left-2 bg-[#fea619] text-[#684000] w-14 h-14 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center font-extrabold text-xl rotate-12">
              ★
            </div>
          </div>
        </div>
      </section>

      {/* All Available Competitions Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#191b23]">
            Tüm Aktif Yarışma ve Turnuvalar
          </h2>
          <p className="text-sm text-[#424754]">
            Kendi sınıf kademene uygun yarışmayı seç, projenle yeteneğini sergile!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMPETITIONS.map((comp) => {
            const isJoined = joinedCompetitions.includes(comp.id);

            return (
              <div
                key={comp.id}
                className="bg-white rounded-3xl p-6 border-2 border-[#adc6ff]/50 shadow-[0_4px_20px_rgba(0,88,190,0.06)] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
                      {comp.targetGrades}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{comp.category}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {comp.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">{comp.shortDesc}</p>

                  <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 border border-slate-100">
                    <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                      <span className="material-symbols-outlined text-amber-500 text-sm">military_tech</span>
                      Ödüller: {comp.prizes[0]}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-blue-500 text-sm">schedule</span>
                      Bitiş: {comp.deadline}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <button
                    onClick={() => onOpenCompetition(comp)}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isJoined
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-[#0058be] text-white hover:bg-[#004395] shadow-md'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {isJoined ? 'check_circle' : 'how_to_reg'}
                    </span>
                    {isJoined ? 'Başvuruldu (Düzenle)' : 'Detaylar & Katıl'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hall of Fame Leaderboard */}
      <section className="bg-white rounded-3xl p-8 border-2 border-[#d8e2ff] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500 text-3xl icon-filled">
              leaderboard
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-slate-800">
                Bilişim Yıldızları Panosu
              </h3>
              <p className="text-xs text-slate-500">
                Önceki dönem yarışmalarında dereceye giren örnek projeler
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
            2024-2025 Sezonu
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-extrabold">
                <th className="pb-3 px-2">Sıra</th>
                <th className="pb-3 px-4">Öğrenci</th>
                <th className="pb-3 px-4">Sınıf</th>
                <th className="pb-3 px-4">Proje Başlığı</th>
                <th className="pb-3 px-4 text-right">Puan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {leaderboard.map((item) => (
                <tr key={item.rank} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3 px-2 font-bold text-base">{item.icon}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{item.name}</td>
                  <td className="py-3 px-4 text-slate-600">{item.grade}</td>
                  <td className="py-3 px-4 text-blue-700 font-semibold">{item.project}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-amber-600">
                    {item.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
