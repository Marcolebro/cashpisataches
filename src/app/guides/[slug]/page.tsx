import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { 
  Calendar, 
  User, 
  Tag, 
  ChevronRight, 
  Share2, 
  Clock, 
  ArrowLeft,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { getProduct } from "@/lib/products";
import { formatDate, cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { AffiliateButton } from "@/components/AffiliateButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article non trouvé | CashPisataches",
    };
  }

  return {
    title: `${article.meta.title} | CashPisataches`,
    description: article.meta.meta_description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.meta_description,
      type: "article",
      publishedTime: article.meta.date,
      authors: [article.meta.author],
      images: article.meta.image ? [{ url: article.meta.image }] : [],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return (articles || []).map((article) => ({
    slug: article.slug,
  }));
}

export function ArticleHeader({ meta }: { meta: any }) {
  return (
    <header className="relative w-full mb-10 overflow-hidden rounded-3xl bg-slate-900 pt-16 pb-12 px-6 md:px-12">
      <div className="absolute inset-0 z-0 opacity-20">
        {meta.image ? (
          <Image
            src={meta.image}
            alt={meta.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-emerald-500" />
        )}
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
          <span className="px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-blue-600 rounded-full">
            {meta.category}
          </span>
          <div className="flex items-center text-slate-300 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>8 min de lecture</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-heading">
          {meta.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-300">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-medium text-white">{meta.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-emerald-400" />
            <span>Mis à jour le {formatDate(meta.date)}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function TableOfContents() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
        <Tag className="w-5 h-5 mr-2 text-blue-600" />
        Sommaire
      </h3>
      <nav className="space-y-3">
        <a href="#introduction" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Introduction</a>
        <a href="#strategies" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Stratégies gagnantes</a>
        <a href="#casinos-recommandes" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Les meilleurs casinos</a>
        <a href="#erreurs-eviter" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Erreurs à éviter</a>
        <a href="#faq" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Questions fréquentes</a>
      </nav>
      
      <div className="mt-8 pt-8 border-t border-slate-100">
        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-4">Partager l'article</p>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function RelatedArticles({ currentSlug, category }: { currentSlug: string, category: string }) {
  const allArticles = getAllArticles();
  const related = (allArticles || [])
    .filter(a => a.slug !== currentSlug && a.meta.category === category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900 font-heading">Articles similaires</h2>
        <a href="/guides" className="text-blue-600 font-semibold flex items-center hover:underline">
          Tout voir <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

export function SidebarCTA() {
  const topProduct = getProduct("stake");
  
  if (!topProduct) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white mt-8 shadow-xl border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-white px-2 py-0.5 rounded">
          Recommandé
        </span>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
        </div>
      </div>
      <h4 className="text-xl font-bold mb-2">{topProduct.name}</h4>
      <p className="text-slate-300 text-sm mb-4 line-clamp-2">{topProduct.description}</p>
      <div className="bg-white/10 rounded-lg p-3 mb-6 border border-white/10">
        <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Bonus Exclusif</p>
        <p className="text-emerald-400 font-bold text-sm">{topProduct.bonus}</p>
      </div>
      <AffiliateButton 
        slug={topProduct.affiliate_slug} 
        variant="primary" 
        className="w-full justify-center py-3"
      >
        Profiter du bonus
      </AffiliateButton>
    </div>
  );
}

export async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.title,
    "image": article.meta.image,
    "datePublished": article.meta.date,
    "dateModified": article.meta.date,
    "author": {
      "@type": "Person",
      "name": article.meta.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "CashPisataches",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cashpisataches.com/logo.png"
      }
    },
    "description": article.meta.meta_description
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Guides & Actualités", href: "/guides" },
              { label: article.meta.title, href: `/guides/${slug}` }
            ]} 
          />
        </div>

        <ArticleHeader meta={article.meta} />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 max-w-4xl">
            <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-slate-200">
              <div className="prose prose-slate prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-2xl prose-strong:text-slate-900">
                <MDXRemote source={article.content} />
              </div>

              {/* Tags */}
              {article.meta.tags && (
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
                  {article.meta.tags.map((tag: string) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium"
                    >
                      <Tag className="w-3 h-3 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio Simple */}
              <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <User size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Rédigé par {article.meta.author}</h4>
                  <p className="text-slate-600 text-sm">Expert en casino en ligne et stratégies de jeu depuis plus de 10 ans. Passionné par l'analyse des bonus et la sécurité des plateformes.</p>
                </div>
              </div>
            </div>

            <RelatedArticles currentSlug={slug} category={article.meta.category} />
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0 space-y-8">
            <TableOfContents />
            <SidebarCTA />
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4">Restez informé !</h4>
                <p className="text-blue-100 text-sm mb-6">Recevez nos derniers guides et bonus exclusifs directement dans votre boîte mail.</p>
                <Newsletter />
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <Share2 size={120} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}