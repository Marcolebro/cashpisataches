import { Metadata } from "next";
import Link from "next/link";
import { Zap, ShieldCheck, Trophy, Gift, ChevronRight, TrendingUp, BookOpen, Star } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { RankingTable } from "@/components/RankingTable";
import { ProductCard } from "@/components/ProductCard";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "CashPisataches - Meilleurs Casinos en Ligne & Bonus 2024",
  description: "Découvrez le classement des meilleurs casinos en ligne comme Stake, profitez de bonus exclusifs et suivez nos guides pour maximiser vos gains.",
  alternates: {
    canonical: "https://cashpisataches.com",
  },
  openGraph: {
    title: "CashPisataches - Meilleurs Casinos en Ligne & Bonus 2024",
    description: "Le guide ultime pour choisir votre casino en ligne. Comparatifs, bonus exclusifs et avis d'experts.",
    type: "website",
    url: "https://cashpisataches.com",
    siteName: "CashPisataches",
  },
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

const SectionHeader = ({ title, subtitle, badge }: SectionHeaderProps) => (
  <div className="mb-10 text-center">
    {badge && (
      <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full ring-1 ring-blue-100 ring-inset">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading tracking-tight mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const Hero = () => (
  <section className="relative pt-16 pb-20 overflow-hidden bg-slate-50">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400 blur-[120px]" />
    </div>

    <div className="container relative px-4 mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-full ring-1 ring-emerald-200 ring-inset animate-fade-in">
          <Zap className="w-4 h-4 fill-emerald-500" />
          <span>Bonus exclusifs mis à jour aujourd'hui</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-slate-900 leading-[1.1] mb-8">
          Les Meilleurs <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Casinos en Ligne</span> de 2024
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Comparez les plateformes les plus fiables, profitez de bonus de bienvenue massifs et jouez en toute sécurité sur des sites vérifiés par nos experts.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/casinos"
            className="w-full sm:w-auto px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Voir le classement complet
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/bonus"
            className="w-full sm:w-auto px-8 py-4 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Gift className="w-5 h-5 text-emerald-500" />
            Meilleurs Bonus
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 pt-12">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">100% Sécurisé</span>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="w-8 h-8 text-emerald-500 mb-2" />
            <span className="text-sm font-semibold text-slate-900">Retraits Rapides</span>
          </div>
          <div className="flex flex-col items-center">
            <Trophy className="w-8 h-8 text-amber-500 mb-2" />
            <span className="text-sm font-semibold text-slate-900">Sites Certifiés</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-8 h-8 text-purple-500 mb-2" />
            <span className="text-sm font-semibold text-slate-900">Avis Vérifiés</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default async function Home() {
  const products = await getAllProducts();
  const articles = await getAllArticles();
  
  const featuredProducts = products?.filter(p => p.is_featured) || [];
  const topProducts = products?.slice(0, 5) || [];
  const recentArticles = articles?.slice(0, 3) || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CashPisataches",
    "url": "https://cashpisataches.com",
    "description": "Comparatif des meilleurs casinos en ligne et bonus exclusifs 2024",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://cashpisataches.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Ranking Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <SectionHeader 
            badge="Sélection 2024"
            title="Le Top des Casinos en Ligne"
            subtitle="Nos experts ont testé et classé les meilleures plateformes selon des critères stricts de sécurité, de bonus et de rapidité de paiement."
          />
          
          <div className="max-w-5xl mx-auto">
            <RankingTable products={topProducts} />
            <div className="mt-10 text-center">
              <Link 
                href="/casinos" 
                className="inline-flex items-center font-bold text-blue-600 hover:text-blue-700 transition-colors group"
              >
                Découvrir tous les casinos testés
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bonuses */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4 mx-auto">
          <SectionHeader 
            badge="Offres Exceptionnelles"
            title="Bonus de Bienvenue à ne pas Manquer"
            subtitle="Profitez de conditions avantageuses et de tours gratuits exclusifs en passant par nos liens partenaires."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts?.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/bonus" 
              className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-all inline-flex items-center gap-2"
            >
              Voir tous les bonus disponibles
            </Link>
          </div>
        </div>
      </section>

      {/* Guides & Articles */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="mb-6 md:mb-0">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-emerald-600 uppercase bg-emerald-50 rounded-full ring-1 ring-emerald-100 ring-inset">
                Apprendre & Gagner
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">
                Guides & Actualités
              </h2>
            </div>
            <Link 
              href="/guides" 
              className="inline-flex items-center font-bold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              Tous nos articles
              <BookOpen className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles?.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-current">
            <path d="M0 0 L100 0 L100 100 Z" />
          </svg>
        </div>
        
        <div className="container relative px-4 mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8 leading-tight">
              Pourquoi faire confiance à <span className="text-blue-400">CashPisataches</span> ?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Transparence Totale</h3>
                  <p className="text-slate-400">Nous testons chaque casino avec notre propre argent pour vous garantir un avis impartial et honnête sur les conditions de retrait et les bonus.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Mises à Jour Quotidiennes</h3>
                  <p className="text-slate-400">Les offres de casino changent vite. Notre équipe vérifie quotidiennement la validité des liens et des codes promotionnels.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expertise Reconnue</h3>
                  <p className="text-slate-400">Plus de 5 ans d'expérience dans l'industrie du iGaming pour vous dénicher les pépites et vous éviter les arnaques.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-200">
            <Newsletter />
          </div>
        </div>
      </section>

      {/* Footer SEO Text */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container px-4 mx-auto">
          <div className="prose prose-slate max-w-none text-slate-500 text-sm md:text-base leading-relaxed">
            <h3 className="text-slate-900 font-bold mb-4">Le guide de référence des jeux d'argent en ligne</h3>
            <p className="mb-4">
              CashPisataches est né d'une volonté de clarifier le marché complexe des casinos en ligne. Que vous soyez un amateur de machines à sous, un fan de Blackjack en direct ou un adepte des crypto-casinos comme Stake, notre plateforme vous accompagne pour trouver l'expérience de jeu qui vous correspond le mieux.
            </p>
            <p className="mb-4">
              Nous analysons en détail les licences de jeu (Curacao, Malte), les protocoles de sécurité SSL et l'équité des jeux (RNG, Provably Fair) pour vous assurer une tranquillité d'esprit totale. Nos comparatifs mettent en avant les bonus sans wager, les free spins et les programmes VIP les plus généreux.
            </p>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 font-medium text-xs md:text-sm">
              <span className="font-bold block mb-1 uppercase tracking-wide">🔞 Jeu Responsable</span>
              Les jeux d'argent comportent des risques : endettement, dépendance... Appelez le 09 74 75 13 13 (appel non surtaxé) si vous avez besoin d'aide. Jouer doit rester un plaisir. Interdit aux moins de 18 ans.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}