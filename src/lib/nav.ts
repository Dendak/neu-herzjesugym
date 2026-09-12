export interface NavItem {
  label: string;
  to?: string;
  href?: string;
  children?: NavItem[];
  note?: string;
}

export const SCHOOL = {
  name: 'Privatgymnasium der Herz-Jesu-Missionare',
  short: 'Herz-Jesu-Gymnasium',
  street: 'Schönleitenstraße 1',
  city: '5020 Salzburg',
  phone: '+43 662 432901',
  phoneHref: 'tel:+43662432901',
  fax: '+43 662 432901 219',
  mail: 'info@herzjesugym.at',
  oldSite: 'https://www.herzjesugym.com',
  webuntis: 'https://erato.webuntis.com/WebUntis/?school=herzjesugym',
  sprechstunden: 'https://erato.webuntis.com/WebUntis/?school=herzjesugym#/basic/officehours',
  internat: 'https://internat.herzjesugym.com/',
  elternverein: 'http://eltern-am-herzjesugym.at/',
  schulshop: 'https://team.jako.com/de-de/team/herz_jesu_gymnasium/?item_source=27209',
  maps: 'https://www.google.com/maps/search/?api=1&query=Sch%C3%B6nleitenstra%C3%9Fe+1%2C+5020+Salzburg',
};

export const NAV: NavItem[] = [
  { label: 'Aktuelles', to: '/aktuelles' },
  {
    label: 'Unsere Schule',
    children: [
      { label: 'Leitbild & Schulprofil', to: '/seite/leitbild-schulprofil' },
      { label: 'Folder Schule', to: '/seite/folder-schule' },
      { label: 'Stundentafeln', to: '/seite/stundentafeln' },
      { label: 'Stunden- & Zeitraster', to: '/seite/stunden-zeitraster' },
      { label: 'Schul- & Hausordnung', to: '/seite/schul-und-hausordnung' },
      { label: 'Downloads', to: '/seite/downloads' },
      { label: 'Schulerhalter', to: '/seite/schulerhalter' },
      { label: 'Schulshop', href: SCHOOL.schulshop },
    ],
  },
  {
    label: 'Schulgemeinschaft',
    children: [
      { label: 'Schulleitung', to: '/seite/schulleitung' },
      { label: 'Sekretariat & Buchhaltung', to: '/seite/sekretariat' },
      { label: 'Lehrerinnen & Lehrer', to: '/seite/lehrer-2' },
      { label: 'Sprechstunden', href: SCHOOL.sprechstunden },
      { label: 'Schülerinnen & Schüler', to: '/seite/schulerseite' },
      { label: 'Elternverein', href: SCHOOL.elternverein },
      { label: 'Schularzt & Schulpsychologie', to: '/seite/schularzt-schulpsychologe' },
      { label: 'Hausverwaltung', to: '/seite/hausverwaltung' },
      { label: 'Gebetsinitiative', to: '/seite/gebetsinitiative' },
    ],
  },
  { label: 'Tagesheim', to: '/seite/tagesheim' },
  { label: 'Internat', href: SCHOOL.internat },
  { label: 'Fachbereiche', to: '/fachbereiche' },
  { label: 'Termine', to: '/termine' },
  {
    label: 'Anmeldung',
    children: [
      { label: 'Anmeldung 1. Klasse', to: '/seite/anmeldung' },
      { label: 'Anmeldung Oberstufe', to: '/seite/anmeldung-oberstufe' },
      { label: 'Tag der offenen Tür', to: '/seite/tag-der-offenen-tuer' },
    ],
  },
  { label: 'Kontakt', to: '/seite/impressum' },
];

export const QUICK_LINKS: NavItem[] = [
  { label: 'Termine', to: '/termine', note: 'Schulkalender' },
  { label: 'WebUntis', href: SCHOOL.webuntis, note: 'Stundenplan & Supplierungen' },
  { label: 'Sprechstunden', href: SCHOOL.sprechstunden, note: 'Lehrerinnen & Lehrer' },
  { label: 'Anmeldung', to: '/seite/anmeldung', note: '1. Klasse & Oberstufe' },
  { label: 'Tagesheim', to: '/seite/tagesheim', note: 'Nachmittagsbetreuung' },
  { label: 'Downloads', to: '/seite/downloads', note: 'Formulare & Infos' },
];

export const FACHBEREICHE_PARENT_ID = 53;
