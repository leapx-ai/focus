import { useState, useEffect } from 'preact/hooks';
import { Play, Pause, RotateCcw } from 'lucide-preact';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const { currentTheme } = useTheme();

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play alarm sound here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') setTimeLeft(25 * 60);
    else if (mode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') setTimeLeft(25 * 60);
    else if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : mode === 'shortBreak' 
      ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
      : ((15 * 60 - timeLeft) / (15 * 60)) * 100;

  return (
    <div className={clsx("flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl relative overflow-hidden transition-colors", currentTheme.colors.card)}>
      {/* Progress Bar Background */}
      <div 
        className={clsx("absolute bottom-0 left-0 h-1 transition-all duration-1000 ease-linear", `bg-${currentTheme.colors.primary}-500`)}
        style={{ width: `${progress}%` }}
      />

      <div className="flex gap-2 mb-8 bg-black/20 p-1 rounded-lg">
        <button 
          onClick={() => switchMode('focus')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'focus' ? `bg-${currentTheme.colors.primary}-600 text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          Focus
        </button>
        <button 
          onClick={() => switchMode('shortBreak')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'shortBreak' ? `bg-${currentTheme.colors.primary}-600 text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          Short Break
        </button>
         <button 
          onClick={() => switchMode('longBreak')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'longBreak' ? `bg-${currentTheme.colors.primary}-600 text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          Long Break
        </button>
      </div>

      <div className="text-8xl font-bold font-mono tracking-wider mb-8 tabular-nums">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={toggleTimer}
          className={clsx(
            "w-16 h-16 flex items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95",
            `bg-${currentTheme.colors.primary}-500 hover:bg-${currentTheme.colors.primary}-400 shadow-${currentTheme.colors.primary}-500/30`
          )}
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
        </button>
        <button 
          onClick={resetTimer}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}
