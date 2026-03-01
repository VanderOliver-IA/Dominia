interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "brand" | "xp" | "warn" | "error" | "accent";
    size?: "sm" | "md";
    className?: string;
}

const variantClasses = {
    default: "bg-surface-800 text-surface-300 border-surface-600",
    brand: "bg-brand-500/15 text-brand-400 border-brand-500/25",
    xp: "bg-xp-500/15 text-xp-400 border-xp-500/25",
    warn: "bg-warn-500/15 text-warn-400 border-warn-500/25",
    error: "bg-error-500/15 text-error-400 border-error-500/25",
    accent: "bg-accent-500/15 text-accent-400 border-accent-500/25",
};

const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
};

export default function Badge({
    children,
    variant = "default",
    size = "sm",
    className = "",
}: BadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center gap-1 font-medium rounded-full border
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
        >
            {children}
        </span>
    );
}
