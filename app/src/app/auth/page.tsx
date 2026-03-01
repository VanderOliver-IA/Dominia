"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Mail, Lock, User, ArrowRight, Gamepad2, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "signup";

export default function AuthPage() {
    const router = useRouter();
    const [mode, setMode] = useState<AuthMode>("login");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [form, setForm] = useState({
        email: "",
        password: "",
        username: "",
        display_name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (mode === "signup") {
                if (!form.username || form.username.length < 3) {
                    throw new Error("Nome de usuário precisa ter pelo menos 3 caracteres");
                }

                const { error: signUpError } = await supabase.auth.signUp({
                    email: form.email,
                    password: form.password,
                    options: {
                        data: {
                            username: form.username.toLowerCase().replace(/\s+/g, "_"),
                            display_name: form.display_name || form.username,
                        },
                    },
                });

                if (signUpError) throw signUpError;
                setSuccess("Conta criada! Verifique seu e-mail para confirmar.");
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email: form.email,
                    password: form.password,
                });

                if (signInError) throw signInError;
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Algo deu errado. Tente novamente.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(mode === "login" ? "signup" : "login");
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="min-h-dvh flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* BG */}
            <div className="absolute inset-0 gradient-mesh opacity-40" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/8 rounded-full blur-[120px]" />

            <motion.div
                className="relative w-full max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/20">
                        <Crown className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-surface-50">
                        {mode === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
                    </h1>
                    <p className="text-sm text-surface-400 mt-1">
                        {mode === "login"
                            ? "Entre e continue sua jornada de IA"
                            : "Comece a aprender IA jogando"}
                    </p>
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-6 border border-surface-800 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {mode === "signup" && (
                                <motion.div
                                    key="signup-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4 overflow-hidden"
                                >
                                    {/* Username */}
                                    <div>
                                        <label htmlFor="username" className="block text-xs font-medium text-surface-400 mb-1.5">
                                            Nome de Usuário
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                placeholder="seu_nome"
                                                value={form.username}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2.5 bg-surface-900 border border-surface-700 rounded-xl text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Display Name */}
                                    <div>
                                        <label htmlFor="display_name" className="block text-xs font-medium text-surface-400 mb-1.5">
                                            Como quer ser chamado?
                                        </label>
                                        <div className="relative">
                                            <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                                            <input
                                                id="display_name"
                                                name="display_name"
                                                type="text"
                                                placeholder="Seu nome"
                                                value={form.display_name}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2.5 bg-surface-900 border border-surface-700 rounded-xl text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-surface-400 mb-1.5">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-surface-900 border border-surface-700 rounded-xl text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-surface-400 mb-1.5">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-10 py-2.5 bg-surface-900 border border-surface-700 rounded-xl text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error/Success */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="p-3 bg-error-500/10 border border-error-500/20 rounded-xl text-xs text-error-400"
                                >
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="p-3 bg-xp-500/10 border border-xp-500/20 rounded-xl text-xs text-xp-400"
                                >
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <Button type="submit" fullWidth size="lg" isLoading={loading}>
                            {mode === "login" ? "Entrar" : "Criar Conta"}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </form>

                    {/* Toggle */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-surface-400">
                            {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
                            <button
                                onClick={toggleMode}
                                className="text-brand-400 hover:text-brand-300 font-semibold transition-colors"
                            >
                                {mode === "login" ? "Criar conta grátis" : "Entrar"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Bottom Badge */}
                <div className="text-center mt-6">
                    <Badge variant="default" size="sm">
                        🔒 Seus dados estão protegidos
                    </Badge>
                </div>
            </motion.div>
        </div>
    );
}
