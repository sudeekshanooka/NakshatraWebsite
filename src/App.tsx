import { HashRouter, Navigate, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground';
import Home from './pages/Home';
import Competition from './pages/Competition';
import About from './pages/About';
import Teams from './pages/Teams';
import Apply from './pages/Apply';
import Sponsors from './pages/Sponsors';
import './App.css';

export default function App() {
  return (
    <HashRouter>
      <StarBackground />
      <NavBar />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/about" element={<About />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/events" element={<Navigate to="/teams" replace />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
