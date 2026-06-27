import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f5f7ff_0%,_#fef3f2_50%,_#ecfeff_100%)] flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-6xl overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.16)]">
        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden md:flex flex-col justify-between bg-slate-950 px-10 py-12 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.25),_transparent_45%)]" />
            <div className="relative z-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">VitalSync AI</p>
              <h1 className="text-4xl font-semibold leading-tight">Your wellness, productivity, and insights in one place.</h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">Track your health, understand your routine, and turn daily progress into meaningful results.</p>
            </div>
            <div className="relative z-10 mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
              “Small daily actions create big life changes.”
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            <div className="mb-8 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Welcome back</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Log in to your account</h2>
              <p className="mt-2 text-sm text-slate-500">Continue your journey with a secure and simple login.</p>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button className="mt-6 w-full rounded-2xl bg-cyan-600 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700">
              LOGIN
            </button>

            <p className="mt-5 text-center text-sm text-slate-600">
              New user?{' '}
              <Link to="/register" className="font-semibold text-cyan-600 hover:underline">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
