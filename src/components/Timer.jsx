import { useState, useEffect } from 'preact/hooks';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { AchievementManager } from './AchievementManager';
import { ShareCard } from './ShareCard';
import { clsx } from 'clsx';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const [completedSession, setCompletedSession] = useState(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const { currentTheme } = useTheme();
  const { t } = useLanguage();

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
        duration: mode === 'focus' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60,
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
        {/* 渐变填充背景 */}
        <div
          className={clsx("absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out", `bg-gradient-to-t from-${currentTheme.colors.primary}-600/30 to-transparent`)}
          style={{
            height: `${progress}%`,
            transform: `translateY(${100 - progress}%)`,
            transition: 'height 1s ease-out, transform 1s ease-out'
          }}
        />

        {/* 液体波浪效果 */}
        {isActive && (
          <div
            className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out"
            style={{
              height: `${progress}%`,
              transform: `translateY(${100 - progress}%)`,
              transition: 'height 1s ease-out, transform 1s ease-out'
            }}
          >
            {/* 多层液体波浪 */}
            <svg className="absolute top-0 left-0 w-full h-12" viewBox="0 0 1200 80" preserveAspectRatio="none">
              {/* 主波浪层 */}
              <path
                d="M0,40 Q200,10 400,40 T800,40 Q1000,70 1200,40 L1200,80 L0,80 Z"
                className={clsx("fill-current opacity-60", `text-${currentTheme.colors.primary}-500`)}
                style={{
                  animation: 'liquidWave 3s ease-in-out infinite',
                  transformOrigin: 'center'
                }}
              />
              {/* 中层波浪 */}
              <path
                d="M0,50 Q300,20 600,50 T1000,50 Q1100,75 1200,50 L1200,80 L0,80 Z"
                className={clsx("fill-current opacity-40", `text-${currentTheme.colors.primary}-400`)}
                style={{
                  animation: 'liquidWave 4s ease-in-out infinite reverse',
                  transformOrigin: 'center',
                  animationDelay: '0.5s'
                }}
              />
              {/* 细腻波浪 */}
              <path
                d="M0,60 Q400,45 800,60 T1200,60 L1200,80 L0,80 Z"
                className={clsx("fill-current opacity-25", `text-${currentTheme.colors.primary}-300`)}
                style={{
                  animation: 'liquidWave 5s ease-in-out infinite',
                  transformOrigin: 'center',
                  animationDelay: '1s'
                }}
              />
            </svg>

            {/* 动态气泡效果 */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={clsx("absolute rounded-full opacity-0 transition-opacity duration-1000", `bg-${currentTheme.colors.primary}-200`)}
                  style={{
                    width: `${4 + Math.random() * 6}px`,
                    height: `${4 + Math.random() * 6}px`,
                    left: `${15 + i * 14}%`,
                    bottom: `${10 + Math.sin(Date.now() / 1500 + i) * 20}%`,
                    animation: `bubble ${4 + Math.random() * 3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.6}s`,
                    opacity: progress > 15 ? 0.8 : 0
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* 脉冲光晕效果 */}
        {isActive && (
          <div
            className={clsx("absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out opacity-30", `bg-gradient-to-t from-${currentTheme.colors.primary}-400/20 to-transparent`)}
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
        className={clsx("absolute top-0 left-0 h-1 transition-all duration-1000 ease-linear z-10", `bg-${currentTheme.colors.primary}-500`)}
        style={{ width: `${progress}%` }}
      />

      {/* 模式切换 */}
      <div className="flex gap-2 mb-8 bg-black/20 p-1 rounded-lg relative z-20">
        <button
          onClick={() => switchMode('focus')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'focus' ? `bg-${currentTheme.colors.primary}-600 text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          {t('Focus')}
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'shortBreak' ? `bg-${currentTheme.colors.primary}-600 text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          {t('Short Break')}
        </button>
         <button
          onClick={() => switchMode('longBreak')}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-all",
            mode === 'longBreak' ? `bg-${currentTheme.colors.primary}-600 text-white shadow-lg` : "opacity-60 hover:opacity-100"
          )}
        >
          {t('Long Break')}
        </button>
      </div>

      {/* 时间显示 */}
      <div className="text-8xl font-bold font-mono tracking-wider mb-8 tabular-nums relative z-20">
        {formatTime(timeLeft)}
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-4 relative z-20">
        <button
          onClick={toggleTimer}
          className={clsx(
            "w-16 h-16 flex items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95",
            `bg-${currentTheme.colors.primary}-500 hover:bg-${currentTheme.colors.primary}-400 shadow-${currentTheme.colors.primary}-500/30`
          )}
        >
          {isActive ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all hover:scale-105 active:scale-95"
          title={t('Reset')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0A9.003 9.003 0 007 4.581"/>
          </svg>
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
