import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Volume2, VolumeX } from 'lucide-react';
import { clsx } from 'clsx';
import { keyboardSound } from '../utils/sound';

export function KeyboardSoundToggle() {
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('focus-keyboard-sound') === 'true';
  });
  const { currentTheme } = useTheme();

  useEffect(() => {
    keyboardSound.setEnabled(isEnabled);
    localStorage.setItem('focus-keyboard-sound', isEnabled.toString());
  }, [isEnabled]);

  // 监听键盘事件
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e) => {
      // 排除一些特殊按键
      if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) return;

      // 随机延迟，让声音更自然
      setTimeout(() => {
        keyboardSound.playKeySound();
      }, Math.random() * 50);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled]);

  return (
    <button
      onClick={() => setIsEnabled(!isEnabled)}
      className={clsx(
        "sound-toggle-btn p-3 rounded-full shadow-lg transition-all duration-300",
        isEnabled
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          : "bg-black/80 text-gray-300 hover:bg-black/90"
      )}
      title={isEnabled ? "关闭键盘音效" : "开启键盘音效"}
    >
      {isEnabled ? (
        <Volume2 size={20} className="animate-pulse" />
      ) : (
        <VolumeX size={20} />
      )}
    </button>
  );
}
