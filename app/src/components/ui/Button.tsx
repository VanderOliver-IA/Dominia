"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "xp";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
    primary:
        "gradient-brand text-white hover:shadow-[var(--shadow-glow-brand)] active:scale-[0.97]",
    secondary:
        "bg-surface-800 text-surface-100 border border-surface-600 hover:bg-surface-700 hover:border-surface-500 active:scale-[0.97]",
    ghost:
        "bg-transparent text-surface-300 hover:bg-surface-800 hover:text-surface-100",
    danger:
        "bg-error-500/10 text-error-400 border border-error-500/20 hover:bg-error-500/20 active:scale-[0.97]",
    xp: "gradient-xp text-white hover:shadow-[var(--shadow-glow-xp)] active:scale-[0.97]",
};

const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-xl gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            className = "",
            disabled,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`
          inline-flex items-center justify-center font-semibold
          transition-all duration-200 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
