"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Flame,
    Heart,
    Zap,
    Trophy,
    BookOpen,
    ArrowRight,
    Star,
    Target,
    TrendingUp,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Progress from "@/components/ui/Progress";
import { useUserStore } from "@/store/useUserStore";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const recentTrails = [
    {
        title: "O que é IA?",
        progress: 60,
        lessons: "6/10",
        xp: 120,
        color: "from-brand-500 to-brand-700",
    },
    {
        title: "ChatGPT & Assistentes",
        progress: 25,
        lessons: "3/12",
        xp: 45,
        color: "from-xp-400 to-xp-600",
    },
    {
        title: "Imagens com IA",
        progress: 0,
        lessons: "0/12",
        xp: 0,
        color: "from-warn-400 to-warn-600",
    },
];

const dailyMissions = [
    {
        title: "Complete 3 lições",
        reward: 30,
        progress: 1,
        total: 3,
        icon: BookOpen,
    },
    {
        title: "Acerte 10 questões seguidas",
        reward: 50,
        progress: 4,
        total: 10,
        icon: Target,
    },
    {
        title: "Mantenha sua ofensiva",
        reward: 20,
        progress: 1,
        total: 1,
        icon: Flame,
    },
];

export default function DashboardPage() {
    const { profile } = useUserStore();
    const displayName = profile?.display_name || profile?.username || "Jogador";

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Greeting */}
            <motion.div {...fadeInUp}>
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                    Olá, <span className="text-gradient-brand">{displayName}</span>! 👋
                </h1>
                <p className="text-surface-400 mt-1">
                    Continue sua jornada de IA. Cada lição conta!
                </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                initial="initial"
                animate="animate"
                variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
                {[
                    {
                        label: "XP Total",
                        value: profile?.xp ?? 0,
                        icon: Zap,
                        color: "text-xp-400",
                        bg: "bg-xp-500/10",
                    },
                    {
                        label: "Ofensiva",
                        value: `${profile?.streak ?? 0} dias`,
                        icon: Flame,
                        color: "text-warn-400",
                        bg: "bg-warn-500/10",
                    },
                    {
                        label: "Vidas",
                        value: `${profile?.hearts ?? 5}/5`,
                        icon: Heart,
                        color: "text-error-400",
                        bg: "bg-error-500/10",
                    },
                    {
                        label: "Nível",
                        value: profile?.level ?? "Explorer",
                        icon: Trophy,
                        color: "text-brand-400",
                        bg: "bg-brand-500/10",
                    },
                ].map((stat, i) => (
                    <motion.div key={i} variants={fadeInUp}>
                        <Card className="h-full">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-surface-400 mb-1">{stat.label}</p>
                                    <p className="font-display text-xl font-bold text-surface-50">
                                        {stat.value}
                                    </p>
                                </div>
                                <div
                                    className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}
                                >
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Continue Aprendendo */}
                <motion.div className="lg:col-span-2 space-y-4" {...fadeInUp}>
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-lg font-bold">
                            Continue Aprendendo
                        </h2>
                        <Button variant="ghost" size="sm">
                            Ver todas <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {recentTrails.map((trail, i) => (
                            <Link key={i} href="/dashboard/licao/demo" className="block">
                                <Card hover className="cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${trail.color} flex items-center justify-center shrink-0 shadow-lg`}
                                        >
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-sm text-surface-100 truncate">
                                                    {trail.title}
                                                </h3>
                                                <Badge variant="default" size="sm">
                                                    {trail.lessons}
                                                </Badge>
                                            </div>
                                            <Progress value={trail.progress} size="sm" />
                                        </div>
                                        <div className="hidden sm:flex items-center gap-1 text-xs text-xp-400">
                                            <Star className="w-3.5 h-3.5" />
                                            {trail.xp} XP
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all shrink-0" />
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Missões Diárias */}
                <motion.div className="space-y-4" {...fadeInUp}>
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-lg font-bold">Missões Diárias</h2>
                        <Badge variant="warn" size="sm">
                            🔥 Hoje
                        </Badge>
                    </div>

                    <div className="space-y-3">
                        {dailyMissions.map((mission, i) => {
                            const done = mission.progress >= mission.total;
                            return (
                                <Card
                                    key={i}
                                    className={`${done ? "opacity-60" : ""} transition-opacity`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${done
                                                ? "bg-xp-500/20"
                                                : "bg-surface-800"
                                                }`}
                                        >
                                            <mission.icon
                                                className={`w-4 h-4 ${done ? "text-xp-400" : "text-surface-400"}`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-sm font-medium ${done
                                                    ? "line-through text-surface-500"
                                                    : "text-surface-200"
                                                    }`}
                                            >
                                                {mission.title}
                                            </p>
                                            <p className="text-xs text-surface-500">
                                                {mission.progress}/{mission.total}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={done ? "xp" : "default"}
                                            size="sm"
                                        >
                                            +{mission.reward} XP
                                        </Badge>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Weekly Heatmap placeholder */}
                    <Card>
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-brand-400" />
                            <h3 className="text-sm font-semibold">Atividade Semanal</h3>
                        </div>
                        <div className="grid grid-cols-7 gap-1.5">
                            {["S", "T", "Q", "Q", "S", "S", "D"].map((day, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-[10px] text-surface-500 mb-1">{day}</p>
                                    <div
                                        className={`w-full aspect-square rounded-lg ${[0, 1, 2, 4].includes(i)
                                            ? "bg-brand-500/30 border border-brand-500/20"
                                            : i === 5
                                                ? "bg-brand-500/10 border border-surface-800"
                                                : "bg-surface-800/50 border border-surface-800"
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
