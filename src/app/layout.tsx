import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import Link from "next/link";
import { Coins, Gift, BookOpen, Shield, Menu, ExternalLink, Info } from "lucide-react";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "CashPisataches - Meilleurs Casinos en Ligne & Bonus 2024",
    template: "%s | CashPisataches",
  },
  description: "Découvrez le classement des meilleurs casinos en ligne comme Stake, profitez de bonus exclusifs et suivez nos guides pour maximiser vos gains.",
  keywords: ["casino en ligne", "meilleur casino", "bonus casino", "stake", "jeux d'argent", "guide casino"],
  authors: [{ name: "CashPisataches" }],
  metadataBase: new URL("https://cashpisataches.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://cashpisataches.com",
    siteName: "CashPisataches",
    title: "CashPisataches - Meilleurs Casinos en Ligne & Bonus 2024",
    description: "Le guide ultime pour choisir votre casino en ligne et profiter des meilleurs bonus.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CashPisataches - Comparatif Casino",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-2xl font-bold text-transparent tracking-tight">
              CashPisataches
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/casinos" 
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Coins className="h-4 w-4" />
              Casinos
            </Link>
            <Link 
              href="/bonus" 
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Gift className="h-4 w-4" />
              Bonus
            </Link>
            <Link 
              href="/guides" 
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Guides
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/bonus"
            className="hidden sm:flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95"
          >
            Meilleurs Bonus
          </Link>
          <button className="p-2 text-slate-600 md:hidden" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-xl font-bold text-transparent">
              CashPisataches
            </span>
            <p className="text-sm leading-relaxed text-slate-500">
              Votre guide de confiance pour comparer les casinos en ligne. Nous analysons les plateformes, les bonus et les jeux pour vous offrir la meilleure expérience possible.
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-xs font-medium text-amber-800 border border-amber-100">
              <Shield className="h-4 w-4 shrink-0" />
              <span>Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13.</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Navigation</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/casinos" className="hover:text-blue-600 transition-colors">Comparatif Casinos</Link></li>
              <li><Link href="/bonus" className="hover:text-blue-600 transition-colors">Meilleurs Bonus</Link></li>
              <li><Link href="/guides" className="hover:text-blue-600 transition-colors">Guides & Astuces</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Légal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/mentions-legales" className="hover:text-blue-600 transition-colors">Mentions Légales</Link></li>
              <li><Link href="/politique-de-confidentialite" className="hover:text-blue-600 transition-colors">Confidentialité</Link></li>
              <li className="flex items-center gap-1.5">
                <span className="inline-block rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">18+</span>
                <span>Interdit aux mineurs</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Avertissement</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              CashPisataches est un site d'affiliation. Nous recevons parfois une commission lorsque vous cliquez sur nos liens. Cela n'affecte en rien l'objectivité de nos tests. Jouez de manière responsable.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © {currentYear} CashPisataches. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" className={cn(montserrat.variable, inter.variable, "scroll-smooth")}>
      <body className="min-h-screen bg-white font-body text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}