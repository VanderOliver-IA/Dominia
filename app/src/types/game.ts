export type ChallengeType = "quiz" | "arrange" | "fill-blank" | "true-false";

export interface Challenge {
    id: string;
    type: ChallengeType;
    question: string;
    options?: string[]; // Opções para quiz, true-false ou arrange
    correctAnswer: string | string[]; // A resposta correta (ou array para arrastar)
    explanation: string; // Explicação mostrada após o acerto/erro
}

export interface LessonData {
    id: string;
    title: string;
    xpReward: number;
    challenges: Challenge[];
}
