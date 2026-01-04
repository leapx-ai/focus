import { Github, Palette } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { clsx } from 'clsx';

export function Layout({ children }) {
  const { theme, setTheme, currentTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={clsx("min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto transition-colors duration-300", currentTheme.colors.text)}>
      <main className="flex-1 p-6 flex flex-col gap-8">
        <header className="flex justify-between items-center border-b border-gray-800/30 pb-4">
          <div className="flex items-center gap-2">
            <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", `bg-${currentTheme.colors.primary}-500`)}>
                <span className="font-bold text-white">F</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{t('Focus.')}</h1>
          </div>
          <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
            <Github size={20} />
          </a>
        </header>
        
        <div className="flex-1">
          {children}
        </div>

        <footer className="text-center opacity-50 text-sm mt-8 pb-4">
          <p>© 2024 Focus App. {t('Stay Productive')}.</p>
        </footer>
      </main>
      
      <aside className={clsx("w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-800/30 p-6 flex flex-col gap-8 transition-colors", currentTheme.colors.sidebar)}>
         {/* Theme Switcher */}
         <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold opacity-60 uppercase tracking-wider mb-4">
                <Palette size={14} />
                {t('Themes (Free)')}
            </h3>
             <div className={clsx("rounded-xl p-4", currentTheme.colors.card)}>
                <div className="flex gap-3 mb-3 justify-between">
                    {Object.keys(THEMES).map((themeKey) => {
                        const t = THEMES[themeKey];
                        const isActive = theme === themeKey;
                        let bgColorClass = '';
                        // Manual mapping for demo since dynamic safelist might be tricky without full config
                        if (themeKey === 'default') bgColorClass = 'bg-indigo-500';
                        if (themeKey === 'forest') bgColorClass = 'bg-emerald-500';
                        if (themeKey === 'sunset') bgColorClass = 'bg-orange-500';
                        if (themeKey === 'ocean') bgColorClass = 'bg-cyan-500';

                        return (
                             <button 
                                key={themeKey}
                                onClick={() => setTheme(themeKey)}
                                className={clsx(
                                    "w-8 h-8 rounded-full ring-2 cursor-pointer transition-all hover:scale-110",
                                    bgColorClass,
                                    isActive ? "ring-white scale-110" : "ring-transparent opacity-70 hover:opacity-100"
                                )}
                                title={t.name}
                            ></button>
                        )
                    })}
                </div>
                <p className="text-xs text-center opacity-60">
                    {t('Current')}: <span className="font-medium">{currentTheme.name}</span>
                </p>
             </div>
         </div>
      </aside>
    </div>
  );
}