import React, { useState, useEffect, useRef } from 'react';
import { AuthUser, ChatMessage, RegisteredStudent } from '../../types';
import {
  fetchChatMessages,
  sendChatMessage,
  markChatMessagesAsRead,
  fetchStudents,
} from '../../lib/supabase';
import { ASSETS } from '../../data/portalData';

interface Props {
  currentUser: AuthUser;
  onEarnPoints?: (points: number) => void;
}

export const ChatView: React.FC<Props> = ({ currentUser, onEarnPoints }) => {
  const isTeacher = currentUser.role === 'teacher';

  // State for students (if teacher)
  const [students, setStudents] = useState<RegisteredStudent[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    isTeacher ? '' : currentUser.id
  );
  const [searchStudent, setSearchStudent] = useState('');

  // Messages state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load students for teacher
  useEffect(() => {
    if (isTeacher) {
      fetchStudents().then((stds) => {
        setStudents(stds);
        if (stds.length > 0 && !selectedStudentId) {
          setSelectedStudentId(stds[0].id);
        }
      });
    } else {
      setSelectedStudentId(currentUser.id);
    }
  }, [isTeacher, currentUser.id]);

  // Load messages whenever selected student changes
  const loadMessages = async () => {
    if (!selectedStudentId) return;
    const msgs = await fetchChatMessages(selectedStudentId);
    setMessages(msgs);
    await markChatMessagesAsRead(selectedStudentId, currentUser.role);
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000); // Polling for live chat feeling
    return () => clearInterval(interval);
  }, [selectedStudentId, currentUser.role]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (customText?: string) => {
    const text = (customText || inputText).trim();
    if (!text || isSending || !selectedStudentId) return;

    setIsSending(true);
    setInputText('');

    const targetStudent = isTeacher
      ? students.find((s) => s.id === selectedStudentId)
      : null;

    try {
      const newMsg = await sendChatMessage({
        studentId: selectedStudentId,
        studentName: isTeacher ? targetStudent?.name : currentUser.name,
        studentUsername: isTeacher ? targetStudent?.username : currentUser.username,
        senderRole: currentUser.role,
        senderName: currentUser.name,
        message: text,
        isRead: false,
        createdAt: new Date().toISOString(),
      });

      setMessages((prev) => [...prev, newMsg]);

      // If student sent message, trigger points reward if applicable
      if (!isTeacher && onEarnPoints) {
        onEarnPoints(5);
      }
    } catch (err) {
      console.error('Send message failed:', err);
    } finally {
      setIsSending(false);
    }
  };

  const quickQuestions = [
    'Öğretmenim, Scratch projemde yardıma ihtiyacım var 🐱',
    'Algoritma oyununda rekor kırdım! 🎮',
    'Haftalık bilişim quizini çözdüm 📝',
    'Bu haftaki ders notlarını çok beğendim ✨',
  ];

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.username.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const currentStudentObj = isTeacher
    ? students.find((s) => s.id === selectedStudentId)
    : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-2 border-blue-100 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0058be] text-xs font-extrabold mb-1">
            <span className="material-symbols-outlined text-sm">chat</span>
            {isTeacher ? 'Öğretmen Mesajlaşma Merkezi' : 'Hilal Öğretmen ile Canlı İletişim'}
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#0058be] tracking-tight">
            {isTeacher ? 'Öğrenci Sohbet & Geri Bildirim 💬' : 'Öğretmene Soru Sor & Konuş 💬'}
          </h1>
          <p className="text-sm text-[#424754]">
            {isTeacher
              ? 'Öğrencilerinizle birebir iletişim kurun, sorularını yanıtlayın ve motivasyon mesajları iletin.'
              : 'Dersler, kodlama projeleri veya turnuvalar hakkında takıldığın her şeyi Hilal Öğretmenine sorabilirsin!'}
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <div className="text-xs font-black text-emerald-800">Çevrim İçi İletişim</div>
            <div className="text-[10px] text-emerald-600">Veritabanı Canlı Senkronize</div>
          </div>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="bg-white rounded-3xl border-2 border-[#c7d7fe] shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] h-[72vh]">
        
        {/* TEACHER ONLY: Student Selector Sidebar */}
        {isTeacher && (
          <div className="w-full md:w-80 bg-[#f8faff] border-r-2 border-blue-100 flex flex-col shrink-0">
            <div className="p-4 border-b border-blue-100 bg-white">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Öğrenciler ({students.length})</span>
                <span className="material-symbols-outlined text-sm text-blue-600">groups</span>
              </h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Öğrenci ara..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
              {filteredStudents.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 font-medium">
                  Kayıtlı öğrenci bulunamadı.
                </div>
              ) : (
                filteredStudents.map((std) => {
                  const isSelected = std.id === selectedStudentId;
                  return (
                    <button
                      key={std.id}
                      onClick={() => setSelectedStudentId(std.id)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0058be] text-white shadow-md'
                          : 'hover:bg-blue-50 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">smart_toy</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs truncate">{std.name}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            ⭐ {std.points}
                          </span>
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                          {std.grade} • @{std.username}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Chat Messages Panel */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Chat Panel Top Bar */}
          <div className="p-4 border-b border-blue-100 bg-[#fbfcfe] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0058be] to-[#3b82f6] p-0.5 shadow-md flex items-center justify-center text-white">
                {isTeacher ? (
                  <span className="material-symbols-outlined text-2xl">person</span>
                ) : (
                  <img
                    src={ASSETS.robotAvatarRound}
                    alt="Hilal Öğretmen"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div>
              <div>
                <div className="font-black text-sm text-[#0058be] flex items-center gap-1.5">
                  <span>{isTeacher ? (currentStudentObj?.name || 'Öğrenci Seçiniz') : 'Hilal Sezer Öğretmen 👩‍🏫'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {isTeacher
                    ? `${currentStudentObj?.grade || ''} • @${currentStudentObj?.username || ''}`
                    : 'Bilişim Teknolojileri & Yazılım Öğretmeni'}
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                💬 {messages.length} Mesaj
              </span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-[#f9fbff] to-white">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
                  <span className="material-symbols-outlined text-3xl">chat_bubble_outline</span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-700">Henüz sohbet başlamadı</h4>
                <p className="text-xs max-w-xs mt-1">
                  İlk mesajı yazarak iletişimi başlatabilirsiniz.
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMine =
                  (isTeacher && msg.senderRole === 'teacher') ||
                  (!isTeacher && msg.senderRole === 'student');

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[70%]">
                      {!isMine && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                          {msg.senderRole === 'teacher' ? '👩‍🏫' : '🤖'}
                        </div>
                      )}

                      <div
                        className={`rounded-2xl p-3.5 shadow-sm text-sm ${
                          isMine
                            ? 'bg-[#0058be] text-white rounded-br-xs'
                            : 'bg-white border-2 border-slate-100 text-slate-800 rounded-bl-xs'
                        }`}
                      >
                        <div
                          className={`text-[10px] font-black mb-1 ${
                            isMine ? 'text-blue-200' : 'text-blue-600'
                          }`}
                        >
                          {msg.senderName}
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap font-medium">
                          {msg.message}
                        </p>
                        <div
                          className={`text-[9px] mt-1.5 text-right font-semibold ${
                            isMine ? 'text-blue-200' : 'text-slate-400'
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions for Student */}
          {!isTeacher && (
            <div className="p-2.5 bg-blue-50/50 border-t border-blue-100 flex gap-2 overflow-x-auto no-scrollbar">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isTeacher
                  ? 'Öğrencinize mesajınızı veya geri bildiriminizi yazın...'
                  : 'Hilal Öğretmenine bir soru sor veya mesaj yaz...'
              }
              className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-[#0058be] focus:bg-white rounded-2xl text-sm font-bold text-slate-800 outline-hidden transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="px-5 py-3 bg-[#0058be] hover:bg-[#004395] disabled:opacity-50 text-white rounded-2xl font-black text-sm flex items-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined text-lg">send</span>
              <span className="hidden sm:inline">Gönder</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
