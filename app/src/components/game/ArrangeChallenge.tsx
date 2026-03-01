"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Challenge } from "@/types/game";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ArrangeChallengeProps {
    challenge: Challenge;
    status: "playing" | "correct" | "wrong" | "finished";
    onSelectionChange: (selection: string[]) => void;
}

// Subcomponente para cada bloco sortable
function SortableItem(props: { id: string; content: string; disabled: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: props.id, disabled: props.disabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`
                px-4 py-3 rounded-xl font-medium text-sm sm:text-base border-2 shadow-sm
                cursor-grab active:cursor-grabbing touch-none
                ${isDragging ? "bg-brand-500/20 border-brand-500/50 shadow-brand-500/20 text-brand-100 scale-105" : "bg-surface-800 border-surface-700 text-surface-50 hover:border-surface-600"}
                ${props.disabled ? "opacity-90 cursor-default" : ""}
                transition-colors duration-200
            `}
        >
            {props.content}
        </div>
    );
}

export default function ArrangeChallenge({ challenge, status, onSelectionChange }: ArrangeChallengeProps) {
    const [items, setItems] = useState<{ id: string; content: string }[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Ajuda com cliques acidentais no mobile
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        // Inicializa as opções embaralhadas
        if (challenge.options) {
            const mapped = challenge.options.map((opt, i) => ({ id: `item-${i}`, content: opt }));
            // Embaralhamento básico
            const shuffled = [...mapped].sort(() => Math.random() - 0.5);
            setItems(shuffled);

            // Avisa o pai qual a seleção inicial (para não enviar vazio se ele clicar verificar sem mexer)
            const initialSelection = shuffled.map(s => s.content);
            onSelectionChange(initialSelection);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [challenge]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);

                const newOrder = arrayMove(items, oldIndex, newIndex);

                // Emite para o GameEngine a frase montada
                onSelectionChange(newOrder.map(i => i.content));

                return newOrder;
            });
        }
    };

    const isLocked = status !== "playing";

    // Status container styling
    let statusClass = "";
    if (status === "correct") statusClass = "border-brand-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]";
    if (status === "wrong") statusClass = "border-error-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]";

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full justify-center px-4">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-2xl sm:text-3xl font-bold text-center mb-8 text-surface-50"
            >
                {challenge.question}
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`glass p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 ${statusClass || "border-surface-800"}`}
            >
                <div className="mb-4 text-center">
                    <span className="text-xs uppercase tracking-wider font-bold text-surface-400">
                        Arraste para ordenar
                    </span>
                </div>

                <div className="min-h-[120px] bg-surface-900/50 rounded-xl p-4 border border-surface-800 flex items-center justify-center">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items}
                            strategy={horizontalListSortingStrategy}
                        >
                            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                                {items.map((item) => (
                                    <SortableItem key={item.id} id={item.id} content={item.content} disabled={isLocked} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            </motion.div>
        </div>
    );
}
