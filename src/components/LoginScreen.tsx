import React, { useState } from 'react';
import { ASSETS } from '../data/portalData';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanUsername = username.trim().toUpperCase();
      const cleanPassword = password.trim();

      if (cleanUsername === 'HSEZER' && cleanPassword === '1721') {
        if (rememberMe) {
          localStorage.setItem('portal_auth_user', cleanUsername);
        } else {
          sessionStorage.setItem('portal_auth_user', cleanUsername);
        }
        onLoginSuccess(cleanUsername);
      } else {
        setIsLoading(false);
        setErrorMsg('Kullanıcı adı veya şifre hatalı! Lütfen bilgilerinizi kontrol ediniz.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef2ff] via-[#f8faff] to-[#f0f4ff] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans select-none">
      {/* Decorative Background Circles & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#c7d7fe_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Mini Colorful Robot Badges in the Canvas */}
      {/* 1. Pink Mini Robot (Top-Left) */}
      <div className="hidden lg:flex absolute top-12 left-12 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl shadow-lg border-2 border-pink-200 items-center gap-3 animate-bounce hover:scale-105 transition-transform">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
        </div>
        <div>
          <div className="text-xs font-black text-pink-600">Robo-Pembe</div>
          <div className="text-[10px] text-slate-500 font-medium">Okul Öncesi Rehberi</div>
        </div>
      </div>

      {/* 2. Green Mini Robot (Bottom-Left) */}
      <div className="hidden lg:flex absolute bottom-12 left-14 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl shadow-lg border-2 border-emerald-200 items-center gap-3 animate-pulse hover:scale-105 transition-transform">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">precision_manufacturing</span>
        </div>
        <div>
          <div className="text-xs font-black text-emerald-700">Robo-Yeşil</div>
          <div className="text-[10px] text-slate-500 font-medium">1-2. Sınıf Kodlama</div>
        </div>
      </div>

      {/* 3. Blue Mini Robot (Top-Right) */}
      <div className="hidden lg:flex absolute top-14 right-14 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl shadow-lg border-2 border-blue-200 items-center gap-3 animate-bounce hover:scale-105 transition-transform" style={{ animationDelay: '0.5s' }}>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">robot_2</span>
        </div>
        <div>
          <div className="text-xs font-black text-blue-700">Robo-Mavi</div>
          <div className="text-[10px] text-slate-500 font-medium">3-4. Sınıf Scratch</div>
        </div>
      </div>

      {/* 4. Purple Mini Robot (Bottom-Right) */}
      <div className="hidden lg:flex absolute bottom-14 right-12 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl shadow-lg border-2 border-purple-200 items-center gap-3 animate-pulse hover:scale-105 transition-transform" style={{ animationDelay: '0.7s' }}>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">memory</span>
        </div>
        <div>
          <div className="text-xs font-black text-purple-700">Robo-Mor</div>
          <div className="text-[10px] text-slate-500 font-medium">5-6. Sınıf Robotik</div>
        </div>
      </div>

      {/* 5. Orange Trophy Robot (Middle Right) */}
      <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border-2 border-amber-200 items-center gap-2.5 hover:scale-105 transition-transform">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xs">
          <span className="material-symbols-outlined text-xl">emoji_events</span>
        </div>
        <div>
          <div className="text-[11px] font-black text-amber-800">Şampiyon Robot</div>
          <div className="text-[9px] text-slate-500">Dönem Turnuvaları</div>
        </div>
      </div>

      {/* Top Brand Header */}
      <header className="w-full max-w-4xl text-center pt-2 pb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-blue-200 text-[#0058be] text-xs font-extrabold shadow-xs mb-3">
          <span className="material-symbols-outlined text-sm text-[#fea619] icon-filled">school</span>
          Bilişim Teknolojileri ve Yazılım Dersi
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0058be] tracking-tight drop-shadow-xs">
          Hilal Sezer Öğretmenin Bilişim Dünyası 🤖
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#424754] font-medium mt-1.5">
          Öğrenci & Öğretmen Portalı Güvenli Giriş Ekranı
        </p>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md my-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#adc6ff] relative">
          
          {/* Animated Center Mascot Robot & Speech Bubble */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0058be] to-[#3b82f6] p-1 shadow-lg border-2 border-white flex items-center justify-center">
                <img
                  src={ASSETS.robotAvatarRound}
                  alt="Rehber Robot"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                ✓
              </span>
            </div>

            <div className="bg-[#f0f4ff] border-2 border-[#adc6ff] rounded-2xl p-3 text-left relative flex-1">
              <div className="text-xs font-black text-[#0058be] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#fea619]">waving_hand</span>
                Hoş Geldin!
              </div>
              <p className="text-[11px] text-[#424754] mt-0.5 leading-snug font-medium">
                Bilişim dünyasına girmek için kullanıcı bilgilerinizi giriniz.
              </p>
              {/* Speech bubble pointer */}
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-r-8 border-r-[#adc6ff] border-b-6 border-b-transparent" />
            </div>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="mb-4 p-3.5 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-bold animate-shake">
              <span className="material-symbols-outlined text-red-500 text-lg">error</span>
              <span className="flex-1">{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-extrabold text-[#2a303f] uppercase tracking-wider mb-1.5">
                Kullanıcı Adı
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-xl pointer-events-none">
                  account_circle
                </span>
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı adınızı giriniz"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8faff] border-2 border-[#c2c6d6] focus:border-[#0058be] focus:bg-white rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-hidden transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-extrabold text-[#2a303f] uppercase tracking-wider mb-1.5">
                Şifre
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-xl pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi giriniz"
                  className="w-full pl-11 pr-11 py-3.5 bg-[#f8faff] border-2 border-[#c2c6d6] focus:border-[#0058be] focus:bg-white rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-hidden transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 transition-colors p-1"
                  title={showPassword ? 'Şifreyi Gizle' : 'Şifreyi Göster'}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md text-[#0058be] focus:ring-[#0058be] border-slate-300 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-600">Beni hatırla</span>
              </label>
              <span className="text-[11px] font-semibold text-slate-400">
                Güvenli Oturum
              </span>
            </div>

            {/* Submit Button with 3D Effect */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#0058be] hover:bg-[#004395] text-white font-extrabold text-base rounded-2xl shadow-lg border-b-4 border-[#003880] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">login</span>
                  <span>Portala Giriş Yap</span>
                </>
              )}
            </button>
          </form>

          {/* Mini Robot Parade at bottom of card */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-around text-slate-400">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-base">smart_toy</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500">Anaokulu</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-base">toys</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500">1-2. Sınıf</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-base">code_blocks</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500">3-4. Sınıf</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-base">terminal</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500">5-6. Sınıf</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-3 text-[11px] font-bold text-slate-500 relative z-10 flex items-center justify-center gap-1.5">
        <span className="material-symbols-outlined text-sm text-[#fea619] icon-filled">verified</span>
        <span>© Hilal Sezer • Bilişim Teknolojileri ve Yazılım Portalı</span>
      </footer>
    </div>
  );
};
