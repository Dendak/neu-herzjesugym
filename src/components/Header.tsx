import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ExternalLink, Menu, Phone, Mail, Search, X } from 'lucide-react';
import clsx from 'clsx';
import { NAV, SCHOOL, type NavItem } from '@/lib/nav';

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Zur Startseite">
      <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" aria-hidden>
        <rect width="64" height="64" rx="14" fill="#16345a" />
        <path d="M32 50 C20 41 12 34 12 25 a10 10 0 0 1 20 -3 a10 10 0 0 1 20 3 c0 9 -8 16 -20 25z" fill="#a3234b" />
        <path d="M32 18v20M24 26h16" stroke="#f2cf3f" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={clsx('block font-display text-2xl font-semibold uppercase tracking-tight', light ? 'text-white' : 'text-navy dark:text-white')}>Privatgymnasium</span>
        <span className={clsx('mt-0.5 block text-[11px] font-medium uppercase tracking-[0.16em]', light ? 'text-navy-100' : 'text-muted')}>der Herz-Jesu-Missionare · Salzburg</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<number>(0);

  useEffect(() => { setOpen(false); setDd(null); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setDd(null); setOpen(false); } };
    const onDown = (e: PointerEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setDd(null); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, []);

  const enter = (i: number) => { window.clearTimeout(timer.current); setDd(i); };
  const leave = () => { timer.current = window.setTimeout(() => setDd(null), 140); };

  return (
    <header className="sticky top-0 z-50">
      {/* Kontaktleiste */}
      <div className={clsx('hidden bg-navy-950 text-[13px] text-navy-100 transition-all lg:block', scrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-12')}>
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            <span>{SCHOOL.street}, {SCHOOL.city}</span>
            <a href={SCHOOL.phoneHref} className="inline-flex items-center gap-1.5 hover:text-white"><Phone className="h-3.5 w-3.5" aria-hidden />{SCHOOL.phone}</a>
            <a href={`mailto:${SCHOOL.mail}`} className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="h-3.5 w-3.5" aria-hidden />{SCHOOL.mail}</a>
          </div>
          <div className="flex items-center gap-5">
            <a href={SCHOOL.webuntis} target="_blank" rel="noopener" className="hover:text-white">WebUntis</a>
            <a href={SCHOOL.internat} target="_blank" rel="noopener" className="hover:text-white">Internat</a>
            <a href={SCHOOL.elternverein} target="_blank" rel="noopener" className="hover:text-white">Elternverein</a>
            <a href={SCHOOL.schulshop} target="_blank" rel="noopener" className="hover:text-white">Schulshop</a>
          </div>
        </div>
      </div>

      {/* Hauptleiste */}
      <div className={clsx('border-b border-line bg-card/85 backdrop-blur-md transition-shadow', scrolled && 'shadow-soft')}>
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <nav ref={navRef} aria-label="Hauptnavigation" className="hidden items-center gap-0.5 whitespace-nowrap xl:flex">
            {NAV.map((item, i) => item.children ? (
              <div key={item.label} className="relative" onMouseEnter={() => enter(i)} onMouseLeave={leave}>
                <button
                  type="button"
                  aria-expanded={dd === i}
                  onClick={() => setDd(dd === i ? null : i)}
                  className={clsx('inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium transition hover:bg-line/60', dd === i && 'bg-line/60')}
                >
                  {item.label}
                  <ChevronDown className={clsx('h-4 w-4 transition', dd === i && 'rotate-180')} aria-hidden />
                </button>
                <div className={clsx('absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 pt-2 transition', dd === i ? 'visible opacity-100' : 'invisible -translate-y-1 opacity-0')}>
                  <ul className="overflow-hidden rounded-2xl border border-line bg-card p-2 shadow-lift">
                    {item.children.map((c) => <li key={c.label}><NavEntry item={c} className="block rounded-lg px-3 py-2 text-[15px] hover:bg-line/60 hover:text-brand" /></li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <NavEntry key={item.label} item={item} className="rounded-lg px-3 py-2 text-[15px] font-medium transition hover:bg-line/60" activeClassName="text-brand" />
            ))}
            <Link to="/suche" aria-label="Suche" className="ml-1 rounded-lg p-2 transition hover:bg-line/60"><Search className="h-5 w-5" aria-hidden /></Link>
          </nav>
          <button type="button" onClick={() => setOpen(true)} className="rounded-lg p-2 xl:hidden" aria-label="Menü öffnen" aria-expanded={open}>
            <Menu className="h-7 w-7" aria-hidden />
          </button>
        </div>
      </div>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}

function NavEntry({ item, className, activeClassName }: { item: NavItem; className?: string; activeClassName?: string }) {
  if (item.href) return (
    <a href={item.href} target="_blank" rel="noopener" className={clsx(className, 'inline-flex items-center gap-1.5')}>
      {item.label}<ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
    </a>
  );
  return (
    <NavLink to={item.to ?? '/'} className={({ isActive }) => clsx(className, isActive && activeClassName)}>{item.label}</NavLink>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-navy-950 text-white xl:hidden" role="dialog" aria-modal="true" aria-label="Menü">
      <div className="flex h-[72px] items-center justify-between px-4 sm:px-6">
        <Logo light />
        <button type="button" onClick={onClose} className="rounded-lg p-2" aria-label="Menü schließen"><X className="h-7 w-7" aria-hidden /></button>
      </div>
      <div className="grow overflow-y-auto px-4 pb-10 sm:px-6">
        <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) navigate(`/suche?q=${encodeURIComponent(q.trim())}`); }} className="relative mb-4">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Suchen …" className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-white placeholder:text-navy-200 focus:border-sun" />
          <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-200" aria-hidden />
        </form>
        <ul className="divide-y divide-white/10">
          {NAV.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button type="button" onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)} aria-expanded={openGroup === item.label}
                    className="flex w-full items-center justify-between py-3.5 font-display text-2xl font-semibold uppercase tracking-tight">
                    {item.label}
                    <ChevronDown className={clsx('h-6 w-6 transition', openGroup === item.label && 'rotate-180')} aria-hidden />
                  </button>
                  <ul className={clsx('grid gap-1 pb-3 pl-1', openGroup === item.label ? 'block' : 'hidden')}>
                    {item.children.map((c) => (
                      <li key={c.label}>
                        {c.href
                          ? <a href={c.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 py-2 text-navy-100">{c.label}<ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden /></a>
                          : <Link to={c.to ?? '/'} className="block py-2 text-navy-100">{c.label}</Link>}
                      </li>
                    ))}
                  </ul>
                </>
              ) : item.href ? (
                <a href={item.href} target="_blank" rel="noopener" className="flex items-center gap-2 py-3.5 font-display text-2xl font-semibold uppercase tracking-tight">{item.label}<ExternalLink className="h-4 w-4 opacity-60" aria-hidden /></a>
              ) : (
                <Link to={item.to ?? '/'} className="block py-3.5 font-display text-2xl font-semibold uppercase tracking-tight">{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-2 text-sm text-navy-100">
          <p>{SCHOOL.street}, {SCHOOL.city}</p>
          <a href={SCHOOL.phoneHref} className="block">{SCHOOL.phone}</a>
          <a href={`mailto:${SCHOOL.mail}`} className="block">{SCHOOL.mail}</a>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href={SCHOOL.webuntis} target="_blank" rel="noopener" className="text-sun">WebUntis</a>
            <a href={SCHOOL.elternverein} target="_blank" rel="noopener" className="text-sun">Elternverein</a>
            <a href={SCHOOL.schulshop} target="_blank" rel="noopener" className="text-sun">Schulshop</a>
          </div>
        </div>
      </div>
    </div>
  );
}
