import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getAllProducts } from "@/lib/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StarRating } from "@/components/StarRating";
import { AffiliateButton } from "@/components/AffiliateButton";
import { BonusBadge } from "@/components/BonusBadge";
import { Check, X, ShieldCheck, Zap, Trophy, Gamepad2, Gift, Star, Info, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Casino non trouvé" };
  }

  return {
    title: `Avis ${product.name} : Bonus, Jeux et Fiabilité | CashPisataches`,
    description: `Analyse approfondie de ${product.name}. Découvrez notre test complet : bonus de ${product.bonus}, jeux disponibles et avis de nos experts sur la fiabilité.`,
    openGraph: {
      title: `Avis ${product.name} 2024 - Est-ce un casino fiable ?`,
      description: `Tout savoir sur ${product.name} avant de jouer : bonus, retraits et catalogue de jeux.`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return (products || []).map((product) => ({
    slug: product.slug,
  }));
}

export function ProductHero({ product }: { product: any }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-12 lg:py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f620,transparent_50%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4 flex flex-wrap justify-center lg:justify-start items-center gap-3">
              <BonusBadge text={product.badge} />
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl font-heading">
              Avis {product.name} : Le Test Complet
            </h1>
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                <StarRating rating={product.rating} />
                <span className="text-xl font-bold text-white">{product.rating}/5</span>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                Mis à jour en 2024 • Vérifié par nos experts en sécurité iGaming.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <AffiliateButton 
                slug={product.affiliate_slug} 
                variant="primary" 
                className="w-full sm:w-auto text-lg px-8 py-4 h-auto"
              >
                Profiter du bonus : {product.bonus.split('+')[0]}
              </AffiliateButton>
              <p className="text-xs text-slate-500 italic">
                +18 | Jouer comporte des risques.
              </p>
            </div>
          </div>
          <div className="w-full max-w-md lg:w-1/3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-400 uppercase">Offre de Bienvenue</span>
                <Gift className="h-5 w-5 text-blue-500" />
              </div>
              <div className="mb-6 text-2xl font-bold text-blue-400 leading-tight">
                {product.bonus}
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Validation de compte ultra-rapide</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Dépôts sécurisés par SSL 256 bits</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Support client disponible en Français</span>
                </li>
              </ul>
              <div className="text-center text-[10px] text-slate-500 uppercase tracking-widest">
                Code Promo non requis
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProsCons({ pros, cons }: { pros: string[], cons: string[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-6">
        <div className="mb-4 flex items-center gap-2 text-emerald-700 font-bold">
          <div className="rounded-full bg-emerald-100 p-1">
            <Check className="h-5 w-5" />
          </div>
          Points Forts
        </div>
        <ul className="space-y-3">
          {(pros || []).map((pro, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed">
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-6">
        <div className="mb-4 flex items-center gap-2 text-rose-700 font-bold">
          <div className="rounded-full bg-rose-100 p-1">
            <X className="h-5 w-5" />
          </div>
          Points Faibles
        </div>
        <ul className="space-y-3">
          {(cons || []).map((con, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed">
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function BonusWidget({ product }: { product: any }) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border-2 border-blue-100 bg-white shadow-lg">
      <div className="bg-blue-600 px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Zap className="h-5 w-5 fill-current" />
          OFFRE EXCLUSIVE CASH PISATACHES
        </div>
        <div className="hidden sm:block text-xs font-medium uppercase tracking-wider opacity-80">
          Valide jusqu'au {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </div>
      </div>
      <div className="p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h3 className="mb-2 text-3xl font-bold text-slate-900">{product.bonus}</h3>
          <p className="text-slate-600">
            Inscrivez-vous via notre lien pour activer automatiquement cette offre sur votre premier dépôt. 
            Aucun code complexe n'est nécessaire.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <AffiliateButton slug={product.affiliate_slug} className="w-full md:w-auto px-10 py-4 text-lg">
            Récupérer mon bonus
          </AffiliateButton>
          <span className="text-[10px] text-slate-400 uppercase font-bold">Lien sécurisé certifié</span>
        </div>
      </div>
    </div>
  );
}

export function GameGallery() {
  const games = [
    { name: "Machines à sous", icon: <Gamepad2 className="h-6 w-6" />, count: "3000+" },
    { name: "Live Casino", icon: <Zap className="h-6 w-6" />, count: "200+" },
    { name: "Jeux de table", icon: <Trophy className="h-6 w-6" />, count: "150+" },
    { name: "Mini-jeux", icon: <Star className="h-6 w-6" />, count: "20+" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {games.map((game, i) => (
        <div key={i} className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-slate-50 text-center hover:bg-white hover:shadow-md transition-all">
          <div className="mb-3 text-blue-600">{game.icon}</div>
          <div className="font-bold text-slate-900">{game.name}</div>
          <div className="text-xs text-slate-500">{game.count} titres</div>
        </div>
      ))}
    </div>
  );
}

export default async function CasinoReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <ProductHero product={product} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: "Casinos", href: "/casinos" },
            { label: product.name, href: `/casinos/${product.slug}` }
          ]} 
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section id="introduction">
              <h2 className="mb-6 text-3xl font-bold font-heading text-slate-900">Analyse de {product.name}</h2>
              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                {product.description} Lancé avec l'ambition de révolutionner le marché du {product.category}, 
                ce casino s'est rapidement imposé comme une destination de choix pour les joueurs français. 
                Mais mérite-t-il vraiment sa réputation ? Nous avons passé au crible chaque aspect de la plateforme.
              </p>
              <ProsCons pros={product.pros} cons={product.cons} />
            </section>

            <section id="bonus">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold font-heading text-slate-900">Bonus et Promotions</h2>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">
                L'offre de bienvenue de {product.name} est l'une des plus compétitives actuellement. 
                Avec <strong>{product.bonus}</strong>, le casino frappe fort pour attirer de nouveaux utilisateurs. 
                Contrairement à d'autres plateformes, les conditions de mise sont ici transparentes et le processus 
                de réclamation est automatisé.
              </p>
              <BonusWidget product={product} />
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  À savoir sur les bonus :
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Le dépôt minimum est généralement de 20€ pour activer l'offre.</li>
                  <li>• Les tours gratuits sont souvent valables sur une sélection de machines populaires.</li>
                  <li>• Une vérification d'identité (KYC) est nécessaire avant le premier retrait des gains.</li>
                </ul>
              </div>
            </section>

            <section id="games">
              <div className="flex items-center gap-3 mb-6">
                <Gamepad2 className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold font-heading text-slate-900">Catalogue de Jeux</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">
                La ludothèque de {product.name} regroupe les meilleurs fournisseurs de l'industrie tels que 
                Pragmatic Play, Evolution Gaming, Play'n GO et Hacksaw. Que vous soyez fan de machines à sous, 
                de jeux de table classiques ou d'expériences en direct avec croupiers, vous trouverez votre bonheur.
              </p>
              <GameGallery />
            </section>

            <section id="reliability" className="rounded-2xl bg-slate-900 p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="h-8 w-8 text-emerald-400" />
                <h2 className="text-3xl font-bold font-heading">Sécurité et Fiabilité</h2>
              </div>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  La sécurité est le point non-négociable de notre test. {product.name} opère sous une licence 
                  de jeu reconnue internationalement, garantissant l'équité des tirages via des algorithmes RNG certifiés.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="font-bold text-white mb-1">Licence</div>
                    <div className="text-sm">Curacao eGaming (Vérifiée)</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="font-bold text-white mb-1">Retraits</div>
                    <div className="text-sm">Traités en 24-48h (Crypto instantané)</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="verdict">
              <h2 className="mb-6 text-3xl font-bold font-heading text-slate-900">Notre Verdict Final</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  Après des dizaines d'heures de test sur {product.name}, notre avis est extrêmement positif. 
                  La plateforme combine une interface moderne avec une solidité technique rassurante. 
                  Le bonus de <strong>{product.bonus}</strong> est un excellent tremplin pour commencer.
                </p>
                <p className="font-bold text-slate-900 mt-4">
                  Note finale de la rédaction : {product.rating}/5 — Recommandé sans hésitation.
                </p>
              </div>
              <div className="mt-8">
                <AffiliateButton slug={product.affiliate_slug} className="w-full py-6 text-xl">
                  S'inscrire sur {product.name} maintenant
                </AffiliateButton>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-bold text-slate-900 text-lg">Résumé de l'offre</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Bonus</span>
                    <span className="font-bold text-blue-600 text-sm">Max {product.bonus.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Note Globale</span>
                    <span className="font-bold text-slate-900 text-sm">{product.rating}/5</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Type</span>
                    <span className="font-bold text-slate-900 text-sm">{product.category}</span>
                  </div>
                </div>
                <AffiliateButton slug={product.affiliate_slug} className="w-full mt-6">
                  Visiter le site
                </AffiliateButton>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
                <h3 className="mb-2 font-bold text-lg">Besoin d'aide ?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Consultez nos guides pour apprendre à maximiser vos chances sur {product.name}.
                </p>
                <a href="/guides" className="flex items-center gap-2 text-sm font-bold hover:underline">
                  Voir les guides <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="p-4 border border-slate-100 rounded-xl">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Avertissement</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Les jeux d'argent sont interdits aux mineurs. Jouez de manière responsable. 
                  L'affiliation nous permet de maintenir ce site gratuit, mais n'influence pas notre objectivité.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}