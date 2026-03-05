"use client"

import { useState, useMemo } from "react"
import { getAllProducts } from "@/lib/products"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { RankingTable } from "@/components/RankingTable"
import { ProductCard } from "@/components/ProductCard"
import { Newsletter } from "@/components/Newsletter"
import { Search, Filter, Trophy, ShieldCheck, Zap, Info, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Comparatif des Meilleurs Casinos en Ligne 2024 - CashPisataches",
  description: "Liste complète et détaillée des plateformes de jeux d'argent les plus fiables. Filtrez par bonus, catégories et trouvez le casino idéal pour vos sessions.",
}

interface FilterBarProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  categories: string[]
}

function FilterBar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery, categories }: FilterBarProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un casino (ex: Stake, Cresus...)"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory("Tous")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === "Tous"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            Tous
          </button>
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CasinosPage() {
  const products = getAllProducts() || []
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category)
    return Array.from(new Set(cats))
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "Tous" || p.category === activeCategory
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, activeCategory, searchQuery])

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Comparatif Casinos", href: "/casinos" }
            ]} 
          />
          <div className="mt-8 text-center md:text-left max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading leading-tight">
              Comparatif des Meilleurs <span className="text-blue-400">Casinos en Ligne</span> 2024
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Notre équipe d'experts a testé et analysé plus de 50 plateformes pour ne retenir que l'élite. 
              Sécurité, rapidité de retrait et générosité des bonus : découvrez notre classement complet.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 -mt-10">
        <FilterBar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
        />

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium">{filteredProducts.length} casinos trouvés</span>
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Vue Grille
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                viewMode === "table" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Vue Tableau
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts?.map((product) => (
                  <ProductCard key={product.slug} {...product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <RankingTable products={filteredProducts} />
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-slate-500">
              Essayez d'ajuster vos filtres ou votre recherche pour trouver ce que vous cherchez.
            </p>
            <button 
              onClick={() => { setActiveCategory("Tous"); setSearchQuery(""); }}
              className="mt-6 text-blue-600 font-medium hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* SEO Content Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold mb-3 font-heading">Sécurité Garantie</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tous les casinos listés sur CashPisataches possèdent une licence de jeu valide (Curacao, MGA) et utilisent un cryptage SSL de pointe.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold mb-3 font-heading">Retraits Rapides</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nous privilégions les plateformes qui traitent vos gains en moins de 24h, avec une mention spéciale pour les casinos crypto instantanés.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Info className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold mb-3 font-heading">Tests Impartiaux</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nos avis sont basés sur des tests réels : dépôt, jeu, contact support et retrait. Nous ne recommandons que ce que nous utilisons.
            </p>
          </div>
        </div>

        <article className="mt-20 prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-bold font-heading mb-6">Comment choisir le meilleur casino en ligne ?</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Le monde du gambling en ligne est vaste et parfois complexe. Pour faire le bon choix, plusieurs critères sont essentiels. Tout d'abord, la <strong>fiabilité</strong>. Un bon casino doit être transparent sur ses conditions de mise (wager) et ses limites de retrait.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Les Bonus de Bienvenue</h4>
              <p className="text-sm text-slate-600">
                Ne vous laissez pas séduire uniquement par le montant. Vérifiez le wager (nombre de fois qu'il faut miser le bonus) et la mise maximale autorisée par tour.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">La Ludothèque</h4>
              <p className="text-sm text-slate-600">
                Un excellent casino propose les meilleurs fournisseurs : Pragmatic Play, Evolution Gaming, Hacksaw ou encore Play'n GO.
              </p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Enfin, le <strong>service client</strong> est le reflet du sérieux d'une marque. Un chat en direct disponible 24/7 en français est un avantage considérable en cas de question sur vos transactions.
          </p>
        </article>
      </section>

      <section className="mt-20 px-4">
        <Newsletter />
      </section>
    </main>
  )
}