"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../lib/api";
import Link from "next/link";
import EyeIcon from "../../components/ui/EyeIcon";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const passwordRules = useMemo(() => {
        return {
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            special: /[^A-Za-z0-9]/.test(password),
        };
    }, [password]);

    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    st_name: name,
                    st_email: email,
                    st_password: password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.errors.st_email[0] || "Erro ao cadastrar.");
            }

            setSuccess("Conta criada com sucesso! Redirecinando...");

            setTimeout(() => {
                router.push("/");
            }, 2000);
            

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => () => {
        if (blurTimeout.current) clearTimeout(blurTimeout.current);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F0EF] p-4 pattern-bg">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

                <h1 className="text-3xl font-bold mb-2 text-[#1A1A1A]">
                    Criar conta
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                    Preencha os dados abaixo para começar
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <input
                        type="text"
                        aria-label="Nome completo"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F4F4] border border-[#EDE8E8] text-[#1A1A1A] outline-none focus:border-[#6B1A2B] focus:ring-2 focus:ring-[#6B1A2B]/10"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        aria-label="E-mail"
                        placeholder="E-mail"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F4F4] border border-[#EDE8E8] text-[#1A1A1A] outline-none focus:border-[#6B1A2B] focus:ring-2 focus:ring-[#6B1A2B]/10"
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            aria-label="Senha"
                            placeholder="Senha"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                blurTimeout.current = setTimeout(() => setIsFocused(false), 150);
                            }}
                            className="w-full px-4 py-3 rounded-xl bg-[#F7F4F4] border border-[#EDE8E8] text-[#1A1A1A] outline-none focus:border-[#6B1A2B] focus:ring-2 focus:ring-[#6B1A2B]/10"
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                    {isFocused && (
                        <div className="mt-2 p-3 rounded-xl bg-[#F7F4F4] border text-sm space-y-1">

                            <p className={passwordRules.length ? "text-green-600" : "text-gray-400"}>
                                {passwordRules.length ? "✔" : "•"} Mínimo de 6 caracteres
                            </p>

                            <p className={passwordRules.uppercase ? "text-green-600" : "text-gray-400"}>
                                {passwordRules.uppercase ? "✔" : "•"} Pelo menos 1 letra maiúscula
                            </p>

                            <p className={passwordRules.lowercase ? "text-green-600" : "text-gray-400"}>
                                {passwordRules.lowercase ? "✔" : "•"} Pelo menos 1 letra minúscula
                            </p>

                            <p className={passwordRules.special ? "text-green-600" : "text-gray-400"}>
                                {passwordRules.special ? "✔" : "•"} Pelo menos 1 caractere especial
                            </p>

                        </div>
                    )}

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showCPassword ? "text" : "password"}
                            aria-label="Confirmar senha"
                            placeholder="Confirmar senha"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[#F7F4F4] border border-[#EDE8E8] text-[#1A1A1A] outline-none focus:border-[#6B1A2B] focus:ring-2 focus:ring-[#6B1A2B]/10"
                        />
                        <button
                            type="button"
                            aria-label={showCPassword ? "Ocultar senha" : "Mostrar senha"}
                            onClick={() => setShowCPassword(!showCPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            <EyeIcon open={showCPassword} />
                        </button>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500" role="alert">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-sm text-green-500" role="alert">
                            {success}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                        style={{
                            background: "linear-gradient(135deg, #6B1A2B 0%, #8B2035 100%)",
                            boxShadow: "0 4px 20px rgba(107,26,43,0.3)",
                        }}
                    >
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>

                </form>

                {/* Back */}
                <p className="text-center text-xs mt-6 text-gray-400">
                    Já tem conta?{" "}
                    <Link href="/" className="text-[#E8834A] font-semibold hover:underline">
                        Fazer login
                    </Link>
                </p>

            </div>
        </div>
    );
}