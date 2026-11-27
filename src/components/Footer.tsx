import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/nakshatra_uw/?hl=en',
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.6" cy="6.5" r="1.2" />
      </>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@nakshatra_uw',
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M13 5.5h2a3 3 0 0 0 3 3v2a5 5 0 0 1-3-1v5.5a4 4 0 1 1-4-4v2a2 2 0 1 0 2 2V5.5z" />
      </>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/nakshatra-uw/home/',
    icon: <path fillRule="evenodd" d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2.5 7.5h2.7v8H6.5zm1.35-4a1.35 1.35 0 1 0 0 2.7 1.35 1.35 0 0 0 0-2.7zM11 9.5h2.6v1.1a2.9 2.9 0 0 1 5.2 1.9v5h-2.7v-4.3c0-1-.4-1.6-1.2-1.6-.9 0-1.3.6-1.3 1.6v4.3H11z" />,
  },
];

export default function Footer() {
  return (
    <footer className="footer-dark">
<Container>
        <Row className="align-items-start g-4">
          <Col md={4} className="text-center text-md-start">
            <div className="footer-brand" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>
              <span className="brand-wordmark" aria-hidden="true">NAKSHATRA</span>
              <span className="visually-hidden">Nakshatra</span>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              University of Wisconsin–Madison's premier collegiate Indian classical dance competition.
            </p>
            <nav className="d-flex justify-content-center justify-content-md-start gap-2 mt-2" aria-label="Social media">
              {socialLinks.map(({ name, url, icon }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="footer-social-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {icon}
                  </svg>
                </a>
              ))}
            </nav>
          </Col>

          <Col md={4} className="text-center text-md-center">
            <p style={{ fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              Affiliations & Accreditations
            </p>
            <div style={{ height: '1px', background: 'var(--border-gold)', marginBottom: '0.6rem', margin: '0 auto 0.6rem' }} />
            {['Multicultural Student Center (MSC)', 'International Student Services (ISS)', 'SOLI Accredited RSO'].map(item => (
              <p key={item} style={{ color: 'var(--text-secondary)', margin: '0 0 0.4rem', fontSize: '0.88rem' }}>
                <span aria-hidden="true" style={{ color: 'var(--gold)', marginRight: '0.4rem', fontSize: '0.6rem' }}>✦</span>
                {item}
              </p>
            ))}
          </Col>

          <Col md={4} className="text-center text-md-end">
            <p style={{ fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              Contact
            </p>
            <a href="mailto:nakshatrauw@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
              nakshatrauw@gmail.com
            </a>
            <a href="mailto:nakshatrauw.relations@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
              nakshatrauw.relations@gmail.com
            </a>
            <a href="mailto:nakshatrauw.finance@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, display: 'block' }}>
              nakshatrauw.finance@gmail.com
            </a>
            <p style={{ color: 'var(--text-secondary)', margin: '0.75rem 0 0', fontSize: '0.78rem' }}>
              © {new Date().getFullYear()} Nakshatra at UW-Madison
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
