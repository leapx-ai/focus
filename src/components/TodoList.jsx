import { useState, useEffect } from 'preact/hooks';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-preact';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';

export function TodoList() {
  const [todos, setTodos] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('focus-todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const { currentTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('focus-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className={clsx("rounded-2xl p-6 shadow-xl h-full flex flex-col min-h-[400px] transition-colors", currentTheme.colors.card)}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span>📝</span> Tasks
      </h2>

      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onInput={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
        />
        <button
          type="submit"
          className={clsx("text-white p-2 rounded-lg transition-colors", `bg-${currentTheme.colors.primary}-600 hover:bg-${currentTheme.colors.primary}-500`)}
        >
          <Plus size={24} />
        </button>
      </form>

      <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {todos.length === 0 && (
            <div className="text-center opacity-50 py-8">
                No tasks yet. Stay focused!
            </div>
        )}
        {todos.map(todo => (
          <div
            key={todo.id}
            className={clsx(
              "group flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-black/10",
              todo.completed ? "bg-black/20" : "bg-black/5"
            )}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={clsx(
                "transition-colors",
                todo.completed ? `text-${currentTheme.colors.primary}-500` : "opacity-50 hover:opacity-100"
              )}
            >
              {todo.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>

            <span className={clsx(
              "flex-1 text-sm transition-all",
              todo.completed ? "opacity-40 line-through" : "opacity-90"
            )}>
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition-all hover:text-rose-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
