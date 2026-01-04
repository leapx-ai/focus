import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeContext';
import { format, subDays, startOfDay } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// 注册ChartJS组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function StatsPanel() {
  const { currentTheme } = useTheme();
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    totalTime: 0,
    totalSessions: 0,
    streak: 0,
    todayTime: 0,
    weekTime: 0,
    bestHour: 0
  });

  useEffect(() => {
    // 从localStorage加载数据
    const savedSessions = JSON.parse(localStorage.getItem('focus-sessions') || '[]');
    setSessions(savedSessions);

    // 计算统计数据
    const now = new Date();
    const today = startOfDay(now);
    const weekStart = startOfDay(subDays(now, 7));

    const todaySessions = savedSessions.filter(s =>
      new Date(s.endTime) >= today
    );

    const weekSessions = savedSessions.filter(s =>
      new Date(s.endTime) >= weekStart
    );

    const todayTime = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    const weekTime = weekSessions.reduce((sum, s) => sum + s.duration, 0);
    const totalTime = savedSessions.reduce((sum, s) => sum + s.duration, 0);

    // 计算最佳时段
    const hourStats = {};
    savedSessions.forEach(s => {
      const hour = new Date(s.endTime).getHours();
      hourStats[hour] = (hourStats[hour] || 0) + s.duration;
    });
    const bestHour = Object.keys(hourStats).reduce((a, b) =>
      hourStats[a] > hourStats[b] ? a : b, 0
    );

    // 计算连续天数
    const streak = calculateStreak(savedSessions);

    setStats({
      totalTime,
      totalSessions: savedSessions.length,
      streak,
      todayTime,
      weekTime,
      bestHour: parseInt(bestHour)
    });
  }, []);

  // 计算连续天数
  const calculateStreak = (sessions) => {
    if (!sessions.length) return 0;

    const dates = sessions
      .map(s => format(new Date(s.endTime), 'yyyy-MM-dd'))
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');

    if (dates[0] === today || dates[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < dates.length; i++) {
        const prevDate = new Date(dates[i-1]);
        const currDate = new Date(dates[i]);
        const diffDays = (prevDate - currDate) / 86400000;
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
    }

    return streak;
  };

  // 准备图表数据
  const weekData = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const daySessions = sessions.filter(s =>
      format(new Date(s.endTime), 'yyyy-MM-dd') === dateStr
    );
    const dayTime = daySessions.reduce((sum, s) => sum + s.duration, 0);

    weekData.push({
      date: format(date, 'MM/dd'),
      minutes: Math.floor(dayTime / 60),
      sessions: daySessions.length
    });
  }

  const chartData = {
    labels: weekData.map(d => d.date),
    datasets: [
      {
        label: '专注时长（分钟）',
        data: weekData.map(d => d.minutes),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#e5e7eb',
        borderColor: '#374151',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-indigo-400">
            {Math.floor(stats.todayTime / 60)}
          </div>
          <div className="text-sm text-gray-400">今日分钟</div>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-emerald-400">
            {Math.floor(stats.weekTime / 60)}
          </div>
          <div className="text-sm text-gray-400">本周分钟</div>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {stats.streak}
          </div>
          <div className="text-sm text-gray-400">连续天数</div>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">
            {stats.totalSessions}
          </div>
          <div className="text-sm text-gray-400">总完成数</div>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">
            {Math.floor(stats.totalTime / 60)}
          </div>
          <div className="text-sm text-gray-400">总分钟</div>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-400">
            {stats.bestHour}:00
          </div>
          <div className="text-sm text-gray-400">最佳时段</div>
        </div>
      </div>

      {/* 图表 */}
      <div className="mb-4 w-full">
        <h3 className="text-lg font-semibold mb-3">近7天趋势</h3>
        <div className="h-64 w-full bg-black/10 rounded-xl p-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* 成就进度 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">本周统计</h3>
        <div className="space-y-2">
          {weekData.map((day, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 text-sm text-gray-400">{day.date}</div>
              <div className="flex-1 bg-black/20 rounded-full h-6 relative overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(day.minutes / 180) * 100}%` }}
                />
              </div>
              <div className="text-sm text-gray-400 w-16 text-right">
                {day.minutes}分
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
