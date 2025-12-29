import { Layout } from './components/Layout';
import { Timer } from './components/Timer';
import { TodoList } from './components/TodoList';
import { SoundPlayer } from './components/SoundPlayer';

export function App() {
  return (
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
    </Layout>
  );
}
