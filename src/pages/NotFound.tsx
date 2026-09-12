import { Link } from 'react-router-dom';
import { useTitle } from '@/lib/hooks';
import { SCHOOL } from '@/lib/nav';

export default function NotFound() {
  useTitle('Seite nicht gefunden');
  return (
    <div className="container-x py-24 text-center">
      <p className="font-display text-8xl font-semibold text-navy-200 dark:text-navy-800">404</p>
      <h1 className="mt-2 font-display text-4xl font-semibold uppercase tracking-tight">Seite nicht gefunden</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">Diese Seite gibt es hier (noch) nicht. Vielleicht hilft die Suche weiter – oder die bisherige Website.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-700">Zur Startseite</Link>
        <Link to="/suche" className="rounded-full border border-line px-6 py-3 font-semibold hover:border-brand hover:text-brand">Suche</Link>
        <a href={SCHOOL.oldSite} target="_blank" rel="noopener" className="rounded-full px-6 py-3 font-semibold text-brand">Bisherige Website</a>
      </div>
    </div>
  );
}
