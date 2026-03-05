import Link from "next/link";
import Image from "next/image";
import { Star, Check, ExternalLink, Trophy, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  slug: string;
  rating: number;
  bonus: string;
  features: string[];
  affiliate_slug: string;
  image: string;
  is_new?: boolean;
  is_popular?: boolean;
}

interface RankingTableProps {
  products: Product[];
  limit?: number;
}

export const StarRating = ({ rating, max = 5 }: { rating: number; max?: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(
            "fill-current",
            i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          )}
        />
      ))}
      <span className="ml-2 text-sm font-bold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

export const RankingTable = ({ products, limit }: RankingTableProps) => {
  const displayedProducts = limit ? products?.slice(0, limit) : products;

  if (!displayedProducts || displayedProducts.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">Aucun casino disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Header Desktop */}
      <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 uppercase tracking-wider">
        <div className="col-span-1 text-center">Rang</div>
        <div className="col-span-3">Casino</div>
        <div className="col-span-3">Bonus de Bienvenue</div>
        <div className="col-span-3">Points Forts</div>
        <div className="col-span-2 text-center">Action</div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {displayedProducts.map((product, index) => (
          <div
            key={product.id}
            className={cn(
              "relative bg-white border rounded-xl transition-all duration-300 hover:shadow-xl hover:border-blue-200",
              index === 0 ? "border-yellow-400 shadow-md ring-1 ring-yellow-400/20" : "border-gray-200"
            )}
          >
            {/* Badges */}
            {index === 0 && (
              <div className="absolute -top-3 left-6 bg-yellow-400 text-yellow-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Trophy size={12} /> MEILLEUR CHOIX
              </div>
            )}
            {product.is_new && index !== 0 && (
              <div className="absolute -top-3 left-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                NOUVEAU
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4 p-4 lg:p-6">
              {/* Rank & Logo */}
              <div className="col-span-1 flex lg:flex-col items-center justify-center gap-2">
                <span className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg",
                  index === 0 ? "bg-yellow-400 text-yellow-950" : 
                  index === 1 ? "bg-gray-200 text-gray-700" :
                  index === 2 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500"
                )}>
                  {index + 1}
                </span>
              </div>

              {/* Casino Info */}
              <div className="col-span-3 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                  <Image
                    src={product.image || "/placeholder-casino.png"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">
                    {product.title}
                  </h3>
                  <div className="mt-1">
                    <StarRating rating={product.rating} />
                  </div>
                  <Link 
                    href={`/casinos/${product.slug}`}
                    className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                  >
                    Lire notre avis expert
                  </Link>
                </div>
              </div>

              {/* Bonus */}
              <div className="col-span-3 bg-blue-50/50 lg:bg-transparent p-3 lg:p-0 rounded-lg">
                <span className="block text-xs text-gray-500 lg:hidden font-semibold uppercase mb-1">Bonus</span>
                <p className="text-blue-700 font-extrabold text-base lg:text-lg">
                  {product.bonus}
                </p>
                <div className="flex items-center gap-1 mt-1 text-emerald-600">
                  <Check size={14} />
                  <span className="text-xs font-medium">Lien vérifié aujourd'hui</span>
                </div>
              </div>

              {/* Features */}
              <div className="col-span-3 space-y-1.5">
                <span className="block text-xs text-gray-500 lg:hidden font-semibold uppercase mb-1">Points forts</span>
                {product.features?.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-emerald-500 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="col-span-2 flex flex-col gap-2">
                <Link
                  href={`/go/${product.affiliate_slug}`}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Visiter <ExternalLink size={16} />
                </Link>
                <Link
                  href={`/casinos/${product.slug}`}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm text-center border border-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  Plus d'infos <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400 italic">
          * Les bonus sont réservés aux nouveaux joueurs. Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le 09 74 75 13 13 (appel non surtaxé). 18+
        </p>
      </div>
    </div>
  );
};