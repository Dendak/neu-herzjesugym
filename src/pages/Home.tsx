import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { fetchCategories, fetchPagesByParent, fetchPosts, decodeHtml } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import { FACHBEREICHE_PARENT_ID, QUICK_LINKS, SCHOOL } from '@/lib/nav';
import { HIGHLIGHTS } from '@/lib/links';
import PostCard from '@/components/PostCard';
import { Arrow, ErrorBox, Section, SkeletonCard } from '@/components/ui';
import { ChevronRight } from 'lucide-react';

const HERO = import.meta.env.BASE_URL + 'hero-luftbild.jpg';

export default function Home() {
  useTitle();
  const news = useAsync(() => Promise.all([fetchPosts({ perPage: 7 }), fetchCategories()]), []);
  const subjects = useAsync(() => fetchPagesByParent(FACHBEREICHE_PARENT_ID), []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-msc-700 via-msc-600 to-msc-700 text-white">
        <div className="wrap-page pb-10 pt-16 text-center sm:pb-14 sm:pt-24">
          <h1 className="t-hero mx-auto max-w-4xl text-balance animate-rise">Privatgymnasium der Herz-Jesu-Missionare.</h1>
          <p className="t-lead mx-auto mt-5 max-w-xl !text-white/85 animate-rise" style={{ animationDelay: '120ms' }}>
            Gymnasium, Tagesheim und Internat in Salzburg-Liefering.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[19px] animate-rise" style={{ animationDelay: '220ms' }}>
            <Arrow to="/seite/anmeldung" className="!text-white">Anmeldung</Arrow>
            <Arrow to="/termine" className="!text-white">Termine</Arrow>
          </div>
        </div>
        <div className="wrap pb-16 sm:pb-24 animate-rise" style={{ animationDelay: '320ms' }}>
          <div className="img-frame aspect-[16/9] rounded-[22px] bg-msc-700 shadow-panel sm:aspect-[3.2/1]">
            <img src={HERO} alt="Luftaufnahme des Schulgebäudes in Salzburg-Liefering" fetchPriority="high" className="object-[center_55%]" />
          </div>
        </div>
      </section>

      {/* Schnellzugriff */}
      <div className="border-b border-line">
        <ul className="wrap flex flex-wrap items-center justify-center gap-x-9 gap-y-2 py-4 text-[15px]">
          {QUICK_LINKS.map((q) => (
            <li key={q.label}>
              {q.href
                ? <a href={q.href} target="_blank" rel="noopener" className="link text-ink hover:text-brand">{q.label}<ChevronRight className="chev opacity-50" aria-hidden /></a>
                : <Link to={q.to ?? '/'} className="link text-ink hover:text-brand">{q.label}<ChevronRight className="chev opacity-50" aria-hidden /></Link>}
            </li>
          ))}
        </ul>
      </div>

      {/* Aktuelles */}
      <Section eyebrow="Aktuelles" title="Aus dem Schulleben." action={<Arrow to="/aktuelles">Alle Beiträge</Arrow>}>
        {news.error && <ErrorBox error={news.error} />}
        {news.loading && (
          <div className="space-y-14">
            <SkeletonCard ratio="aspect-[2/1]" />
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</div>
          </div>
        )}
        {news.data && (() => {
          const [posts, cats] = news.data;
          const [first, ...rest] = posts.items;
          return (
            <div className="space-y-16">
              {first && <PostCard post={first} cats={cats} variant="featured" />}
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => <PostCard key={p.id} post={p} cats={cats} />)}
              </div>
            </div>
          );
        })()}
      </Section>

      {/* Schwerpunkte */}
      <Section alt eyebrow="Schuljahr 2026/27" title="Was uns dieses Jahr bewegt.">
        <div className="space-y-6">
          {HIGHLIGHTS.slice(0, 2).map((h, i) => (
            <Tile key={h.title} href={h.href} to={h.to} className={clsx('grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-16', i % 2 === 1 && 'lg:[&>*:first-child]:order-2')}>
              <div>
                <p className="t-eyebrow mb-2">{i === 0 ? 'Jahresprogramm' : '5‑Jahresmotto bis 2029'}</p>
                <h3 className="t-h2">{h.title}</h3>
                <p className="t-lead mt-4">{h.text}</p>
                <span className="link mt-5 text-[17px]">{h.cta}<ChevronRight className="chev" aria-hidden /></span>
              </div>
              <div className={clsx('img-frame mx-auto w-full bg-white/60 dark:bg-black/30', h.portrait ? 'aspect-[3/4] max-w-[360px] rounded-[18px]' : 'aspect-[3/2]')}>
                <img src={h.img} alt="" loading="lazy" className={h.portrait ? 'object-top' : ''} />
              </div>
            </Tile>
          ))}
          <div className="grid gap-6 md:grid-cols-2">
            {HIGHLIGHTS.slice(2).map((h) => (
              <Tile key={h.title} href={h.href} to={h.to} className="p-7 sm:p-10">
                <div className="img-frame aspect-[16/9]"><img src={h.img} alt="" loading="lazy" /></div>
                <h3 className="t-h3 mt-6">{h.title}</h3>
                <p className="mt-2 text-[17px] leading-[1.45] text-muted">{h.text}</p>
                <span className="link mt-4 text-[17px]">{h.cta}<ChevronRight className="chev" aria-hidden /></span>
              </Tile>
            ))}
          </div>
        </div>
      </Section>

      {/* Leitbild */}
      <section className="py-24 sm:py-32">
        <div className="wrap-page text-center">
          <p className="t-eyebrow mb-4">Leitbild</p>
          <blockquote className="t-h2 mx-auto max-w-4xl !font-medium">
            „Wir bemühen uns, den jungen Menschen auf der Basis des christlichen Glaubens ein entsprechendes Menschen‑, Welt‑ und Gottesbild bewusst zu machen.“
          </blockquote>
          <div className="mt-8 text-[19px]"><Arrow to="/seite/leitbild-schulprofil">Leitbild & Schulprofil</Arrow></div>
        </div>
      </section>

      {/* Fachbereiche */}
      <Section alt eyebrow="Unterricht" title="Fachbereiche." action={<Arrow to="/fachbereiche">Alle Fachbereiche</Arrow>}>
        {subjects.error && <ErrorBox error={subjects.error} />}
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {subjects.loading && Array.from({ length: 12 }).map((_, i) => <li key={i} className="skeleton h-[72px] rounded-[18px] bg-card" />)}
          {subjects.data?.map((p) => (
            <li key={p.id}>
              <Link to={`/seite/${p.slug}`} className="group flex h-full items-center justify-between gap-3 rounded-[18px] bg-card px-5 py-5 transition duration-300 ease-apple hover:shadow-img">
                <span className="text-[17px] font-semibold leading-tight tracking-tight2">{decodeHtml(p.title.rendered)}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Schulgemeinschaft */}
      <Section eyebrow="Schulgemeinschaft" title="Menschen, die die Schule tragen.">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Schulleitung & Sekretariat', text: 'Direktion, Administration, Sekretariat und Buchhaltung: Ihre Ansprechpersonen im Haus.', to: '/seite/schulleitung', cta: 'Zur Schulleitung' },
            { title: 'Lehrerinnen & Lehrer', text: 'Das Kollegium mit Kontaktadressen. Sprechstunden finden Sie in WebUntis.', to: '/seite/lehrer-2', cta: 'Zum Kollegium' },
            { title: 'Tagesheim', text: 'Betreuung, Lernzeit, Mittagessen und Freizeit am Nachmittag.', to: '/seite/tagesheim', cta: 'Zum Tagesheim' },
            { title: 'Internat & Elternverein', text: 'Wohnen an der Schule und die Vertretung der Eltern.', href: SCHOOL.internat, cta: 'Zum Internat' },
          ].map((c) => (
            <div key={c.title} className="border-t border-line pt-5">
              <h3 className="t-h4">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.45] text-muted">{c.text}</p>
              <div className="mt-3 text-[15px]"><Arrow to={c.to} href={c.href}>{c.cta}</Arrow></div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Tile({ href, to, className, children }: { href?: string; to?: string; className?: string; children: React.ReactNode }) {
  const cls = clsx('group block rounded-[28px] bg-card transition duration-300 ease-apple hover:shadow-img', className);
  if (href) return <a href={href} target="_blank" rel="noopener" className={cls}>{children}</a>;
  return <Link to={to ?? '/'} className={cls}>{children}</Link>;
}
