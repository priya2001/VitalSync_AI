import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip
} from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/health");
        setUser(res.data);
        setStats(res.data.healthData);
        setTimeout(() => setLoaded(true), 100);
      } catch {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!stats) return <div className="p-10 font-bold">Loading...</div>;

  const chartData = stats.weeklyTrend.map((v, i) => ({ day: `Day ${i + 1}`, value: v }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 font-bold p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl">Welcome VitalSync AI Dashboard, {user?.name} 👋</h1>
            <p className="text-xs text-gray-500">{user?.name}@2026</p>
          </div>
        </div>
        <button onClick={logout} className="bg-red-300 border-2 border-black px-4 py-2 text-sm shadow-[3px_3px_0px_#000]">
          LOGOUT
        </button>
      </div>

      {/* Sidebar + Main */}
      <div className="flex gap-6">
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] h-fit">
          <p className="mb-3">VitalSync AI</p>
          <div className="bg-yellow-300 border-2 border-black px-4 py-1 mb-2">Dashboard</div>
          <div className="bg-pink-300 border-2 border-black px-4 py-1 mb-2">Analytics</div>
          <div className="bg-blue-300 border-2 border-black px-4 py-1">Settings</div>
        </div>

        <div className="flex-1 space-y-6">
          {/* AI + Productivity */}
          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Card title="AI Health Score">
              <div className="w-full bg-gray-200 border-2 border-black h-6 mb-2">
                <div className="bg-green-400 h-full text-center text-xs" style={{ width: `${stats.aiScore}%` }}>
                  {stats.aiScore}%
                </div>
              </div>
              <p>{stats.aiScore > 75 ? "Excellent" : stats.aiScore > 50 ? "Good" : "Needs Work"}</p>
            </Card>

            <Card title="Productivity">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full border-8 border-green-400 flex items-center justify-center">
                  <span className="text-xl">{stats.productivity}%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className={`grid md:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <StatCard title="Heart Rate" value={`${stats.heartRate} bpm`} color="bg-green-300" />
            <StatCard title="Steps" value={stats.steps} color="bg-blue-300" />
            <StatCard title="Focus Hours" value={stats.focus} color="bg-purple-300" />
            <StatCard title="Calories" value={`${stats.calories} kcal`} color="bg-orange-300" />
          </div>

          {/* Chart */}
          <div className={`bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="mb-2">Weekly Health Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000]">
      <h3 className="mb-3">{title}</h3>
      {children}
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`${color} p-6 border-4 border-black shadow-[6px_6px_0px_#000] hover:scale-105 hover:rotate-1 transition`}>
      <p className="text-sm">{title}</p>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
