import { Link } from 'react-router-dom';
import { PlayCircle, ImageOff } from 'lucide-react';
import clsx from 'clsx';
import { categoryNames, decodeHtml, firstImage, formatDate, hasVideo, textExcerpt, type WpCategory, type WpPost } from '@/lib/wp';

export default function PostCard({ post, cats, variant = 'default' }: { post: WpPost; cats?: WpCategory[]; variant?: 'default' | 'featured' | 'compact' }) {
  const img = firstImage(post.content.rendered, variant === 'featured' ? 1200 : 700);
  const title = decodeHtml(post.title.rendered) || 'Ohne Titel';
  const excerpt = textExcerpt(post.content.rendered, variant === 'featured' ? 260 : 140);
  const catList = categoryNames(post, cats);
  const video = hasVideo(post.content.rendered);
  const to = `/aktuelles/${post.slug}`;

  if (variant === 'compact') {
    return (
      <Link to={to} className="group flex gap-4 rounded-xl p-2 transition hover:bg-line/40">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-line">
          {img ? <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <Placeholder small />}
        </div>
        <div className="min-w-0">
          <time className="text-xs text-muted" dateTime={post.date}>{formatDate(post.date)}</time>
          <h3 className="line-clamp-2 font-semibold leading-snug group-hover:text-brand">{title}</h3>
        </div>
      </Link>
    );
  }

  const featured = variant === 'featured';
  return (
    <article className={clsx('group relative flex overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-card',
      featured ? 'flex-col lg:flex-row' : 'flex-col')}>
      <div className={clsx('relative shrink-0 overflow-hidden bg-line', featured ? 'aspect-[16/10] lg:aspect-auto lg:w-3/5' : 'aspect-[16/10]')}>
        {img ? (
          <img src={img} alt="" loading={featured ? 'eager' : 'lazy'} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
        ) : <Placeholder />}
        {video && <PlayCircle className="absolute bottom-3 right-3 h-8 w-8 text-white drop-shadow" aria-label="Mit Video" />}
      </div>
      <div className={clsx('flex flex-col p-5', featured && 'lg:justify-center lg:p-10')}>
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <time className="text-muted" dateTime={post.date}>{formatDate(post.date)}</time>
          {catList.slice(0, 2).map((c) => (
            <Link key={c.id} to={`/kategorie/${c.slug}`} className="relative z-10 font-semibold uppercase tracking-wide text-msc hover:underline dark:text-msc-300">{c.name}</Link>
          ))}
        </div>
        <h3 className={clsx('font-display font-semibold leading-tight tracking-tight group-hover:text-brand', featured ? 'text-3xl sm:text-4xl' : 'text-2xl')}>
          <Link to={to} className="after:absolute after:inset-0 after:content-['']">{title}</Link>
        </h3>
        {excerpt && <p className={clsx('mt-3 text-muted', featured ? 'line-clamp-4 text-base' : 'line-clamp-3 text-sm')}>{excerpt}</p>}
      </div>
    </article>
  );
}

function Placeholder({ small }: { small?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-coal-200 to-coal-300 text-coal-900/50 dark:from-coal-900 dark:to-coal-800 dark:text-coal-300/60">
      <ImageOff className={small ? 'h-5 w-5' : 'h-10 w-10'} aria-hidden />
    </div>
  );
}
