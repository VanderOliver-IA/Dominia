import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: "brand" | "xp" | "accent" | "none";
    padding?: "sm" | "md" | "lg";
}

const glowClasses = {
    brand: "hover:shadow-[var(--shadow-glow-brand)]",
    xp: "hover:shadow-[var(--shadow-glow-xp)]",
    accent: "hover:shadow-[var(--shadow-glow-accent)]",
    none: "",
};

const paddingClasses = {
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
};

export default function Card({
    children,
    className = "",
    hover = false,
    glow = "none",
    padding = "md",
}: CardProps) {
    return (
        <div
            className={`
        glass rounded-2xl
        ${paddingClasses[padding]}
        ${hover ? "transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)] cursor-pointer" : ""}
        ${glowClasses[glow]}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
