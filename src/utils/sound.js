// 键盘音效管理器
class KeyboardSound {
  constructor() {
    this.audioContext = null;
    this.enabled = false;
    this.initAudioContext();
  }
  
  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported');
    }
  }
  
  playKeySound() {
    if (!this.enabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // 设置音色
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800 + Math.random() * 200, this.audioContext.currentTime);
    
    // 音量包络
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }
  
  setEnabled(enabled) {
    this.enabled = enabled;
    if (enabled && this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// 震动反馈
export function vibrate(duration = 50) {
  if ('vibrate' in navigator) {
    navigator.vibrate(duration);
  }
}

// 屏幕震动动画
export function screenShake(element, intensity = 5, duration = 300) {
  if (!element) return;
  
  element.style.animation = `shake ${duration}ms ease-in-out`;
  element.style.setProperty('--shake-intensity', `${intensity}px`);
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}

// 创建音效管理器实例
export const keyboardSound = new KeyboardSound();

// CSS 震动动画
const shakeCSS = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(calc(-1 * var(--shake-intensity, 5px))); }
  20%, 40%, 60%, 80% { transform: translateX(var(--shake-intensity, 5px)); }
}
`;

// 添加CSS到页面
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shakeCSS;
  document.head.appendChild(style);
}