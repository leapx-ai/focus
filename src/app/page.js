'use client';

import dynamic from 'next/dynamic';
import { Layout } from '../components/Layout';
import { Timer } from '../components/Timer';
import { TodoList } from '../components/TodoList';
import { SoundPlayer } from '../components/SoundPlayer';
import { StatsModal } from '../components/StatsModal';
import { KeyboardSoundToggle } from '../components/KeyboardSoundToggle';
import { LanguageToggle } from '../components/LanguageToggle';

// 动态导入组件以避免SSR问题 (因为使用了localStorage和window对象)
const ClientTimer = dynamic(() => import('../components/Timer').then(mod => mod.Timer), { ssr: false });
const ClientTodoList = dynamic(() => import('../components/TodoList').then(mod => mod.TodoList), { ssr: false });
const ClientSoundPlayer = dynamic(() => import('../components/SoundPlayer').then(mod => mod.SoundPlayer), { ssr: false });
const ClientStatsModal = dynamic(() => import('../components/StatsModal').then(mod => mod.StatsModal), { ssr: false });
const ClientKeyboardSoundToggle = dynamic(() => import('../components/KeyboardSoundToggle').then(mod => mod.KeyboardSoundToggle), { ssr: false });

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <section>
          <ClientTimer />
        </section>
        
        <section className="grid md:grid-cols-2 gap-6">
          <ClientSoundPlayer />
          <ClientTodoList />
        </section>
      </div>
      
      {/* 语言切换按钮 */}
      <LanguageToggle />
      
      {/* 统计按钮 */}
      <ClientStatsModal />
      
      {/* 键盘音效开关 */}
      <div className="fixed bottom-6 left-6">
        <ClientKeyboardSoundToggle />
      </div>
    </Layout>
  );
}
