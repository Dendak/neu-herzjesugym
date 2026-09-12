import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { categoryNames, decodeHtml, firstImage, firstVideo, formatDate, textExcerpt, type WpCategory, type WpPost } from '@/lib/wp';

const LOGO = import.meta.env.BASE_URL + 'logo-msc.png';

/** Beitragskarte im Newsroom-Stil: Bild, Kategorie, Titel, Datum – ohne Rahmen. */
export default function PostCard({ post, cats, variant = 'default' }: { post: WpPost; cats?: WpCategory[]; variant?: 'default' | 'featured' | 'compact' }) {
  const featured = variant === 'featured';
  const img = firstImage(post.content.rendered, featured ? 1400 : 800);
  const vid = img ? null : firstVideo(post.content.rendered);
  const title = decodeHtml(post.title.rendered) || 'Ohne Titel';
  const excerpt = textExcerpt(post.content.rendered, featured ? 220 : 120);
  const cat = categoryNames(post, cats)[0];
  const to = `/aktuelles/${post.slug}`;

  const media = (
    <div className={clsx('img-frame', variant === 'compact' ? 'aspect-[4/3] w-28 shrink-0 rounded-xl' : featured ? 'aspect-[16/9] rounded-[22px] sm:aspect-[2/1]' : 'aspect-[4/3]')}>
      {img ? <img src={img} alt="" loading={featured ? 'eager' : 'lazy'} />
        : vid ? <video src={`${vid}#t=0.5`} muted playsInline preload="metadata" tabIndex={-1} aria-hidden className="pointer-events-none" />
        : <div className="flex h-full w-full items-center justify-center"><img src={LOGO} alt="" className="h-10 w-10 rounded-lg opacity-40 grayscale" /></div>}
    </div>
  );

  if (variant === 'compact') {
    return (
      <Link to={to} className="group flex gap-4">
        {media}
        <div className="min-w-0 py-0.5">
          <p className="t-small">{formatDate(post.date)}</p>
          <h3 className="mt-0.5 line-clamp-2 text-[15px] font-semibold leading-snug group-hover:underline">{title}</h3>
        </div>
      </Link>
    );
  }

  return (
    <article className={clsx('group', featured && 'grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end')}>
      <Link to={to} tabIndex={-1} aria-hidden className="block">{media}</Link>
      <div className={clsx(featured ? 'lg:pb-3' : 'mt-4')}>
        <p className="t-small flex items-center gap-2">
          {cat && <Link to={`/kategorie/${cat.slug}`} className="font-semibold text-brand hover:underline">{cat.name}</Link>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className={clsx('mt-1.5', featured ? 't-h2' : 't-h4')}>
          <Link to={to} className="decoration-1 underline-offset-4 group-hover:underline">{title}</Link>
        </h3>
        {excerpt && <p className={clsx('mt-2 text-muted', featured ? 'text-[17px] leading-[1.45]' : 'line-clamp-2 text-[15px] leading-[1.45]')}>{excerpt}</p>}
      </div>
    </article>
  );
}
