import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthUser, RegisteredStudent, StudentActivity, ChatMessage } from '../types';

// Supabase Project Credentials
export const SUPABASE_PROJECT_ID = 'evnmjfdsxlrqxltixjfd';
export const DEFAULT_SUPABASE_URL = 'https://evnmjfdsxlrqxltixjfd.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_TALZcgVMERV1OyCo-FHuMA_CKBkHJfm';
export const DEFAULT_DATA_API = 'https://evnmjfdsxlrqxltixjfd.supabase.co/rest/v1/';

function sanitizeSupabaseUrl(url: string): string {
  if (!url) return DEFAULT_SUPABASE_URL;
  let clean = url.trim();
  clean = clean.replace(/\/rest\/v1\/?$/, '');
  clean = clean.replace(/\/+$/, '');
  return clean || DEFAULT_SUPABASE_URL;
}

// Environment variables
const metaEnv = (import.meta as any).env || {};
const rawUrl = metaEnv.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const rawKey = metaEnv.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
export const supabaseAnonKey = rawKey || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));
};

let client: SupabaseClient | null = null;
if (isSupabaseConfigured()) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.warn('Supabase client init error, falling back to local store:', err);
  }
}

export const getSupabaseClient = () => client;

// ----------------------------------------------------------------------------
// LOCAL STORAGE KEYS & INITIAL DEMO DATA (Fallback when Supabase keys not provided)
// ----------------------------------------------------------------------------
const STORAGE_KEYS = {
  STUDENTS: 'portal_db_students',
  ACTIVITIES: 'portal_db_activities',
  MESSAGES: 'portal_db_messages',
  CURRENT_USER: 'portal_db_current_user',
};

