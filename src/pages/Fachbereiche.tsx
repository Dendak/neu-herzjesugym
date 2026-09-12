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
      <PageHeader eyebrow="Unterricht" title="Fachbereiche." lead="Die Fachgruppen stellen sich vor: Schwerpunkte, Projekte und Angebote von der Unterstufe bis zur Matura." />
      <div className="wrap pb-16">
        {state.error && <ErrorBox error={state.error} />}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {state.loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} ratio="aspect-[3/2]" />)}
          {state.data?.map((p) => {
            const img = firstImage(p.content.rendered, 700);
            const ex = textExcerpt(p.content.rendered, 110);
            return (
              <Link key={p.id} to={`/seite/${p.slug}`} className="group block">
                <div className="img-frame aspect-[3/2]">{img && <img src={img} alt="" loading="lazy" />}</div>
                <h2 className="t-h4 mt-4 group-hover:underline">{decodeHtml(p.title.rendered)}</h2>
                {ex && <p className="mt-1.5 line-clamp-2 text-[15px] leading-[1.45] text-muted">{ex}</p>}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
