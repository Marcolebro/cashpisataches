"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffiliateButtonProps {
  slug: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showIcon?: boolean;
}

/**
 * Composant AffiliateButton - Gère les redirections d'affiliation avec tracking
 * Utilise la route interne /go/[slug] pour les redirections sortantes
 */
export function AffiliateButton({
  slug,
  label = "Voir l'offre",
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
}: AffiliateButtonProps) {
  
  const handleClick = () => {
    if (slug) {
      // Tracking asynchrone dans Supabase avant redirection
      /* tracking via /go/ */.catch((err) =>
        console.error("Erreur lors du tracking de l'affiliation:", err)
      );
    }
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-blue-500/20",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 shadow-sm",
    accent: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm hover:shadow-emerald-500/20",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm font-medium",
    md: "px-6 py-3 text-base font-semibold",
    lg: "px-8 py-4 text-lg font-bold",
    xl: "px-10 py-5 text-xl font-extrabold uppercase tracking-tight",
  };

  return (
    <Link
      href={`/go/${slug}`}
      onClick={handleClick}
      target="_blank"
      rel="nofollow sponsored"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <span>{label}</span>
      {showIcon && (
        <ExternalLink 
          size={size === "sm" ? 16 : size === "md" ? 18 : 22} 
          strokeWidth={size === "sm" ? 2 : 2.5}
          className="opacity-90"
        />
      )}
    </Link>
  );
}