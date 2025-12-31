import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';

const translations = {
  zh: {
    // 导航
    'Focus.': '专注.',
    'Stay Productive': '保持高效',

    // 番茄钟
    'Timer': '番茄钟',
    'Focus': '专注',
    'Short Break': '短休',
    'Long Break': '长休',
    'Custom': '自定义',
    'Start': '开始',
    'Pause': '暂停',
    'Reset': '重置',

    // 白噪音
    'Ambience': '白噪音',
    'Rain': '雨声',
    'Fire': '篝火',
    'Cafe': '咖啡厅',
    'Ocean': '海浪',
    'Wind': '风声',
    'White Noise': '白噪音',

    // 任务清单
    'Tasks': '任务清单',
    'Add a new task...': '添加新任务...',
    'No tasks yet. Stay focused!': '暂无任务，保持专注！',
    'Task Statistics': '任务统计',
    'Total': '总任务',
    'Completed': '已完成',
    'Pending': '待完成',
    'Completion Rate': '完成率',
    'Today Completed': '今日完成',
    'Week Completed': '本周完成',
    'Progress': '完成进度',
    'Clear Completed': '清理已完成任务',
    'Time Statistics': '时间统计',
    'View Statistics': '查看统计',

    // 成就系统
    'Achievement Unlocked!': '成就解锁！',
    'Level Up!': '升级了！',
    'Share Your Focus': '分享你的专注',
    'Generate Card': '生成卡片',
    'Download': '下载',
    'Share': '分享',

    // 统计
    'Statistics': '统计数据',
    'Focus Sessions': '专注次数',
    'Total Time': '总时长',
    'Average Time': '平均时长',
    'Longest Session': '最长时长',
    'Current Streak': '当前连胜',
    'Longest Streak': '最长连胜',
    'Level': '等级',
    'XP': '经验值',
    'Achievements': '成就',
    'Achievement Progress': '成就进度',

    // 键盘音效
    'Keyboard Sound': '键盘音效',
    'Enable Keyboard Sound': '开启键盘音效',
    'Disable Keyboard Sound': '关闭键盘音效',

    // 主题
    'Themes (Free)': '主题 (免费)',
    'Current': '当前',

    // 通用
    'Loading...': '加载中...',
    'Error': '错误',
    'Success': '成功',
    'Cancel': '取消',
    'Confirm': '确认',
    'Save': '保存',
    'Delete': '删除',
    'Edit': '编辑',
    'Close': '关闭',
    'Awesome!': '太棒了！'
  },
  en: {
    // Navigation
    'Focus.': 'Focus.',
    'Stay Productive': 'Stay Productive',

    // Timer
    'Timer': 'Timer',
    'Focus': 'Focus',
    'Short Break': 'Short Break',
    'Long Break': 'Long Break',
    'Custom': 'Custom',
    'Start': 'Start',
    'Pause': 'Pause',
    'Reset': 'Reset',

    // Sound Player
    'Ambience': 'Ambience',
    'Rain': 'Rain',
    'Fire': 'Fire',
    'Cafe': 'Cafe',
    'Ocean': 'Ocean',
    'Wind': 'Wind',
    'White Noise': 'White Noise',

    // Todo List
    'Tasks': 'Tasks',
    'Add a new task...': 'Add a new task...',
    'No tasks yet. Stay focused!': 'No tasks yet. Stay focused!',
    'Task Statistics': 'Task Statistics',
    'Total': 'Total',
    'Completed': 'Completed',
    'Pending': 'Pending',
    'Completion Rate': 'Completion Rate',
    'Today Completed': 'Today Completed',
    'Week Completed': 'Week Completed',
    'Progress': 'Progress',
    'Clear Completed': 'Clear Completed',
    'Time Statistics': 'Time Statistics',
    'View Statistics': 'View Statistics',

    // Achievements
    'Achievement Unlocked!': 'Achievement Unlocked!',
    'Level Up!': 'Level Up!',
    'Share Your Focus': 'Share Your Focus',
    'Generate Card': 'Generate Card',
    'Download': 'Download',
    'Share': 'Share',

    // Statistics
    'Statistics': 'Statistics',
    'Focus Sessions': 'Focus Sessions',
    'Total Time': 'Total Time',
    'Average Time': 'Average Time',
    'Longest Session': 'Longest Session',
    'Current Streak': 'Current Streak',
    'Longest Streak': 'Longest Streak',
    'Level': 'Level',
    'XP': 'XP',
    'Achievements': 'Achievements',
    'Achievement Progress': 'Achievement Progress',

    // Keyboard Sound
    'Keyboard Sound': 'Keyboard Sound',
    'Enable Keyboard Sound': 'Enable Keyboard Sound',
    'Disable Keyboard Sound': 'Disable Keyboard Sound',

    // Themes
    'Themes (Free)': 'Themes (Free)',
    'Current': 'Current',

    // Common
    'Loading...': 'Loading...',
    'Error': 'Error',
    'Success': 'Success',
    'Cancel': 'Cancel',
    'Confirm': 'Confirm',
    'Save': 'Save',
    'Delete': 'Delete',
    'Edit': 'Edit',
    'Close': 'Close',
    'Awesome!': 'Awesome!'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'zh';
    return localStorage.getItem('focus-language') || 'zh';
  });

  useEffect(() => {
    localStorage.setItem('focus-language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const switchLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
