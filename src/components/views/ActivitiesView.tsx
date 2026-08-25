import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { EXTERNAL_LINKS } from '../../data/portalData';

interface Props {
  onEarnPoints: (points: number) => void;
}

export const ActivitiesView: React.FC<Props> = ({ onEarnPoints }) => {
  const [activeTab, setActiveTab] = useState<'maze' | 'sort' | 'typing'>('maze');

  // GAME 1: Robo-Maze State
  const [commands, setCommands] = useState<string[]>([]);
  const [robotPos, setRobotPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mazeMessage, setMazeMessage] = useState('Komutları ekle ve "Çalıştır" butonuna bas!');
  const [isRunning, setIsRunning] = useState(false);

  // Target in 4x4 maze
  const targetPos = { x: 3, y: 3 };
  const obstacles = [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }];

  const addCommand = (cmd: string) => {
    if (commands.length < 8) {
      setCommands([...commands, cmd]);
    }
  };

  const clearCommands = () => {
    setCommands([]);
    setRobotPos({ x: 0, y: 0 });
    setMazeMessage('Komutları ekle ve "Çalıştır" butonuna bas!');
  };

  const runCode = async () => {
    setIsRunning(true);
    let curX = 0;
    let curY = 0;
    setRobotPos({ x: 0, y: 0 });

    for (let i = 0; i < commands.length; i++) {
      await new Promise((res) => setTimeout(res, 600));
      const cmd = commands[i];

      if (cmd === 'Sağ') curX = Math.min(3, curX + 1);
      if (cmd === 'Sol') curX = Math.max(0, curX - 1);
      if (cmd === 'Aşağı') curY = Math.min(3, curY + 1);
      if (cmd === 'Yukarı') curY = Math.max(0, curY - 1);

      // Check obstacle
      const hit = obstacles.some((o) => o.x === curX && o.y === curY);
      if (hit) {
        setMazeMessage('Ops! Bir engele çarptın, tekrar dene!');
        setIsRunning(false);
        return;
      }

      setRobotPos({ x: curX, y: curY });
    }

    if (curX === targetPos.x && curY === targetPos.y) {
      setMazeMessage('Tebrikler! Hedefe ulaştın! 🏆 +50 Puan!');
      confetti();
      onEarnPoints(50);
    } else {
      setMazeMessage('Hedefe varamadın, biraz daha komut eklemeyi dene!');
    }
    setIsRunning(false);
  };

  // GAME 2: Sort Hardware vs Software
  const sortItems = [
    { name: 'Klavye', type: 'hardware' },
    { name: 'Paint Programı', type: 'software' },
    { name: 'Fare (Mouse)', type: 'hardware' },
    { name: 'Scratch', type: 'software' },
    { name: 'Monitör / Ekran', type: 'hardware' },
    { name: 'Windows İşletim Sistemi', type: 'software' }
  ];
  const [sortIndex, setSortIndex] = useState(0);
  const [sortScore, setSortScore] = useState(0);
  const [sortFinished, setSortFinished] = useState(false);

  const handleSortAnswer = (type: 'hardware' | 'software') => {
    if (sortFinished) return;
    const current = sortItems[sortIndex];
    if (current.type === type) {
      setSortScore((prev) => prev + 1);
    }
    if (sortIndex + 1 < sortItems.length) {
      setSortIndex((prev) => prev + 1);
    } else {
      setSortFinished(true);
      confetti();
      onEarnPoints(40);
    }
  };

  // GAME 3: Fast Typing Game
  const words = ['BILISIM', 'KODLAMA', 'SCRATCH', 'ALGORITMA', 'ROBOTIK', 'DONANIM', 'YAZILIM'];
  const [wordIndex, setWordIndex] = useState(0);
  const [typeInput, setTypeInput] = useState('');
  const [typingScore, setTypingScore] = useState(0);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setTypeInput(val);
    if (val === words[wordIndex]) {
      setTypingScore((s) => s + 10);
      onEarnPoints(10);
      setTypeInput('');
      if (wordIndex + 1 < words.length) {
        setWordIndex((i) => i + 1);
      } else {
        setWordIndex(0);
        confetti();
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0058be] tracking-tight mb-2">
            Eğlenceli Kodlama & Bilişim Oyunları 🎮
          </h1>
          <p className="text-base text-[#424754]">
            Öğrendiğin bilgileri oyun oynayarak pekiştir, robotunu yönlendir ve ekstra puanlar kazan!
          </p>
        </div>
        <a
          href={EXTERNAL_LINKS.ACTIVITIES}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all shrink-0 active:scale-95"
        >
          <span className="material-symbols-outlined text-base">sports_esports</span>
          Etkinlikler Google Drive Klasörü ↗
        </a>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab('maze')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeTab === 'maze'
              ? 'bg-[#0058be] text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-lg">smart_toy</span>
          Robo-Labirent Kodlama
        </button>

        <button
          onClick={() => setActiveTab('sort')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeTab === 'sort'
              ? 'bg-[#006947] text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-lg">category</span>
          Donanım mı? Yazılım mı?
        </button>

        <button
          onClick={() => setActiveTab('typing')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
            activeTab === 'typing'
              ? 'bg-[#fea619] text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-lg">keyboard</span>
          Hızlı Klavye Ustası
        </button>
      </div>

      {/* GAME 1: ROBO-MAZE */}
      {activeTab === 'maze' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-blue-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Maze Grid */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-4 gap-2 bg-slate-100 p-4 rounded-3xl border-2 border-slate-300 w-72 h-72 md:w-80 md:h-80">
              {Array.from({ length: 16 }).map((_, idx) => {
                const x = idx % 4;
                const y = Math.floor(idx / 4);
                const isRobot = robotPos.x === x && robotPos.y === y;
                const isTarget = targetPos.x === x && targetPos.y === y;
                const isObstacle = obstacles.some((o) => o.x === x && o.y === y);

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl flex items-center justify-center text-2xl font-bold transition-all relative ${
                      isRobot
                        ? 'bg-blue-600 text-white shadow-md scale-105'
                        : isTarget
                        ? 'bg-amber-300 text-amber-900 border-2 border-amber-500 animate-pulse'
                        : isObstacle
                        ? 'bg-slate-800 text-white'
                        : 'bg-white border border-slate-200'
                    }`}
                  >
                    {isRobot && '🤖'}
                    {isTarget && !isRobot && '⭐'}
                    {isObstacle && '🧱'}
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs font-bold text-slate-600 text-center">{mazeMessage}</p>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800">Komut Blokları</h3>
            <p className="text-xs text-slate-500">
              Aşağıdaki yön butonlarına basarak robotun adım adımlarını planla (Algoritma).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                disabled={isRunning}
                onClick={() => addCommand('Yukarı')}
                className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-bold text-xs text-blue-700 hover:bg-blue-100 flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">arrow_upward</span>
                Yukarı
              </button>
              <button
                disabled={isRunning}
                onClick={() => addCommand('Aşağı')}
                className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-bold text-xs text-blue-700 hover:bg-blue-100 flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">arrow_downward</span>
                Aşağı
              </button>
              <button
                disabled={isRunning}
                onClick={() => addCommand('Sağ')}
                className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-bold text-xs text-blue-700 hover:bg-blue-100 flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                Sağa Git
              </button>
              <button
                disabled={isRunning}
                onClick={() => addCommand('Sol')}
                className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-bold text-xs text-blue-700 hover:bg-blue-100 flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Sola Git
              </button>
            </div>

            {/* Sequence list */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 min-h-[60px] flex items-center gap-2 flex-wrap">
              {commands.length === 0 ? (
                <span className="text-xs text-slate-400">Henüz komut eklenmedi...</span>
              ) : (
                commands.map((cmd, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold"
                  >
                    {i + 1}. {cmd}
                  </span>
                ))
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                disabled={isRunning || commands.length === 0}
                onClick={runCode}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined">play_arrow</span>
                Algoritmayı Çalıştır
              </button>
              <button
                onClick={clearCommands}
                className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-2xl text-sm"
              >
                Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: SORT HARDWARE VS SOFTWARE */}
      {activeTab === 'sort' && (
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-sm max-w-xl mx-auto text-center space-y-6">
          {!sortFinished ? (
            <>
              <div className="text-xs font-bold text-emerald-700 uppercase">
                Soru {sortIndex + 1} / {sortItems.length}
              </div>

              <div className="p-8 bg-emerald-50 rounded-3xl border-2 border-emerald-200">
                <span className="text-4xl mb-2 block">💡</span>
                <h3 className="text-2xl font-extrabold text-slate-800">
                  {sortItems[sortIndex].name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Bu bir Donanım mı yoksa Yazılım mı?</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSortAnswer('hardware')}
                  className="p-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-md text-base flex flex-col items-center gap-1"
                >
                  <span className="material-symbols-outlined text-2xl">devices</span>
                  DONANIM (Hardware)
                </button>
                <button
                  onClick={() => handleSortAnswer('software')}
                  className="p-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl shadow-md text-base flex flex-col items-center gap-1"
                >
                  <span className="material-symbols-outlined text-2xl">terminal</span>
                  YAZILIM (Software)
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4 py-6">
              <span className="text-6xl">🎉</span>
              <h3 className="text-2xl font-extrabold text-emerald-800">Tebrikler!</h3>
              <p className="text-sm text-slate-600">
                {sortItems.length} sorudan {sortScore} tanesini doğru bildin!
              </p>
              <button
                onClick={() => {
                  setSortIndex(0);
                  setSortScore(0);
                  setSortFinished(false);
                }}
                className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl text-sm"
              >
                Yeniden Oyna
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: FAST TYPING */}
      {activeTab === 'typing' && (
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 shadow-sm max-w-xl mx-auto text-center space-y-6">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Klavye Antrenmanı</span>
            <span className="text-amber-600">Skor: {typingScore}</span>
          </div>

          <div className="p-6 bg-amber-50 rounded-3xl border-2 border-amber-300">
            <span className="text-xs text-amber-700 font-bold uppercase tracking-widest">
              Aşağıdaki kelimeyi hızlıca yaz:
            </span>
            <h2 className="text-4xl font-extrabold text-slate-800 tracking-widest my-2 font-mono">
              {words[wordIndex]}
            </h2>
          </div>

          <input
            type="text"
            autoFocus
            value={typeInput}
            onChange={handleTypeChange}
            placeholder="BURAYA YAZ..."
            className="w-full text-center text-2xl font-mono uppercase tracking-widest p-4 rounded-2xl border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200"
          />
          <p className="text-xs text-slate-400">
            Her doğru kelime için +10 Bilişim Puanı kazanırsın!
          </p>
        </div>
      )}
    </div>
  );
};
