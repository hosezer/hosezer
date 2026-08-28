export type PageId = 'home' | 'notes' | 'resources' | 'activities' | 'competitions' | 'chat' | 'teacher_panel' | 'about';

export type GradeLevel = 'all' | 'anaokulu' | '1-2' | '3-4' | '5-6' | '1' | '2' | '3' | '4' | '5' | '6';

export type UserRole = 'teacher' | 'student';

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  grade?: string;
  schoolNumber?: string;
  avatarId?: string;
  points?: number;
  stars?: number;
  createdAt?: string;
  lastActiveAt?: string;
}

export interface RegisteredStudent {
  id: string;
  username: string;
  password?: string;
  name: string;
  grade: string;
  schoolNumber?: string;
  avatarId: string;
  points: number;
  stars: number;
  createdAt: string;
  lastActiveAt: string;
}

export interface StudentActivity {
  id: string;
  studentId: string;
  studentUsername: string;
  studentName: string;
  studentGrade: string;
  activityType: 'login' | 'register' | 'note_read' | 'worksheet_done' | 'game_played' | 'quiz_completed' | 'competition_joined' | 'message_sent';
  title: string;
  description: string;
  pointsEarned: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  studentId: string;
  studentName?: string;
  studentUsername?: string;
  senderRole: 'student' | 'teacher';
  senderName: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface LessonNote {
  id: string;
  title: string;
  grade: GradeLevel;
  gradeLabel: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  summary: string;
  readingTime: string;
  sections: {
    title: string;
    text: string;
    bulletPoints?: string[];
    tips?: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  worksheet: {
    instructions: string;
    questions: {
      id: number;
      text: string;
      answerType: 'text' | 'choice' | 'match';
      options?: string[];
    }[];
  };
  spreadsheetData?: {
    columns: string[];
    rows: (string | number)[][];
    activityPrompt: string;
  };
}

export interface LearningModule {
  id: string;
  number: string;
  title: string;
  grade: GradeLevel;
  icon: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
  isSpecialCompetition?: boolean;
  competitionDesc?: string;
  hasResource: boolean;
  hasNote: boolean;
  hasWorksheet: boolean;
  hasActivity: boolean;
  details: {
    desc: string;
    resourceLinks: { title: string; url: string; type: 'video' | 'pdf' | 'link' }[];
    objectives: string[];
  };
}

export interface Competition {
  id: string;
  title: string;
  category: string;
  tag: string;
  shortDesc: string;
  heroImg: string;
  robotBubbleText: string;
  targetGrades: string;
  deadline: string;
  prizes: string[];
  rules: string[];
  criteria: string[];
  registeredCount: number;
}

export interface StudentProfile {
  name: string;
  grade: string;
  schoolNumber: string;
  avatarId: string;
  points: number;
  stars: number;
  completedNotes: string[];
  completedQuizzes: string[];
  completedActivities: string[];
  joinedCompetitions: string[];
}
