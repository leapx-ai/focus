import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, X, Star, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { useAchievements } from '../hooks/useAchievements';
import { useLevel } from '../hooks/useLevel';

export function AchievementManager({ session, onComplete }) {
  const { checkNewAchievements, newlyUnlocked, getAchievement } = useAchievements();
  const { addXP, level, leveledUp } = useLevel();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [achievementsToShow, setAchievementsToShow] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentTheme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    if (!session || isProcessing) return;

    setIsProcessing(true);

    // 添加经验值（每分钟1XP）
    const xpGained = Math.floor(session.duration / 60);
    const { newXP, newLevel, leveledUp: newLevelUp } = addXP(xpGained);

    if (newLevelUp) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    // 检查新成就
    const allSessions = JSON.parse(localStorage.getItem('focus-sessions') || '[]');
    const newAchievements = checkNewAchievements(session, allSessions);

    if (newAchievements.length > 0) {
      setAchievementsToShow(newAchievements);
      // 显示第一个新成就
      setTimeout(() => {
        setCurrentAchievement(getAchievement(newAchievements[0]));
      }, 500);
    } else {
      // 没有新成就，直接显示分享卡片
      setTimeout(() => {
        setShowShareCard(true);
        setIsProcessing(false);
      }, 1000);
    }
  }, [session, isProcessing]);

  const handleCloseAchievement = () => {
    setCurrentAchievement(null);

    // 移除已显示的成就
    const remaining = achievementsToShow.slice(1);
    setAchievementsToShow(remaining);

    // 如果还有未显示的成就，继续显示
    if (remaining.length > 0) {
      setTimeout(() => {
        setCurrentAchievement(getAchievement(remaining[0]));
      }, 500);
    } else {
      // 所有成就显示完毕，显示分享卡片
      setTimeout(() => {
        setShowShareCard(true);
        setIsProcessing(false);
      }, 500);
    }
  };

  const handleCloseShareCard = () => {
    setShowShareCard(false);
    if (onComplete) onComplete();
  };

  return (
    <>
      {/* 成就弹窗 */}
      {currentAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className={clsx(
            "rounded-2xl p-8 text-center transform animate-bounce-in max-w-sm mx-4 relative overflow-hidden",
            currentTheme.colors.card,
            "border-2 border-yellow-400/50"
          )}>
            {/* 装饰性光芒效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-4 animate-bounce">{currentAchievement.icon}</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="text-yellow-500" size={24} />
                <h3 className="text-2xl font-bold text-white">🎉 {t('Achievement Unlocked!')}</h3>
                <Trophy className="text-yellow-500" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-3">{currentAchievement.name}</h4>
              <p className="text-gray-300 mb-6">{currentAchievement.desc}</p>

              {/* 成就进度指示器 */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "w-2 h-2 rounded-full",
                      i === 0 ? "bg-yellow-400" : "bg-gray-600"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={handleCloseAchievement}
                className={clsx(
                  "px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold",
                  "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                <span className="flex items-center gap-2">
                  <Star size={16} />
                  {t('Awesome!')}
                  <Star size={16} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 等级提升提示 */}
      {showLevelUp && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in z-40">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-300 animate-pulse" size={20} />
            <div>
              <div className="font-bold">🎉 {t('Level Up!')}</div>
              <div className="text-sm opacity-90">{t('Level')} {level}</div>
            </div>
            <Zap className="text-yellow-300 animate-pulse" size={20} />
          </div>
        </div>
      )}

      {/* 分享卡片 */}
      {showShareCard && (
        <ShareCard
          session={session}
          onClose={handleCloseShareCard}
        />
      )}
    </>
  );
}
