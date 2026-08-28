import React, { useState } from 'react';
import { ASSETS } from '../data/portalData';
import { loginUser, registerStudent } from '../lib/supabase';
import { AuthUser } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register State
  const [regName, setRegName] = useState('');
  const [regGrade, setRegGrade] = useState('3-4. Sınıf');
  const [regSchoolNumber, setRegSchoolNumber] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regAvatar, setRegAvatar] = useState('robot_blue');

  // Feedback State
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const robotAvatars = [
    { id: 'robot_blue', label: 'Robo-Mavi', icon: 'robot_2', color: 'from-blue-500 to-indigo-600', border: 'border-blue-300' },
    { id: 'robot_pink', label: 'Robo-Pembe', icon: 'smart_toy', color: 'from-pink-400 to-rose-500', border: 'border-pink-300' },
    { id: 'robot_green', label: 'Robo-Yeşil', icon: 'precision_manufacturing', color: 'from-emerald-400 to-green-600', border: 'border-emerald-300' },
    { id: 'robot_purple', label: 'Robo-Mor', icon: 'memory', color: 'from-purple-500 to-indigo-700', border: 'border-purple-300' },
    { id: 'robot_amber', label: 'Robo-Altın', icon: 'emoji_events', color: 'from-amber-400 to-orange-500', border: 'border-amber-300' },
  ];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const res = await loginUser(username, password);
      if (res.success && res.user) {
        if (rememberMe) {
          localStorage.setItem('portal_auth_user', JSON.stringify(res.user));
        } else {
          sessionStorage.setItem('portal_auth_user', JSON.stringify(res.user));
        }
        onLoginSuccess(res.user);
      } else {
        setIsLoading(false);
        setErrorMsg(res.error || 'Giriş yapılamadı. Bilgilerinizi kontrol ediniz.');
      }
    } catch {
      setIsLoading(false);
      setErrorMsg('Bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (regPassword !== regPasswordConfirm) {
      setErrorMsg('Girdiğiniz şifreler birbiriyle eşleşmiyor!');
      return;
    }

    if (regPassword.length < 3) {
      setErrorMsg('Şifreniz en az 3 karakter olmalıdır.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerStudent({
        name: regName,
        grade: regGrade,
        schoolNumber: regSchoolNumber,
        username: regUsername,
        password: regPassword,
        avatarId: regAvatar,
      });

      if (res.success && res.user) {
        setSuccessMsg('Kayıt başarıyla tamamlandı! 50 Hoş Geldin Puanı kazandın 🎁');
        setTimeout(() => {
          localStorage.setItem('portal_auth_user', JSON.stringify(res.user));
          onLoginSuccess(res.user!);
        }, 800);
      } else {
        setIsLoading(false);
        setErrorMsg(res.error || 'Kayıt oluşturulamadı. Bilgilerinizi kontrol ediniz.');
      }
    } catch {
      setIsLoading(false);
      setErrorMsg('Kayıt sırasında bir sorun oluştu.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef2ff] via-[#f8faff] to-[#f0f4ff] flex flex-col justify-between items-center p-3 sm:p-6 md:p-8 relative overflow-hidden font-sans select-none">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#c7d7fe_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Colorful Mini Robots Around Canvas */}
      {/* 1. Pink Mini Robot (Top-Left) */}
      <div className="hidden lg:flex absolute top-8 left-8 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl shadow-lg border-2 border-pink-200 items-center gap-3 animate-bounce hover:scale-105 transition-transform">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
        </div>
        <div>
          <div className="text-xs font-black text-pink-600">Robo-Pembe</div>
          <div className="text-[10px] text-slate-500 font-medium">Okul Öncesi Rehberi</div>
        </div>
      </div>

      {/* 2. Green Mini Robot (Bottom-Left) */}
      <div className="hidden lg:flex absolute bottom-8 left-10 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl shadow-lg border-2 border-emerald-200 items-center gap-3 animate-pulse hover:scale-105 transition-transform">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">precision_manufacturing</span>
        </div>
        <div>
          <div className="text-xs font-black text-emerald-700">Robo-Yeşil</div>
          <div className="text-[10px] text-slate-500 font-medium">1-2. Sınıf Kodlama</div>
        </div>
      </div>

      {/* 3. Blue Mini Robot (Top-Right) */}
      <div className="hidden lg:flex absolute top-10 right-10 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl shadow-lg border-2 border-blue-200 items-center gap-3 animate-bounce hover:scale-105 transition-transform" style={{ animationDelay: '0.5s' }}>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">robot_2</span>
        </div>
        <div>
          <div className="text-xs font-black text-blue-700">Robo-Mavi</div>
          <div className="text-[10px] text-slate-500 font-medium">3-4. Sınıf Scratch</div>
        </div>
      </div>

      {/* 4. Purple Mini Robot (Bottom-Right) */}
      <div className="hidden lg:flex absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl shadow-lg border-2 border-purple-200 items-center gap-3 animate-pulse hover:scale-105 transition-transform" style={{ animationDelay: '0.7s' }}>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">memory</span>
        </div>
        <div>
          <div className="text-xs font-black text-purple-700">Robo-Mor</div>
          <div className="text-[10px] text-slate-500 font-medium">5-6. Sınıf Robotik</div>
        </div>
      </div>

      {/* Top Brand Header */}
      <header className="w-full max-w-4xl text-center pt-2 pb-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-blue-200 text-[#0058be] text-xs font-extrabold shadow-xs mb-2">
          <span className="material-symbols-outlined text-sm text-[#fea619] icon-filled">school</span>
          Bilişim Teknolojileri ve Yazılım Dersi
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0058be] tracking-tight drop-shadow-xs">
          Hilal Sezer Öğretmenin Bilişim Dünyası 🤖
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#424754] font-medium mt-1">
          Öğrenci Kayıt & Giriş Portalı
        </p>
      </header>

      {/* Main Authentication Card */}
      <main className="w-full max-w-lg my-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-[#adc6ff] relative">
          
          {/* Animated Center Mascot Robot & Speech Bubble */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#0058be] to-[#3b82f6] p-1 shadow-lg border-2 border-white flex items-center justify-center">
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
                {activeTab === 'login' ? 'Tekrar Hoş Geldin!' : 'Aramıza Katıl!'}
              </div>
              <p className="text-[11px] text-[#424754] mt-0.5 leading-snug font-medium">
                {activeTab === 'login'
                  ? 'Bilişim portalına giriş yapmak için bilgilerinizi yazınız.'
                  : 'Öğrenci kaydınızı oluşturup 50 puan ile hemen kodlamaya başlayın!'}
              </p>
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-r-8 border-r-[#adc6ff] border-b-6 border-b-transparent" />
            </div>
          </div>

          {/* Tab Switcher: Giriş Yap vs Öğrenci Kayıt Ol */}
          <div className="flex rounded-2xl bg-[#eef2ff] p-1.5 mb-5 border border-blue-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-[#0058be] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0058be]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">login</span>
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <span className="material-symbols-outlined text-lg">how_to_reg</span>
              Öğrenci Kayıt Ol
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-bold animate-shake">
              <span className="material-symbols-outlined text-red-500 text-lg shrink-0">error</span>
              <span className="flex-1">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-700 font-bold">
              <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0">celebration</span>
              <span className="flex-1">{successMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                    className="absolute right-3.5 text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                    title={showPassword ? 'Şifreyi Gizle' : 'Şifreyi Göster'}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

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
                  Güvenli Giriş
                </span>
              </div>

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
          ) : (
            /* TAB 2: STUDENT REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#2a303f] uppercase tracking-wider mb-1">
                    Ad Soyad *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none">
                      person
                    </span>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#f8faff] border-2 border-[#c2c6d6] focus:border-emerald-600 focus:bg-white rounded-xl text-xs font-bold text-slate-900 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#2a303f] uppercase tracking-wider mb-1">
                    Sınıf Seviyesi *
                  </label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#f8faff] border-2 border-[#c2c6d6] focus:border-emerald-600 focus:bg-white rounded-xl text-xs font-bold text-slate-900 outline-hidden transition-all"
                  >
                    <option value="Okul Öncesi">Okul Öncesi (Anaokulu)</option>
                    <option value="1-2. Sınıf">1-2. Sınıf</option>
                    <option value="3-4. Sınıf">3-4. Sınıf</option>
                    <option value="5-6. Sınıf">5-6. Sınıf</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#2a303f] uppercase tracking-wider mb-1">
                    Kullanıcı Adı *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none">
                      badge
                    </span>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="Örn: AHMETKOD"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#f8faff] border-2 border-[#c2c6d6] focus:border-emerald-600 focus:bg-white rounded-xl text-xs font-bold text-slate-900 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#2a303f] uppercase tracking-wider mb-1">
                    Okul Numarası (Opsiyonel)
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none">
                      tag
                    </span>
                    <input
                      type="text"
                      value={regSchoolNumber}
                      onChange={(e) => setRegSchoolNumber(e.target.value)}
                      placeholder="Örn: 1042"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#f8faff] border-2 border-[#c2c6d6] focus:border-emerald-600 focus:bg-white rounded-xl text-xs font-bold text-slate-900 outline-hidden transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#2a303f] uppercase tracking-wider mb-1">
                    Şifre *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none">
                      lock
                    </span>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Şifre belirleyin"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#f8faff] border-2 border-[#c2c6d6] focus:border-emerald-600 focus:bg-white rounded-xl text-xs font-bold text-slate-900 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#2a303f] uppercase tracking-wider mb-1">
                    Şifre Tekrar *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none">
                      lock_reset
                    </span>
                    <input
                      type="password"
                      required
                      value={regPasswordConfirm}
                      onChange={(e) => setRegPasswordConfirm(e.target.value)}
                      placeholder="Şifreyi tekrar yazın"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#f8faff] border-2 border-[#c2c6d6] focus:border-emerald-600 focus:bg-white rounded-xl text-xs font-bold text-slate-900 outline-hidden transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#2a303f] uppercase tracking-wider mb-1.5">
                  Favori Robot Maskotunu Seç 🤖
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {robotAvatars.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRegAvatar(r.id)}
                      className={`p-2 rounded-2xl flex flex-col items-center gap-1 border-2 transition-all cursor-pointer ${
                        regAvatar === r.id
                          ? 'border-[#0058be] bg-blue-50 scale-105 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-blue-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${r.color} text-white flex items-center justify-center shadow-xs`}>
                        <span className="material-symbols-outlined text-lg">{r.icon}</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-600 truncate w-full text-center">
                        {r.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-lg border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                    <span>Kayıt Yapılıyor...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">card_giftcard</span>
                    <span>Kayıt Ol & 50 Puan Kazan 🎁</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Mini Robot Parade at bottom of card */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-around text-slate-400">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-0.5">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
              </div>
              <span className="text-[8px] font-bold text-slate-500">Anaokulu</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-0.5">
                <span className="material-symbols-outlined text-sm">toys</span>
              </div>
              <span className="text-[8px] font-bold text-slate-500">1-2. Sınıf</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-0.5">
                <span className="material-symbols-outlined text-sm">code_blocks</span>
              </div>
              <span className="text-[8px] font-bold text-slate-500">3-4. Sınıf</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-0.5">
                <span className="material-symbols-outlined text-sm">terminal</span>
              </div>
              <span className="text-[8px] font-bold text-slate-500">5-6. Sınıf</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-2 text-[11px] font-bold text-slate-500 relative z-10 flex items-center justify-center gap-1.5">
        <span className="material-symbols-outlined text-sm text-[#fea619] icon-filled">verified</span>
        <span>© Hilal Sezer • Bilişim Teknolojileri ve Yazılım Portalı</span>
      </footer>
    </div>
  );
};
