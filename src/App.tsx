/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, GradeLevel, LessonNote, LearningModule, Competition, StudentProfile, AuthUser } from './types';
import { INITIAL_STUDENT_PROFILE, LESSON_NOTES } from './data/portalData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { MobileNav } from './components/MobileNav';
import { LoginScreen } from './components/LoginScreen';
import { logStudentActivity } from './lib/supabase';

// Modals
import { LessonReaderModal } from './components/modals/LessonReaderModal';
import { WorksheetModal } from './components/modals/WorksheetModal';
import { SpreadsheetModal } from './components/modals/SpreadsheetModal';
import { CompetitionModal } from './components/modals/CompetitionModal';
import { ProfileModal } from './components/modals/ProfileModal';

// Views
import { HomeView } from './components/views/HomeView';
import { NotesView } from './components/views/NotesView';
import { ResourcesView } from './components/views/ResourcesView';
import { CompetitionsView } from './components/views/CompetitionsView';
import { ActivitiesView } from './components/views/ActivitiesView';
import { AboutView } from './components/views/AboutView';
import { ChatView } from './components/views/ChatView';
import { TeacherDashboardView } from './components/views/TeacherDashboardView';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const localAuth = localStorage.getItem('portal_auth_user');
      const sessionAuth = sessionStorage.getItem('portal_auth_user');
      const raw = localAuth || sessionAuth;
      if (!raw) return null;
      // If it was just a string username (from previous version)
      if (raw.startsWith('{')) {
        return JSON.parse(raw) as AuthUser;
      } else {
        // Migration from previous plain username string
        if (raw.toUpperCase() === 'HSEZER') {
          return {
            id: 'teacher-hsezer',
            username: 'HSEZER',
            role: 'teacher',
            name: 'Hilal Sezer',
            grade: 'Bilişim Teknolojileri Öğretmeni',
            avatarId: 'robot_teacher',
            points: 9999,
            stars: 99,
          };
        } else {
          return {
            id: `student-${raw}`,
            username: raw,
            role: 'student',
            name: raw,
            grade: '3-4. Sınıf',
            points: 150,
            stars: 6,
          };
        }
      }
    } catch {
      return null;
    }
  });

  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<GradeLevel>('all');

  // Persistence for Student Profile
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('hilal_sezer_portal_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_STUDENT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('hilal_sezer_portal_profile', JSON.stringify(profile));
  }, [profile]);

  // Sync profile with logged in student
  useEffect(() => {
    if (currentUser && currentUser.role === 'student') {
      setProfile((prev) => ({
        ...prev,
        name: currentUser.name || prev.name,
        grade: currentUser.grade || prev.grade,
        schoolNumber: currentUser.schoolNumber || prev.schoolNumber,
        points: Math.max(prev.points, currentUser.points || 50),
      }));
    }
  }, [currentUser]);

  // Modal States
  const [readingNote, setReadingNote] = useState<LessonNote | null>(null);
  const [worksheetNote, setWorksheetNote] = useState<LessonNote | null>(null);
  const [spreadsheetNote, setSpreadsheetNote] = useState<LessonNote | null>(null);
  const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Student reward handlers with activity logging
  const handleEarnPoints = async (points: number, activityTitle?: string, activityDesc?: string) => {
    setProfile((prev) => ({
      ...prev,
      points: prev.points + points,
      stars: prev.stars + Math.floor(points / 20)
    }));

    if (currentUser && currentUser.role === 'student') {
      await logStudentActivity({
        studentId: currentUser.id,
        studentUsername: currentUser.username,
        studentName: currentUser.name,
        studentGrade: currentUser.grade || 'Öğrenci',
        activityType: 'game_played',
        title: activityTitle || 'Kodlama Etkinliğini Tamamladı 🎮',
        description: activityDesc || `${points} puan başarıyla kazanıldı.`,
        pointsEarned: points,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleCompleteLesson = async (noteId: string) => {
    const matchedNote = LESSON_NOTES.find((n) => n.id === noteId);
    setProfile((prev) => {
      if (prev.completedNotes.includes(noteId)) return prev;
      return {
        ...prev,
        points: prev.points + 50,
        stars: prev.stars + 2,
        completedNotes: [...prev.completedNotes, noteId]
      };
    });

    if (currentUser && currentUser.role === 'student') {
      await logStudentActivity({
        studentId: currentUser.id,
        studentUsername: currentUser.username,
        studentName: currentUser.name,
        studentGrade: currentUser.grade || 'Öğrenci',
        activityType: 'quiz_completed',
        title: `${matchedNote?.title || 'Ders Notu'} Quizini Çözdü 📝`,
        description: 'Tüm soruları tamamlayarak 50 puan kazandı.',
        pointsEarned: 50,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleJoinCompetition = async (compId: string) => {
    const matchedComp = activeCompetition;
    setProfile((prev) => {
      if (prev.joinedCompetitions.includes(compId)) return prev;
      return {
        ...prev,
        points: prev.points + 100,
        stars: prev.stars + 5,
        joinedCompetitions: [...prev.joinedCompetitions, compId]
      };
    });

    if (currentUser && currentUser.role === 'student') {
      await logStudentActivity({
        studentId: currentUser.id,
        studentUsername: currentUser.username,
        studentName: currentUser.name,
        studentGrade: currentUser.grade || 'Öğrenci',
        activityType: 'competition_joined',
        title: `${matchedComp?.title || 'Kodlama Turnuvası'}na Başvurdu 🏆`,
        description: 'Yarışma kaydı onaylandı ve 100 turnuva puanı verildi.',
        pointsEarned: 100,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleUpdateProfile = (name: string, grade: string) => {
    setProfile((prev) => ({
      ...prev,
      name,
      grade
    }));
  };

  const handleSelectModuleFromSearch = (mod: LearningModule) => {
    const matchedNote = LESSON_NOTES.find((n) =>
      n.title.toLowerCase().includes(mod.title.toLowerCase().substring(0, 5))
    );
    if (matchedNote) {
      setReadingNote(matchedNote);
    } else {
      setActivePage('resources');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portal_auth_user');
    sessionStorage.removeItem('portal_auth_user');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191b23] flex font-sans antialiased selection:bg-blue-200">
      {/* Left Sidebar (Desktop) */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        {/* Top Header (Desktop & Tablet) */}
        <TopHeader
          activePage={activePage}
          onNavigate={setActivePage}
          profile={profile}
          onOpenProfile={() => setIsProfileOpen(true)}
          onSelectNote={(note) => setReadingNote(note)}
          onSelectModule={handleSelectModuleFromSearch}
          onSelectCompetition={(comp) => setActiveCompetition(comp)}
          onLogout={handleLogout}
          currentUser={currentUser}
        />

        {/* Mobile Top Navigation & Bottom Bar */}
        <MobileNav
          activePage={activePage}
          onNavigate={setActivePage}
          onOpenProfile={() => setIsProfileOpen(true)}
          onLogout={handleLogout}
          currentUser={currentUser}
        />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 pt-16 md:pt-24 pb-24 md:pb-12 max-w-7xl w-full mx-auto">
          {activePage === 'home' && (
            <HomeView
              onNavigate={setActivePage}
              onSelectGradeFilter={setSelectedGradeFilter}
              onOpenNote={(note) => setReadingNote(note)}
              onOpenCompetition={(comp) => setActiveCompetition(comp)}
            />
          )}

          {activePage === 'notes' && (
            <NotesView
              selectedGradeFilter={selectedGradeFilter}
              onSelectGradeFilter={setSelectedGradeFilter}
              onOpenNote={(note) => setReadingNote(note)}
              onOpenWorksheet={(note) => setWorksheetNote(note)}
              onOpenSpreadsheet={(note) => setSpreadsheetNote(note)}
              completedNotes={profile.completedNotes}
            />
          )}

          {activePage === 'resources' && (
            <ResourcesView
              onOpenNote={(note) => setReadingNote(note)}
              onOpenWorksheet={(note) => setWorksheetNote(note)}
              onOpenCompetition={(comp) => setActiveCompetition(comp)}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'competitions' && (
            <CompetitionsView
              onOpenCompetition={(comp) => setActiveCompetition(comp)}
              joinedCompetitions={profile.joinedCompetitions}
            />
          )}

          {activePage === 'activities' && (
            <ActivitiesView onEarnPoints={(pts) => handleEarnPoints(pts)} />
          )}

          {activePage === 'chat' && (
            <ChatView
              currentUser={currentUser}
              onEarnPoints={(pts) => handleEarnPoints(pts)}
            />
          )}

          {activePage === 'teacher_panel' && (
            <TeacherDashboardView onNavigate={setActivePage} />
          )}

          {activePage === 'about' && <AboutView />}
        </main>
      </div>

      {/* Global Interactive Modals */}
      {readingNote && (
        <LessonReaderModal
          note={readingNote}
          onClose={() => setReadingNote(null)}
          onOpenWorksheet={(note) => setWorksheetNote(note)}
          onOpenSpreadsheet={(note) => setSpreadsheetNote(note)}
          onCompleteLesson={handleCompleteLesson}
          isCompleted={profile.completedNotes.includes(readingNote.id)}
        />
      )}

      {worksheetNote && (
        <WorksheetModal
          note={worksheetNote}
          onClose={() => setWorksheetNote(null)}
          onSaveProgress={() => handleEarnPoints(30, 'Çalışma Tablosunu Doldurdu', 'Etkinlik sorularını başarıyla tamamladı.')}
        />
      )}

      {spreadsheetNote && (
        <SpreadsheetModal
          note={spreadsheetNote}
          onClose={() => setSpreadsheetNote(null)}
        />
      )}

      {activeCompetition && (
        <CompetitionModal
          competition={activeCompetition}
          onClose={() => setActiveCompetition(null)}
          onJoinSuccess={handleJoinCompetition}
          hasJoined={profile.joinedCompetitions.includes(activeCompetition.id)}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          profile={profile}
          onClose={() => setIsProfileOpen(false)}
          onUpdateName={handleUpdateProfile}
        />
      )}
    </div>
  );
}
