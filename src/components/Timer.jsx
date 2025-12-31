import { useState, useEffect } from 'preact/hooks';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { AchievementManager } from './AchievementManager';
import { ShareCard } from './ShareCard';
import { clsx } from 'clsx';
import { RotateCcw, Play, Pause } from 'lucide-preact';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak' | 'custom'
  const [customDuration, setCustomDuration] = useState(30); // minutes
  const [completedSession, setCompletedSession] = useState(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const { currentTheme, theme } = useTheme();
  const { t } = useLanguage();

  // 定义每个主题对应的具体样式类名，确保 Tailwind 能正确生成 CSS
  const themeStyles = {
    default: {
      gradient: 'bg-gradient-to-b from-indigo-500/50 to-indigo-700/80',
      waveMain: 'text-indigo-500',
      waveMid: 'text-indigo-400',
      waveLight: 'text-indigo-300',
      bubble: 'bg-indigo-200',
      pulse: 'from-indigo-400/20',
      btnBg: 'bg-indigo-500 hover:bg-indigo-400 shadow-indigo-500/30',
      btnActive: 'bg-indigo-600',
      progress: 'bg-indigo-500',
      waveFill: 'bg-indigo-500/20'
    },
    forest: {
      gradient: 'bg-gradient-to-b from-emerald-500/50 to-emerald-700/80',
      waveMain: 'text-emerald-500',
      waveMid: 'text-emerald-400',
      waveLight: 'text-emerald-300',
      bubble: 'bg-emerald-200',
      pulse: 'from-emerald-400/20',
      btnBg: 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30',
      btnActive: 'bg-emerald-600',
      progress: 'bg-emerald-500',
      waveFill: 'bg-emerald-500/20'
    },
    sunset: {
      gradient: 'bg-gradient-to-b from-orange-500/50 to-orange-700/80',
      waveMain: 'text-orange-500',
      waveMid: 'text-orange-400',
      waveLight: 'text-orange-300',
      bubble: 'bg-orange-200',
      pulse: 'from-orange-400/20',
      btnBg: 'bg-orange-500 hover:bg-orange-400 shadow-orange-500/30',
      btnActive: 'bg-orange-600',
      progress: 'bg-orange-500',
      waveFill: 'bg-orange-500/20'
    },
    ocean: {
      gradient: 'bg-gradient-to-b from-cyan-500/50 to-cyan-700/80',
      waveMain: 'text-cyan-500',
      waveMid: 'text-cyan-400',
      waveLight: 'text-cyan-300',
      bubble: 'bg-cyan-200',
      pulse: 'from-cyan-400/20',
      btnBg: 'bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/30',
      btnActive: 'bg-cyan-600',
      progress: 'bg-cyan-500',
      waveFill: 'bg-cyan-500/20'
    }
  };

  const currentStyles = themeStyles[theme] || themeStyles.default;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // 记录完成的会话
      const session = {
        id: Date.now(),
        duration: mode === 'focus' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : mode === 'longBreak' ? 15 * 60 : customDuration * 60,
        endTime: new Date().toISOString(),
        mode: mode
      };

      // 保存到本地记录
      const sessions = JSON.parse(localStorage.getItem('focus-sessions') || '[]');
      sessions.push(session);
      localStorage.setItem('focus-sessions', JSON.stringify(sessions));

      setCompletedSession(session);

      // 播放完成音效
      playCompleteSound();

      // 计时结束后重置时间，防止用户在未重置的情况下切换模式导致状态混乱
      if (mode === 'focus') setTimeLeft(25 * 60);
      else if (mode === 'shortBreak') setTimeLeft(5 * 60);
      else if (mode === 'longBreak') setTimeLeft(15 * 60);
      else setTimeLeft(customDuration * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') setTimeLeft(25 * 60);
    else if (mode === 'shortBreak') setTimeLeft(5 * 60);
    else if (mode === 'longBreak') setTimeLeft(15 * 60);
    else setTimeLeft(customDuration * 60);
  };

  const switchMode = (newMode) => {
    // 如果已经在该模式下，不做任何操作
    if (mode === newMode) return;

    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') setTimeLeft(25 * 60);
    else if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    else if (newMode === 'longBreak') setTimeLeft(15 * 60);
    else setTimeLeft(customDuration * 60);

    // 切换模式时，如果之前有完成的会话弹窗，关闭它
    setCompletedSession(null);
    setShowShareCard(false);
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
      : mode === 'longBreak'
        ? ((15 * 60 - timeLeft) / (15 * 60)) * 100
        : ((customDuration * 60 - timeLeft) / (customDuration * 60)) * 100;

  const playCompleteSound = () => {
    // 简单的完成音效
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleAchievementComplete = () => {
    setCompletedSession(null);
    // 延迟显示分享卡片
    setTimeout(() => {
      setShowShareCard(true);
    }, 500);
  };

  const handleCloseShareCard = () => {
    setShowShareCard(false);
  };

  return (
    <div className={clsx("flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl relative overflow-hidden transition-colors", currentTheme.colors.card)}>
      {/* 动态背景进度效果 */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        {/* 液体波浪效果 */}
        <div
          className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out"
          style={{
            height: `${progress}%`,
            transition: 'height 1s ease-out',
            opacity: progress > 0 ? 1 : 0
          }}
        >
          {/* 多层液体波浪 */}
          <svg className="absolute top-0 left-0 w-[200%] h-16" viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ transform: 'translateY(-50%) translateX(-25%)' }}>
            {/* 主波浪层 */}
            <path
              d="M0,40 Q200,10 400,40 T800,40 Q1000,70 1200,40 L1200,80 L0,80 Z"
              className={clsx("fill-current opacity-60", currentStyles.waveMain)}
              style={{
                animation: 'liquidWave 3s ease-in-out infinite',
                transformOrigin: 'center'
              }}
            />
            {/* 中层波浪 */}
            <path
              d="M0,50 Q300,20 600,50 T1000,50 Q1100,75 1200,50 L1200,80 L0,80 Z"
              className={clsx("fill-current opacity-40", currentStyles.waveMid)}
              style={{
                animation: 'liquidWave 4s ease-in-out infinite reverse',
                transformOrigin: 'center',
                animationDelay: '0.5s'
              }}
            />
            {/* 细腻波浪 */}
            <path
              d="M0,60 Q400,45 800,60 T1200,60 L1200,80 L0,80 Z"
              className={clsx("fill-current opacity-25", currentStyles.waveLight)}
              style={{
                animation: 'liquidWave 5s ease-in-out infinite',
                transformOrigin: 'center',
                animationDelay: '1s'
              }}
            />
          </svg>

          {/* 深海背景填充 - 增强颜色标记 */}
          <div className={clsx("absolute top-0 left-0 w-full h-full", currentStyles.gradient)} >
            {/* 动态气泡效果 */}
            <div className="absolute inset-0 overflow-hidden">
              {isActive && [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={clsx("absolute rounded-full opacity-0 transition-opacity duration-1000", currentStyles.bubble)}
                  style={{
                    width: `${4 + Math.random() * 6}px`,
                    height: `${4 + Math.random() * 6}px`,
                    left: `${10 + i * 12}%`,
                    bottom: `${-20 + Math.random() * 40}%`,
                    animation: `bubble ${4 + Math.random() * 3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                    opacity: progress > 5 ? 0.6 : 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 脉冲光晕效果 */}
        {isActive && (
          <div
            className={clsx("absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out opacity-30", `bg-gradient-to-t ${currentStyles.pulse} to-transparent`)}
            style={{
              height: `${progress * 1.2}%`,
              transform: `translateY(${100 - progress * 1.2}%)`,
              transition: 'height 1s ease-out, transform 1s ease-out',
              animation: 'pulseGlow 2s ease-in-out infinite alternate'
            }}
          />
        )}
      </div>

      {/* 成就管理器 */}
      {completedSession && (
        <AchievementManager
          session={completedSession}
          onComplete={handleAchievementComplete}
        />
      )}

      {/* 分享卡片 */}
      {showShareCard && completedSession && (
        <ShareCard
          session={completedSession}
          onClose={handleCloseShareCard}
        />
      )}

      {/* 顶部进度指示器 */}
      <div
        className={clsx("absolute top-0 left-0 h-1 transition-all duration-1000 ease-linear z-10", currentStyles.progress)}
        style={{ width: `${progress}%` }}
      />

      {/* 模式切换 */}
      <div className="flex gap-2 mb-8 bg-black/20 p-1 rounded-lg relative z-20">
        <button
          onClick={() => switchMode('focus')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'focus' ? `${currentStyles.btnActive} text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          {t('Focus')}
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'shortBreak' ? `${currentStyles.btnActive} text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          {t('Short Break')}
        </button>
         <button
          onClick={() => switchMode('longBreak')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'longBreak' ? `${currentStyles.btnActive} text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          {t('Long Break')}
        </button>
        <button
          onClick={() => switchMode('custom')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'custom' ? `${currentStyles.btnActive} text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          {t('Custom')}
        </button>
      </div>

      {/* 时间显示 */}
      <div className="relative mb-8 z-20">
        {mode === 'custom' && !isActive ? (
          <div className="flex items-center justify-center">
            <input
              type="number"
              min="1"
              max="120"
              value={customDuration}
              onInput={(e) => {
                let val = parseInt(e.target.value);
                if (isNaN(val) || val < 1) val = 1;
                if (val > 120) val = 120;
                setCustomDuration(val);
                setTimeLeft(val * 60);
              }}
              className="text-8xl font-bold font-mono tracking-wider bg-transparent text-center w-64 focus:outline-none border-b-2 border-white/20 hover:border-white/50 transition-colors"
            />
            <span className="text-xl opacity-60 ml-2 mt-8 font-medium">min</span>
          </div>
        ) : (
          <div className="text-8xl font-bold font-mono tracking-wider tabular-nums">
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-4 relative z-20">
        <button
          onClick={toggleTimer}
          className={clsx(
            "w-16 h-16 flex items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95",
            currentStyles.btnBg
          )}
        >
          {isActive ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 ml-1 fill-current" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all hover:scale-105 active:scale-95"
          title={t('Reset')}
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      {/* CSS动画定义 */}
      <style jsx>{`
        @keyframes liquidWave {
          0%, 100% {
            transform: translateX(0) translateY(0) scaleY(1);
          }
          25% {
            transform: translateX(-20px) translateY(-3px) scaleY(1.05);
          }
          50% {
            transform: translateX(0) translateY(-6px) scaleY(1.1);
          }
          75% {
            transform: translateX(20px) translateY(-3px) scaleY(1.05);
          }
        }

        @keyframes bubble {
          0% {
            transform: translateY(0px) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
            transform: scale(1);
          }
          80% {
            opacity: 0.6;
            transform: translateY(-30px) scale(0.9);
          }
          100% {
            transform: translateY(-40px) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes pulseGlow {
          0% {
            opacity: 0.2;
            filter: blur(2px);
          }
          100% {
            opacity: 0.5;
            filter: blur(4px);
          }
        }

        .animate-liquid-wave {
          animation: liquidWave 3s ease-in-out infinite;
        }

        .animate-bubble {
          animation: bubble 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