const INITIAL_DEMO_STUDENTS: RegisteredStudent[] = [
  {
    id: 'student-1',
    username: 'AHMETKOD',
    name: 'Ahmet Yılmaz',
    grade: '3-4. Sınıf (4/B)',
    schoolNumber: '1042',
    avatarId: 'robot_blue',
    points: 480,
    stars: 18,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    lastActiveAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'student-2',
    username: 'ZEYNEPROBOT',
    name: 'Zeynep Kaya',
    grade: '5-6. Sınıf (5/A)',
    schoolNumber: '891',
    avatarId: 'robot_pink',
    points: 620,
    stars: 24,
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    lastActiveAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'student-3',
    username: 'CANERBILISIM',
    name: 'Caner Demir',
    grade: '1-2. Sınıf (2/C)',
    schoolNumber: '412',
    avatarId: 'robot_green',
    points: 290,
    stars: 12,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastActiveAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'student-4',
    username: 'ELIFMINIK',
    name: 'Elif Şahin',
    grade: 'Okul Öncesi',
    schoolNumber: '78',
    avatarId: 'robot_purple',
    points: 150,
    stars: 8,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    lastActiveAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

const INITIAL_DEMO_ACTIVITIES: StudentActivity[] = [
  {
    id: 'act-1',
    studentId: 'student-2',
    studentUsername: 'ZEYNEPROBOT',
    studentName: 'Zeynep Kaya',
    studentGrade: '5-6. Sınıf (5/A)',
    activityType: 'quiz_completed',
    title: 'Algoritma ve Akış Şeması Quizini Çözdü',
    description: 'Tüm soruları doğru yanıtlayarak altın kupa kazandı!',
    pointsEarned: 100,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'act-2',
    studentId: 'student-1',
    studentUsername: 'AHMETKOD',
    studentName: 'Ahmet Yılmaz',
    studentGrade: '3-4. Sınıf (4/B)',
    activityType: 'game_played',
    title: 'Labirent Robotu Kodlama Oyununu Tamamladı',
    description: 'Bölüm 5 seviyesini başarıyla bitirdi.',
    pointsEarned: 50,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'act-3',
    studentId: 'student-3',
    studentUsername: 'CANERBILISIM',
    studentName: 'Caner Demir',
    studentGrade: '1-2. Sınıf (2/C)',
    activityType: 'note_read',
    title: 'Bilgisayar Parçaları Notunu İnceledi',
    description: 'Ders notu ve çalışma tablosunu tamamladı.',
    pointsEarned: 30,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'act-4',
    studentId: 'student-1',
    studentUsername: 'AHMETKOD',
    studentName: 'Ahmet Yılmaz',
    studentGrade: '3-4. Sınıf (4/B)',
    activityType: 'competition_joined',
    title: 'Cumhuriyet Kodlama Turnuvasına Katıldı',
    description: 'Proje başvurusu başarıyla alındı.',
    pointsEarned: 100,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

const INITIAL_DEMO_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    studentId: 'student-1',
    studentName: 'Ahmet Yılmaz',
    studentUsername: 'AHMETKOD',
    senderRole: 'teacher',
    senderName: 'Hilal Öğretmen',
    message: 'Merhaba Ahmet! Kodlama projelerinde harika ilerliyorsun, sorun olursa buradayım.',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'msg-2',
    studentId: 'student-1',
    studentName: 'Ahmet Yılmaz',
    studentUsername: 'AHMETKOD',
    senderRole: 'student',
    senderName: 'Ahmet Yılmaz',
    message: 'Teşekkürler öğretmenim! Scratch labirent oyununun 4. seviyesini bitirdim 🚀',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'msg-3',
    studentId: 'student-2',
    studentName: 'Zeynep Kaya',
    studentUsername: 'ZEYNEPROBOT',
    senderRole: 'teacher',
    senderName: 'Hilal Öğretmen',
    message: 'Tebrikler Zeynep! Algoritma quizindeki yüksek başarın için 100 puan kazandın 🎉',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
];

// Helper to get local storage data
function getLocal<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

// Initialize default storage on first load if empty
export function initLocalStore() {
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    setLocal(STORAGE_KEYS.STUDENTS, INITIAL_DEMO_STUDENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    setLocal(STORAGE_KEYS.ACTIVITIES, INITIAL_DEMO_ACTIVITIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    setLocal(STORAGE_KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);
  }
}

// ----------------------------------------------------------------------------
// AUTHENTICATION & STUDENT REGISTRATION
// ----------------------------------------------------------------------------
export async function registerStudent(data: {
  username: string;
  password: string;
  name: string;
  grade: string;
  schoolNumber?: string;
  avatarId?: string;
}): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  initLocalStore();
  const cleanUsername = data.username.trim().toUpperCase();

  if (!cleanUsername || cleanUsername.length < 3) {
    return { success: false, error: 'Kullanıcı adı en az 3 karakter olmalıdır.' };
  }
  if (!data.password || data.password.length < 3) {
    return { success: false, error: 'Şifre en az 3 karakter olmalıdır.' };
  }
  if (!data.name.trim()) {
    return { success: false, error: 'Lütfen adınızı ve soyadınızı giriniz.' };
  }
  if (cleanUsername === 'HSEZER') {
    return { success: false, error: 'Bu kullanıcı adı öğretmen için ayrılmıştır.' };
  }

  // 1. Check if Supabase client is available
  if (client) {
    try {
      const { data: existing } = await client
        .from('students')
        .select('id')
        .eq('username', cleanUsername)
        .maybeSingle();

      if (existing) {
        return { success: false, error: 'Bu kullanıcı adı zaten alınmış! Lütfen farklı bir kullanıcı adı seçiniz.' };
      }

      const newStudent = {
        username: cleanUsername,
        password: data.password,
        name: data.name.trim(),
        grade: data.grade,
        school_number: data.schoolNumber || '',
        avatar_id: data.avatarId || 'robot_blue',
        points: 50, // Welcome gift points
        stars: 5,
      };

      const { data: inserted, error } = await client
        .from('students')
        .insert([newStudent])
        .select()
        .single();

      if (error) {
        console.error('Supabase register error:', error);
        throw error;
      }

      const authUser: AuthUser = {
        id: inserted.id,
        username: inserted.username,
        role: 'student',
        name: inserted.name,
        grade: inserted.grade,
        schoolNumber: inserted.school_number,
        avatarId: inserted.avatar_id,
        points: inserted.points,
        stars: inserted.stars,
        createdAt: inserted.created_at,
        lastActiveAt: inserted.last_active_at,
      };

      // Log registration activity
      await logStudentActivity({
        studentId: authUser.id,
        studentUsername: authUser.username,
        studentName: authUser.name,
        studentGrade: authUser.grade || 'Öğrenci',
        activityType: 'register',
        title: 'Bilişim Dünyasına Katıldı 🎉',
        description: 'Yeni öğrenci kaydı tamamlandı ve 50 hoş geldin puanı kazandı!',
        pointsEarned: 50,
        createdAt: new Date().toISOString(),
      });

      // Send welcome message from teacher
      await sendChatMessage({
        studentId: authUser.id,
        studentName: authUser.name,
        studentUsername: authUser.username,
        senderRole: 'teacher',
        senderName: 'Hilal Öğretmen',
        message: `Hoş geldin ${authUser.name}! 🌟 Bilişim dünyasında ders notlarını inceleyebilir, oyunlarla kodlama öğrenebilir ve takıldığın her şeyi bana buradan sorabilirsin!`,
        isRead: false,
        createdAt: new Date().toISOString(),
      });

      return { success: true, user: authUser };
    } catch (e: any) {
      console.warn('Supabase register failed, falling back to local:', e);
    }
  }

  // 2. Local Storage Fallback
  const students = getLocal<RegisteredStudent[]>(STORAGE_KEYS.STUDENTS, INITIAL_DEMO_STUDENTS);
  if (students.some((s) => s.username.toUpperCase() === cleanUsername)) {
    return { success: false, error: 'Bu kullanıcı adı zaten alınmış! Lütfen farklı bir kullanıcı adı seçiniz.' };
  }

  const newStudent: RegisteredStudent = {
    id: `student-${Date.now()}`,
    username: cleanUsername,
    password: data.password,
    name: data.name.trim(),
    grade: data.grade,
    schoolNumber: data.schoolNumber || '',
    avatarId: data.avatarId || 'robot_blue',
    points: 50,
    stars: 5,
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };

  students.push(newStudent);
  setLocal(STORAGE_KEYS.STUDENTS, students);

  const authUser: AuthUser = {
    id: newStudent.id,
    username: newStudent.username,
    role: 'student',
    name: newStudent.name,
    grade: newStudent.grade,
    schoolNumber: newStudent.schoolNumber,
    avatarId: newStudent.avatarId,
    points: newStudent.points,
    stars: newStudent.stars,
    createdAt: newStudent.createdAt,
    lastActiveAt: newStudent.lastActiveAt,
  };

  // Log activity
  await logStudentActivity({
    studentId: authUser.id,
    studentUsername: authUser.username,
    studentName: authUser.name,
    studentGrade: authUser.grade || 'Öğrenci',
    activityType: 'register',
    title: 'Bilişim Dünyasına Katıldı 🎉',
    description: 'Yeni öğrenci kaydı tamamlandı ve 50 hoş geldin puanı kazandı!',
    pointsEarned: 50,
    createdAt: new Date().toISOString(),
  });

  // Welcome message
  await sendChatMessage({
    studentId: authUser.id,
    studentName: authUser.name,
    studentUsername: authUser.username,
    senderRole: 'teacher',
    senderName: 'Hilal Öğretmen',
    message: `Hoş geldin ${authUser.name}! 🌟 Bilişim dünyasında ders notlarını inceleyebilir, oyunlarla kodlama öğrenebilir ve takıldığın her şeyi bana buradan sorabilirsin!`,
    isRead: false,
    createdAt: new Date().toISOString(),
  });

  return { success: true, user: authUser };
}

export async function loginUser(
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  initLocalStore();
  const cleanUsername = usernameInput.trim().toUpperCase();
  const cleanPassword = passwordInput.trim();

  // Check Teacher Login first
  if (cleanUsername === 'HSEZER' && cleanPassword === '1721') {
    const teacherUser: AuthUser = {
      id: 'teacher-hsezer',
      username: 'HSEZER',
      role: 'teacher',
      name: 'Hilal Sezer',
      grade: 'Bilişim Teknolojileri Öğretmeni',
      avatarId: 'robot_teacher',
      points: 9999,
      stars: 99,
    };
    return { success: true, user: teacherUser };
  }

  // Check Supabase
  if (client) {
    try {
      const { data, error } = await client
        .from('students')
        .select('*')
        .eq('username', cleanUsername)
        .maybeSingle();

      if (data && data.password === cleanPassword) {
        // Update last_active_at
        await client
          .from('students')
          .update({ last_active_at: new Date().toISOString() })
          .eq('id', data.id);

        const authUser: AuthUser = {
          id: data.id,
          username: data.username,
          role: 'student',
          name: data.name,
          grade: data.grade,
          schoolNumber: data.school_number,
          avatarId: data.avatar_id,
          points: data.points,
          stars: data.stars,
          createdAt: data.created_at,
          lastActiveAt: new Date().toISOString(),
        };

        // Log login activity
        await logStudentActivity({
          studentId: authUser.id,
          studentUsername: authUser.username,
          studentName: authUser.name,
          studentGrade: authUser.grade || 'Öğrenci',
          activityType: 'login',
          title: 'Portala Giriş Yaptı 🚀',
          description: 'Öğrenci hesabıyla başarıyla oturum açtı.',
          pointsEarned: 5,
          createdAt: new Date().toISOString(),
        });

        return { success: true, user: authUser };
      }
    } catch (err) {
      console.warn('Supabase login check error, checking local store:', err);
    }
  }

  // Check Local Storage
  const students = getLocal<RegisteredStudent[]>(STORAGE_KEYS.STUDENTS, INITIAL_DEMO_STUDENTS);
  const found = students.find((s) => s.username.toUpperCase() === cleanUsername);

  if (found && (found.password === cleanPassword || !found.password)) {
    found.lastActiveAt = new Date().toISOString();
    setLocal(STORAGE_KEYS.STUDENTS, students);

    const authUser: AuthUser = {
      id: found.id,
      username: found.username,
      role: 'student',
      name: found.name,
      grade: found.grade,
      schoolNumber: found.schoolNumber,
      avatarId: found.avatarId,
      points: found.points,
      stars: found.stars,
      createdAt: found.createdAt,
      lastActiveAt: found.lastActiveAt,
    };

    await logStudentActivity({
      studentId: authUser.id,
      studentUsername: authUser.username,
      studentName: authUser.name,
      studentGrade: authUser.grade || 'Öğrenci',
      activityType: 'login',
      title: 'Portala Giriş Yaptı 🚀',
      description: 'Öğrenci hesabıyla başarıyla oturum açtı.',
      pointsEarned: 5,
      createdAt: new Date().toISOString(),
    });

    return { success: true, user: authUser };
  }

  return { success: false, error: 'Kullanıcı adı veya şifre hatalı! Lütfen bilgilerinizi kontrol ediniz.' };
}

// ----------------------------------------------------------------------------
// STUDENTS DIRECTORY (FOR TEACHER)
// ----------------------------------------------------------------------------
export async function fetchStudents(): Promise<RegisteredStudent[]> {
  initLocalStore();
  if (client) {
    try {
      const { data, error } = await client
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          username: d.username,
          name: d.name,
          grade: d.grade,
          schoolNumber: d.school_number,
          avatarId: d.avatar_id,
          points: d.points,
          stars: d.stars,
          createdAt: d.created_at,
          lastActiveAt: d.last_active_at,
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch students failed, using local:', e);
    }
  }

  return getLocal<RegisteredStudent[]>(STORAGE_KEYS.STUDENTS, INITIAL_DEMO_STUDENTS);
}

// ----------------------------------------------------------------------------
// STUDENT ACTIVITIES (TRACKING & LOGGING)
// ----------------------------------------------------------------------------
export async function logStudentActivity(activity: Omit<StudentActivity, 'id'>): Promise<void> {
  initLocalStore();
  const newActivity: StudentActivity = {
    ...activity,
    id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
  };

  // 1. Try Supabase
  if (client) {
    try {
      await client.from('student_activities').insert([
        {
          student_id: activity.studentId,
          student_username: activity.studentUsername,
          student_name: activity.studentName,
          student_grade: activity.studentGrade,
          activity_type: activity.activityType,
          title: activity.title,
          description: activity.description,
          points_earned: activity.pointsEarned,
          created_at: activity.createdAt,
        },
      ]);
    } catch (e) {
      console.warn('Supabase activity log error:', e);
    }
  }

  // 2. Also keep in local storage for instant UI updates & offline support
  const activities = getLocal<StudentActivity[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_DEMO_ACTIVITIES);
  activities.unshift(newActivity);
  setLocal(STORAGE_KEYS.ACTIVITIES, activities.slice(0, 200)); // keep last 200
}

export async function fetchStudentActivities(studentId?: string): Promise<StudentActivity[]> {
  initLocalStore();
  if (client) {
    try {
      let query = client
        .from('student_activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (studentId) {
        query = query.eq('student_id', studentId);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          studentId: d.student_id,
          studentUsername: d.student_username,
          studentName: d.student_name,
          studentGrade: d.student_grade,
          activityType: d.activity_type,
          title: d.title,
          description: d.description,
          pointsEarned: d.points_earned,
          createdAt: d.created_at,
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch activities error, using local:', e);
    }
  }

  const activities = getLocal<StudentActivity[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_DEMO_ACTIVITIES);
  if (studentId) {
    return activities.filter((a) => a.studentId === studentId);
  }
  return activities;
}

// ----------------------------------------------------------------------------
// CHAT MESSAGES (STUDENT <-> TEACHER)
// ----------------------------------------------------------------------------
export async function fetchChatMessages(studentId: string): Promise<ChatMessage[]> {
  initLocalStore();
  if (client) {
    try {
      const { data, error } = await client
        .from('chat_messages')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        return data.map((d) => ({
          id: d.id,
          studentId: d.student_id,
          studentName: d.student_name,
          studentUsername: d.student_username,
          senderRole: d.sender_role,
          senderName: d.sender_name,
          message: d.message,
          isRead: d.is_read,
          createdAt: d.created_at,
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch chat error, using local:', e);
    }
  }

  const allMessages = getLocal<ChatMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);
  return allMessages.filter((m) => m.studentId === studentId);
}

export async function fetchAllRecentStudentChats(): Promise<{ studentId: string; studentName: string; studentUsername: string; lastMessage: string; lastMessageAt: string; unreadCount: number }[]> {
  initLocalStore();
  const students = await fetchStudents();
  const allMessages = getLocal<ChatMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);

  return students.map((std) => {
    const stdMessages = allMessages.filter((m) => m.studentId === std.id);
    const lastMsg = stdMessages[stdMessages.length - 1];
    const unreadCount = stdMessages.filter((m) => m.senderRole === 'student' && !m.isRead).length;

    return {
      studentId: std.id,
      studentName: std.name,
      studentUsername: std.username,
      lastMessage: lastMsg ? lastMsg.message : 'Henüz mesaj yok.',
      lastMessageAt: lastMsg ? lastMsg.createdAt : std.createdAt,
      unreadCount,
    };
  });
}

export async function sendChatMessage(msg: Omit<ChatMessage, 'id'>): Promise<ChatMessage> {
  initLocalStore();
  const newMsg: ChatMessage = {
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
  };

  // 1. Supabase
  if (client) {
    try {
      await client.from('chat_messages').insert([
        {
          student_id: msg.studentId,
          student_name: msg.studentName || '',
          student_username: msg.studentUsername || '',
          sender_role: msg.senderRole,
          sender_name: msg.senderName,
          message: msg.message,
          is_read: msg.isRead,
          created_at: msg.createdAt,
        },
      ]);
    } catch (e) {
      console.warn('Supabase send message error:', e);
    }
  }

  // 2. Local Storage
  const allMessages = getLocal<ChatMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);
  allMessages.push(newMsg);
  setLocal(STORAGE_KEYS.MESSAGES, allMessages);

  // If student sent message, log activity
  if (msg.senderRole === 'student') {
    await logStudentActivity({
      studentId: msg.studentId,
      studentUsername: msg.studentUsername || 'Öğrenci',
      studentName: msg.studentName || msg.senderName,
      studentGrade: 'Öğrenci',
      activityType: 'message_sent',
      title: 'Öğretmene Mesaj Gönderdi 💬',
      description: `"${msg.message.length > 30 ? msg.message.slice(0, 30) + '...' : msg.message}"`,
      pointsEarned: 5,
      createdAt: new Date().toISOString(),
    });
  }

  return newMsg;
}

export async function markChatMessagesAsRead(studentId: string, byRole: 'teacher' | 'student'): Promise<void> {
  initLocalStore();
  const targetSenderRole = byRole === 'teacher' ? 'student' : 'teacher';

  if (client) {
    try {
      await client
        .from('chat_messages')
        .update({ is_read: true })
        .eq('student_id', studentId)
        .eq('sender_role', targetSenderRole);
    } catch (e) {
      console.warn('Supabase mark read error:', e);
    }
  }

  const allMessages = getLocal<ChatMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_DEMO_MESSAGES);
  let changed = false;
  allMessages.forEach((m) => {
    if (m.studentId === studentId && m.senderRole === targetSenderRole && !m.isRead) {
      m.isRead = true;
      changed = true;
    }
  });
  if (changed) {
    setLocal(STORAGE_KEYS.MESSAGES, allMessages);
  }
}
