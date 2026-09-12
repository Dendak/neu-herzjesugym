import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';
import { SCHOOL } from '@/lib/nav';

/** Textlink mit Pfeil – intern oder extern. */
export function Arrow({ to, href, children, className }: { to?: string; href?: string; children: ReactNode; className?: string }) {
  const cls = clsx('link', className);
  if (href) return <a href={href} target="_blank" rel="noopener" className={cls}>{children}<ChevronRight className="chev" aria-hidden /></a>;
  return <Link to={to ?? '/'} className={cls}>{children}<ChevronRight className="chev" aria-hidden /></Link>;
}

export function Section({ eyebrow, title, lead, action, children, className, alt, id, narrow }: {
  eyebrow?: string; title?: string; lead?: string; action?: ReactNode; children: ReactNode; className?: string; alt?: boolean; id?: string; narrow?: boolean;
}) {
  return (
    <section id={id} className={clsx('py-20 sm:py-28', alt && 'bg-alt', className)}>
      <div className={narrow ? 'wrap-page' : 'wrap'}>
        {(title || eyebrow) && (
          <header className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 sm:mb-14">
            <div className="max-w-2xl">
              {eyebrow && <p className="t-eyebrow mb-2">{eyebrow}</p>}
              {title && <h2 className="t-h2">{title}</h2>}
              {lead && <p className="t-lead mt-3">{lead}</p>}
            </div>
            {action && <div className="text-[17px]">{action}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/** Kopf einer Unterseite: ruhig, ohne Dekoration. */
export function PageHeader({ eyebrow, title, lead, children, crumbs }: { eyebrow?: string; title: string; lead?: string; children?: ReactNode; crumbs?: { label: string; to?: string }[] }) {
  return (
    <div className="wrap-page pb-10 pt-12 sm:pb-14 sm:pt-20">
      {crumbs && <Breadcrumbs items={crumbs} className="mb-6" />}
      {eyebrow && <p className="t-eyebrow mb-3">{eyebrow}</p>}
      <h1 className="t-h1 max-w-4xl">{title}</h1>
      {lead && <p className="t-lead mt-5 max-w-2xl">{lead}</p>}
      {children}
    </div>
  );
}

export function Breadcrumbs({ items, className }: { items: { label: string; to?: string }[]; className?: string }) {
  return (
    <nav aria-label="Brotkrumen" className={clsx('t-small', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-ink">Start</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
            {it.to ? <Link to={it.to} className="hover:text-ink">{it.label}</Link> : <span className="text-ink">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Chip({ to, children, active }: { to: string; children: ReactNode; active?: boolean }) {
  return (
    <Link
      to={to}
      className={clsx('inline-flex items-center rounded-full px-3.5 py-1.5 text-[14px] font-medium transition duration-200',
        active ? 'bg-msc text-white' : 'bg-alt text-ink hover:bg-line/60')}
    >
      {children}
    </Link>
  );
}

export function SkeletonCard({ ratio = 'aspect-[4/3]' }: { ratio?: string }) {
  return (
    <div>
      <div className={clsx('skeleton rounded-[18px]', ratio)} />
      <div className="mt-4 space-y-2.5">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-5 w-4/5" />
        <div className="skeleton h-4 w-3/5" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 8 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => <div key={i} className="skeleton h-4" style={{ width: `${70 + ((i * 37) % 30)}%` }} />)}
    </div>
  );
}

export function ErrorBox({ error, fallbackHref }: { error?: Error; fallbackHref?: string }) {
  return (
    <div role="alert" className="rounded-[18px] bg-alt p-6 text-[15px]">
      <p className="font-semibold">Die Inhalte konnten gerade nicht geladen werden.</p>
      <p className="mt-1 text-muted">{error?.message ?? 'Unbekannter Fehler'}. Bitte später noch einmal versuchen.</p>
      <Arrow href={fallbackHref ?? SCHOOL.oldSite} className="mt-3">Zur bisherigen Website</Arrow>
    </div>
  );
}

export function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Seiten" className="mt-14 flex items-center justify-between gap-4 border-t border-line pt-6 text-[15px]">
      <button type="button" className="link disabled:cursor-not-allowed disabled:opacity-30 disabled:no-underline" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft className="chev" aria-hidden /> Neuere Beiträge
      </button>
      <span className="t-small">Seite {page} von {totalPages}</span>
      <button type="button" className="link disabled:cursor-not-allowed disabled:opacity-30 disabled:no-underline" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Ältere Beiträge <ChevronRight className="chev" aria-hidden />
      </button>
    </nav>
  );
}
