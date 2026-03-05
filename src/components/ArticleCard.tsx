import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  slug: string;
  date: string;
  category: string;
  image?: string;
  meta_description?: string;
  className?: string;
}

export function ArticleCard({
  title,
  slug,
  date,
  category,
  image,
  meta_description,
  className,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      <Link href={`/guides/${slug}`} className="relative aspect-video overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Tag className="w-12 h-12 text-slate-300 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-600 text-white rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </article>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <time dateTime={date}>{formatDate(date)}</time>
        </div>

        <Link href={`/guides/${slug}`} className="block mb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {meta_description && (
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
            {meta_description}
          </p>
        )}

        <Link
          href={`/guides/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 group/link"
        >
          Lire l'article
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}