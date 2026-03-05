"use client"

import { useState } from "react"
import { Mail, Send, CheckCircle2, Loader2, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus("success")
        setMessage("Félicitations ! Vous êtes inscrit aux offres exclusives.")
        setEmail("")
      } else {
        throw new Error("Une erreur est survenue.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Oups ! Impossible de s'abonner pour le moment.")
    }
  }

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 md:px-12 md:py-16 shadow-2xl border border-slate-800">
          {/* Background Decorative Elements */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Ne manquez plus aucun <span className="text-blue-500">Bonus Exclusif</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-8">
              Rejoignez plus de 5 000 joueurs et recevez chaque semaine les meilleurs codes promos, les nouveaux casinos fiables et nos guides stratégiques pour maximiser vos gains.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-lg mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                  {message}
                </div>
                <button 
                  onClick={() => setStatus("idle")}
                  className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
                >
                  S'inscrire avec un autre email
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none group"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      S'abonner
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-4 text-red-400 text-sm animate-in slide-in-from-top-2">
                {message}
              </p>
            )}

            <div className="mt-8 flex items-center justify-center gap-6 text-slate-500 text-xs">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Zéro Spam, désinscription en 1 clic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Données protégées (RGPD)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}