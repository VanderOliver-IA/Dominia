"use client";

import { motion } from "framer-motion";
import { Challenge } from "@/types/game";


interface QuizChallengeProps {
    challenge: Challenge;
    selectedOption: string | null;
    onSelect: (option: string) => void;
    status: "playing" | "correct" | "wrong"; // Mostra cores no erro/acerto
}

export default function QuizChallenge({
    challenge,
    selectedOption,
    onSelect,
    status,
}: QuizChallengeProps) {
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                key={challenge.id}
            >
                <h2 className="text-2xl font-display font-medium text-surface-50">
                    {challenge.question}
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenge.options?.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === challenge.correctAnswer;

                    // Se estivermos em modo 'wrong' e o cara escolheu esse, fica vermelho
                    // Se for 'wrong' mas era o certo, fica verde pra mostrar qual era o correto
                    // Se for 'correct' e ele escolheu esse, fica verde.

                    let bgClass = "bg-surface-900 border-surface-700 hover:border-brand-500/50 hover:bg-surface-800";
                    let textClass = "text-surface-100";

                    if (isSelected && status === "playing") {
                        bgClass = "bg-brand-500/10 border-brand-500 shadow-[0_0_15px_rgba(51,144,255,0.1)]";
                        textClass = "text-brand-400";
                    } else if (status === "correct") {
                        if (isCorrect) {
                            bgClass = "bg-xp-500/20 border-xp-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
                            textClass = "text-xp-400";
                        } else {
                            bgClass = "bg-surface-900 border-surface-800 opacity-50";
                        }
                    } else if (status === "wrong") {
                        if (isSelected && !isCorrect) {
                            bgClass = "bg-error-500/10 border-error-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]";
                            textClass = "text-error-400";
                        } else if (isCorrect) {
                            bgClass = "bg-xp-500/10 border-xp-500";
                            textClass = "text-xp-400";
                        } else {
                            bgClass = "bg-surface-900 border-surface-800 opacity-50";
                        }
                    }

                    return (
                        <motion.button
                            key={opt}
                            onClick={() => {
                                if (status === "playing") onSelect(opt);
                            }}
                            disabled={status !== "playing"}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={status === "playing" ? { scale: 1.02 } : {}}
                            whileTap={status === "playing" ? { scale: 0.98 } : {}}
                            className={`p-5 rounded-2xl border-2 text-left transition-all ${bgClass}`}
                        >
                            <span className={`font-medium ${textClass}`}>{opt}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
