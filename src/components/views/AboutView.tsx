import React, { useState } from 'react';
import { ASSETS } from '../../data/portalData';
import confetti from 'canvas-confetti';

export const AboutView: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderClass, setSenderClass] = useState('5-A');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    confetti();
  };

  const rules = [
    { icon: 'clean_hands', title: 'Temiz & Düzenli Çalışma', desc: 'Bilgisayar laboratuvarına yiyecek ve içecekle girmiyoruz.' },
    { icon: 'headphones', title: 'Saygılı Kullanım', desc: 'Kulaklık kullanarak arkadaşlarımızın dikkatini dağıtmıyoruz.' },
    { icon: 'security', title: 'Güvenli İnternet', desc: 'Kişisel şifrelerimizi kimseyle paylaşmıyoruz.' },
    { icon: 'power_settings_new', title: 'Doğru Kapatma', desc: 'Ders bitiminde bilgisayarlarımızı kurallara uygun kapatıyoruz.' }
  ];

  return (
    <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Teacher Profile Banner */}
      <section className="bg-white rounded-3xl p-8 md:p-10 border-2 border-blue-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-36 h-36 rounded-3xl bg-blue-600 p-1 shadow-lg shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src={ASSETS.robotAvatarRound}
            alt="Hilal Sezer Öğretmen"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <span className="material-symbols-outlined text-sm">school</span>
            Bilişim Teknolojileri & Yazılım Öğretmeni
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Hilal Sezer</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sevgili öğrencilerim ve değerli velilerimiz, bu portalı okul öncesinden 6. sınıfa kadar tüm öğrencilerimizin
            bilişimsel düşünme, algoritma kurma, yaratıcı kodlama ve dijital güvenlik becerilerini desteklemek amacıyla tasarladım.
          </p>
        </div>
      </section>

      {/* Lab Rules */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600">verified_user</span>
          Bilişim Laboratuvarı Kurallarımız
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rules.map((r, i) => (
            <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">{r.icon}</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{r.title}</h4>
                <p className="text-xs text-slate-600">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Message Teacher Form */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border-2 border-indigo-100 space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-indigo-950 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">mail</span>
            Hilal Öğretmene Mesaj Gönder
          </h3>
          <p className="text-xs text-indigo-900/80 mt-1">
            Anlamadığın bir konu, yarışma projen veya aklına takılan sorular için mesaj bırakabilirsin!
          </p>
        </div>

        {sent ? (
          <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-emerald-600">send_and_archive</span>
            <h4 className="font-bold text-emerald-900">Mesajın Başarıyla İletildi!</h4>
            <p className="text-xs text-emerald-700">Hilal Öğretmen mesajını okuyup derste sana geri bildirim verecek.</p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Adın Soyadın</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Adın Soyadın"
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sınıfın</label>
                <select
                  value={senderClass}
                  onChange={(e) => setSenderClass(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="Anaokulu">Anaokulu</option>
                  <option value="1-A">1-A</option>
                  <option value="2-A">2-A</option>
                  <option value="3-A">3-A</option>
                  <option value="4-A">4-A</option>
                  <option value="5-A">5-A</option>
                  <option value="6-A">6-A</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mesajın / Sorun</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Öğretmenim, Scratch projemdeki kuklayı zıplatırken bir hata alıyorum..."
                className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md transition-colors text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">send</span>
              Mesajı Gönder
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
