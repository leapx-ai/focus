import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-preact';
import { clsx } from 'clsx';

export function LanguageToggle() {
  const { language, switchLanguage, t } = useLanguage();
  
  return (
    <button
      onClick={switchLanguage}
      className={clsx(
        "fixed top-6 right-6 px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2",
        "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
        "hover:shadow-xl z-50 border border-white/20 backdrop-blur-sm"
      )}
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Globe size={16} className="animate-pulse" />
      <span className="text-sm font-bold tracking-wide">
        {language === 'zh' ? '中文' : 'EN'}
      </span>
    </button>
  );
}