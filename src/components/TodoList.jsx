import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Trash2, CheckCircle2, Circle, BarChart3, Calendar, Clock, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import { format, isSameDay, startOfWeek, endOfWeek, isWithinInterval, parseISO } from 'date-fns';

export function TodoList() {
  const [todos, setTodos] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('focus-todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [showStats, setShowStats] = useState(false);
  const { currentTheme } = useTheme();
  const { t } = useLanguage();

  // 统计数据
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0
  };

  // 今日完成统计
  const todayCompleted = todos.filter(t => {
    if (!t.completed || !t.completedAt) return false;
    const today = new Date().toDateString();
    const completedDate = new Date(t.completedAt).toDateString();
    return today === completedDate;
  }).length;

  // 本周完成统计
  const weekCompleted = todos.filter(t => {
    if (!t.completed || !t.completedAt) return false;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return new Date(t.completedAt) >= weekAgo;
  }).length;

  useEffect(() => {
    localStorage.setItem('focus-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { 
      id: Date.now(), 
      text: input, 
      completed: false,
      createdAt: new Date().toISOString()
    }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => {
      if (t.id === id) {
        return { 
          ...t, 
          completed: !t.completed,
          completedAt: !t.completed ? new Date().toISOString() : null
        };
      }
      return t;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  return (
    <div className={clsx("rounded-2xl p-6 shadow-xl h-full flex flex-col min-h-[400px] transition-colors", currentTheme.colors.card)}>
      {/* 头部区域 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>📝</span> {t('Tasks')}
        </h2>
        <button
          onClick={() => setShowStats(!showStats)}
          className={clsx(
            "p-2 rounded-lg transition-colors",
            showStats ? `bg-${currentTheme.colors.primary}-600 text-white` : "bg-black/20 hover:bg-black/30"
          )}
          title={t('View Statistics')}
        >
          <BarChart3 size={20} />
        </button>
      </div>

      {/* 统计面板 */}
      {showStats && (
        <div className="mb-4 p-4 bg-black/10 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-400" />
            📊 {t('Task Statistics')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
              <div className="text-xs text-gray-400">{t('Total')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-xs text-gray-400">{t('Completed')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
              <div className="text-xs text-gray-400">{t('Pending')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.completionRate}%</div>
              <div className="text-xs text-gray-400">{t('Completion Rate')}</div>
            </div>
          </div>
          
          {/* 时间维度统计 */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-gray-300">
              <Calendar size={16} className="text-emerald-400" />
              {t('Time Statistics')}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-400">{todayCompleted}</div>
                <div className="text-xs text-gray-400">{t('Today Completed')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-400">{weekCompleted}</div>
                <div className="text-xs text-gray-400">{t('Week Completed')}</div>
              </div>
            </div>
          </div>
          
          {/* 进度条 */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-orange-400" />
                {t('Progress')}
              </span>
              <span>{stats.completionRate}%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div 
                className={clsx("h-2 rounded-full transition-all duration-500", `bg-${currentTheme.colors.primary}-500`)}
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
          
          {/* 清理按钮 */}
          {stats.completed > 0 && (
            <button
              onClick={clearCompleted}
              className="mt-3 w-full py-2 px-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Trash2 size={14} />
              {t('Clear Completed')} ({stats.completed})
            </button>
          )}
        </div>
      )}

      {/* 添加任务表单 */}
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onInput={(e) => setInput(e.target.value)}
          placeholder={t('Add a new task...')}
          className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
        />
        <button
          type="submit"
          className={clsx("text-white p-2 rounded-lg transition-colors", `bg-${currentTheme.colors.primary}-600 hover:bg-${currentTheme.colors.primary}-500`)}
        >
          <Plus size={24} />
        </button>
      </form>

      {/* 快速统计条 */}
      {!showStats && (
        <div className="mb-4 flex justify-between text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <BarChart3 size={12} />
            {t('Total')}: {stats.total}
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-green-400" />
            {t('Completed')}: {stats.completed}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={12} className="text-purple-400" />
            {t('Completion Rate')}: {stats.completionRate}%
          </span>
        </div>
      )}

      {/* 任务列表 */}
      <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {todos.length === 0 && (
            <div className="text-center opacity-50 py-8">
                {t('No tasks yet. Stay focused!')}
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