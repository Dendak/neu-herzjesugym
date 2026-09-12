import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, ChevronRight } from 'lucide-react';
import { decodeHtml, fetchCategories, searchAll } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import PostCard from '@/components/PostCard';
import { ErrorBox, PageHeader, SkeletonCard } from '@/components/ui';

export default function Search() {
  const [sp, setSp] = useSearchParams();
  const q = (sp.get('q') ?? '').trim();
  const [value, setValue] = useState(q);
  useTitle(q ? `Suche: ${q}` : 'Suche');
  const cats = useAsync(fetchCategories, []);
  const res = useAsync(async () => (q.length >= 2 ? searchAll(q) : null), [q]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = value.trim();
    setSp(v ? { q: v } : {});
  }

  return (
    <>
      <PageHeader title="Suche.">
        <form onSubmit={submit} className="mt-8 flex max-w-2xl items-center gap-3 border-b-2 border-ink pb-3">
          <SearchIcon className="h-6 w-6 shrink-0 text-muted" aria-hidden />
          <label className="grow">
            <span className="sr-only">Suchbegriff</span>
            <input value={value} onChange={(e) => setValue(e.target.value)} autoFocus placeholder="Beiträge und Seiten durchsuchen"
              className="w-full bg-transparent font-display text-[26px] font-medium tracking-tight2 outline-none placeholder:text-muted/60 sm:text-[32px]" />
          </label>
          <button type="submit" className="btn-primary">Suchen</button>
        </form>
      </PageHeader>
      <div className="wrap pb-16">
        {!q && <p className="text-muted">Geben Sie einen Suchbegriff ein. Durchsucht werden Beiträge und Seiten.</p>}
        {res.error && <ErrorBox error={res.error} />}
        {q && res.loading && <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</div>}
        {res.data && (
          <div className="space-y-16">
            {res.data.pages.length > 0 && (
              <section>
                <h2 className="t-h3 mb-5">Seiten</h2>
                <ul className="divide-y divide-line border-y border-line">
                  {res.data.pages.map((p) => (
                    <li key={p.id}>
                      <Link to={`/seite/${p.slug}`} className="group flex items-center justify-between py-3.5 text-[17px] font-medium">
                        {decodeHtml(p.title.rendered)}<ChevronRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h2 className="t-h3 mb-6">Beiträge <span className="text-muted">({res.data.posts.length})</span></h2>
              {res.data.posts.length === 0 && res.data.pages.length === 0 && <p className="text-muted">Nichts gefunden zu „{q}“.</p>}
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{res.data.posts.map((p) => <PostCard key={p.id} post={p} cats={cats.data} />)}</div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
