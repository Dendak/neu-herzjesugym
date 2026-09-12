// Linklisten und Schwerpunkt-Kacheln, übernommen aus der Seitenleiste der bisherigen Website.
// (Die WordPress-Widgets sind über die API nicht öffentlich lesbar, daher hier gepflegt.)
import { WP_ORIGIN } from './wp';

export interface ExtLink { label: string; href: string; note?: string }

export const INTERN: ExtLink[] = [
  { label: 'Elektronisches Klassenbuch', href: 'https://herzjesugym.webuntis.com/WebUntis/?school=herzjesugym#/basic/login', note: 'WebUntis' },
  { label: 'Dienst-E-Mail', href: 'https://www.outlook.com/bildung.gv.at', note: 'Outlook, bildung.gv.at' },
  { label: 'Webmail', href: 'https://login.microsoftonline.com/', note: 'Microsoft 365' },
  { label: 'Moodle', href: 'https://www4.lernplattform.schule.at/herzjesugym/login/index.php', note: 'Lernplattform' },
  { label: 'Eduvidual', href: 'https://www.eduvidual.at/local/eduvidual/pages/login.php' },
  { label: 'EduFlow', href: 'https://www.eduflow.at/EduFlow/' },
  { label: 'ABA-Portal', href: 'https://aba.bildung.gv.at/' },
  { label: 'Bildungsportal', href: 'https://www.bildung.gv.at/' },
  { label: 'Portal Austria', href: 'http://bildung.portal.at' },
  { label: 'Teachers.direct', href: 'https://teachersdirect.bildung.gv.at' },
  { label: 'Sokrates-Bund', href: 'https://www.sokrates-bund.at/' },
  { label: 'ISO.Web', href: 'https://schooloffice.lsr-sbg.gv.at/intercomschooloffice/#/welcome', note: 'Bildungsdirektion Salzburg' },
  { label: 'Uniflow', href: 'https://herzjesugym.eu.uniflowonline.com', note: 'Drucken & Kopieren' },
  { label: 'Intern_Q-Handbuch', href: 'https://teams.microsoft.com/l/entity/0d820ecd-def2-4297-adad-78056cde7c78/_djb2_msteams_prefix_1541037304?context=%7B%22channelId%22%3A%2219%3A2e819fe7e0164138b57be9ddcb0ea8db%40thread.tacv2%22%7D&tenantId=ee65a1f1-d4b9-47b4-a369-427ca3f6118e', note: 'Microsoft Teams' },
];

export const LINKS: ExtLink[] = [
  { label: 'Elternverein', href: 'http://eltern-am-herzjesugym.at/' },
  { label: 'Internat', href: 'https://internat.herzjesugym.com/' },
  { label: 'Herz-Jesu-Missionare Salzburg', href: 'http://www.msc-salzburg.at/' },
  { label: 'Maturaball', href: 'http://www.herzjesuball2026.at' },
  { label: 'Partnerschule Kecskemét', href: 'https://sites.google.com/kecskemet.piarista.hu/herzjesupiar/hauptseite', note: 'Piaristengymnasium, Ungarn' },
  { label: 'Schulshop', href: 'https://team.jako.com/de-de/team/herz_jesu_gymnasium/?item_source=27209', note: 'JAKO Teamshop' },
  { label: 'Kath. Privatschulen', href: 'http://katamt.eds-demo.info/KatholischePrivatschulen/Schulen/Schulverzeichnis/tabid/232/language/de-AT/Default.aspx' },
  { label: 'Bildungsportal', href: 'https://www.bildung.gv.at/' },
  { label: 'Digitale Schule', href: 'https://digitaleschule.gv.at/' },
  { label: '#weiterlernen', href: 'https://weiterlernen.at/' },
  { label: 'Schüler-Feedback', href: 'http://wp.feedbackschule.de/' },
  { label: 'Altlieferinger', href: 'http://www.altlieferinger.at' },
  { label: 'Stadtteilverein Liefering', href: 'http://www.liefering.at/' },
];

export const SCHUELER_LINKS: ExtLink[] = [
  { label: 'Mein erstes Robotikprojekt!', href: 'https://youtu.be/HLCZ0IjfJac', note: 'Video, Informatik' },
];

export interface Highlight { title: string; text: string; img: string; imgFull?: string; to?: string; href?: string; cta: string; portrait?: boolean }

export const HIGHLIGHTS: Highlight[] = [
  {
    title: 'AMETUR – Menschenbild und Spiritualität',
    text: 'Jahresprogramm 2026/27 mit Vorträgen, Impulsen und Begegnungen rund um das Herz-Jesu-Charisma.',
    img: `${WP_ORIGIN}/wp-content/uploads/2026/09/Ametur-2026-768x502.png`,
    imgFull: `${WP_ORIGIN}/wp-content/uploads/2026/09/Ametur-2026.png`,
    href: 'https://ametur.herzjesugym.at/',
    cta: 'Zum Programm',
  },
  {
    title: 'Auch in Zukunft Mensch sein',
    text: '5-Jahresmotto bis 2029. Schuljahr 2026/27: Menschenbild & Spiritualität.',
    img: `${WP_ORIGIN}/wp-content/uploads/2026/09/5Jahresmotto2627-410x1024.jpg`,
    imgFull: `${WP_ORIGIN}/wp-content/uploads/2026/09/5Jahresmotto2627-scaled.jpg`,
    href: `${WP_ORIGIN}/wp-content/uploads/2026/09/5Jahresmotto2627-scaled.jpg`,
    cta: 'Plakat ansehen',
    portrait: true,
  },
  {
    title: 'Gebetsinitiative',
    text: 'Der Gebetsbriefkasten der Schulgemeinschaft: Anliegen einwerfen, mitbeten, mittragen.',
    img: `${WP_ORIGIN}/wp-content/uploads/2024/11/Gebetsbriefkasten-2-768x432.jpg`,
    to: '/seite/gebetsinitiative',
    cta: 'Mehr erfahren',
  },
  {
    title: 'Videoimpressionen',
    text: 'Ein Rundgang durch unsere Schule in bewegten Bildern.',
    img: `${WP_ORIGIN}/wp-content/uploads/2023/06/intro-768x380.jpg`,
    href: 'https://youtu.be/mTIMB7TI3vo',
    cta: 'Video ansehen',
  },
];
