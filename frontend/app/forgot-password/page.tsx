"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../lib/api";
import Link from "next/link";

const primaryButtonStyle = {
  background: "linear-gradient(135deg, #6B1A2B 0%, #8B2035 100%)",
  boxShadow: "0 4px 20px rgba(107,26,43,0.3)",
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar e-mail.");
      }

      setSuccess(true);

      timeoutRef.current = setTimeout(() => {
        router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0EF] p-4 pattern-bg">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-3xl font-bold mb-2 text-[#1A1A1A]">
          Recuperar senha
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Enviaremos um link para redefinir sua senha
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {success ? (
          <div role="alert" className="space-y-3">
            <p className="text-sm text-green-600">
              Se o email existir, um link de recuperação será enviado, confira sua caixa de entrada!
            </p>
            <p className="text-xs text-gray-400">
              Redirecionando em instantes...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              aria-label="E-mail"
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#F7F4F4] border border-[#EDE8E8] text-[#1A1A1A] outline-none focus:border-[#6B1A2B] focus:ring-2 focus:ring-[#6B1A2B]/10"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              style={loading ? { background: "#9B4455" } : primaryButtonStyle}
            >
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </button>

          </form>
        )}

        <p className="text-center text-xs mt-6 text-gray-400">
          Lembrou a senha?{" "}
          <Link href="/" className="text-[#E8834A] font-semibold hover:underline">
            Voltar para login
          </Link>
        </p>

      </div>
    </div>
  );
}