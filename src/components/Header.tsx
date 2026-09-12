import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Search, X, Menu, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import { NAV, type NavItem } from '@/lib/nav';

const LOGO = import.meta.env.BASE_URL + 'logo-msc.png';

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={clsx('flex items-center gap-2.5', className)} aria-label="Zur Startseite">
      <img src={LOGO} alt="" width="28" height="28" className="h-7 w-7 rounded-[6px]" />
      <span className="whitespace-nowrap font-display text-[15px] font-semibold tracking-tight2">Herz-Jesu-Gymnasium</span>
    </Link>
  );
}

/** Globale Navigation: schmale, dunkle, halbtransparente Leiste; Untermenüs als breites Panel. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<number | null>(null);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const timer = useRef<number>(0);

  useEffect(() => { setOpen(false); setPanel(null); }, [location.pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPanel(null); setOpen(false); } };
    const onDown = (e: PointerEvent) => { if (headerRef.current && !headerRef.current.contains(e.target as Node)) setPanel(null); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, []);

  const enter = (i: number) => { window.clearTimeout(timer.current); setPanel(i); };
  const leave = () => { timer.current = window.setTimeout(() => setPanel(null), 160); };
  const current = panel !== null && panel >= 0 ? NAV[panel] : null;

  return (
    <header ref={headerRef} className="sticky top-0 z-50 text-white">
      <div className="bg-[#1d1d1f]/85 backdrop-blur-xl backdrop-saturate-[180%] supports-[backdrop-filter]:bg-[#1d1d1f]/72">
        <div className="wrap flex h-12 items-center justify-between">
          <Wordmark />
          <nav aria-label="Hauptnavigation" className="hidden items-center whitespace-nowrap xl:flex" onMouseLeave={leave}>
            {NAV.map((item, i) => item.children ? (
              <button
                key={item.label}
                type="button"
                aria-expanded={panel === i}
                onMouseEnter={() => enter(i)}
                onClick={() => setPanel(panel === i ? null : i)}
                className={clsx('flex h-12 items-center gap-1 px-3.5 text-[13px] text-white/85 transition hover:text-white', panel === i && 'text-white')}
              >
                {item.label}<ChevronDown className={clsx('h-3 w-3 opacity-60 transition', panel === i && 'rotate-180')} aria-hidden />
              </button>
            ) : (
              <NavEntry key={item.label} item={item} onMouseEnter={() => enter(-1)} className="flex h-12 items-center gap-1 px-3.5 text-[13px] text-white/85 transition hover:text-white" activeClassName="!text-white" />
            ))}
            <Link to="/suche" aria-label="Suche" onMouseEnter={() => enter(-1)} className="ml-1 flex h-12 items-center px-2 text-white/85 hover:text-white"><Search className="h-4 w-4" aria-hidden /></Link>
          </nav>
          <button type="button" onClick={() => setOpen(true)} className="-mr-2 p-2 xl:hidden" aria-label="Menü öffnen" aria-expanded={open}>
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
        {/* Panel */}
        <div
          onMouseEnter={() => panel !== null && enter(panel)}
          onMouseLeave={leave}
          className={clsx('hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-apple xl:block', current?.children ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0')}
        >
          {current?.children && (
            <div className="wrap grid grid-cols-[220px_1fr] gap-12 py-10">
              <div>
                <p className="text-[12px] text-white/50">{current.label}</p>
                <p className="mt-1 font-display text-[24px] font-semibold tracking-tight2">{panelBlurb[current.label] ?? ''}</p>
              </div>
              <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5 self-start lg:grid-cols-3">
                {current.children.map((c) => (
                  <li key={c.label}><NavEntry item={c} className="inline-flex items-center gap-1 text-[15px] text-white/80 transition hover:text-white" /></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}

const panelBlurb: Record<string, string> = {
  'Unsere Schule': 'Wer wir sind und wie wir lernen.',
  'Schulgemeinschaft': 'Menschen und Ansprechpartner.',
  'Anmeldung': 'Der Weg an unsere Schule.',
};

function NavEntry({ item, className, activeClassName, onMouseEnter }: { item: NavItem; className?: string; activeClassName?: string; onMouseEnter?: () => void }) {
  if (item.href) return (
    <a href={item.href} target="_blank" rel="noopener" className={className} onMouseEnter={onMouseEnter}>
      {item.label}<ArrowUpRight className="h-3 w-3 opacity-50" aria-hidden />
    </a>
  );
  return <NavLink to={item.to ?? '/'} onMouseEnter={onMouseEnter} className={({ isActive }) => clsx(className, isActive && activeClassName)}>{item.label}</NavLink>;
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1d1d1f] text-white xl:hidden animate-fade" role="dialog" aria-modal="true" aria-label="Menü">
      <div className="wrap flex h-12 items-center justify-between">
        <Wordmark />
        <button type="button" onClick={onClose} className="-mr-2 p-2" aria-label="Menü schließen"><X className="h-5 w-5" aria-hidden /></button>
      </div>
      <div className="grow overflow-y-auto">
        <div className="wrap pb-16 pt-4">
          <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) navigate(`/suche?q=${encodeURIComponent(q.trim())}`); }} className="relative mb-6">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Suchen" className="w-full rounded-xl bg-white/10 py-3 pl-10 pr-4 text-[17px] text-white placeholder:text-white/40 focus:bg-white/15" />
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" aria-hidden />
          </form>
          <ul className="divide-y divide-white/10">
            {NAV.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button type="button" onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)} aria-expanded={openGroup === item.label}
                      className="flex w-full items-center justify-between py-4 font-display text-[28px] font-semibold tracking-tight2">
                      {item.label}<ChevronDown className={clsx('h-5 w-5 opacity-50 transition', openGroup === item.label && 'rotate-180')} aria-hidden />
                    </button>
                    <ul className={clsx('grid gap-3 pb-5', openGroup === item.label ? 'block' : 'hidden')}>
                      {item.children.map((c) => (
                        <li key={c.label}>
                          {c.href
                            ? <a href={c.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-[17px] text-white/75">{c.label}<ArrowUpRight className="h-3.5 w-3.5 opacity-50" aria-hidden /></a>
                            : <Link to={c.to ?? '/'} className="block text-[17px] text-white/75">{c.label}</Link>}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : item.href ? (
                  <a href={item.href} target="_blank" rel="noopener" className="flex items-center gap-2 py-4 font-display text-[28px] font-semibold tracking-tight2">{item.label}<ArrowUpRight className="h-5 w-5 opacity-50" aria-hidden /></a>
                ) : (
                  <Link to={item.to ?? '/'} className="block py-4 font-display text-[28px] font-semibold tracking-tight2">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
