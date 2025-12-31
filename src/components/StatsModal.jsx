import { useState } from 'preact/hooks';
import { useTheme } from '../context/ThemeContext';
import { clsx } from 'clsx';
import { BarChart3, X } from 'lucide-preact';
import { StatsPanel } from './StatsPanel';

export function StatsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme } = useTheme();
  
  return (
    <>
      {/* 统计按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "stats-toggle-btn p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110",
          `bg-gradient-to-r from-${currentTheme.colors.primary}-500 to-${currentTheme.colors.primary}-600 text-white`,
          "hover:shadow-2xl"
        )}
        title="查看统计数据"
      >
        <BarChart3 size={24} className="animate-pulse" />
      </button>
      
      {/* 统计弹窗 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
          <div className={clsx(
            "rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform animate-bounce-in",
            currentTheme.colors.card,
            "border border-white/10 shadow-2xl"
          )}>
            <div className="sticky top-0 p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-black/20 to-transparent">
              <h2 className="text-2xl font-bold text-gradient">📊 数据统计</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="opacity-60 hover:opacity-100 transition-opacity hover:rotate-90 transform p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <StatsPanel />
            </div>
          </div>
        </div>
      )}
    </>
  );
}