import { useState, useEffect } from 'react';

export function useLevel() {
  const [XP, setXP] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('focus-xp') || '0');
  });
  
  const level = Math.floor(Math.sqrt(XP) / 10) + 1;
  const xpForNext = Math.pow(level * 10, 2);
  const xpForCurrent = Math.pow((level - 1) * 10, 2);
  const xpProgress = XP - xpForCurrent;
  const xpNeeded = xpForNext - xpForCurrent;
  
  useEffect(() => {
    localStorage.setItem('focus-xp', XP.toString());
  }, [XP]);
  
  const addXP = (amount) => {
    const newXP = XP + amount;
    const newLevel = Math.floor(Math.sqrt(newXP) / 10) + 1;
    const leveledUp = newLevel > level;
    
    setXP(newXP);
    return { newXP, newLevel, leveledUp };
  };
  
  return {
    XP,
    level,
    xpProgress,
    xpNeeded,
    addXP
  };
}