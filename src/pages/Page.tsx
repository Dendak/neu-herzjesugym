import { Link, Navigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { decodeHtml, fetchPageBySlug, fetchPages, fetchPostBySlug, formatDate, type WpPage } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import { FACHBEREICHE_PARENT_ID } from '@/lib/nav';
import WpContent from '@/components/WpContent';
import { ErrorBox, PageHeader, SkeletonText } from '@/components/ui';
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
  if (state.error) return <div className="wrap-text py-20"><ErrorBox error={state.error} /></div>;
  if (state.data?.post) return <Navigate to={`/aktuelles/${slug}`} replace />;
  if (!state.loading && !page) return <NotFound />;

  const all = state.data?.all ?? [];
  const parent = page?.parent ? all.find((p) => p.id === page.parent) : undefined;
  const familyRoot = parent ? parent.id : page && all.some((p) => p.parent === page.id) ? page.id : null;
  const siblings = familyRoot ? all.filter((p) => p.parent === familyRoot).sort((a, b) => a.menu_order - b.menu_order || a.title.rendered.localeCompare(b.title.rendered, 'de')) : [];
  const isFach = familyRoot === FACHBEREICHE_PARENT_ID;
  const crumbs = parent ? [{ label: decodeHtml(parent.title.rendered), to: parent.id === FACHBEREICHE_PARENT_ID ? '/fachbereiche' : `/seite/${parent.slug}` }] : [];

  return (
    <>
      <PageHeader crumbs={crumbs} eyebrow={parent ? decodeHtml(parent.title.rendered) : undefined} title={title ? `${title}.` : ' '} />
      <div className="wrap-page pb-16">
        <div className={clsx('grid gap-14', siblings.length > 0 && 'lg:grid-cols-[minmax(0,1fr)_240px]')}>
          <div className="min-w-0 max-w-text">
            {state.loading && <SkeletonText lines={12} />}
            {page && <WpContent html={page.content.rendered} />}
            {page && (
              <p className="t-small mt-14 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-5">
                <span>Zuletzt aktualisiert am {formatDate(page.modified)}</span>
                <a href={page.link} target="_blank" rel="noopener" className="hover:text-ink hover:underline">Auf der bisherigen Website öffnen</a>
              </p>
            )}
          </div>
          {siblings.length > 0 && (
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <h2 className="text-[12px] font-semibold uppercase tracking-wide text-muted">{isFach ? 'Fachbereiche' : parent ? decodeHtml(parent.title.rendered) : 'Unterseiten'}</h2>
              <ul className="mt-3 space-y-1">
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link to={`/seite/${s.slug}`} className={clsx('block rounded-lg px-3 py-1.5 text-[14px] transition', s.id === page?.id ? 'bg-alt font-semibold text-ink' : 'text-muted hover:bg-alt hover:text-ink')}>
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
