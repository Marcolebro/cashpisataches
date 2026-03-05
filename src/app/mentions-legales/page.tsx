import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mentions Légales | CashPisataches",
  description: "Consultez les mentions légales du site CashPisataches. Informations sur l'éditeur, l'hébergement et les conditions d'utilisation de notre comparateur de casinos.",
};

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

const LegalSection = ({ title, children }: LegalSectionProps) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">{title}</h2>
    <div className="text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

export default function MentionsLegalesPage() {
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Mentions Légales", href: "/mentions-legales" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        <header className="mt-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-4">
            Mentions Légales
          </h1>
          <p className="text-lg text-slate-600">
            Dernière mise à jour : 24 mai 2024
          </p>
        </header>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
          <LegalSection title="1. Présentation du site">
            <p>
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site <strong>CashPisataches</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
            </p>
            <p>
              <strong>Propriétaire & Éditeur :</strong> CashPisataches Media Group<br />
              <strong>Responsable publication :</strong> Le Responsable de la Rédaction – contact@cashpisataches.com<br />
              <strong>Webmaster :</strong> Équipe Technique CashPisataches
            </p>
          </LegalSection>

          <LegalSection title="2. Hébergement">
            <p>
              Le site est hébergé par la société <strong>Vercel Inc.</strong>, dont le siège social est situé au 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis.
            </p>
          </LegalSection>

          <LegalSection title="3. Propriété intellectuelle">
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'éditeur.
            </p>
          </LegalSection>

          <LegalSection title="4. Services fournis & Affiliation">
            <p>
              CashPisataches est un site de comparaison et d'information sur les plateformes de jeux d'argent en ligne (casinos, paris sportifs). Le site a pour but de fournir des informations précises et mises à jour sur les offres promotionnelles.
            </p>
            <p>
              <strong>Note sur l'affiliation :</strong> CashPisataches participe à des programmes d'affiliation. Lorsque vous cliquez sur un lien vers un partenaire (via le bouton "Voir l'offre" ou des liens de redirection /go/), nous pouvons percevoir une commission. Cela n'impacte en rien le coût pour l'utilisateur et nous permet de maintenir le site gratuit.
            </p>
          </LegalSection>

          <LegalSection title="5. Limitation de responsabilité">
            <p>
              Les informations indiquées sur le site sont données à titre indicatif. L'éditeur ne saurait être tenu responsable des erreurs, d'une absence de disponibilité des informations ou de la présence de virus sur son site.
            </p>
            <p>
              L'utilisateur est seul responsable de l'utilisation des informations fournies. Les jeux d'argent en ligne comportent des risques. CashPisataches ne peut être tenu responsable des pertes financières subies par un utilisateur sur un site tiers recommandé.
            </p>
          </LegalSection>

          <LegalSection title="6. Jeu Responsable">
            <p className="font-bold text-red-600">
              ATTENTION : Les jeux d'argent et de hasard sont interdits aux mineurs (moins de 18 ans).
            </p>
            <p>
              Le jeu doit rester un plaisir. Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé) ou rendez-vous sur le site <a href="https://www.joueurs-info-service.fr" className="text-blue-600 hover:underline" rel="nofollow">joueurs-info-service.fr</a>.
            </p>
          </LegalSection>

          <LegalSection title="7. Contact">
            <p>
              Pour toute question concernant ces mentions légales ou pour toute demande d'information, vous pouvez nous contacter par email à l'adresse suivante : <strong>contact@cashpisataches.com</strong>.
            </p>
          </LegalSection>
        </div>
      </div>
    </main>
  );
}