"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../lib/api";

const primaryButtonStyle = {
  background: "linear-gradient(135deg, #6B1A2B 0%, #8B2035 100%)",
  boxShadow: "0 4px 20px rgba(107,26,43,0.3)",
};

export default function VerifyCodePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/verify-reset-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Código inválido ou expirado.");
      }

      router.push(`/forgot-password/reset-password?token=${code}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0EF] p-4 pattern-bg">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-3xl font-bold mb-2 text-[#1A1A1A]">
          Verificar código
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Digite o código enviado para seu e-mail
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            aria-label="Código de verificação"
            type="text"
            placeholder="Digite o código"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#F7F4F4] border border-[#EDE8E8] text-[#1A1A1A] outline-none focus:border-[#6B1A2B] focus:ring-2 focus:ring-[#6B1A2B]/10"
            maxLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            style={loading ? { background: "#9B4455" } : primaryButtonStyle}
          >
            {loading ? "Validando..." : "Validar código"}
          </button>

        </form>

        <p className="text-center text-xs mt-6 text-gray-400">
          Não recebeu o código?{" "}
          <Link href="/forgot-password" className="text-[#E8834A] font-semibold hover:underline">
            Tentar novamente
          </Link>
        </p>

        <p className="text-center text-xs mt-2 text-gray-400">
          Lembrou a senha?{" "}
          <Link href="/" className="text-[#E8834A] font-semibold hover:underline">
            Voltar para login
          </Link>
        </p>

      </div>
    </div>
  );
}