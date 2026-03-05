import Link from "next/link";
import Image from "next/image";
import { Star, Check, ExternalLink, ArrowRight, ShieldCheck, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    affiliate_slug: string;
    logo: string;
    rating: number;
    bonus: string;
    pros: string[];
    badge?: string;
    description: string;
    is_featured?: boolean;
  };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={cn(
          "fill-current transition-colors",
          i < Math.floor(rating) ? "text-yellow-400" : "text-slate-200"
        )}
      />
    ));
  };

  return (
    <div 
      className={cn(
        "group relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1",
        product.is_featured && "ring-2 ring-blue-500 ring-offset-0",
        className
      )}
    >
      {/* Badge promotionnel */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
            <Trophy size={12} />
            {product.badge}
          </span>
        </div>
      )}

      {/* Header avec Logo */}
      <div className="relative h-48 w-full bg-slate-50 flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
          <Image
            src={product.logo}
            alt={`${product.name} logo`}
            fill
            className="object-contain drop-shadow-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Contenu de la card */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 font-heading leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <span className="text-sm font-bold text-slate-700">{product.rating.toFixed(1)}</span>
            <div className="flex leading-none">{renderStars(product.rating)}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="inline-block bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1.5 rounded-lg border border-blue-100 mb-3">
            {product.bonus}
          </div>
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Liste des points forts */}
        <ul className="space-y-2 mb-6 flex-grow">
          {(product.pros || []).slice(0, 3).map((pro, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <div className="mt-0.5 flex-shrink-0 bg-emerald-100 rounded-full p-0.5">
                <Check size={12} className="text-emerald-600 stroke-[3]" />
              </div>
              <span className="leading-tight">{pro}</span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-auto">
          <Link
            href={`/go/${product.affiliate_slug}`}
            target="_blank"
            rel="nofollow sponsored"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-blue-200 transition-all active:scale-[0.98] group/btn"
          >
            <span>Profiter du Bonus</span>
            <ExternalLink size={18} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
          
          <Link
            href={`/casinos/${product.slug}`}
            className="flex items-center justify-center gap-1.5 w-full text-slate-500 hover:text-slate-800 text-sm font-semibold py-2 transition-colors group/link"
          >
            <ShieldCheck size={16} className="text-slate-400 group-hover/link:text-blue-500" />
            Lire notre avis d'expert
            <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
          </Link>
        </div>
      </div>

      {/* Overlay subtil au hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-2xl pointer-events-none transition-colors" />
    </div>
  );
}