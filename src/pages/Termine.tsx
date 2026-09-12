import { useState } from 'react';
import { useTitle } from '@/lib/hooks';
import { SCHOOL } from '@/lib/nav';
import { Arrow, PageHeader } from '@/components/ui';

// Derselbe Google-Kalender, der auf der bisherigen Website eingebunden ist.
const CAL_SRC = 'https://calendar.google.com/calendar/embed?height=650&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FVienna&src=aGVyemplc3VneW0ua2FsZW5kZXJAZ21haWwuY29t&src=ZGUuYXVzdHJpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%234285F4&color=%23F6BF26&showTitle=0&showPrint=0&showCalendars=0';
const CAL_OPEN = 'https://calendar.google.com/calendar/u/0/embed?src=aGVyemplc3VneW0ua2FsZW5kZXJAZ21haWwuY29t&ctz=Europe/Vienna';
const KEY = 'consent:google-calendar';

export default function Termine() {
  useTitle('Termine');
  const [ok, setOk] = useState(() => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } });
  const accept = () => { try { localStorage.setItem(KEY, '1'); } catch { /* egal */ } setOk(true); };

  return (
    <>
      <PageHeader eyebrow="Schuljahr" title="Termine." lead="Veranstaltungen, Schularbeiten und Ferien im Schulkalender. Stundenpläne und Supplierungen finden Sie in WebUntis." />
      <div className="wrap-page pb-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            {ok ? (
              <div className="overflow-hidden rounded-[18px] border border-line bg-white">
                <iframe title="Schulkalender" src={CAL_SRC} className="h-[72vh] min-h-[560px] w-full" loading="lazy" />
              </div>
            ) : (
              <div className="rounded-[18px] bg-alt p-8 sm:p-12">
                <h2 className="t-h3">Schulkalender anzeigen</h2>
                <p className="mt-3 max-w-xl text-[17px] leading-[1.45] text-muted">
                  Der Kalender wird von Google bereitgestellt. Beim Laden werden Daten wie Ihre IP‑Adresse an Google übertragen.
                  Ihre Entscheidung wird in diesem Browser gespeichert.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button type="button" onClick={accept} className="btn-primary">Kalender laden</button>
                  <Arrow href={CAL_OPEN}>In neuem Tab öffnen</Arrow>
                </div>
              </div>
            )}
          </div>
          <aside className="space-y-10 text-[15px]">
            <div>
              <h2 className="t-h4">Stundenplan</h2>
              <p className="mt-1.5 text-muted">Stundenpläne, Supplierungen und Sprechstunden.</p>
              <ul className="mt-3 space-y-1.5">
                <li><Arrow href={SCHOOL.webuntis}>WebUntis</Arrow></li>
                <li><Arrow href={SCHOOL.sprechstunden}>Sprechstunden</Arrow></li>
                <li><Arrow to="/seite/stunden-zeitraster">Stunden‑ & Zeitraster</Arrow></li>
              </ul>
            </div>
            <div>
              <h2 className="t-h4">Anmeldung</h2>
              <p className="mt-1.5 text-muted">Termine und Unterlagen für den Schuleintritt.</p>
              <ul className="mt-3 space-y-1.5">
                <li><Arrow to="/seite/anmeldung">Anmeldung 1. Klasse</Arrow></li>
                <li><Arrow to="/seite/anmeldung-oberstufe">Anmeldung Oberstufe</Arrow></li>
                <li><Arrow to="/seite/tag-der-offenen-tuer">Tag der offenen Tür</Arrow></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
