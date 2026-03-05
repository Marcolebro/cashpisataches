import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newsletter } from "@/components/Newsletter";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | CashPisataches",
  description: "Découvrez comment CashPisataches protège vos données personnelles, gère les cookies et respecte votre vie privée dans le cadre de nos comparatifs de casinos.",
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">{title}</h2>
    <div className="text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header de la page */}
      <div className="bg-slate-50 border-b border-slate-200 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Politique de Confidentialité", href: "/politique-de-confidentialite" }
            ]} 
          />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-6 font-heading">
            Politique de Confidentialité
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl">
            Dernière mise à jour : 24 Mai 2024. Chez CashPisataches, nous accordons une importance capitale à la transparence et à la protection de vos données.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl">
          <Section title="1. Introduction">
            <p>
              Bienvenue sur CashPisataches. La présente Politique de Confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site de comparatif de casinos en ligne.
            </p>
            <p>
              En utilisant notre site, vous acceptez les pratiques décrites dans cette politique. Nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD).
            </p>
          </Section>

          <Section title="2. Collecte des données">
            <p>
              Nous pouvons collecter plusieurs types d'informations :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Données d'identification :</strong> Si vous vous inscrivez à notre newsletter, nous collectons votre adresse e-mail.</li>
              <li><strong>Données techniques :</strong> Adresse IP, type de navigateur, système d'exploitation, et pages consultées.</li>
              <li><strong>Données de navigation :</strong> Nous utilisons des outils d'analyse (comme Google Analytics) pour comprendre comment vous interagissez avec notre contenu.</li>
            </ul>
          </Section>

          <Section title="3. Utilisation des cookies">
            <p>
              Les cookies sont de petits fichiers texte déposés sur votre appareil. Ils nous permettent de :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mémoriser vos préférences de navigation.</li>
              <li>Analyser le trafic pour améliorer nos guides et comparatifs.</li>
              <li>Assurer le bon fonctionnement des liens d'affiliation.</li>
            </ul>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut limiter l'accès à certaines fonctionnalités de notre site.
            </p>
          </Section>

          <Section title="4. Liens d'affiliation et tiers">
            <p>
              CashPisataches contient des liens d'affiliation vers des casinos partenaires. Lorsque vous cliquez sur l'un de ces liens (via nos boutons "Voir l'offre" ou /go/[slug]), un cookie de suivi peut être déposé pour nous attribuer la recommandation.
            </p>
            <p>
              Notez que nous n'avons aucun contrôle sur les politiques de confidentialité des sites tiers. Nous vous encourageons à lire la politique de chaque casino sur lequel vous vous inscrivez.
            </p>
          </Section>

          <Section title="5. Conservation et Sécurité">
            <p>
              Nous conservons vos données uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées (par exemple, tant que vous restez inscrit à notre newsletter).
            </p>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou altération.
            </p>
          </Section>

          <Section title="6. Vos droits (RGPD)">
            <p>
              Conformément à la réglementation européenne, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données.</li>
              <li><strong>Droit de rectification :</strong> Corriger des informations inexactes.</li>
              <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données (droit à l'oubli).</li>
              <li><strong>Droit d'opposition :</strong> Vous désabonner de notre newsletter à tout moment via le lien de désinscription.</li>
            </ul>
          </Section>

          <Section title="7. Contact">
            <p>
              Pour toute question concernant cette politique ou pour exercer vos droits, vous pouvez nous contacter à l'adresse suivante : <strong>contact@cashpisataches.com</strong>.
            </p>
          </Section>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4 font-heading">
              Restez informé en toute sécurité
            </h2>
            <p className="text-slate-400 mb-8">
              Rejoignez plus de 5 000 joueurs et recevez nos alertes sur les nouveaux bonus sans dépôt et les casinos les plus fiables.
            </p>
            <Newsletter />
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </main>
  );
}