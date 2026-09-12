import { Link } from 'react-router-dom';
import { CalendarDays, GraduationCap, Clock, FileDown, Sun, UserRoundCheck, ExternalLink, ArrowRight, Users, Building2, BookOpenText, HeartHandshake } from 'lucide-react';
import { fetchCategories, fetchPagesByParent, fetchPosts, decodeHtml } from '@/lib/wp';
import { useAsync, useTitle } from '@/lib/hooks';
import { FACHBEREICHE_PARENT_ID, QUICK_LINKS, SCHOOL } from '@/lib/nav';
import PostCard from '@/components/PostCard';
import { ArrowLink, ErrorBox, Eyebrow, Section, SkeletonCard } from '@/components/ui';

const HERO = import.meta.env.BASE_URL + 'hero-luftbild.jpg';
const ICONS = [CalendarDays, Clock, UserRoundCheck, GraduationCap, Sun, FileDown];

export default function Home() {
  useTitle();
  const news = useAsync(() => Promise.all([fetchPosts({ perPage: 7 }), fetchCategories()]), []);
  const subjects = useAsync(() => fetchPagesByParent(FACHBEREICHE_PARENT_ID), []);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-coal-950 text-white">
        <img src={HERO} alt="Luftaufnahme des Schulgebäudes in Salzburg-Liefering" className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_60%]" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-coal-950 via-coal-950/75 to-coal-950/30" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-coal-950/90 via-coal-950/40 to-transparent" aria-hidden />
        <div className="container-x flex min-h-[62vh] flex-col justify-end pb-14 pt-24 sm:min-h-[68vh] lg:pb-20">
          <Eyebrow className="mb-3 !text-msc-300 animate-fade-up">Gymnasium · Tagesheim · Internat</Eyebrow>
          <h1 className="max-w-4xl font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight animate-fade-up sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
            Privatgymnasium der <span className="text-msc-400">Herz-Jesu-</span>Missionare
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-coal-200 animate-fade-up sm:text-xl" style={{ animationDelay: '160ms' }}>
            Wir bemühen uns, den jungen Menschen auf der Basis des christlichen Glaubens ein entsprechendes Menschen-, Welt- und Gottesbild bewusst zu machen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Link to="/seite/anmeldung" className="inline-flex items-center gap-2 rounded-full bg-msc px-6 py-3 font-semibold text-white shadow-lift transition hover:bg-msc-600">
              Anmeldung <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/termine" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20">
              <CalendarDays className="h-4 w-4" aria-hidden /> Termine
            </Link>
            <a href={SCHOOL.webuntis} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-coal-200 transition hover:text-white">
              WebUntis <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* Schnellzugriff */}
      <div className="container-x relative z-10 -mt-8">
        <ul className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-card p-3 shadow-card sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_LINKS.map((q, i) => {
            const Icon = ICONS[i] ?? CalendarDays;
            const inner = (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-msc-50 text-msc transition group-hover:bg-msc group-hover:text-white dark:bg-msc/20 dark:text-msc-300"><Icon className="h-5 w-5" aria-hidden /></span>
                <span className="block">
                  <span className="block font-semibold leading-tight">{q.label}</span>
                  <span className="block text-xs text-muted">{q.note}</span>
                </span>
              </>
            );
            const cls = 'group flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-line/50';
            return (
              <li key={q.label}>
                {q.href ? <a href={q.href} target="_blank" rel="noopener" className={cls}>{inner}</a> : <Link to={q.to ?? '/'} className={cls}>{inner}</Link>}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Aktuelles */}
      <Section eyebrow="Aus dem Schulleben" title="Aktuelles" action={<ArrowLink to="/aktuelles">Alle Beiträge</ArrowLink>}>
        {news.error && <ErrorBox error={news.error} />}
        {news.loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><div className="md:col-span-2 lg:col-span-3"><SkeletonCard /></div>{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</div>
        )}
        {news.data && (() => {
          const [posts, cats] = news.data;
          const [first, ...rest] = posts.items;
          return (
            <div className="space-y-6">
              {first && <PostCard post={first} cats={cats} variant="featured" />}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => <PostCard key={p.id} post={p} cats={cats} />)}
              </div>
            </div>
          );
        })()}
      </Section>

      {/* Fachbereiche */}
      <Section eyebrow="Unterricht" title="Fachbereiche" className="bg-coal-50/60 dark:bg-coal-950/40" action={<ArrowLink to="/fachbereiche">Alle Fachbereiche</ArrowLink>}>
        {subjects.error && <ErrorBox error={subjects.error} />}
        <ul className="flex flex-wrap gap-2.5">
          {subjects.loading && Array.from({ length: 18 }).map((_, i) => <li key={i} className="skeleton h-10 w-32 rounded-full" />)}
          {subjects.data?.map((p) => (
            <li key={p.id}>
              <Link to={`/seite/${p.slug}`} className="inline-flex items-center rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-soft">
                {decodeHtml(p.title.rendered)}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Schulgemeinschaft */}
      <Section eyebrow="Miteinander" title="Schulgemeinschaft">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Building2, title: 'Schulleitung & Sekretariat', text: 'Direktion, Administration, Sekretariat und Buchhaltung – Ihre Ansprechpersonen im Haus.', to: '/seite/schulleitung' },
            { icon: Users, title: 'Lehrerinnen & Lehrer', text: 'Das Kollegium mit Kontaktadressen; Sprechstunden über WebUntis.', to: '/seite/lehrer-2' },
            { icon: Sun, title: 'Tagesheim', text: 'Betreuung, Lernzeit, Mittagessen und Freizeit am Nachmittag.', to: '/seite/tagesheim' },
            { icon: HeartHandshake, title: 'Gebetsinitiative', text: 'Spirituelles Angebot der Schulgemeinschaft im Geist der Herz-Jesu-Missionare.', to: '/seite/gebetsinitiative' },
          ].map((c) => (
            <Link key={c.title} to={c.to} className="group rounded-2xl border border-line bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
              <c.icon className="h-8 w-8 text-msc dark:text-msc-300" aria-hidden />
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight group-hover:text-brand">{c.title}</h3>
              <p className="mt-2 text-sm text-muted">{c.text}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <ArrowLink href={SCHOOL.internat}>Internat</ArrowLink>
          <ArrowLink href={SCHOOL.elternverein}>Elternverein</ArrowLink>
          <ArrowLink to="/seite/schulerseite">Schülerinnen & Schüler</ArrowLink>
          <ArrowLink to="/seite/leitbild-schulprofil"><BookOpenText className="mr-1 h-4 w-4" aria-hidden />Leitbild & Schulprofil</ArrowLink>
        </div>
      </Section>
    </>
  );
}
