import { useParams, useSearchParams } from 'react-router-dom';
import { fetchCategories, fetchPosts } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import PostCard from '@/components/PostCard';
import { Chip, ErrorBox, PageHeader, Pagination, SkeletonCard } from '@/components/ui';

const PER_PAGE = 12;

export default function News() {
  const { category } = useParams();
  const [sp, setSp] = useSearchParams();
  const page = Math.max(1, parseInt(sp.get('seite') ?? '1', 10) || 1);

  const cats = useAsync(fetchCategories, []);
  const cat = cats.data?.find((c) => c.slug === category);
  const posts = useAsync(async () => {
    if (category && !cats.data) return null;
    if (category && !cat) return { items: [], total: 0, totalPages: 1 };
    return fetchPosts({ page, perPage: PER_PAGE, categories: cat ? [cat.id] : undefined });
  }, [page, category, cat?.id, cats.data]);

  const title = cat ? cat.name : 'Aktuelles';
  useTitle(title);

  return (
    <>
      <PageHeader eyebrow={cat ? 'Kategorie' : 'Aus dem Schulleben'} title={title}
        lead={cat ? `${cat.count} Beiträge aus dem Bereich ${cat.name}` : 'Berichte, Projekte, Veranstaltungen und Neuigkeiten aus dem Privatgymnasium der Herz-Jesu-Missionare.'} />
      <div className="container-x py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <Chip to="/aktuelles" active={!category}>Alle</Chip>
          {cats.data?.slice(0, 16).map((c) => <Chip key={c.id} to={`/kategorie/${c.slug}`} active={c.slug === category}>{c.name}</Chip>)}
        </div>
        {(posts.error || cats.error) && <ErrorBox error={posts.error ?? cats.error} />}
        {(posts.loading || !posts.data) && !posts.error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}</div>
        )}
        {posts.data && !posts.loading && (
          <>
            {posts.data.items.length === 0 && <p className="text-muted">Keine Beiträge gefunden.</p>}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.data.items.map((p) => <PostCard key={p.id} post={p} cats={cats.data} />)}
            </div>
            <Pagination page={page} totalPages={posts.data.totalPages} onChange={(p) => { setSp(p > 1 ? { seite: String(p) } : {}); window.scrollTo({ top: 0 }); }} />
          </>
        )}
      </div>
    </>
  );
}
