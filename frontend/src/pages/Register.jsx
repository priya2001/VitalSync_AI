import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-200 font-bold">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-96 p-8 border-4 border-black shadow-[10px_10px_0px_#000]"
      >
        <h2 className="text-3xl mb-6 text-center border-4 border-black bg-yellow-400 py-2 shadow-[6px_6px_0px_#000]">
          REGISTER
        </h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border-4 border-black"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border-4 border-black"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border-4 border-black"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="w-full bg-pink-400 border-4 border-black py-3 shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition">
          REGISTER
        </button>

        <p className="text-center mt-4 text-sm">
          Already have account? <Link to="/login" className="text-blue-600 underline">LOGIN</Link>
        </p>
      </form>
    </div>
  );
}
