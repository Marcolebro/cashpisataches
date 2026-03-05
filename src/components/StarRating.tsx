import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating = 0,
  maxStars = 5,
  size = 16,
  showValue = false,
  className,
}: StarRatingProps) {
  const stars = [];
  const safeRating = Math.min(Math.max(rating, 0), maxStars);

  for (let i = 1; i <= maxStars; i++) {
    if (i <= safeRating) {
      // Étoile pleine
      stars.push(
        <Star
          key={i}
          size={size}
          className="fill-yellow-400 text-yellow-400"
          aria-hidden="true"
        />
      );
    } else if (i - 0.5 <= safeRating) {
      // Étoile à moitié (utilisant un masque CSS pour plus de précision)
      stars.push(
        <div key={i} className="relative" aria-hidden="true">
          <Star size={size} className="text-slate-200 fill-slate-200 dark:text-slate-700 dark:fill-slate-700" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <Star size={size} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      // Étoile vide
      stars.push(
        <Star
          key={i}
          size={size}
          className="text-slate-200 fill-slate-200 dark:text-slate-700 dark:fill-slate-700"
          aria-hidden="true"
        />
      );
    }
  }

  return (
    <div 
      className={cn("flex items-center gap-0.5 select-none", className)}
      aria-label={`Note de ${safeRating} sur ${maxStars}`}
    >
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      {showValue && (
        <span className="ml-2 text-sm font-bold text-slate-900 dark:text-white leading-none">
          {safeRating % 1 === 0 ? safeRating : safeRating.toFixed(1)}
          <span className="text-slate-400 font-normal ml-0.5 text-xs">/{maxStars}</span>
        </span>
      )}
    </div>
  );
}