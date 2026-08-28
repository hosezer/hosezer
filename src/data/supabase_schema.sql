-- ============================================================================
-- HİLAL SEZER BİLİŞİM DÜNYASI PORTALI - SUPABASE VERİTABANI KURULUM KODLARI (SQL)
-- ============================================================================
-- Bu SQL kodlarını Supabase Kontrol Panelinizdeki "SQL Editor" bölümüne yapıştırıp
-- "RUN" (Çalıştır) butonuna basarak tüm tabloları ve güvenlik kurallarını anında kurabilirsiniz.
-- ============================================================================

-- 1. ÖĞRENCİLER TABLOSU (students)
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

-- 2. ÖĞRENCİ HAREKETLERİ / ETKİNLİK GEÇMİŞİ TABLOSU (student_activities)
CREATE TABLE IF NOT EXISTS public.student_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT NOT NULL,
    student_username TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_grade TEXT NOT NULL,
    activity_type TEXT NOT NULL, -- 'login', 'register', 'note_read', 'worksheet_done', 'game_played', 'quiz_completed', 'competition_joined', 'message_sent'
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    points_earned INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ÖĞRENCİ - ÖĞRETMEN MESAJLAŞMA TABLOSU (chat_messages)
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

-- ============================================================================
-- İNDEKSLER (Performans ve Hızlı Arama İçin)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_students_username ON public.students(username);
CREATE INDEX IF NOT EXISTS idx_activities_student_id ON public.student_activities(student_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON public.student_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_student_id ON public.chat_messages(student_id);
CREATE INDEX IF NOT EXISTS idx_chat_created_at ON public.chat_messages(created_at ASC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLİTİKALARI (Anonim ve Yetkili İstemciler İçin)
-- ============================================================================
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Students tablosu izinleri
CREATE POLICY "Allow public read students" ON public.students
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert students" ON public.students
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update students" ON public.students
    FOR UPDATE USING (true);

-- Student activities tablosu izinleri
CREATE POLICY "Allow public read activities" ON public.student_activities
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert activities" ON public.student_activities
    FOR INSERT WITH CHECK (true);

-- Chat messages tablosu izinleri
CREATE POLICY "Allow public read chat" ON public.chat_messages
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert chat" ON public.chat_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update chat" ON public.chat_messages
    FOR UPDATE USING (true);

-- ============================================================================
-- REALTIME YAYINI AKTİFLEŞTİRME (Canlı Mesajlaşma ve Hareket Takibi İçin)
-- ============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_activities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
