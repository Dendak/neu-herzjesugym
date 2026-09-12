import { useState } from 'react';
import { CalendarDays, ExternalLink, ShieldCheck } from 'lucide-react';
import { useTitle } from '@/lib/hooks';
import { SCHOOL } from '@/lib/nav';
import { ArrowLink, PageHeader } from '@/components/ui';

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
      <PageHeader eyebrow="Schuljahr" title="Termine" lead="Schulkalender mit Veranstaltungen, Schularbeiten- und Ferienterminen. Stundenpläne und Supplierungen finden Sie in WebUntis." />
      <div className="container-x py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            {ok ? (
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                <iframe title="Schulkalender" src={CAL_SRC} className="h-[70vh] min-h-[560px] w-full" loading="lazy" />
              </div>
            ) : (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-card p-8 shadow-soft">
                <CalendarDays className="h-10 w-10 text-coal-900 dark:text-coal-200" aria-hidden />
                <h2 className="font-display text-3xl font-semibold">Schulkalender anzeigen</h2>
                <p className="max-w-xl text-muted">
                  Der Kalender wird von Google Kalender bereitgestellt. Beim Laden werden Daten (z. B. Ihre IP-Adresse) an Google übertragen.
                  Mit einem Klick stimmen Sie dem zu; die Entscheidung wird in Ihrem Browser gespeichert.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={accept} className="inline-flex items-center gap-2 rounded-full bg-msc px-6 py-3 font-semibold text-white transition hover:bg-msc-600">
                    <ShieldCheck className="h-4 w-4" aria-hidden /> Kalender laden
                  </button>
                  <a href={CAL_OPEN} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold transition hover:border-brand hover:text-brand">
                    In neuem Tab öffnen <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            )}
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-semibold uppercase tracking-wide">Stundenplan</h2>
              <p className="mt-2 text-sm text-muted">Stundenpläne, Supplierungen und Sprechstunden.</p>
              <div className="mt-4 flex flex-col gap-2">
                <ArrowLink href={SCHOOL.webuntis}>WebUntis</ArrowLink>
                <ArrowLink href={SCHOOL.sprechstunden}>Sprechstunden</ArrowLink>
                <ArrowLink to="/seite/stunden-zeitraster">Stunden- & Zeitraster</ArrowLink>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-semibold uppercase tracking-wide">Anmeldung</h2>
              <p className="mt-2 text-sm text-muted">Termine und Unterlagen für den Schuleintritt.</p>
              <div className="mt-4 flex flex-col gap-2">
                <ArrowLink to="/seite/anmeldung">Anmeldung 1. Klasse</ArrowLink>
                <ArrowLink to="/seite/anmeldung-oberstufe">Anmeldung Oberstufe</ArrowLink>
                <ArrowLink to="/seite/tag-der-offenen-tuer">Tag der offenen Tür</ArrowLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
