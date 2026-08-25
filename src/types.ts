export type PageId = 'home' | 'notes' | 'resources' | 'activities' | 'competitions' | 'about';

export type GradeLevel = 'all' | 'anaokulu' | '1-2' | '3-4' | '5-6' | '1' | '2' | '3' | '4' | '5' | '6';

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
