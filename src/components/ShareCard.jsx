import { useState, useEffect, useRef } from 'preact/hooks';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, Download, Share, X } from 'lucide-preact';
import { clsx } from 'clsx';

export function ShareCard({ session, onClose }) {
  const { currentTheme } = useTheme();
  const { t, language } = useLanguage();
  const canvasRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const quotes = {
    zh: [
      "专注当下，成就未来",
      "每一分钟都是进步",
      "坚持就是胜利",
      "今天的努力，明天的收获",
      "专注让梦想更近",
      "时间用在刀刃上",
      "专注是最高效的工作方式",
      "静下心来，世界就静了"
    ],
    en: [
      "Focus on the present, achieve the future",
      "Every minute is progress",
      "Persistence is victory",
      "Today's effort, tomorrow's harvest",
      "Focus brings dreams closer",
      "Time well spent",
      "Focus is the most efficient way to work",
      "Quiet your mind, the world becomes quiet"
    ]
  };

  // 组件挂载后立即生成卡片
  useEffect(() => {
    generateCard();
  }, []);

  const generateCard = async () => {
    setIsGenerating(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 设置画布尺寸
    canvas.width = 1080;
    canvas.height = 1080;

    // 背景渐变
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1f2937');
    gradient.addColorStop(1, '#111827');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 添加装饰性圆形
    ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
    ctx.beginPath();
    ctx.arc(canvas.width - 200, 200, 300, 0, Math.PI * 2);
    ctx.fill();

    // 标题
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px sans-serif';
    ctx.textAlign = 'center';
    const title = language === 'zh' ? '🎯 专注完成！' : '🎯 Focus Complete!';
    ctx.fillText(title, canvas.width / 2, 200);

    // 时间数据
    const minutes = Math.floor(session.duration / 60);
    ctx.font = 'bold 120px sans-serif';
    ctx.fillStyle = '#6366f1';
    ctx.fillText(`${minutes}`, canvas.width / 2, 400);

    ctx.font = '48px sans-serif';
    ctx.fillStyle = '#9ca3af';
    const unit = language === 'zh' ? '分钟' : 'minutes';
    ctx.fillText(unit, canvas.width / 2, 480);

    // 励志语录
    const currentQuotes = quotes[language];
    const quote = currentQuotes[Math.floor(Math.random() * currentQuotes.length)];
    ctx.font = '42px sans-serif';
    ctx.fillStyle = '#e5e7eb';
    ctx.fillText(`"${quote}"`, canvas.width / 2, 650);

    // 底部品牌
    ctx.font = '32px sans-serif';
    ctx.fillStyle = '#6b7280';
    const brand = language === 'zh' ? 'Focus App - 专注让梦想更近' : 'Focus App - Focus Makes Dreams Closer';
    ctx.fillText(brand, canvas.width / 2, canvas.height - 100);

    setIsGenerating(false);
    setHasGenerated(true);
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = language === 'zh' ? `focus-${Date.now()}.png` : `focus-card-${Date.now()}.png`;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const shareCard = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'focus-card.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          const title = language === 'zh' ? '专注完成！' : 'Focus Complete!';
          const text = language === 'zh'
            ? `我刚刚专注了${Math.floor(session.duration / 60)}分钟，一起来专注吧！`
            : `I just focused for ${Math.floor(session.duration / 60)} minutes, let's focus together!`;

          await navigator.share({
            title: title,
            text: text,
            files: [file]
          });
        } catch (err) {
          console.log('分享取消');
        }
      } else {
        // 降级：下载图片
        downloadCard();
      }
    });
  };

  return (
    <div className={clsx("fixed inset-0 bg-black/50 flex items-center justify-center z-60 animate-fade-in", currentTheme.colors.text)}>
      <div className={clsx("rounded-2xl p-6 max-w-md w-full mx-4 transform animate-bounce-in", currentTheme.colors.card)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2 animate-float">
            <Trophy size={24} className="text-yellow-500" />
            {t('Share Your Focus')}
          </h3>
          <button
            onClick={onClose}
            className="opacity-60 hover:opacity-100 transition-opacity hover:rotate-90 transform"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <canvas
            ref={canvasRef}
            className="w-full rounded-lg border border-white/10 share-card-canvas"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="flex gap-3">
          {!hasGenerated ? (
            <button
              onClick={generateCard}
              disabled={isGenerating}
              className={clsx(
                "flex-1 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95",
                `bg-gradient-to-r from-${currentTheme.colors.primary}-500 to-${currentTheme.colors.primary}-600 text-white`,
                isGenerating && "opacity-50 cursor-not-allowed animate-pulse"
              )}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  {t('Loading...')}
                </>
              ) : (
                `✨ ${t('Generate Card')}`
              )}
            </button>
          ) : (
            <>
              <button
                onClick={downloadCard}
                className={clsx(
                  "flex-1 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2",
                  "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600"
                )}
              >
                <Download size={16} />
                {t('Download')}
              </button>

              <button
                onClick={shareCard}
                className={clsx(
                  "flex-1 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2",
                  "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500"
                )}
              >
                <Share size={16} />
                {t('Share')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
