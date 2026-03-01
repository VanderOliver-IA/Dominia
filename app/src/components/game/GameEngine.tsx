"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { LessonData } from "@/types/game";
import { useUserStore } from "@/store/useUserStore";
import QuizChallenge from "./QuizChallenge";
import ArrangeChallenge from "./ArrangeChallenge";
import Button from "@/components/ui/Button";

interface GameEngineProps {
    lesson: LessonData;
}

export default function GameEngine({ lesson }: GameEngineProps) {
    const router = useRouter();
    const { profile, updateXP, loseHeart } = useUserStore();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | string[] | null>(null);
    const [status, setStatus] = useState<"playing" | "correct" | "wrong" | "finished">("playing");

    const challenge = lesson.challenges[currentIndex];
    // Barra de progresso visual simulada (quantidade acerta / total)
    const progressPercent = (currentIndex / lesson.challenges.length) * 100;

    const handleVerify = () => {
        if (!selectedOption) return;

        let isCorrect = false;

        if (Array.isArray(challenge.correctAnswer) && Array.isArray(selectedOption)) {
            // Verificação para Arrange Challenge (arrays devem ser idênticos)
            isCorrect = JSON.stringify(challenge.correctAnswer) === JSON.stringify(selectedOption);
        } else {
            // Verificação normal (strings)
            isCorrect = selectedOption === challenge.correctAnswer;
        }

        if (isCorrect) {
            // Acertou!
            setStatus("correct");
            // Damos um pedacinho de XP intermediário? Ou só no fim?
        } else {
            // Errou :(
            setStatus("wrong");
            loseHeart();
        }
    };

    const handleNext = () => {
        if (currentIndex < lesson.challenges.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setStatus("playing");
        } else {
            // Acabou a lição
            setStatus("finished");
            updateXP(lesson.xpReward);
        }
    };

    const handleQuit = () => {
        router.push("/dashboard");
    };

    if (status === "finished") {
        // TELA DE VITÓRIA!
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center p-4 bg-surface-950">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-6"
                >
                    <div className="w-24 h-24 mx-auto rounded-full bg-xp-500/20 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-xp-400" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-surface-50">Lição Concluída!</h1>
                    <p className="text-xl text-xp-400 font-semibold mb-8">
                        +{lesson.xpReward} XP Ganhos
                    </p>
                    <Button size="lg" onClick={() => router.push("/dashboard")} className="w-full sm:w-auto">
                        Continuar para o Mapa
                    </Button>
                </motion.div>
            </div>
        );
    }

    // Jogo rolando
    return (
        <div className="min-h-dvh flex flex-col bg-surface-950">
            {/* Top Header */}
            <header className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
                <button onClick={handleQuit} className="p-2 text-surface-400 hover:text-surface-100 transition-colors">
                    <X className="w-6 h-6" />
                </button>

                <div className="flex-1 px-4 lg:px-8">
                    <div className="h-4 bg-surface-800 rounded-full overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 bottom-0 left-0 bg-xp-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-error-500 fill-error-500/20" />
                    <span className="text-lg font-bold text-error-400">{profile?.hearts ?? 5}</span>
                </div>
            </header>

            {/* Main Challenge Area */}
            <main className="flex-1 flex flex-col justify-center px-4 py-8 pb-32">
                {challenge.type === "quiz" && (
                    <QuizChallenge
                        challenge={challenge}
                        selectedOption={selectedOption as string}
                        onSelect={setSelectedOption}
                        status={status}
                    />
                )}

                {challenge.type === "arrange" && (
                    <ArrangeChallenge
                        challenge={challenge}
                        status={status}
                        onSelectionChange={setSelectedOption}
                    />
                )}
            </main>

            {/* Bottom Bar para interações e feedback */}
            <div className={`fixed bottom-0 left-0 right-0 border-t-2 py-6 px-4 transition-colors duration-300 ${status === "playing" ? "bg-surface-900 border-surface-800" :
                status === "correct" ? "bg-xp-900/30 border-xp-500/20" :
                    "bg-error-900/30 border-error-500/20"
                }`}>
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <AnimatePresence mode="wait">
                        {status === "playing" ? (
                            <motion.div
                                key="playing-empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hidden sm:block text-surface-400 w-1/2"
                            >
                                Pense com calma e responda.
                            </motion.div>
                        ) : status === "correct" ? (
                            <motion.div
                                key="correct"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-start gap-4 flex-1 text-xp-400"
                            >
                                <div className="w-12 h-12 rounded-full bg-xp-500/20 flex shrink-0 items-center justify-center">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1">Incrível!</h3>
                                    <p className="text-sm font-medium">{challenge.explanation}</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="wrong"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-start gap-4 flex-1 text-error-400"
                            >
                                <div className="w-12 h-12 rounded-full bg-error-500/20 flex shrink-0 items-center justify-center">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1">Ainda não! A resposta era {challenge.correctAnswer}</h3>
                                    <p className="text-sm font-medium">{challenge.explanation}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="w-full sm:w-auto">
                        {status === "playing" ? (
                            <Button
                                size="lg"
                                fullWidth
                                disabled={!selectedOption}
                                onClick={handleVerify}
                                className="w-full sm:w-48 text-lg"
                            >
                                Verificar
                            </Button>
                        ) : (
                            <Button
                                variant={status === "correct" ? "xp" : "danger"}
                                size="lg"
                                fullWidth
                                onClick={handleNext}
                                className="w-full sm:w-48 text-lg"
                            >
                                Continuar
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
