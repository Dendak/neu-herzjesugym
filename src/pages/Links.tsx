import { ArrowUpRight } from 'lucide-react';
import { useTitle } from '@/lib/hooks';
import { INTERN, LINKS, SCHUELER_LINKS, type ExtLink } from '@/lib/links';
import { PageHeader } from '@/components/ui';

function LinkList({ links }: { links: ExtLink[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener" className="group flex items-center justify-between gap-4 py-3.5">
            <span className="min-w-0">
              <span className="block text-[17px] font-medium group-hover:underline">{l.label}</span>
              {l.note && <span className="t-small block">{l.note}</span>}
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:text-brand" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Links() {
  useTitle('Nützliche Links');
  const blocks = [
    { title: 'Intern', lead: 'Portale und Dienste für Lehrkräfte und Verwaltung. Anmeldung mit den Schulzugangsdaten.', links: INTERN },
    { title: 'Links', lead: 'Partner, Vereine und Einrichtungen rund um die Schule.', links: LINKS },
    { title: 'Aus dem Unterricht', lead: 'Projekte und Videos von Schülerinnen und Schülern.', links: SCHUELER_LINKS },
  ];
  return (
    <>
      <PageHeader eyebrow="Service" title="Nützliche Links." lead="Alle wichtigen externen Adressen an einem Ort: von WebUntis und Moodle bis zum Elternverein." />
      <div className="wrap-page space-y-20 pb-16">
        {blocks.map((b) => (
          <section key={b.title} id={b.title.toLowerCase()} className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <div>
              <h2 className="t-h3">{b.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.45] text-muted">{b.lead}</p>
            </div>
            <LinkList links={b.links} />
          </section>
        ))}
      </div>
    </>
  );
}
