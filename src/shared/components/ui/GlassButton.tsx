import React from "react";
import { cn, glass } from "@/shared/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "solid" | "ghost" | "glow" | "neon";
    size?: "sm" | "md" | "lg";
}

export function GlassButton({
    children,
    className,
    variant = "solid",
    size = "md",
    ...props
}: GlassButtonProps) {

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg font-semibold",
    };

    const variants = {
        solid: cn(
            glass.button,
            "text-white shadow-lg hover:shadow-xl"
        ),
        ghost: cn(
            "bg-transparent hover:bg-white/10 text-white/50 hover:text-white border border-transparent hover:border-white/10 rounded-xl transition-all"
        ),
        glow: cn(
            "relative bg-gradient-to-r from-accent/20 to-amber-500/20 hover:from-accent/30 hover:to-amber-500/30",
            "backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-xl shadow-accent/20",
            "hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 group overflow-hidden"
        ),
        neon: cn(
            "relative bg-black/40 hover:bg-black/60 backdrop-blur-md border border-accent/50",
            "text-accent hover:text-accent-light hover:border-accent",
            "shadow-[0_0_10px_rgba(255,215,0,0.2)] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]",
            "rounded-xl transition-all duration-300"
        )
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2",
                sizes[size],
                variants[variant],
                className
            )}
            {...props}
        >
            {variant === 'glow' && (
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></span>
            )}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
}
