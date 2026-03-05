import { Metadata } from "next"
import Link from "next/link"
import { BookOpen, Sparkles, GraduationCap, Newspaper, ChevronRight, Search } from "lucide-react"
import { getAllArticles } from "@/lib/articles"
import { ArticleCard } from "@/components/ArticleCard"
import { Newsletter } from "@/components/Newsletter"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Guides Pratiques & Actualités Casino | CashPisataches",
  description: "Apprenez les stratégies de jeu, découvrez les nouveautés du secteur et optimisez votre expérience de jeu avec nos guides experts et actualités iGaming.",
  openGraph: {
    title: "Guides Pratiques & Actualités Casino | CashPisataches",
    description: "Apprenez les stratégies de jeu et optimisez votre expérience de jeu.",
    type: "website",
  },
}

interface CategoryTabProps {
  label: string
  href: string
  isActive: boolean
  icon: React.ReactNode
}

function CategoryTab({ label, href, isActive, icon }: CategoryTabProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 whitespace-nowrap border",
        isActive
          ? "bg-blue-600 text-white border-blue-600 shadow-md"
          : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600"
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}

export default async function GuidesPage(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams
  const selectedCategory = searchParams.category
  const allArticles = await getAllArticles()

  // Extraire les catégories uniques
  const categories = Array.from(new Set((allArticles || []).map((article) => article.category)))

  // Filtrer les articles si une catégorie est sélectionnée
  const filteredArticles = selectedCategory
    ? (allArticles || []).filter((article) => article.category === selectedCategory)
    : allArticles

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Guides Pratiques & Actualités Casino",
    "description": "Apprenez les stratégies de jeu et découvrez les nouveautés du secteur iGaming.",
    "publisher": {
      "@type": "Organization",
      "name": "CashPisataches"
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 pt-12 pb-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Guides & Actualités", href: "/guides" }
            ]} 
          />
          
          <div className="mt-8 max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Le Guide Ultime du <span className="text-blue-400">Casino en Ligne</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Devenez un expert, maîtrisez les probabilités et restez informé des dernières tendances du iGaming. 
              Nos experts analysent tout pour maximiser vos chances.
            </p>
          </div>
        </div>
      </section>

      {/* Filtres par Catégorie */}
      <section className="-mt-8 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            <CategoryTab
              label="Tous les articles"
              href="/guides"
              isActive={!selectedCategory}
              icon={<BookOpen className="w-4 h-4" />}
            />
            {(categories || []).map((cat) => (
              <CategoryTab
                key={cat}
                label={cat}
                href={`/guides?category=${encodeURIComponent(cat)}`}
                isActive={selectedCategory === cat}
                icon={
                  cat.toLowerCase().includes("stratégie") ? <GraduationCap className="w-4 h-4" /> :
                  cat.toLowerCase().includes("actu") ? <Newspaper className="w-4 h-4" /> :
                  <Sparkles className="w-4 h-4" />
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grille d'articles */}
      <section className="container mx-auto px-4 mb-24">
        {filteredArticles && filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Aucun article trouvé</h3>
            <p className="text-slate-500 mb-6">
              Nous n'avons pas encore d'articles dans cette catégorie. Revenez très bientôt !
            </p>
            <Link 
              href="/guides"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              Voir tous les guides <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Section Ressources Populaires (Si pas de filtre) */}
      {!selectedCategory && (
        <section className="bg-white py-20 border-y border-slate-200 mb-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
                  Ressources essentielles pour débuter
                </h2>
                <p className="text-slate-600 text-lg">
                  Vous débutez dans l'univers du casino ? Voici nos guides fondamentaux pour jouer de manière responsable et intelligente.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Comprendre le Wager</h3>
                <p className="text-slate-600 mb-6">
                  Apprenez à décrypter les conditions de mise des bonus pour ne plus jamais avoir de mauvaises surprises lors de vos retraits.
                </p>
                <Link href="/guides/comprendre-le-wager" className="flex items-center gap-2 text-blue-600 font-bold">
                  Lire le guide <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Gestion de Bankroll</h3>
                <p className="text-slate-600 mb-6">
                  La règle d'or des joueurs pros : comment gérer votre budget pour jouer plus longtemps et limiter les risques.
                </p>
                <Link href="/guides/gestion-bankroll" className="flex items-center gap-2 text-emerald-600 font-bold">
                  Lire le guide <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="container mx-auto px-4 pb-24">
        <Newsletter />
      </section>
    </main>
  )
}