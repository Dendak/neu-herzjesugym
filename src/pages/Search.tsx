import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, FileText } from 'lucide-react';
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
      <PageHeader eyebrow="Website durchsuchen" title="Suche">
        <form onSubmit={submit} className="mt-6 flex max-w-xl gap-2">
          <label className="relative grow">
            <span className="sr-only">Suchbegriff</span>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" aria-hidden />
            <input value={value} onChange={(e) => setValue(e.target.value)} autoFocus placeholder="z. B. Sportfest, Anmeldung, Chemie …"
              className="w-full rounded-full border border-white/20 bg-white py-3 pl-12 pr-4 text-navy-950 placeholder:text-navy-300 focus:border-sun" />
          </label>
          <button type="submit" className="rounded-full bg-wine px-6 py-3 font-semibold text-white transition hover:bg-wine-600">Suchen</button>
        </form>
      </PageHeader>
      <div className="container-x py-10">
        {!q && <p className="text-muted">Geben Sie einen Suchbegriff ein. Durchsucht werden Beiträge und Seiten.</p>}
        {res.error && <ErrorBox error={res.error} />}
        {q && res.loading && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</div>}
        {res.data && (
          <div className="space-y-12">
            {res.data.pages.length > 0 && (
              <section>
                <h2 className="mb-4 font-display text-2xl font-semibold uppercase tracking-wide">Seiten</h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {res.data.pages.map((p) => (
                    <li key={p.id}>
                      <Link to={`/seite/${p.slug}`} className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 font-semibold transition hover:border-brand hover:text-brand">
                        <FileText className="h-5 w-5 shrink-0 text-muted" aria-hidden />{decodeHtml(p.title.rendered)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold uppercase tracking-wide">Beiträge <span className="text-muted">({res.data.posts.length})</span></h2>
              {res.data.posts.length === 0 && res.data.pages.length === 0 && <p className="text-muted">Nichts gefunden zu „{q}“.</p>}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{res.data.posts.map((p) => <PostCard key={p.id} post={p} cats={cats.data} />)}</div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
