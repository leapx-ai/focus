// 成就定义
export const ACHIEVEMENTS = [
  { id: 'first_focus', name: '初次专注', desc: '完成你的第一个番茄钟', icon: '🎯' },
  { id: 'night_owl', name: '深夜战士', desc: '在23:00-05:00完成番茄钟', icon: '🦉' },
  { id: 'early_bird', name: '早起鸟儿', desc: '在05:00-08:00完成番茄钟', icon: '🌅' },
  { id: 'streak_3', name: '连续3天', desc: '连续3天完成至少1个番茄钟', icon: '🔥' },
  { id: 'streak_7', name: '连续7天', desc: '连续7天完成至少1个番茄钟', icon: '💎' },
  { id: 'marathon', name: '马拉松', desc: '单日完成8个番茄钟', icon: '🏃' },
  { id: 'century', name: '世纪专注', desc: '累计完成100个番茄钟', icon: '💯' },
  { id: 'weekend', name: '周末战士', desc: '在周末完成番茄钟', icon: '🎮' },
  { id: 'night_10', name: '深夜10次', desc: '深夜时段完成10次专注', icon: '🌙' },
  { id: 'morning_10', name: '清晨10次', desc: '清晨时段完成10次专注', icon: '🌄' },
  { id: 'perfect_day', name: '完美一天', desc: '单日完成12个番茄钟', icon: '⭐' },
  { id: 'monthly', name: '月度达人', desc: '单月完成60个番茄钟', icon: '📅' }
];

// 检查是否解锁成就
export function checkAchievements(session, allSessions) {
  const unlocked = [];
  const today = new Date().toDateString();
  const todaySessions = allSessions.filter(s => new Date(s.endTime).toDateString() === today);
  const totalCount = allSessions.length;
  
  // 首次专注
  if (totalCount === 1) unlocked.push('first_focus');
  
  // 深夜/清晨
  const hour = new Date(session.endTime).getHours();
  if (hour >= 23 || hour < 5) unlocked.push('night_owl');
  if (hour >= 5 && hour < 8) unlocked.push('early_bird');
  
  // 周末
  const day = new Date(session.endTime).getDay();
  if (day === 0 || day === 6) unlocked.push('weekend');
  
  // 单日8个
  if (todaySessions.length === 8) unlocked.push('marathon');
  // 单日12个
  if (todaySessions.length === 12) unlocked.push('perfect_day');
  
  // 世纪专注
  if (totalCount === 100) unlocked.push('century');
  
  // 深夜/清晨10次
  const nightCount = allSessions.filter(s => {
    const h = new Date(s.endTime).getHours();
    return h >= 23 || h < 5;
  }).length;
  if (nightCount === 10) unlocked.push('night_10');
  
  const morningCount = allSessions.filter(s => {
    const h = new Date(s.endTime).getHours();
    return h >= 5 && h < 8;
  }).length;
  if (morningCount === 10) unlocked.push('morning_10');
  
  return unlocked;
}

// 计算连续天数
export function calculateStreak(sessions) {
  if (!sessions.length) return 0;
  
  const dates = sessions
    .map(s => new Date(s.endTime).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i) // 去重
    .sort((a, b) => new Date(b) - new Date(a));
  
  let streak = 0;
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  // 检查今天或昨天是否完成
  if (dates[0] === today || dates[0] === yesterday) {
    streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i-1]);
      const currDate = new Date(dates[i]);
      const diffDays = (prevDate - currDate) / 86400000;
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
  }
  
  return streak;
}