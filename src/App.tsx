/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, GradeLevel, LessonNote, LearningModule, Competition, StudentProfile } from './types';
import { INITIAL_STUDENT_PROFILE, LESSON_NOTES } from './data/portalData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { MobileNav } from './components/MobileNav';
import { LoginScreen } from './components/LoginScreen';

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

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const localAuth = localStorage.getItem('portal_auth_user');
    const sessionAuth = sessionStorage.getItem('portal_auth_user');
    return Boolean(localAuth || sessionAuth);
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

  // Modal States
  const [readingNote, setReadingNote] = useState<LessonNote | null>(null);
  const [worksheetNote, setWorksheetNote] = useState<LessonNote | null>(null);
  const [spreadsheetNote, setSpreadsheetNote] = useState<LessonNote | null>(null);
  const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Student reward handlers
  const handleEarnPoints = (points: number) => {
    setProfile((prev) => ({
      ...prev,
      points: prev.points + points,
      stars: prev.stars + Math.floor(points / 20)
    }));
  };

  const handleCompleteLesson = (noteId: string) => {
    setProfile((prev) => {
      if (prev.completedNotes.includes(noteId)) return prev;
      return {
        ...prev,
        points: prev.points + 50,
        stars: prev.stars + 2,
        completedNotes: [...prev.completedNotes, noteId]
      };
    });
  };

  const handleJoinCompetition = (compId: string) => {
    setProfile((prev) => {
      if (prev.joinedCompetitions.includes(compId)) return prev;
      return {
        ...prev,
        points: prev.points + 100,
        stars: prev.stars + 5,
        joinedCompetitions: [...prev.joinedCompetitions, compId]
      };
    });
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
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191b23] flex font-sans antialiased selection:bg-blue-200">
      {/* Left Sidebar (Desktop) */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
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
        />

        {/* Mobile Top Navigation & Bottom Bar */}
        <MobileNav
          activePage={activePage}
          onNavigate={setActivePage}
          onOpenProfile={() => setIsProfileOpen(true)}
          onLogout={handleLogout}
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
            <ActivitiesView onEarnPoints={handleEarnPoints} />
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
          onSaveProgress={() => handleEarnPoints(30)}
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
