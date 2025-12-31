import { Layout } from './components/Layout';
import { Timer } from './components/Timer';
import { TodoList } from './components/TodoList';
import { SoundPlayer } from './components/SoundPlayer';
import { StatsModal } from './components/StatsModal';
import { KeyboardSoundToggle } from './components/KeyboardSoundToggle';
import { LanguageProvider } from './context/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';

export function App() {
  return (
    <LanguageProvider>
      <Layout>
        <div className="flex flex-col gap-6">
          <section>
            <Timer />
          </section>
          
          <section className="grid md:grid-cols-2 gap-6">
            <SoundPlayer />
            <TodoList />
          </section>
        </div>
        
        {/* 语言切换按钮 */}
        <LanguageToggle />
        
        {/* 统计按钮 */}
        <StatsModal />
        
        {/* 键盘音效开关 */}
        <div className="fixed bottom-6 left-6">
          <KeyboardSoundToggle />
        </div>
      </Layout>
    </LanguageProvider>
  );
}