import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, AlertTriangle, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { SCHOOL } from '@/lib/nav';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={clsx('font-display text-sm font-semibold uppercase tracking-[0.18em] text-wine dark:text-sun', className)}>{children}</p>
  );
}

export function Section({ eyebrow, title, action, children, className, id }: {
  eyebrow?: string; title?: string; action?: ReactNode; children: ReactNode; className?: string; id?: string;
}) {
  return (
    <section id={id} className={clsx('py-12 sm:py-16', className)}>
      <div className="container-x">
        {(title || eyebrow) && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              {eyebrow && <Eyebrow className="mb-1">{eyebrow}</Eyebrow>}
              {title && <h2 className="font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{title}</h2>}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function ArrowLink({ to, href, children, className }: { to?: string; href?: string; children: ReactNode; className?: string }) {
  const cls = clsx('group inline-flex items-center gap-1 font-semibold text-brand hover:underline underline-offset-4', className);
  if (href) return (
    <a href={href} target="_blank" rel="noopener" className={cls}>{children}<ExternalLink className="h-4 w-4" aria-hidden /></a>
  );
  return (
    <Link to={to ?? '/'} className={cls}>{children}<ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden /></Link>
  );
}

export function PageHeader({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
        <div className="absolute -right-24 -top-24 h-72 w-72 rotate-12 bg-sun/20" style={{ clipPath: 'polygon(20% 0,100% 10%,80% 100%,0 80%)' }} />
        <div className="absolute -bottom-20 right-1/3 h-64 w-64 -rotate-6 bg-wine/40" style={{ clipPath: 'polygon(0 20%,100% 0,90% 100%,10% 90%)' }} />
      </div>
      <div className="container-x relative py-12 sm:py-16">
        {eyebrow && <Eyebrow className="mb-2 !text-sun">{eyebrow}</Eyebrow>}
        <h1 className="font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-navy-100">{lead}</p>}
        {children}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Brotkrumen" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link to="/" className="hover:text-ink">Start</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
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
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition',
        active ? 'border-navy bg-navy text-white dark:border-brand dark:bg-brand dark:text-navy-950'
               : 'border-line bg-card text-muted hover:border-brand hover:text-brand',
      )}
    >
      {children}
    </Link>
  );
}

export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="skeleton aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-5 w-4/5" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 8 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4" style={{ width: `${70 + ((i * 37) % 30)}%` }} />
      ))}
    </div>
  );
}

export function ErrorBox({ error, fallbackHref }: { error?: Error; fallbackHref?: string }) {
  return (
    <div role="alert" className="flex flex-col gap-3 rounded-2xl border border-wine/30 bg-wine-100/60 p-5 text-sm dark:bg-wine/10 sm:flex-row sm:items-center">
      <AlertTriangle className="h-6 w-6 shrink-0 text-wine" aria-hidden />
      <div className="grow">
        <p className="font-semibold">Die Inhalte konnten gerade nicht geladen werden.</p>
        <p className="text-muted">{error?.message ?? 'Unbekannter Fehler'} – bitte später noch einmal versuchen.</p>
      </div>
      <a href={fallbackHref ?? SCHOOL.oldSite} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-brand">
        Zur bisherigen Website <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}

export function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const btn = 'inline-flex items-center gap-1 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40';
  return (
    <nav aria-label="Seiten" className="mt-10 flex items-center justify-between gap-4">
      <button type="button" className={btn} disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft className="h-4 w-4" aria-hidden /> Neuer
      </button>
      <span className="text-sm text-muted">Seite {page} von {totalPages}</span>
      <button type="button" className={btn} disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Älter <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </nav>
  );
}
