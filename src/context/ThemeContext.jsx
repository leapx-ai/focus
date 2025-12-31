import { createContext } from 'preact';
import { useState, useContext, useEffect } from 'preact/hooks';

const ThemeContext = createContext();

export const THEMES = {
  default: {
    name: 'Midnight',
    colors: {
      bg: 'bg-indigo-950',
      text: 'text-indigo-50',
      primary: 'indigo', // used for dynamic classes like bg-indigo-500
      sidebar: 'bg-indigo-950/50',
      card: 'bg-indigo-900'
    }
  },
  forest: {
    name: 'Forest',
    colors: {
      bg: 'bg-green-950',
      text: 'text-green-50',
      primary: 'emerald',
      sidebar: 'bg-green-950/50',
      card: 'bg-green-900'
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      bg: 'bg-orange-950',
      text: 'text-orange-50',
      primary: 'orange',
      sidebar: 'bg-orange-950/50',
      card: 'bg-orange-900'
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      bg: 'bg-cyan-950',
      text: 'text-cyan-50',
      primary: 'cyan',
      sidebar: 'bg-cyan-950/50',
      card: 'bg-cyan-900'
    }
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('focus-theme') || 'default';
    }
    return 'default';
  });

  useEffect(() => {
    localStorage.setItem('focus-theme', theme);
    // Update body class for global background
    const themeConfig = THEMES[theme];
    
    // Remove old theme classes from body
    Object.values(THEMES).forEach(t => {
       document.body.classList.remove(t.colors.bg);
       document.body.classList.remove(t.colors.text);
    });

    // Add new theme classes
    document.body.classList.add(themeConfig.colors.bg);
    document.body.classList.add(themeConfig.colors.text);

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme: THEMES[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
