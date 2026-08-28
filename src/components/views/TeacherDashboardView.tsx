import React, { useState, useEffect } from 'react';
import { RegisteredStudent, StudentActivity, PageId } from '../../types';
import {
  fetchStudents,
  fetchStudentActivities,
  isSupabaseConfigured,
} from '../../lib/supabase';

interface Props {
  onNavigate: (page: PageId) => void;
  onOpenChatWithStudent?: (studentId: string) => void;
}

export const TeacherDashboardView: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'activities' | 'students' | 'sql'>('activities');
  const [students, setStudents] = useState<RegisteredStudent[]>([]);
  const [activities, setActivities] = useState<StudentActivity[]>([]);
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const supabaseConnected = isSupabaseConfigured();

  const loadData = async () => {
    setIsLoading(true);
    const [stds, acts] = await Promise.all([
      fetchStudents(),
      fetchStudentActivities(),
    ]);
    setStudents(stds);
    setActivities(acts);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // Polling for live activity updates
    return () => clearInterval(interval);
  }, []);

  const totalPoints = students.reduce((acc, s) => acc + (s.points || 0), 0);
  const totalQuizzes = activities.filter((a) => a.activityType === 'quiz_completed').length;
  const totalGames = activities.filter((a) => a.activityType === 'game_played').length;

  const filteredActivities = activities.filter((act) => {
    const matchesType = activityFilter === 'all' || act.activityType === activityFilter;
    const matchesSearch =
      act.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.studentUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.studentGrade.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filteredStudents = students.filter((std) => {
    return (
      std.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.grade.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getActivityBadge = (type: StudentActivity['activityType']) => {
    switch (type) {
      case 'quiz_completed':
        return { label: 'Quiz Çözümü', icon: 'quiz', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'game_played':
        return { label: 'Oyun / Kodlama', icon: 'sports_esports', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'note_read':
        return { label: 'Not İnceleme', icon: 'menu_book', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'worksheet_done':
        return { label: 'Çalışma Tablosu', icon: 'table_chart', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'competition_joined':
        return { label: 'Turnuva Başvurusu', icon: 'emoji_events', bg: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'message_sent':
        return { label: 'Mesaj Gönderdi', icon: 'chat', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'login':
        return { label: 'Giriş Yaptı', icon: 'login', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'register':
        return { label: 'Yeni Kayıt', icon: 'how_to_reg', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      default:
        return { label: 'Etkinlik', icon: 'bolt', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
    }
  };

  const sqlSchemaCode = `-- ============================================================================
-- HİLAL SEZER BİLİŞİM DÜNYASI PORTALI - SUPABASE VERİTABANI KURULUM KODLARI (SQL)
-- ============================================================================
-- Supabase Panelinizde "SQL Editor" sekmesine yapıştırıp "RUN" butonuna basınız.

-- 1. ÖĞRENCİLER TABLOSU
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    grade TEXT NOT NULL,
    school_number TEXT DEFAULT '',
    avatar_id TEXT DEFAULT 'robot_blue',
    points INT DEFAULT 50,
    stars INT DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_active_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ÖĞRENCİ HAREKETLERİ TABLOSU
CREATE TABLE IF NOT EXISTS public.student_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT NOT NULL,
    student_username TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_grade TEXT NOT NULL,
    activity_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    points_earned INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ÖĞRENCİ - ÖĞRETMEN MESAJLAŞMA TABLOSU
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT NOT NULL,
    student_name TEXT DEFAULT '',
    student_username TEXT DEFAULT '',
    sender_role TEXT NOT NULL CHECK (sender_role IN ('student', 'teacher')),
    sender_name TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- İNDEKSLER (Hızlı Arama & Performans)
CREATE INDEX IF NOT EXISTS idx_students_username ON public.students(username);
CREATE INDEX IF NOT EXISTS idx_activities_student_id ON public.student_activities(student_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON public.student_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_student_id ON public.chat_messages(student_id);

-- GÜVENLİK (ROW LEVEL SECURITY POLİTİKALARI)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public insert students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update students" ON public.students FOR UPDATE USING (true);

CREATE POLICY "Allow public read activities" ON public.student_activities FOR SELECT USING (true);
CREATE POLICY "Allow public insert activities" ON public.student_activities FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read chat" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert chat" ON public.chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update chat" ON public.chat_messages FOR UPDATE USING (true);

-- REALTIME CANLI YAYIN
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_activities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlSchemaCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0058be] to-indigo-800 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-blue-100 text-xs font-black mb-2">
            <span className="material-symbols-outlined text-sm">shield_person</span>
            Öğretmen Yönetim Paneli
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Hilal Sezer • Öğrenci Hareketleri & Veritabanı 📊
          </h1>
          <p className="text-sm text-blue-100 mt-1 max-w-2xl font-medium">
            Öğrencilerinizin canlı etkinlik akışını, quiz başarılarını, mesajlarını ve Supabase veritabanı durumunu buradan anlık olarak takip edebilirsiniz.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => onNavigate('chat')}
            className="px-5 py-3 bg-[#fea619] hover:bg-amber-600 text-[#543000] font-black rounded-2xl shadow-lg transition-all text-xs flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            Mesajlara Git
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-black rounded-2xl border border-white/30 transition-all text-xs flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">database</span>
            Supabase SQL
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border-2 border-blue-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0058be] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">groups</span>
          </div>
          <div>
            <div className="text-2xl font-black text-[#0058be]">{students.length}</div>
            <div className="text-xs text-slate-500 font-bold">Kayıtlı Öğrenci</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">monitoring</span>
          </div>
          <div>
            <div className="text-2xl font-black text-purple-700">{activities.length}</div>
            <div className="text-xs text-slate-500 font-bold">Toplam Hareket</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-emerald-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">sports_esports</span>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700">{totalGames + totalQuizzes}</div>
            <div className="text-xs text-slate-500 font-bold">Oyun & Quiz Başarısı</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-amber-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">emoji_events</span>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-800">{totalPoints.toLocaleString('tr-TR')}</div>
            <div className="text-xs text-slate-500 font-bold">Kazanılan Puan</div>
          </div>
        </div>
      </div>

      {/* Database Connection Status Bar */}
      <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-3.5 h-3.5 rounded-full ${
              supabaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <div className="text-xs">
            <span className="font-extrabold text-slate-800">Veritabanı Durumu: </span>
            {supabaseConnected ? (
              <span className="text-emerald-700 font-bold">Supabase Canlı Bağlantı Aktif</span>
            ) : (
              <span className="text-amber-700 font-bold">
                Tarayıcı Depolama Store Modunda (Supabase SQL kodunu çalıştırıp ortam değişkenlerini bağlayabilirsiniz)
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => setActiveTab('sql')}
          className="text-xs font-black text-[#0058be] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>SQL Kodunu ve Kurulum Rehberini Aç</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Main Tabs Container */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-[#f8faff] p-2 gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'activities'
                ? 'bg-[#0058be] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-lg">history</span>
            Öğrenci Hareketleri Canlı Akışı ({activities.length})
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-[#0058be] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-lg">badge</span>
            Kayıtlı Öğrenciler Rehberi ({students.length})
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'sql'
                ? 'bg-[#0058be] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-lg">code</span>
            Supabase SQL Kurulum Kodu 🗄️
          </button>
        </div>

        {/* TAB 1: STUDENT ACTIVITIES LIVE STREAM */}
        {activeTab === 'activities' && (
          <div className="p-6 space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-slate-400 text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Öğrenci veya hareket ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 outline-hidden focus:border-[#0058be]"
                />
              </div>

              {/* Activity Type Pills */}
              <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar pb-1">
                {[
                  { id: 'all', label: 'Tümü' },
                  { id: 'quiz_completed', label: 'Quizler' },
                  { id: 'game_played', label: 'Oyunlar' },
                  { id: 'note_read', label: 'Notlar' },
                  { id: 'competition_joined', label: 'Turnuvalar' },
                  { id: 'message_sent', label: 'Mesajlar' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setActivityFilter(pill.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 transition-all cursor-pointer ${
                      activityFilter === pill.id
                        ? 'bg-[#0058be] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities List */}
            {isLoading ? (
              <div className="py-12 text-center text-slate-400 text-sm font-bold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Hareketler yükleniyor...
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm font-bold">
                Eşleşen öğrenci hareketi bulunamadı.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredActivities.map((act) => {
                  const badge = getActivityBadge(act.activityType);
                  return (
                    <div
                      key={act.id}
                      className="py-4 px-2 hover:bg-blue-50/40 rounded-2xl transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-blue-100 text-[#0058be] flex items-center justify-center shrink-0 font-bold shadow-xs">
                          <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-sm text-slate-900">
                              {act.studentName}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500">
                              (@{act.studentUsername})
                            </span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {act.studentGrade}
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${badge.bg}`}>
                              {badge.label}
                            </span>
                          </div>

                          <div className="text-xs font-bold text-slate-800 mt-1">
                            {act.title}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                            {act.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto shrink-0 gap-1 pl-14 sm:pl-0">
                        {act.pointsEarned > 0 && (
                          <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black flex items-center gap-1 shadow-2xs">
                            <span className="material-symbols-outlined text-sm">bolt</span>
                            +{act.pointsEarned} Puan
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-slate-400">
                          {new Date(act.createdAt).toLocaleString('tr-TR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REGISTERED STUDENTS DIRECTORY */}
        {activeTab === 'students' && (
          <div className="p-6 space-y-4">
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Öğrenci adı, kullanıcı adı veya sınıf ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 outline-hidden focus:border-[#0058be]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((std) => (
                <div
                  key={std.id}
                  className="bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                          <span className="material-symbols-outlined text-2xl">smart_toy</span>
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{std.name}</h4>
                          <div className="text-xs font-bold text-blue-600">@{std.username}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 font-black text-xs">
                          ⭐ {std.points} P
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-2xl mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">Sınıf Seviyesi:</span>
                        <span className="font-bold text-slate-800">{std.grade}</span>
                      </div>
                      {std.schoolNumber && (
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-bold">Okul No:</span>
                          <span className="font-bold text-slate-800">{std.schoolNumber}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">Kayıt Tarihi:</span>
                        <span className="font-bold text-slate-800">
                          {new Date(std.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('chat')}
                    className="w-full py-2.5 bg-[#0058be] hover:bg-[#004395] text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Öğrenciye Mesaj Yaz
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SUPABASE SQL KURULUM & KOD ALANI */}
        {activeTab === 'sql' && (
          <div className="p-6 space-y-6">
            {/* Active Supabase Project Credentials Summary */}
            <div className="bg-white border-2 border-indigo-100 rounded-3xl p-5 shadow-xs">
              <h4 className="font-extrabold text-sm text-indigo-950 flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-indigo-600 text-lg">link</span>
                Tanımlı Supabase Proje Bağlantı Bilgileri
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100">
                  <div className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider mb-1">Proje ID</div>
                  <div className="font-mono font-bold text-slate-800 break-all select-all">evnmjfdsxlrqxltixjfd</div>
                </div>
                <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100">
                  <div className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider mb-1">Data API (REST Endpoint)</div>
                  <div className="font-mono font-bold text-slate-800 break-all select-all">https://evnmjfdsxlrqxltixjfd.supabase.co/rest/v1/</div>
                </div>
                <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100">
                  <div className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider mb-1">API Key (Publishable / Anon)</div>
                  <div className="font-mono font-bold text-slate-800 truncate select-all" title="sb_publishable_TALZcgVMERV1OyCo-FHuMA_CKBkHJfm">
                    sb_publishable_TALZcgVMERV1...
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base text-[#0058be] flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">dataset</span>
                  Supabase Veritabanı Kurulum Talimatları
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl font-medium">
                  Aşağıdaki SQL scriptini Supabase Kontrol Panelinizdeki <b>SQL Editor</b> alanına yapıştırıp <b>Run</b> butonuna tıklayınız. Tüm tablolar (öğrenciler, hareketler, mesajlaşma) ve RLS izinleri otomatik kurulacaktır.
                </p>
              </div>

              <button
                onClick={copySqlToClipboard}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 shrink-0 transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">
                  {copiedSql ? 'check' : 'content_copy'}
                </span>
                <span>{copiedSql ? 'Kopyalandı! ✓' : 'SQL Kodunu Kopyala'}</span>
              </button>
            </div>

            {/* SQL Code Block */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 bg-[#1e293b] shadow-2xl">
              <div className="bg-[#0f172a] px-4 py-2.5 flex items-center justify-between border-b border-slate-700 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-bold text-slate-200">supabase_schema.sql</span>
                </span>

                <button
                  onClick={copySqlToClipboard}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-sans text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedSql ? 'check' : 'content_copy'}
                  </span>
                  {copiedSql ? 'Kopyalandı' : 'Kopyala'}
                </button>
              </div>

              <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-[450px]">
                {sqlSchemaCode}
              </pre>
            </div>

            {/* 3 Step Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-2">
                  1
                </div>
                <h5 className="font-black text-xs text-slate-900 mb-1">Supabase Hesabı & Proje</h5>
                <p className="text-[11px] text-slate-500">
                  Supabase kontrol panelinizde yeni bir proje açın veya mevcut projenize gidin.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-2">
                  2
                </div>
                <h5 className="font-black text-xs text-slate-900 mb-1">SQL Editor & Run</h5>
                <p className="text-[11px] text-slate-500">
                  Sol menüdeki <b>SQL Editor</b> sekmesine yukarıdaki kodu yapıştırıp <b>Run</b> butonuna basın.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-2">
                  3
                </div>
                <h5 className="font-black text-xs text-slate-900 mb-1">Ortam Değişkenleri</h5>
                <p className="text-[11px] text-slate-500">
                  Projenizin <b>Project Settings → API</b> bölümündeki Project URL ve Anon Key bilgilerini ekleyin.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
