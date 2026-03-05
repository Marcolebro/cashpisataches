"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Casinos", href: "/casinos", description: "Comparatif complet" },
  { name: "Bonus", href: "/bonus", description: "Offres exclusives" },
  { name: "Guides", href: "/guides", description: "Conseils & Actus" },
]

const legalLinks = [
  { name: "Mentions Légales", href: "/mentions-legales" },
  { name: "Confidentialité", href: "/politique-de-confidentialite" },
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/95 backdrop-blur-md py-3 border-slate-200 shadow-sm" 
          : "bg-white py-5 border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Cash<span className="text-blue-600">Pisataches</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-blue-600",
                    pathname === item.href ? "text-blue-600" : "text-slate-600"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="h-6 w-px bg-slate-200" />
            
            <Link
              href="/bonus"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Meilleurs Bonus
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu principal"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 flex-grow">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl transition-colors",
                  pathname === item.href 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.description}</div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
            
            <Link
              href="/bonus"
              className="flex items-center justify-center w-full py-4 mt-4 font-bold text-white bg-blue-600 rounded-xl shadow-md"
            >
              Profiter des Offres
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="grid grid-cols-1 gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-slate-400 leading-tight">
              Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le 09 74 75 13 13.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}