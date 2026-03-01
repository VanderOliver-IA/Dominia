interface ProgressProps {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    variant?: "brand" | "xp" | "accent" | "warn";
    showLabel?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
};

const barClasses = {
    brand: "gradient-brand",
    xp: "gradient-xp",
    accent: "gradient-accent",
    warn: "bg-warn-500",
};

export default function Progress({
    value,
    max = 100,
    size = "md",
    variant = "brand",
    showLabel = false,
    className = "",
}: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-surface-400">Progresso</span>
                    <span className="text-xs font-semibold text-surface-200">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
            <div
                className={`w-full rounded-full bg-surface-800 overflow-hidden ${sizeClasses[size]}`}
            >
                <div
                    className={`${sizeClasses[size]} rounded-full transition-all duration-700 ease-out ${barClasses[variant]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
