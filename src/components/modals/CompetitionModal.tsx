import React, { useState } from 'react';
import { Competition } from '../../types';
import confetti from 'canvas-confetti';

interface Props {
  competition: Competition | null;
  onClose: () => void;
  onJoinSuccess: (compId: string) => void;
  hasJoined: boolean;
}

export const CompetitionModal: React.FC<Props> = ({
  competition,
  onClose,
  onJoinSuccess,
  hasJoined
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('5-A');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [submitted, setSubmitted] = useState(hasJoined);

  if (!competition) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onJoinSuccess(competition.id);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-amber-300 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold">
              🏆
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                {competition.category} • {competition.targetGrades}
              </span>
              <h2 className="text-xl font-extrabold">{competition.title}</h2>
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
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Summary Box */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-900 text-sm">
            <p className="font-bold mb-1">📅 Son Başvuru Tarihi: {competition.deadline}</p>
            <p className="text-amber-800">{competition.shortDesc}</p>
          </div>

          {/* Prizes */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-lg">military_tech</span>
              Yarışma Ödülleri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {competition.prizes.map((prize, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  {prize}
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500 text-lg">gavel</span>
              Katılım Kuralları
            </h3>
            <ul className="space-y-1.5 pl-2 text-xs text-slate-600">
              {competition.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission Form */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">rocket_launch</span>
              {submitted ? 'Katılım Durumun: Kayıtlısın 🎉' : 'Yarışmaya Katıl & Projeni Gönder'}
            </h3>

            {submitted ? (
              <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-2">
                <span className="material-symbols-outlined text-5xl text-emerald-600">verified</span>
                <h4 className="text-lg font-extrabold text-emerald-900">Tebrikler, Kaydın Alındı!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Hilal Sezer Öğretmen projeni inceleyecek ve değerlendirme sonuçları okul panosu ve portal üzerinden duyurulacaktır.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Tamam, Pencereyi Kapat
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Adın ve Soyadın *</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Örn: Hilal Sezer"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sınıfın *</label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="Anaokulu">Anaokulu</option>
                      <option value="1-A">1-A</option>
                      <option value="2-A">2-A</option>
                      <option value="3-A">3-A</option>
                      <option value="4-A">4-A</option>
                      <option value="5-A">5-A</option>
                      <option value="5-B">5-B</option>
                      <option value="6-A">6-A</option>
                      <option value="6-B">6-B</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Projenin / Oyununun Adı *</label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Örn: Uzay Macerası Oyunu"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Scratch Proje Linki veya Proje Dosya Notu</label>
                  <input
                    type="text"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    placeholder="Örn: https://scratch.mit.edu/projects/123456789"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Projenin Hikayesi ve Nasıl Oynandığı</label>
                  <textarea
                    rows={2}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Karakterleri nasıl kontrol ediyoruz? Hedef ne?..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">how_to_reg</span>
                  Yarışma Başvurumu Tamamla (+100 Puan)
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
