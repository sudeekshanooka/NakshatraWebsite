import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, HashRouter, matchPath, Navigate, parsePath, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground';
import Home from './pages/Home';
import { pageDescriptions } from './pageDescriptions';
import './App.css';

const Competition = lazy(() => import('./pages/Competition'));
const About = lazy(() => import('./pages/About'));
const Teams = lazy(() => import('./pages/Teams'));
const Apply = lazy(() => import('./pages/Apply'));
const Sponsors = lazy(() => import('./pages/Sponsors'));

const sections = [
  { path: '/competition', title: 'Competition', Page: Competition },
  { path: '/teams', title: 'Teams', Page: Teams },
  { path: '/sponsors', title: 'Sponsors', Page: Sponsors },
  { path: '/apply', title: 'Apply', Page: Apply },
  { path: '/about', title: 'About', Page: About },
] as const;

// Vercel serves from the domain root. GitHub Pages uses the repository base path.
const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter;

function HomeEntry() {
  const { pathname, hash, search } = useLocation();
  if (matchPath('/home', pathname)) {
    return <Navigate to={{ pathname: '/', search, hash }} replace />;
  }

  if (Router !== BrowserRouter || !hash.startsWith('#/')) return <Home />;

  const legacy = parsePath(hash.slice(1));
  const legacyPath = legacy.pathname ?? '';
  const section = sections.find(({ path }) => matchPath(path, legacyPath));
  const destination = section?.path ?? (matchPath('/events', legacyPath) ? '/teams' : '/');

  return <Navigate to={{ pathname: destination, search: legacy.search ?? search, hash: legacy.hash }} replace />;
}

function SectionMetadata() {
  const { pathname } = useLocation();
  const section = sections.find(({ path }) => matchPath(path, pathname));

  useEffect(() => {
    document.title = section?.title ? `${section.title} | Nakshatra-UW` : 'Nakshatra-UW';
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescriptions[section?.path ?? '/']);
  }, [section]);

  return null;
}

export default function App() {
  return (
    <Router>
      <SectionMetadata />
      <StarBackground />
      <NavBar />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Suspense fallback={<p className="page-wrapper text-center" role="status">Loading page…</p>}>
          <Routes>
            <Route path="/" element={<HomeEntry />} />
            <Route path="/home" element={<HomeEntry />} />
            {sections.map(({ path, Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
            <Route path="/events" element={<Navigate to="/teams" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}
