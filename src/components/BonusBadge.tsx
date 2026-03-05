import { Gift, Zap, Coins, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BonusBadgeProps {
  label: string;
  type?: "welcome" | "free-spins" | "no-deposit" | "special" | "exclusive";
  size?: "sm" | "md";
  className?: string;
}

export const BonusBadge = ({
  label,
  type = "welcome",
  size = "md",
  className,
}: BonusBadgeProps) => {
  const getBadgeStyles = () => {
    switch (type) {
      case "welcome":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
          icon: Gift,
          iconColor: "text-blue-600 dark:text-blue-400",
        };
      case "free-spins":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
          icon: Star,
          iconColor: "text-emerald-600 dark:text-emerald-400",
        };
      case "no-deposit":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
          icon: Coins,
          iconColor: "text-amber-600 dark:text-amber-400",
        };
      case "exclusive":
        return {
          bg: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
          icon: Zap,
          iconColor: "text-purple-600 dark:text-purple-400",
        };
      case "special":
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
          icon: Zap,
          iconColor: "text-slate-600 dark:text-slate-400",
        };
    }
  };

  const styles = getBadgeStyles();
  const Icon = styles.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
  };

  const iconSizes = {
    sm: 12,
    md: 14,
  };

  return (
    <div
      className={cn(
        "inline-flex items-center font-semibold rounded-full border transition-all duration-200",
        styles.bg,
        sizeClasses[size],
        className
      )}
    >
      <Icon 
        size={iconSizes[size]} 
        className={cn("shrink-0", styles.iconColor)} 
        strokeWidth={2.5}
      />
      <span className="truncate">{label}</span>
    </div>
  );
};