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
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 font-bold">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-96 p-8 border-4 border-black shadow-[10px_10px_0px_#000]"
      >
        <h2 className="text-3xl mb-6 text-center border-4 border-black bg-pink-400 py-2 shadow-[6px_6px_0px_#000]">
          VitalSync-AI
        </h2>

        {error && (
          <p className="mb-4 text-red-600 border-2 border-red-600 p-2 bg-red-200">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border-4 border-black focus:outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border-4 border-black focus:outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="w-full bg-green-400 border-4 border-black py-3 shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition">
          LOGIN
        </button>

        <p className="text-center mt-4 text-sm">
          New user? <Link to="/register" className="text-blue-600 underline">REGISTER</Link>
        </p>
      </form>
    </div>
  );
}
