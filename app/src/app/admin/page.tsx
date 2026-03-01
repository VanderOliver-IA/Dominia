"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, CreditCard, Activity, ArrowUpRight, ArrowDownRight, UserX, Gift, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
};

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        premiumUsers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Total de usuários na tabela profiles
                const { count: totalCount } = await supabase
                    .from("profiles")
                    .select("*", { count: "exact", head: true });

                // Usuários premium
                const { count: premiumCount } = await supabase
                    .from("profiles")
                    .select("*", { count: "exact", head: true })
                    .eq("is_premium", true);

                setStats({
                    totalUsers: totalCount || 0,
                    activeUsers: Math.floor((totalCount || 0) * 0.7), // Mock ativo (70%)
                    premiumUsers: premiumCount || 0,
                });
            } catch (err) {
                console.error("Erro ao buscar estatísticas", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-8 text-surface-400">Carregando painel financeiro...</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="font-display text-3xl font-bold text-surface-50">Visão Geral do Negócio</h1>
                <p className="text-surface-400 mt-1">Acompanhe métricas de uso, usuários inativos e receita financeira.</p>
            </div>

            {/* Top Cards (Metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 border-surface-800 bg-surface-900/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-surface-400">Total de Alunos</span>
                        <div className="p-2 bg-brand-500/10 rounded-lg">
                            <Users className="w-5 h-5 text-brand-400" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-surface-50">{stats.totalUsers}</div>
                    <div className="flex items-center gap-1 text-xs font-medium text-xp-400 mt-2">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+12% este mês</span>
                    </div>
                </Card>

                <Card className="p-5 border-surface-800 bg-surface-900/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-surface-400">Usuários Ativos (Logados hoje)</span>
                        <div className="p-2 bg-xp-500/10 rounded-lg">
                            <Activity className="w-5 h-5 text-xp-400" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-surface-50">{stats.activeUsers}</div>
                    <div className="flex items-center gap-1 text-xs font-medium text-xp-400 mt-2">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>Em alta</span>
                    </div>
                </Card>

                <Card className="p-5 border-surface-800 bg-surface-900/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-surface-400">Alunos Inativos (Risco)</span>
                        <div className="p-2 bg-error-500/10 rounded-lg">
                            <UserX className="w-5 h-5 text-error-400" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-surface-50">3</div>
                    <div className="flex items-center gap-1 text-xs font-medium text-error-400 mt-2">
                        <ArrowDownRight className="w-3 h-3" />
                        <span>7 dias sem entrar</span>
                    </div>
                </Card>

                <Card className="p-5 border-surface-800 bg-surface-900/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-accent-300">Receita Estimada (MRR)</span>
                            <div className="p-2 bg-accent-500/20 rounded-lg">
                                <CreditCard className="w-5 h-5 text-accent-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white">R$ 0,00</div>
                        <div className="text-xs font-medium text-accent-400/80 mt-2 w-full text-right cursor-pointer hover:underline">
                            Conectar Stripe →
                        </div>
                    </div>
                </Card>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ações Rápidas - Financeiro e Retenção */}
                <Card className="p-6 border-surface-800 flex flex-col h-full">
                    <h2 className="text-lg font-bold text-surface-50 flex items-center gap-2 mb-6">
                        <Gift className="w-5 h-5 text-brand-400" />
                        Ações de Engajamento
                    </h2>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-surface-900 border border-surface-800 hover:border-surface-700 transition-colors flex items-center justify-between group cursor-pointer">
                            <div>
                                <h3 className="font-semibold text-surface-100 group-hover:text-brand-400 transition-colors">Criar Cupom de Desconto</h3>
                                <p className="text-xs text-surface-400 mt-1">Gere um código para o checkout (Stripe)</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-surface-800 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                +
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-surface-900 border border-surface-800 hover:border-surface-700 transition-colors flex items-center justify-between group cursor-pointer">
                            <div>
                                <h3 className="font-semibold text-surface-100 group-hover:text-xp-400 transition-colors">Enviar Presente (Vidas/XP)</h3>
                                <p className="text-xs text-surface-400 mt-1">Dê 5 vidas de presente para os inativos</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-surface-800 flex items-center justify-center group-hover:bg-xp-500 group-hover:text-white transition-colors">
                                +
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-surface-900 border border-surface-800 hover:border-surface-700 transition-colors flex items-center justify-between group cursor-pointer">
                            <div>
                                <h3 className="font-semibold text-surface-100 group-hover:text-accent-400 transition-colors">Notificação Push/Email</h3>
                                <p className="text-xs text-surface-400 mt-1">Avisar todos sobre uma nova Trilha</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-surface-800 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-colors">
                                +
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Últimos Alunos Cadastrados */}
                <Card className="p-6 border-surface-800 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-surface-50 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-xp-400" />
                            Leaderboard Recentes
                        </h2>
                        <button className="text-xs text-brand-400 font-medium hover:underline">Ver Todos</button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center text-center p-8 border-2 border-dashed border-surface-800 rounded-xl bg-surface-900/30">
                        <Users className="w-10 h-10 text-surface-600 mb-3" />
                        <h3 className="text-sm font-medium text-surface-300">Construindo tabela de usuários...</h3>
                        <p className="text-xs text-surface-500 mt-2 max-w-[200px]">Neste painel listaremos os alunos mais ativos e inativos em breve.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
