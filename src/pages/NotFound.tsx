import { Link } from 'react-router-dom';
import { useTitle } from '@/lib/hooks';
import { SCHOOL } from '@/lib/nav';
import { Arrow } from '@/components/ui';

export default function NotFound() {
  useTitle('Seite nicht gefunden');
  return (
    <div className="wrap-page py-28 text-center">
      <p className="t-eyebrow">404</p>
      <h1 className="t-h1 mt-2">Diese Seite gibt es nicht.</h1>
      <p className="t-lead mx-auto mt-4 max-w-md">Vielleicht hilft die Suche weiter, oder Sie schauen auf der bisherigen Website nach.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[17px]">
        <Link to="/" className="btn-primary">Zur Startseite</Link>
        <Arrow to="/suche">Suche</Arrow>
        <Arrow href={SCHOOL.oldSite}>Bisherige Website</Arrow>
      </div>
    </div>
  );
}
