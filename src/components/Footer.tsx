import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { SCHOOL, WP_LOGOS } from '@/lib/partners';
import { Logo } from './Header';

const COLS: { title: string; links: { label: string; to?: string; href?: string }[] }[] = [
  {
    title: 'Schnellzugriff',
    links: [
      { label: 'Aktuelles', to: '/aktuelles' },
      { label: 'Termine', to: '/termine' },
      { label: 'WebUntis', href: SCHOOL.webuntis },
      { label: 'Anmeldung', to: '/seite/anmeldung' },
      { label: 'Downloads', to: '/seite/downloads' },
      { label: 'Fachbereiche', to: '/fachbereiche' },
      { label: 'Nützliche Links & Intern', to: '/links' },
    ],
  },
  {
    title: 'Schulgemeinschaft',
    links: [
      { label: 'Schulleitung', to: '/seite/schulleitung' },
      { label: 'Sekretariat', to: '/seite/sekretariat' },
      { label: 'Lehrerinnen & Lehrer', to: '/seite/lehrer-2' },
      { label: 'Tagesheim', to: '/seite/tagesheim' },
      { label: 'Internat', href: SCHOOL.internat },
      { label: 'Elternverein', href: SCHOOL.elternverein },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-coal-950 text-coal-200">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo light />
          <address className="mt-5 space-y-2 not-italic text-sm">
            <a href={SCHOOL.maps} target="_blank" rel="noopener" className="flex items-start gap-2 hover:text-white"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><span>{SCHOOL.street}<br />{SCHOOL.city}</span></a>
            <a href={SCHOOL.phoneHref} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" aria-hidden />{SCHOOL.phone}</a>
            <a href={`mailto:${SCHOOL.mail}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" aria-hidden />{SCHOOL.mail}</a>
          </address>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-white">{col.title}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.href
                    ? <a href={l.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-white">{l.label}<ExternalLink className="h-3 w-3 opacity-60" aria-hidden /></a>
                    : <Link to={l.to ?? '/'} className="hover:text-white">{l.label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-white">Träger & Partner</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {WP_LOGOS.map((l) => (
              <a key={l.alt} href={l.href} target="_blank" rel="noopener" title={l.alt} className="flex aspect-square items-center justify-center rounded-xl bg-white p-2">
                <img src={l.src} alt={l.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-coal-300">Von der Europäischen Union finanziert. Die geäußerten Ansichten geben ausschließlich die der Autorinnen und Autoren wieder.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-xs text-coal-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SCHOOL.name}, Salzburg</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/seite/impressum-offenlegung" className="hover:text-white">Impressum & Offenlegung</Link>
            <Link to="/seite/impressum" className="hover:text-white">Kontakt</Link>
            <a href={SCHOOL.oldSite} target="_blank" rel="noopener" className="hover:text-white">Bisherige Website</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
