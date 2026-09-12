import { Link, useParams } from 'react-router-dom';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { categoryNames, decodeHtml, fetchCategories, fetchPostBySlug, fetchPosts, formatDate } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import WpContent from '@/components/WpContent';
import PostCard from '@/components/PostCard';
import { Breadcrumbs, ErrorBox, Section, SkeletonText } from '@/components/ui';
import NotFound from './NotFound';

export default function Post() {
  const { slug = '' } = useParams();
  const state = useAsync(() => Promise.all([fetchPostBySlug(slug), fetchCategories()]), [slug]);
  const post = state.data?.[0];
  const cats = state.data?.[1];
  const catList = post ? categoryNames(post, cats) : [];
  const related = useAsync(async () => {
    if (!post) return null;
    return fetchPosts({ categories: catList[0] ? [catList[0].id] : undefined, perPage: 3, exclude: [post.id] });
  }, [post?.id]);
  const title = post ? decodeHtml(post.title.rendered) : undefined;
  useTitle(title);

  if (state.error) return <div className="container-x py-16"><ErrorBox error={state.error} /></div>;
  if (!state.loading && !post) return <NotFound />;

  return (
    <>
      <article className="container-x max-w-4xl py-10 sm:py-14">
        <Breadcrumbs items={[{ label: 'Aktuelles', to: '/aktuelles' }, ...(catList[0] ? [{ label: catList[0].name, to: `/kategorie/${catList[0].slug}` }] : []), { label: title ?? '…' }]} />
        <header className="mt-6 border-b border-line pb-8">
          <div className="mb-3 flex flex-wrap gap-2">
            {catList.map((c) => (
              <Link key={c.id} to={`/kategorie/${c.slug}`} className="rounded-full bg-msc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-msc dark:bg-msc/20 dark:text-msc-300">{c.name}</Link>
            ))}
          </div>
          {state.loading ? <div className="skeleton h-12 w-3/4" /> : (
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">{title || 'Ohne Titel'}</h1>
          )}
          {post && (
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <CalendarDays className="h-4 w-4" aria-hidden />
              <time dateTime={post.date}>{formatDate(post.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</time>
            </p>
          )}
        </header>
        <div className="py-8">
          {state.loading && <SkeletonText lines={10} />}
          {post && <WpContent html={post.content.rendered} />}
        </div>
        {post && (
          <p className="text-xs text-muted">
            <a href={post.link} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-ink">Beitrag auf der bisherigen Website <ExternalLink className="h-3 w-3" aria-hidden /></a>
          </p>
        )}
      </article>
      {related.data && related.data.items.length > 0 && (
        <Section eyebrow="Weiterlesen" title={catList[0] ? `Mehr aus ${catList[0].name}` : 'Weitere Beiträge'} className="border-t border-line bg-coal-50/60 dark:bg-coal-950/40">
          <div className="grid gap-6 md:grid-cols-3">{related.data.items.map((p) => <PostCard key={p.id} post={p} cats={cats} />)}</div>
        </Section>
      )}
    </>
  );
}
