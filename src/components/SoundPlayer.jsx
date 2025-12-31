import { useState, useEffect, useRef } from 'preact/hooks';
import { Volume2, VolumeX, CloudRain, Wind, Coffee, Zap, Flame, Waves, Music } from 'lucide-preact';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const SOUNDS = [
  { id: 'rain', name: '雨声', icon: CloudRain, src: '/calming-rain-257596.mp3' },
  { id: 'fire', name: '篝火', icon: Flame, src: '/fire-crackling-sounds-427410.mp3' },
  { id: 'cafe', name: '咖啡厅', icon: Coffee, src: '/cafe-noise-32940.mp3' },
  { id: 'ocean', name: '海浪', icon: Waves, src: '/ocean-waves-376898.mp3' },
  { id: 'white', name: '白噪音', icon: Zap, src: '/whitenoise-372485.mp3' },
  { id: 'uplifting', name: '舒缓音', icon: Music, src: '/uplifting-pad-texture-113842.mp3' }
];

export function SoundPlayer() {
  const [playing, setPlaying] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [audioStatus, setAudioStatus] = useState({});
  const audioRefs = useRef({});
  const { currentTheme } = useTheme();
  const { t, language } = useLanguage();

  useEffect(() => {
    // 创建音频元素并测试加载
    SOUNDS.forEach(sound => {
      const audio = new Audio();
      audio.volume = volume;
      audio.loop = true;

      // 测试文件是否存在
      fetch(sound.src, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            console.log(`✅ 文件存在: ${sound.name}`);
            audio.src = sound.src;
            setAudioStatus(prev => ({ ...prev, [sound.id]: 'available' }));
          } else {
            console.error(`❌ 文件不存在: ${sound.name} (${response.status})`);
            setAudioStatus(prev => ({ ...prev, [sound.id]: 'missing' }));
          }
        })
        .catch(error => {
          console.error(`❌ 网络错误: ${sound.name}`, error);
          setAudioStatus(prev => ({ ...prev, [sound.id]: 'error' }));
        });

      // 音频事件监听
      audio.addEventListener('loadeddata', () => {
        console.log(`📦 音频加载完成: ${sound.name}`);
        setAudioStatus(prev => ({ ...prev, [sound.id]: 'loaded' }));
      });

      audio.addEventListener('error', (e) => {
        console.error(`💥 音频错误: ${sound.name}`, e);
        setAudioStatus(prev => ({ ...prev, [sound.id]: 'error' }));
      });

      audio.addEventListener('play', () => {
        console.log(`▶️ 开始播放: ${sound.name}`);
      });

      audio.addEventListener('pause', () => {
        console.log(`⏸️ 暂停播放: ${sound.name}`);
      });

      audioRefs.current[sound.id] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = volume;
    });
  }, [volume]);

  const toggleSound = async (id) => {
    const audio = audioRefs.current[id];
    if (!audio) {
      console.error('音频对象不存在');
      return;
    }

    if (playing === id) {
      // 停止播放
      audio.pause();
      audio.currentTime = 0;
      setPlaying(null);
    } else {
      // 停止其他音频
      if (playing) {
        const prevAudio = audioRefs.current[playing];
        if (prevAudio) {
          prevAudio.pause();
          prevAudio.currentTime = 0;
        }
      }

      // 播放新音频
      try {
        console.log(`🎯 尝试播放: ${SOUNDS.find(s => s.id === id)?.name}`);

        // 如果音频没有src，先设置
        if (!audio.src) {
          const sound = SOUNDS.find(s => s.id === id);
          if (sound) {
            audio.src = sound.src;
            // 等待加载
            await new Promise((resolve, reject) => {
              const onLoaded = () => {
                audio.removeEventListener('loadeddata', onLoaded);
                audio.removeEventListener('error', onError);
                resolve();
              };
              const onError = (e) => {
                audio.removeEventListener('loadeddata', onLoaded);
                audio.removeEventListener('error', onError);
                reject(e);
              };
              audio.addEventListener('loadeddata', onLoaded);
              audio.addEventListener('error', onError);
              audio.load();
              setTimeout(() => reject(new Error('加载超时')), 3000);
            });
          }
        }

        await audio.play();
        setPlaying(id);
        console.log(`✅ 播放成功: ${SOUNDS.find(s => s.id === id)?.name}`);
      } catch (error) {
        console.error('❌ 播放失败:', error);
        alert(`播放失败: ${error.message}. 请检查音频文件是否存在。`);
      }
    }
  };

  return (
    <div className={clsx("rounded-2xl p-6 shadow-xl h-full transition-colors flex flex-col", currentTheme.colors.card)}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span>🎵</span> {t('Ambience')}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
        {SOUNDS.map(sound => {
            const Icon = sound.icon;
            const isPlaying = playing === sound.id;
            const status = audioStatus[sound.id];

            return (
                <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    disabled={status === 'missing' || status === 'error'}
                    className={clsx(
                        "flex flex-col items-center justify-center p-3 rounded-xl transition-all border-2 relative",
                        isPlaying
                            ? `bg-${currentTheme.colors.primary}-600/20 border-${currentTheme.colors.primary}-500 text-${currentTheme.colors.primary}-400`
                            : "bg-black/10 border-transparent opacity-60 hover:opacity-100 hover:bg-black/20",
                        (status === 'missing' || status === 'error') && "opacity-30 cursor-not-allowed border-red-500/50",
                        status === 'available' && "border-green-500/50"
                    )}
                >
                    <Icon size={28} className="mb-2" />
                    <span className="text-xs font-medium">{language === 'zh' ? sound.name : t(sound.id)}</span>

                    {/* 状态指示器 */}
                    {status === 'loading' && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    )}
                    {status === 'error' && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    {status === 'missing' && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                    {isPlaying && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                                <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                                <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                            </div>
                        </div>
                    )}
                </button>
            )
        })}
      </div>

      <div className="mt-6 flex items-center gap-4 bg-black/20 p-3 rounded-lg">
        <Volume2 size={20} className="opacity-60" />
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onInput={(e) => setVolume(parseFloat(e.target.value))}
            className={clsx("w-full h-2 rounded-lg appearance-none cursor-pointer bg-black/40", `accent-${currentTheme.colors.primary}-500`)}
        />
      </div>

      <div className="mt-2 text-xs text-gray-400 text-center">
        {language === 'zh' ? '点击按钮播放白噪音，再次点击停止' : 'Click to play ambience, click again to stop'}
      </div>
    </div>
  );
}
