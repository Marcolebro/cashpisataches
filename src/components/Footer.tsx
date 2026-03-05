import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ShieldAlert, ChevronRight, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Section Marque */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 font-heading">
              <span className="text-blue-500">Cash</span>Pisataches
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              CashPisataches est le guide ultime pour les passionnés de casino en ligne. Nous comparons les meilleures plateformes comme Stake pour vous garantir sécurité, bonus exclusifs et une expérience de jeu optimale.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-500 hover:border-blue-500/50 transition-all group" aria-label="Facebook">
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-500 hover:border-blue-500/50 transition-all group" aria-label="Twitter">
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-500 hover:border-blue-500/50 transition-all group" aria-label="Instagram">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-500 hover:border-blue-500/50 transition-all group" aria-label="YouTube">
                <Youtube size={18} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs font-heading">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/casinos" className="text-sm hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Comparatif Casinos
                </Link>
              </li>
              <li>
                <Link href="/bonus" className="text-sm hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Meilleurs Bonus
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Guides & Actualités
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations Légales */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs font-heading">Légal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/mentions-legales" className="text-sm hover:text-blue-500 transition-colors">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="text-sm hover:text-blue-500 transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-blue-500 transition-colors flex items-center gap-2">
                  <Mail size={14} />
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Jeu Responsable */}
          <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-500 mb-4">
              <ShieldAlert size={20} />
              <span className="font-bold text-sm uppercase font-heading">Jeu Responsable</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Jouer comporte des risques : endettement, dépendance, isolement. Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
            </p>
            <div className="flex items-center gap-3">
               <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-slate-700 text-[11px] font-black text-slate-400 bg-slate-950">18+</span>
               <div className="text-[10px] text-slate-500 uppercase font-bold leading-tight">
                  Interdit aux<br />mineurs
               </div>
            </div>
          </div>
        </div>

        {/* Pied de page final */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-slate-500 tracking-wide uppercase">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>© {currentYear} CashPisataches. Tous droits réservés.</p>
            <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full"></div>
            <p className="italic normal-case">Affilié indépendant — Jouez de manière responsable</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-400">SSL SECURED</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-400">RNG CERTIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};