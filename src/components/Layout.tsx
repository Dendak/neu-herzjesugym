import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-msc focus:px-4 focus:py-2 focus:font-semibold focus:text-white">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt" className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
