import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import News from '@/pages/News';
import Post from '@/pages/Post';
import Page from '@/pages/Page';
import Fachbereiche from '@/pages/Fachbereiche';
import Termine from '@/pages/Termine';
import Search from '@/pages/Search';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="aktuelles" element={<News />} />
        <Route path="aktuelles/:slug" element={<Post />} />
        <Route path="kategorie/:category" element={<News />} />
        <Route path="fachbereiche" element={<Fachbereiche />} />
        <Route path="seite/:slug" element={<Page />} />
        <Route path="termine" element={<Termine />} />
        <Route path="suche" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
