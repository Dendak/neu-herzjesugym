import { Link, useParams } from 'react-router-dom';
import { categoryNames, decodeHtml, fetchCategories, fetchPostBySlug, fetchPosts, formatDate } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import WpContent from '@/components/WpContent';
import PostCard from '@/components/PostCard';
import { Arrow, Breadcrumbs, ErrorBox, Section, SkeletonText } from '@/components/ui';
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

  if (state.error) return <div className="wrap-text py-20"><ErrorBox error={state.error} /></div>;
  if (!state.loading && !post) return <NotFound />;

  return (
    <>
      <article className="wrap-text pb-16 pt-12 sm:pt-20">
        <Breadcrumbs items={[{ label: 'Aktuelles', to: '/aktuelles' }, ...(catList[0] ? [{ label: catList[0].name, to: `/kategorie/${catList[0].slug}` }] : [])]} />
        <header className="mt-8">
          {catList[0] && <Link to={`/kategorie/${catList[0].slug}`} className="t-eyebrow hover:underline">{catList[0].name}</Link>}
          {state.loading ? <div className="skeleton mt-3 h-12 w-3/4" /> : <h1 className="t-h1 mt-2">{title || 'Ohne Titel'}</h1>}
          {post && (
            <p className="t-small mt-5">
              <time dateTime={post.date}>{formatDate(post.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</time>
            </p>
          )}
        </header>
        <div className="mt-10">
          {state.loading && <SkeletonText lines={10} />}
          {post && <WpContent html={post.content.rendered} />}
        </div>
        {post && (
          <p className="t-small mt-14 border-t border-line pt-5">
            <a href={post.link} target="_blank" rel="noopener" className="hover:text-ink hover:underline">Diesen Beitrag auf der bisherigen Website öffnen</a>
          </p>
        )}
      </article>
      {related.data && related.data.items.length > 0 && (
        <Section alt eyebrow="Weiterlesen" title={catList[0] ? `Mehr aus ${catList[0].name}.` : 'Weitere Beiträge.'} action={catList[0] ? <Arrow to={`/kategorie/${catList[0].slug}`}>Alle Beiträge der Kategorie</Arrow> : undefined}>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">{related.data.items.map((p) => <PostCard key={p.id} post={p} cats={cats} />)}</div>
        </Section>
      )}
    </>
  );
}
