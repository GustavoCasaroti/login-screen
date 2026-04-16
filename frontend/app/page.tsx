"use client";

import { useState } from "react";
import { API_URL } from "../lib/api";
import Link from "next/link";
import EyeIcon from "../components/ui/EyeIcon";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao fazer login.");
      }

      console.log("Login bem-sucedido:", data); //TODO: remover

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
    //TODO: Redirecionar para dashboard após sucesso
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 pattern-bg"
      style={{ backgroundColor: "#F5F0EF" }}
    >
      {/* Card container */}
      <div
        className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex"
        style={{ minHeight: "600px" }}
      >
        {/* ─── LEFT PANEL ─── */}
        <div
          className="hidden md:flex flex-col justify-between relative overflow-hidden"
          style={{
            width: "42%",
            background: "linear-gradient(145deg, #6B1A2B 0%, #8B2035 40%, #5A1525 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #E8834A 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #C25A30 0%, transparent 70%)",
              transform: "translate(-40%, 40%)",
            }}
          />

          {/* Top: Logo + headline */}
          <div className="relative z-10 p-10">
            <div className="flex items-center gap-2 mb-14">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#E8834A" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" fill="white" />
                </svg>
              </div>
              <span
                className="font-bold text-lg tracking-wide"
                style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
              >
                Bem-vindo
              </span>
            </div>

            <h1
              className="text-3xl font-bold leading-tight mb-4"
              style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
            >
              Gerencie seus
              <br />
              dados com
              <br />
              <span style={{ color: "#E8834A" }}>precisão total.</span>
            </h1>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum nulla metus.
            </p>
          </div>

          {/* Center: Brand watermark */}
          <div className="relative z-10 flex items-center justify-center py-4">
            <div
              className="text-4xl font-black tracking-[0.35em] opacity-10 select-none uppercase"
              style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
            >
              G M F C
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 p-10">
            <p
              className="text-sm italic leading-relaxed mb-3"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum nulla metus, quis dapibus nulla vestibulum vitae. Mauris mollis mauris mauris, vitae consequat arcu mollis eget."
            </p>
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#E8834A" }}
            >
              Gustavo Casaroti Dev.
            </p>
          </div>
        </div>

        {/* ─── RIGHT PANEL — Branco ─── */}
        <div
          className="flex flex-col justify-center px-10 py-12 flex-1"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#6B1A2B" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" fill="white" />
              </svg>
            </div>
            <span
              className="font-bold text-lg"
              style={{ color: "#6B1A2B", fontFamily: "Georgia, serif" }}
            >
              Bem-vindo
            </span>
          </div>

          <div className="max-w-sm w-full mx-auto">
            <h2
              className="text-3xl font-bold mb-1"
              style={{ color: "#1A1A1A", fontFamily: "Georgia, serif" }}
            >
              Bem-vindo
            </h2>
            <p className="text-sm mb-8" style={{ color: "#888888" }}>
              Acesse sua conta para gerenciar seus dados.
            </p>

            {error && (
              <p className="mb-4 text-sm text-red-500" role="alert">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "#444444" }}
                >
                  E-mail
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 4C1 3.45 1.45 3 2 3H14C14.55 3 15 3.45 15 4V12C15 12.55 14.55 13 14 13H2C1.45 13 1 12.55 1 12V4Z"
                        stroke="#AAAAAA"
                        strokeWidth="1.2"
                      />
                      <path d="M1 4.5L8 9L15 4.5" stroke="#AAAAAA" strokeWidth="1.2" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    aria-label="E-mail"
                    disabled={loading}
                    autoComplete="email"
                    placeholder="nome@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition bg-[#F7F4F4] border border-[#EDE8E8] text-[#1A1A1A] focus:border-[#6B1A2B] focus:ring-2 focus:ring-[#6B1A2B]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="block text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#444444" }}
                  >
                    Senha
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium transition-colors hover:underline"
                    style={{ color: "#E8834A" }}
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="#AAAAAA" strokeWidth="1.2" />
                      <path
                        d="M5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7"
                        stroke="#AAAAAA"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    disabled={loading}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition bg-[#F7F4F4] border border-[#EDE8E8] text-[#1A1A1A] focus:border-[#6B1A2B] focus:ring-2 focus:ring-[#6B1A2B]/10"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: "#6B1A2B" }}
                />
                <label htmlFor="remember" className="text-xs cursor-pointer" style={{ color: "#666666" }}>
                  Manter conectado
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "#9B4455"
                    : "linear-gradient(135deg, #6B1A2B 0%, #8B2035 100%)",
                  boxShadow: "0 4px 20px rgba(107,26,43,0.3)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                      <path d="M8 2C4.69 2 2 4.69 2 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ backgroundColor: "#EEEEEE" }} />
              <span className="text-xs" style={{ color: "#BBBBBB" }}>
                OU CONTINUE COM
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#EEEEEE" }} />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-150 hover:shadow-md"
                style={{ border: "1.5px solid #EDE8E8", backgroundColor: "#FFFFFF", color: "#333333" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.67 3.67 0 01-1.59 2.41v2h2.57c1.5-1.38 2.4-3.42 2.4-5.87z" fill="#4285F4" />
                  <path d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.57-2a4.8 4.8 0 01-2.72.75 4.8 4.8 0 01-4.52-3.32H.83v2.06A8 8 0 008 16z" fill="#34A853" />
                  <path d="M3.48 9.49A4.83 4.83 0 013.23 8c0-.52.09-1.02.25-1.49V4.45H.83A8 8 0 000 8c0 1.29.31 2.5.83 3.55l2.65-2.06z" fill="#FBBC05" />
                  <path d="M8 3.18a4.34 4.34 0 013.07 1.2l2.3-2.3A7.72 7.72 0 008 0 8 8 0 00.83 4.45L3.48 6.5A4.8 4.8 0 018 3.18z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-150 hover:shadow-md"
                style={{ border: "1.5px solid #EDE8E8", backgroundColor: "#FFFFFF", color: "#333333" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.73.5.98 5.25.98 11.52c0 5.02 3.26 9.26 7.79 10.77.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.53-.29-5.19-1.27-5.19-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 015.73 0c2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.24 2.76.12 3.05.73.8 1.18 1.82 1.18 3.07 0 4.39-2.67 5.35-5.21 5.64.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55 4.52-1.51 7.78-5.75 7.78-10.77C23.02 5.25 18.27.5 12 .5z" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Register */}
            <p className="text-center text-xs mt-6" style={{ color: "#AAAAAA" }}>
              Não tem uma conta?{" "}
              <Link href="/register" className="font-semibold hover:underline" style={{ color: "#E8834A" }}>
                Criar conta gratuita
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
