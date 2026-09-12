import { Link } from 'react-router-dom';
import { decodeHtml, fetchPagesByParent, firstImage, textExcerpt } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import { FACHBEREICHE_PARENT_ID } from '@/lib/nav';
import { ErrorBox, PageHeader, SkeletonCard } from '@/components/ui';

export default function Fachbereiche() {
  useTitle('Fachbereiche');
  const state = useAsync(() => fetchPagesByParent(FACHBEREICHE_PARENT_ID), []);
  return (
    <>
      <PageHeader eyebrow="Unterricht" title="Fachbereiche" lead="Die Fachgruppen stellen sich vor – mit Schwerpunkten, Projekten und Angeboten von der Unterstufe bis zur Matura." />
      <div className="container-x py-10 sm:py-14">
        {state.error && <ErrorBox error={state.error} />}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {state.loading && Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          {state.data?.map((p) => {
            const img = firstImage(p.content.rendered, 600);
            const ex = textExcerpt(p.content.rendered, 110);
            return (
              <Link key={p.id} to={`/seite/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy to-navy-800">
                  {img && <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />}
                </div>
                <div className="p-5">
                  <h2 className="font-display text-2xl font-semibold leading-tight group-hover:text-brand">{decodeHtml(p.title.rendered)}</h2>
                  {ex && <p className="mt-2 line-clamp-3 text-sm text-muted">{ex}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
