import { Link } from 'react-router-dom';
import { SCHOOL } from '@/lib/nav';
import { WP_LOGOS } from '@/lib/partners';

const COLS: { title: string; links: { label: string; to?: string; href?: string }[] }[] = [
  {
    title: 'Schule',
    links: [
      { label: 'Aktuelles', to: '/aktuelles' },
      { label: 'Leitbild & Schulprofil', to: '/seite/leitbild-schulprofil' },
      { label: 'Fachbereiche', to: '/fachbereiche' },
      { label: 'Stundentafeln', to: '/seite/stundentafeln' },
      { label: 'Downloads', to: '/seite/downloads' },
      { label: 'Termine', to: '/termine' },
    ],
  },
  {
    title: 'Schulgemeinschaft',
    links: [
      { label: 'Schulleitung', to: '/seite/schulleitung' },
      { label: 'Sekretariat', to: '/seite/sekretariat' },
      { label: 'Lehrerinnen & Lehrer', to: '/seite/lehrer-2' },
      { label: 'Schülerinnen & Schüler', to: '/seite/schulerseite' },
      { label: 'Elternverein', href: SCHOOL.elternverein },
      { label: 'Gebetsinitiative', to: '/seite/gebetsinitiative' },
    ],
  },
  {
    title: 'Angebote',
    links: [
      { label: 'Tagesheim', to: '/seite/tagesheim' },
      { label: 'Internat', href: SCHOOL.internat },
      { label: 'Anmeldung 1. Klasse', to: '/seite/anmeldung' },
      { label: 'Anmeldung Oberstufe', to: '/seite/anmeldung-oberstufe' },
      { label: 'Tag der offenen Tür', to: '/seite/tag-der-offenen-tuer' },
      { label: 'Schulshop', href: SCHOOL.schulshop },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'WebUntis', href: SCHOOL.webuntis },
      { label: 'Sprechstunden', href: SCHOOL.sprechstunden },
      { label: 'Nützliche Links & Intern', to: '/links' },
      { label: 'Suche', to: '/suche' },
      { label: 'Kontakt', to: '/seite/impressum' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-alt text-[12px] leading-[1.5] text-muted">
      <div className="wrap-page py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {COLS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-3 text-[12px] font-semibold text-ink">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href
                      ? <a href={l.href} target="_blank" rel="noopener" className="hover:text-ink hover:underline">{l.label}</a>
                      : <Link to={l.to ?? '/'} className="hover:text-ink hover:underline">{l.label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
          {WP_LOGOS.map((l) => (
            <a key={l.alt} href={l.href} target="_blank" rel="noopener" title={l.alt} className="opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
              <img src={l.src} alt={l.alt} loading="lazy" className="h-9 w-auto rounded-sm bg-white" />
            </a>
          ))}
          <p className="max-w-xl">Von der Europäischen Union finanziert. Die geäußerten Ansichten geben ausschließlich die der Autorinnen und Autoren wieder.</p>
        </div>

        <div className="mt-6 border-t border-line pt-5">
          <p className="text-ink">
            {SCHOOL.name} · {SCHOOL.street}, {SCHOOL.city} · <a href={SCHOOL.phoneHref} className="hover:underline">{SCHOOL.phone}</a> · <a href={`mailto:${SCHOOL.mail}`} className="hover:underline">{SCHOOL.mail}</a>
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright © {new Date().getFullYear()} {SCHOOL.name}. Alle Rechte vorbehalten.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Link to="/seite/impressum-offenlegung" className="hover:text-ink hover:underline">Impressum & Offenlegung</Link>
              <Link to="/seite/impressum" className="hover:text-ink hover:underline">Kontakt</Link>
              <a href={SCHOOL.oldSite} target="_blank" rel="noopener" className="hover:text-ink hover:underline">Bisherige Website</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
