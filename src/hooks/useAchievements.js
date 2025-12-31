import { useState, useEffect } from 'preact/hooks';
import { ACHIEVEMENTS, checkAchievements, calculateStreak } from '../utils/achievements';

export function useAchievements() {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('focus-achievements');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newlyUnlocked, setNewlyUnlocked] = useState([]);
  
  useEffect(() => {
    localStorage.setItem('focus-achievements', JSON.stringify(unlocked));
  }, [unlocked]);
  
  const checkNewAchievements = (session, allSessions) => {
    const newly = checkAchievements(session, allSessions);
    const trulyNew = newly.filter(id => !unlocked.includes(id));
    
    if (trulyNew.length > 0) {
      setUnlocked(prev => [...prev, ...trulyNew]);
      setNewlyUnlocked(trulyNew);
      // 清空新成就提示
      setTimeout(() => setNewlyUnlocked([]), 5000);
    }
    
    return trulyNew;
  };
  
  const getAchievement = (id) => ACHIEVEMENTS.find(a => a.id === id);
  
  return {
    unlocked,
    newlyUnlocked,
    checkNewAchievements,
    getAchievement,
    allAchievements: ACHIEVEMENTS
  };
}