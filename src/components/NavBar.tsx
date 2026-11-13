import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import nakshatraLogo from '../assets/NakshatraLogo.png';
import '../App.css';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 8);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <Navbar fixed="top" className={`nakshatra-navbar${isScrolled ? ' nakshatra-navbar-scrolled' : ''}`}>
      <Container className="navbar-container">
        <Navbar.Brand as={NavLink} to="/" aria-label="Nakshatra home">
          <img className="navbar-logo" src={nakshatraLogo} alt="" />
        </Navbar.Brand>
        <Nav className="navbar-links ms-auto gap-1" aria-label="Main navigation">
          <Nav.Link as={NavLink} to="/competition" className="nav-link-custom">Competition</Nav.Link>
          <Nav.Link as={NavLink} to="/teams" className="nav-link-custom">Teams</Nav.Link>
          <Nav.Link as={NavLink} to="/about" className="nav-link-custom">About</Nav.Link>
          <Nav.Link as={NavLink} to="/apply" className="nav-link-custom">Apply</Nav.Link>
          <Nav.Link as={NavLink} to="/sponsors" className="nav-link-custom">Sponsors</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
