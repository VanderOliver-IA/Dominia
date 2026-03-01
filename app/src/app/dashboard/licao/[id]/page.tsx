"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LessonData, Challenge } from "@/types/game";
import GameEngine from "@/components/game/GameEngine";
import { Loader2 } from "lucide-react";

// Fallback heroico caso a lição não tenha metadata (para testarmos o motor)
const MOCK_LESSON: LessonData = {
    id: "demo",
    title: "Teste da Engine",
    xpReward: 30,
    challenges: [
        {
            id: "q1",
            type: "quiz",
            question: "O que a sigla IA significa?",
            options: ["Informática Avançada", "Inteligência Artificial", "Interface Automática", "Integração Anônima"],
            correctAnswer: "Inteligência Artificial",
            explanation: "A Inteligência Artificial (IA) é o campo da ciência da computação que cria sistemas capazes de aprender e raciocinar."
        },
        {
            id: "q2",
            type: "quiz",
            question: "Qual empresa criou o ChatGPT?",
            options: ["Google", "Microsoft", "OpenAI", "Meta"],
            correctAnswer: "OpenAI",
            explanation: "A OpenAI é o laboratório de pesquisa em IA responsável pela criação do modelo GPT e do ChatGPT."
        },
        {
            id: "q3",
            type: "quiz",
            question: "O que é um 'Prompt'?",
            options: ["Um erro no sistema", "A instrução/comando dado à IA", "Uma linguagem de programação", "Uma marca de computador"],
            correctAnswer: "A instrução/comando dado à IA",
            explanation: "O Prompt é o texto que você escreve para pedir algo à IA (ex: 'Me faça um resumo sobre Marte')."
        }
    ]
};

export default function LicaoPage() {
    const params = useParams();
    const [lesson, setLesson] = useState<LessonData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const { data, error } = await supabase
                    .from("lessons")
                    .select("*")
                    .eq("id", params.id as string)
                    .single();

                if (error || !data) {
                    console.warn("Lição não encontrada no DB, carregando MOCK...");
                    setLesson(MOCK_LESSON);
                } else {
                    // Converte do Supabase para o formato do Jogo
                    // Se a metadata estiver vazia, usamos o MOCK para não quebrar
                    const metadata = data.metadata as { challenges?: Challenge[] } | null;
                    if (metadata?.challenges && metadata.challenges.length > 0) {
                        setLesson({
                            id: data.id,
                            title: data.title,
                            xpReward: data.xp_reward,
                            challenges: metadata.challenges
                        });
                    } else {
                        console.warn("Lição sem desafios na metadata, usando MOCK...");
                        setLesson({ ...MOCK_LESSON, id: data.id, title: data.title, xpReward: data.xp_reward });
                    }
                }
            } catch {
                setLesson(MOCK_LESSON);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center bg-surface-950">
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin mb-4" />
                <p className="text-surface-400 font-medium">Carregando a lição...</p>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center bg-surface-950 text-error-400">
                Erro ao carregar a lição.
            </div>
        );
    }

    return <GameEngine lesson={lesson} />;
}
