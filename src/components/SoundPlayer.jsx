import { useState, useEffect, useRef } from 'preact/hooks';
import { Howl } from 'howler';
import { Volume2, VolumeX, CloudRain, Wind, Coffee, Zap, Flame, Waves } from 'lucide-preact';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';

const SOUNDS = [
  { id: 'rain', name: 'Rain', icon: CloudRain, src: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3' },
  { id: 'fire', name: 'Fire', icon: Flame, src: 'https://assets.mixkit.co/active_storage/sfx/2520/2520-preview.mp3' },
  { id: 'cafe', name: 'Cafe', icon: Coffee, src: 'https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3' },
  { id: 'ocean', name: 'Ocean', icon: Waves, src: 'https://assets.mixkit.co/active_storage/sfx/2510/2510-preview.mp3' },
  { id: 'wind', name: 'Wind', icon: Wind, src: 'https://assets.mixkit.co/active_storage/sfx/2518/2518-preview.mp3' },
  { id: 'white', name: 'White Noise', icon: Zap, src: 'https://assets.mixkit.co/active_storage/sfx/2177/2177-preview.mp3' }
];

export function SoundPlayer() {
  const [playing, setPlaying] = useState(null); // id of playing sound
  const [volume, setVolume] = useState(0.5);
  const howls = useRef({});
  const { currentTheme } = useTheme();

  useEffect(() => {
    // Initialize Howls
    SOUNDS.forEach(sound => {
      howls.current[sound.id] = new Howl({
        src: [sound.src],
        loop: true,
        volume: volume,
        html5: true, // Force HTML5 Audio to allow streaming large files
        preload: false
      });
    });

    return () => {
      // Cleanup
      Object.values(howls.current).forEach(h => h.unload());
    };
  }, []);

  useEffect(() => {
    // Update volume for all
    Object.values(howls.current).forEach(h => h.volume(volume));
  }, [volume]);

  const toggleSound = (id) => {
    if (playing === id) {
      howls.current[id].fade(volume, 0, 1000);
      setTimeout(() => {
        howls.current[id].stop();
        // Reset fade for next play
        howls.current[id].volume(volume);
      }, 1000);
      setPlaying(null);
    } else {
      if (playing) {
        howls.current[playing].fade(volume, 0, 500);
        setTimeout(() => howls.current[playing].stop(), 500);
      }
      howls.current[id].volume(0);
      howls.current[id].play();
      howls.current[id].fade(0, volume, 1000);
      setPlaying(id);
    }
  };

  return (
    <div className={clsx("rounded-2xl p-6 shadow-xl h-full transition-colors flex flex-col", currentTheme.colors.card)}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span>🔊</span> Ambience
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
        {SOUNDS.map(sound => {
            const Icon = sound.icon;
            const isPlaying = playing === sound.id;
            return (
                <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    className={clsx(
                        "flex flex-col items-center justify-center p-3 rounded-xl transition-all border-2",
                        isPlaying
                            ? `bg-${currentTheme.colors.primary}-600/20 border-${currentTheme.colors.primary}-500 text-${currentTheme.colors.primary}-400`
                            : "bg-black/10 border-transparent opacity-60 hover:opacity-100 hover:bg-black/20"
                    )}
                >
                    <Icon size={28} className="mb-2" />
                    <span className="text-xs font-medium">{sound.name}</span>
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
    </div>
  );
}
