import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(e) {
    e.preventDefault();


    setError("");

    try {
      setLoading(true);

      await login(email, password);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  /* REDIRECT AFTER LOGIN */
  if (currentUser?.role === "admin") {
    console.log(
      'this was called'
    )
    console.log(currentUser) 
    navigate("/admin");
  }

  if (currentUser?.role === "manager") {
    navigate("/manager");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Hotel Ops
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Sign in to continue
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}