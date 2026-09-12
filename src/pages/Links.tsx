import { ExternalLink, Lock, Globe, GraduationCap } from 'lucide-react';
import { useTitle } from '@/lib/hooks';
import { INTERN, LINKS, SCHUELER_LINKS, type ExtLink } from '@/lib/links';
import { PageHeader } from '@/components/ui';

function LinkGrid({ links }: { links: ExtLink[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener" className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-soft">
            <span className="min-w-0">
              <span className="block truncate font-semibold group-hover:text-brand">{l.label}</span>
              {l.note && <span className="block truncate text-xs text-muted">{l.note}</span>}
            </span>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted group-hover:text-brand" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Links() {
  useTitle('Nützliche Links');
  const blocks = [
    { icon: Lock, title: 'Intern', lead: 'Portale und Dienste für Lehrkräfte und Verwaltung – Anmeldung mit den Schulzugangsdaten.', links: INTERN },
    { icon: Globe, title: 'Links', lead: 'Partner, Vereine und Einrichtungen rund um die Schule.', links: LINKS },
    { icon: GraduationCap, title: 'Aus dem Unterricht', lead: 'Projekte und Videos von Schülerinnen und Schülern.', links: SCHUELER_LINKS },
  ];
  return (
    <>
      <PageHeader eyebrow="Schnell gefunden" title="Nützliche Links" lead="Alle wichtigen externen Adressen an einem Ort – von WebUntis und Moodle bis zum Elternverein." />
      <div className="container-x space-y-14 py-10 sm:py-14">
        {blocks.map((b) => (
          <section key={b.title} id={b.title.toLowerCase()}>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-msc-50 text-msc dark:bg-msc/20 dark:text-msc-300"><b.icon className="h-5 w-5" aria-hidden /></span>
              <div>
                <h2 className="font-display text-3xl font-semibold uppercase tracking-tight">{b.title}</h2>
                <p className="text-sm text-muted">{b.lead}</p>
              </div>
            </div>
            <LinkGrid links={b.links} />
          </section>
        ))}
      </div>
    </>
  );
}
