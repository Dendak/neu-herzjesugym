import { Link, Navigate, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { decodeHtml, fetchPageBySlug, fetchPages, fetchPostBySlug, formatDate, type WpPage } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import { FACHBEREICHE_PARENT_ID } from '@/lib/nav';
import WpContent from '@/components/WpContent';
import { Breadcrumbs, ErrorBox, PageHeader, SkeletonText } from '@/components/ui';
import NotFound from './NotFound';

const REDIRECTS: Record<string, string> = { calendar: '/termine', terminkalender: '/termine', fachbereiche: '/fachbereiche' };

export default function Page() {
  const { slug = '' } = useParams();
  const state = useAsync(async () => {
    const page = await fetchPageBySlug(slug);
    if (page) return { page, post: null, all: await fetchPages() };
    const post = await fetchPostBySlug(slug);
    return { page: null, post, all: [] as WpPage[] };
  }, [slug]);

  const page = state.data?.page;
  const title = page ? decodeHtml(page.title.rendered) : undefined;
  useTitle(title);

  if (REDIRECTS[slug]) return <Navigate to={REDIRECTS[slug]} replace />;
  if (state.error) return <div className="container-x py-16"><ErrorBox error={state.error} /></div>;
  if (state.data?.post) return <Navigate to={`/aktuelles/${slug}`} replace />;
  if (!state.loading && !page) return <NotFound />;

  const all = state.data?.all ?? [];
  const parent = page?.parent ? all.find((p) => p.id === page.parent) : undefined;
  const familyRoot = parent ? parent.id : page && all.some((p) => p.parent === page.id) ? page.id : null;
  const siblings = familyRoot ? all.filter((p) => p.parent === familyRoot).sort((a, b) => a.menu_order - b.menu_order || a.title.rendered.localeCompare(b.title.rendered, 'de')) : [];
  const isFach = familyRoot === FACHBEREICHE_PARENT_ID;
  const crumbs = [
    ...(parent ? [{ label: decodeHtml(parent.title.rendered), to: parent.id === FACHBEREICHE_PARENT_ID ? '/fachbereiche' : `/seite/${parent.slug}` }] : []),
    { label: title ?? '…' },
  ];

  return (
    <>
      <PageHeader eyebrow={parent ? decodeHtml(parent.title.rendered) : undefined} title={title ?? ' '} />
      <div className="container-x py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <div className={clsx('mt-8 grid gap-12', siblings.length > 0 && 'lg:grid-cols-[1fr_260px]')}>
          <div className="min-w-0 max-w-3xl">
            {state.loading && <SkeletonText lines={12} />}
            {page && <WpContent html={page.content.rendered} />}
            {page && (
              <p className="mt-10 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-4 text-xs text-muted">
                <span>Zuletzt aktualisiert am {formatDate(page.modified)}</span>
                <a href={page.link} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-ink">Seite auf der bisherigen Website <ExternalLink className="h-3 w-3" aria-hidden /></a>
              </p>
            )}
          </div>
          {siblings.length > 0 && (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-muted">{isFach ? 'Alle Fachbereiche' : parent ? decodeHtml(parent.title.rendered) : 'Unterseiten'}</h2>
              <ul className="mt-3 space-y-0.5 border-l border-line">
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link to={`/seite/${s.slug}`} className={clsx('-ml-px block border-l-2 py-1.5 pl-4 text-sm transition', s.id === page?.id ? 'border-wine font-semibold text-ink dark:border-sun' : 'border-transparent text-muted hover:border-line hover:text-ink')}>
                      {decodeHtml(s.title.rendered)}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
