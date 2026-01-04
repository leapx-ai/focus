import { useEffect } from 'react';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';

export function AchieveBadge({ achievement, onClose }) {
  useEffect(() => {
    if (!achievement) return;
    
    // 触发粒子动画
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#8b5cf6', '#ec4899']
    });
    
    // 3秒后自动关闭
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [achievement]);
  
  if (!achievement) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl p-8 text-center transform animate-bounce-in max-w-sm mx-4">
        <div className="text-6xl mb-4">{achievement.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">成就解锁！</h3>
        <h4 className="text-xl font-semibold text-indigo-400 mb-2">{achievement.name}</h4>
        <p className="text-gray-300 mb-4">{achievement.desc}</p>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div className="bg-indigo-500 h-2 rounded-full animate-progress"></div>
        </div>
        <button 
          onClick={onClose}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition-colors"
        >
          太棒了！
        </button>
      </div>
    </div>
  );
}