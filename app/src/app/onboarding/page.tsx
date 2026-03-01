"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Gamepad2,
    Target,
    Rocket,
    ChevronRight,
    ChevronLeft,
    Crown,
    Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";

const steps = [
    {
        id: "welcome",
        icon: Crown,
        title: "Bem-vindo à Dominia! 🏰",
        subtitle: "Sua jornada para dominar a IA começa agora",
    },
    {
        id: "level",
        icon: Brain,
        title: "Qual é o seu nível?",
        subtitle: "Vamos adaptar o conteúdo para você",
    },
    {
        id: "goal",
        icon: Target,
        title: "O que quer alcançar?",
        subtitle: "Isso nos ajuda a personalizar sua trilha",
    },
    {
        id: "ready",
        icon: Rocket,
        title: "Tudo pronto! 🚀",
        subtitle: "Sua primeira lição já está esperando",
    },
];

const levels = [
    {
        value: "Explorer",
        emoji: "🟢",
        label: "Explorer",
        desc: "Sou novo nisso, quero entender do zero",
    },
    {
        value: "Builder",
        emoji: "🟡",
        label: "Builder",
        desc: "Já sei o básico, quero aplicar",
    },
    {
        value: "Master",
        emoji: "🔴",
        label: "Master",
        desc: "Quero dominar e implementar",
    },
];

const goals = [
    { value: "personal", emoji: "🧠", label: "Aprender para uso pessoal" },
    { value: "career", emoji: "💼", label: "Crescer na carreira" },
    { value: "business", emoji: "🏢", label: "Aplicar no meu negócio" },
    { value: "content", emoji: "📱", label: "Criar conteúdo com IA" },
    { value: "automation", emoji: "⚡", label: "Automatizar processos" },
    { value: "curiosity", emoji: "🔍", label: "Curiosidade e exploração" },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { setProfile } = useUserStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const canNext =
        currentStep === 0 ||
        (currentStep === 1 && selectedLevel) ||
        (currentStep === 2 && selectedGoal) ||
        currentStep === 3;

    const handleFinish = async () => {
        setLoading(true);
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user && selectedLevel) {
                const { data } = await supabase
                    .from("profiles")
                    .update({ level: selectedLevel })
                    .eq("id", user.id)
                    .select()
                    .single();

                if (data) setProfile(data);
            }

            router.push("/dashboard");
        } catch {
            router.push("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentStep === 3) {
            handleFinish();
        } else {
            setCurrentStep((s) => s + 1);
        }
    };

    const step = steps[currentStep];

    return (
        <div className="min-h-dvh flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div className="absolute inset-0 gradient-mesh opacity-30" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/8 rounded-full blur-[100px]" />

            <div className="relative w-full max-w-lg">
                {/* Progress */}
                <div className="flex gap-2 mb-8">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? "gradient-brand" : "bg-surface-800"
                                }`}
                        />
                    ))}
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/20">
                                <step.icon className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="font-display text-2xl font-bold tracking-tight mb-2">
                                {step.title}
                            </h1>
                            <p className="text-surface-400 text-sm">{step.subtitle}</p>
                        </div>

                        {/* Step 0: Welcome */}
                        {currentStep === 0 && (
                            <Card className="text-center">
                                <div className="space-y-4">
                                    <div className="flex justify-center gap-3">
                                        {["⚡", "🎯", "🏆", "🧠"].map((e, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + i * 0.1 }}
                                                className="w-12 h-12 rounded-xl bg-surface-800 flex items-center justify-center text-2xl"
                                            >
                                                {e}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-surface-300 leading-relaxed">
                                        Na Dominia, cada lição é um <strong>jogo</strong>. Você ganha{" "}
                                        <Badge variant="xp" size="sm">XP</Badge> a cada
                                        acerto, mantém sua{" "}
                                        <Badge variant="warn" size="sm">🔥 Ofensiva</Badge>{" "}
                                        e sobe de nível enquanto aprende IA de verdade.
                                    </p>
                                </div>
                            </Card>
                        )}

                        {/* Step 1: Level Selection */}
                        {currentStep === 1 && (
                            <div className="space-y-3">
                                {levels.map((level) => (
                                    <button
                                        key={level.value}
                                        onClick={() => setSelectedLevel(level.value)}
                                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${selectedLevel === level.value
                                                ? "border-brand-500/50 bg-brand-500/5 shadow-[0_0_20px_rgba(51,144,255,0.08)]"
                                                : "border-surface-800 bg-surface-900/50 hover:border-surface-600"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{level.emoji}</span>
                                            <div>
                                                <p className="font-semibold text-surface-100">
                                                    {level.label}
                                                </p>
                                                <p className="text-xs text-surface-400">{level.desc}</p>
                                            </div>
                                            {selectedLevel === level.value && (
                                                <Sparkles className="w-4 h-4 text-brand-400 ml-auto" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 2: Goal Selection */}
                        {currentStep === 2 && (
                            <div className="grid grid-cols-2 gap-3">
                                {goals.map((goal) => (
                                    <button
                                        key={goal.value}
                                        onClick={() => setSelectedGoal(goal.value)}
                                        className={`p-4 rounded-2xl border-2 text-center transition-all ${selectedGoal === goal.value
                                                ? "border-brand-500/50 bg-brand-500/5"
                                                : "border-surface-800 bg-surface-900/50 hover:border-surface-600"
                                            }`}
                                    >
                                        <span className="text-2xl block mb-2">{goal.emoji}</span>
                                        <p className="text-xs font-medium text-surface-200">
                                            {goal.label}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 3: Ready */}
                        {currentStep === 3 && (
                            <Card className="text-center space-y-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                                    className="text-6xl"
                                >
                                    🏰
                                </motion.div>
                                <div>
                                    <p className="text-sm text-surface-300 mb-2">
                                        Seu perfil está configurado:
                                    </p>
                                    <div className="flex justify-center gap-3">
                                        <Badge variant="brand" size="md">
                                            {levels.find((l) => l.value === selectedLevel)?.emoji}{" "}
                                            {selectedLevel}
                                        </Badge>
                                        <Badge variant="xp" size="md">
                                            {goals.find((g) => g.value === selectedGoal)?.emoji}{" "}
                                            {goals.find((g) => g.value === selectedGoal)?.label}
                                        </Badge>
                                    </div>
                                </div>
                                <p className="text-xs text-surface-400">
                                    +50 XP de boas-vindas serão adicionados ao seu perfil!
                                </p>
                            </Card>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                    <div>
                        {currentStep > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentStep((s) => s - 1)}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Voltar
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-surface-500">
                            {currentStep + 1}/{steps.length}
                        </span>
                        <Button
                            size="lg"
                            onClick={handleNext}
                            disabled={!canNext}
                            isLoading={loading}
                        >
                            {currentStep === 3 ? (
                                <>
                                    <Gamepad2 className="w-4 h-4" />
                                    Começar a Jogar!
                                </>
                            ) : (
                                <>
                                    Próximo
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
