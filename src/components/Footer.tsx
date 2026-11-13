import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
  return (
    <footer className="footer-dark">
<Container>
        <Row className="align-items-start g-4">
          <Col md={4}>
            <div className="footer-brand" style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
              <span className="brand-wordmark" aria-hidden="true">NAKSHATRA</span>
              <span className="visually-hidden">Nakshatra</span>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              The premier Indian classical dance competition at the University of Wisconsin–Madison.
            </p>
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

          <Col md={4} className="text-md-end">
            <p style={{ fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              Contact
            </p>
            <a href="mailto:nakshatrauw@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
              nakshatrauw@gmail.com
            </a>
            <a href="mailto:nakshatrauw.relations@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
              nakshatrauw.relations@gmail.com
            </a>
            <a href="mailto:nakshatrauw.finance@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block' }}>
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
