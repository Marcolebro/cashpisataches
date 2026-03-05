import { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BonusBadge } from "@/components/BonusBadge";
import { AffiliateButton } from "@/components/AffiliateButton";
import { StarRating } from "@/components/StarRating";
import { Newsletter } from "@/components/Newsletter";
import { Gift, Zap, Coins, Info, CheckCircle, Copy, ArrowRight } from "lucide-react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Meilleurs Bonus Casino 2024 : Tours Gratuits & Bonus de Dépôt | CashPisataches",
  description: "Récupérez les meilleurs bonus d'inscription, codes promotionnels et offres sans dépôt mis à jour quotidiennement. Maximisez vos gains avec nos offres exclusives.",
  openGraph: {
    title: "Meilleurs Bonus Casino 2024 : Tours Gratuits & Bonus de Dépôt",
    description: "Découvrez les offres les plus généreuses des casinos en ligne fiables.",
    type: "website",
  },
};

interface Product {
  name: string;
  slug: string;
  affiliate_slug: string;
  url: string;
  bonus: string;
  rating: number;
  pros: string[];
  cons: string[];
  category: string;
  description: string;
  is_featured: boolean;
  badge: string;
}

function PromoCodeCard({ product }: { product: Product }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
            {product.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{product.name}</h3>
            <div className="flex items-center gap-1">
              <StarRating rating={product.rating} />
            </div>
          </div>
        </div>
        <BonusBadge text={product.badge} />
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 flex flex-col items-center justify-center text-center">
        <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Code Promotionnel</span>
        <span className="text-2xl font-mono font-bold text-primary uppercase">CASINO2024</span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
          <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
          <span>{product.bonus}</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
          <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
          <span>Activation instantanée après dépôt</span>
        </div>
      </div>

      <AffiliateButton 
        slug={product.affiliate_slug} 
        variant="primary" 
        className="w-full justify-center py-3"
      >
        Récupérer mon bonus
      </AffiliateButton>
    </div>
  );
}

function BonusGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(products || []).map((product) => (
        <div key={product.slug} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase">
                {product.category}
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <StarRating rating={product.rating} />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-4">
              <div className="flex items-center gap-2 text-primary font-bold mb-1">
                <Gift className="w-4 h-4" />
                <span>Offre de Bienvenue</span>
              </div>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                {product.bonus}
              </p>
            </div>

            <ul className="space-y-2">
              {(product.pros || []).slice(0, 2).map((pro, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 pt-0">
            <AffiliateButton 
              slug={product.affiliate_slug} 
              variant="primary" 
              className="w-full justify-center group-hover:scale-[1.02] transition-transform"
            >
              Profiter de l'offre <ArrowRight className="ml-2 w-4 h-4" />
            </AffiliateButton>
            <p className="text-[10px] text-center text-slate-400 mt-3 italic">
              +18 | Jouer comporte des risques | Voir conditions sur le site
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Qu'est-ce qu'un wager (exigence de mise) ?",
      a: "Le wager est le nombre de fois que vous devez miser le montant du bonus avant de pouvoir retirer vos gains. Par exemple, un bonus de 100€ avec un wager x30 nécessite de miser 3000€ au total."
    },
    {
      q: "Puis-je obtenir un bonus sans dépôt ?",
      a: "Oui, certains casinos offrent des tours gratuits (Free Spins) ou une petite somme d'argent dès l'inscription. Ces offres sont rares et souvent limitées en termes de gains maximum."
    },
    {
      q: "Comment utiliser un code promo de casino ?",
      a: "Le code promo doit généralement être saisi lors de l'inscription dans un champ dédié, ou au moment de votre premier dépôt dans la section 'Caisse' du casino."
    },
    {
      q: "Qu'est-ce qu'un bonus de bienvenue ?",
      a: "C'est l'offre réservée aux nouveaux joueurs. Elle se compose souvent d'un pourcentage sur le premier dépôt (ex: 100% jusqu'à 500€) et parfois de tours gratuits additionnels."
    },
    {
      q: "Le cashback est-il considéré comme un bonus ?",
      a: "Oui, le cashback est une forme de bonus qui vous rembourse un pourcentage de vos pertes nettes sur une période donnée. C'est l'un des bonus les plus appréciés des joueurs réguliers."
    }
  ];

  return (
    <section className="py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Foire Aux Questions - Bonus</h2>
      </div>
      <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {faq.q}
              <span className="transition-transform group-open:rotate-180">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </span>
            </summary>
            <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function HelpCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function BonusPage() {
  const products = getAllProducts();
  const featuredProducts = products.filter(p => p.is_featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent pt-12 pb-20">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Bonus", href: "/bonus" }
            ]} 
          />
          
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Les Meilleurs <span className="text-primary">Bonus Casino</span> en Ligne 2024
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Ne déposez jamais sans obtenir un avantage. Notre équipe négocie quotidiennement des bonus exclusifs, des tours gratuits et des offres sans dépôt pour vous garantir la meilleure expérience de jeu.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium">Mise à jour : Aujourd'hui</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                <Coins className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">+15 000€ de bonus cumulés</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-12">
        {/* Promo Codes Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Codes Promotionnels Exclusifs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(featuredProducts || []).map((product) => (
              <PromoCodeCard key={`promo-${product.slug}`} product={product} />
            ))}
          </div>
        </section>

        {/* All Bonuses Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-accent rounded-full" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Toutes les Offres de Bienvenue</h2>
            </div>
          </div>
          <BonusGrid products={products} />
        </section>

        {/* Info Box */}
        <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-primary text-white p-4 rounded-2xl">
              <Info className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Comment bien choisir son bonus ?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Tous les bonus ne se valent pas. Un bonus de 200% peut être moins avantageux qu'un bonus de 100% si les conditions de mise (wager) sont trop élevées. Vérifiez toujours :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Le montant du wager (x30, x40, etc.)
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  La limite de mise par tour
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  La durée de validité du bonus
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Les jeux exclus du bonus
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQ />

        {/* Newsletter Section */}
        <div className="py-16">
          <Newsletter />
        </div>
      </main>

      {/* Responsible Gaming Footer Tag */}
      <div className="bg-slate-900 py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-2">Jeu Responsable</p>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Le jeu d'argent doit rester un plaisir. Si vous sentez que vous perdez le contrôle, contactez Joueurs Info Service au 09 74 75 13 13 (appel non surtaxé).
          </p>
        </div>
      </div>
    </div>
  );
}

export default BonusPage;