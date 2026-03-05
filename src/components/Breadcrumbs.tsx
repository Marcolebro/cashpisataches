import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://cashpisataches.com"
      },
      ...(items || []).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://cashpisataches.com${item.href}` : undefined
      }))
    ]
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex py-4 overflow-x-auto no-scrollbar", className)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center space-x-2 text-sm font-medium text-slate-500 whitespace-nowrap">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center hover:text-blue-600 transition-colors duration-200"
            title="Retour à l'accueil"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Accueil</span>
          </Link>
        </li>

        {(items || []).map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-slate-400 shrink-0" />
              {isLast || !item.href ? (
                <span 
                  className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-md" 
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};