import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SectionDivider from '../components/SectionDivider';

const timeline = [
  { date: 'April 23rd, 11:59 PM CST', event: 'Executive Board Applications Close' },
  { date: 'Late April', event: 'Executive Board Interviews' },
  { date: 'Early May', event: 'Executive Board Finalized' },
  { date: 'Early September', event: 'Liaison & Event Manager Recruitment Opens' },
  { date: 'Mid-Late September', event: 'Liaison & Event Manager Interviews' },
  { date: 'Early October', event: 'Full Team Finalized' },
  { date: 'November – March', event: 'Active Planning & Coordination' },
  { date: 'Spring 2027', event: 'Competition Weekend' },
];

export default function Apply() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: '100px' }}>
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 0 }}>
              Register your interest!
            </h1>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={9}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, textAlign: 'center', marginBottom: '2rem' }}>
              Interested in being a part of Nakshatra? Fill out the form below so that you're the first to know when we have roles to open up.
            </p>
            <div
              className="glass-card"
              role="status"
              aria-label="Google Form placeholder"
              style={{
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              Google Form will be embedded here.
            </div>
          </Col>
        </Row>

        <SectionDivider />

        <Row className="mb-2">
          <Col>
            <h2 className="section-title mb-4"><span className="gold-underline">Timeline</span></h2>
          </Col>
        </Row>

        <ol className="application-timeline">
          {timeline.map(item => (
            <li className="timeline-item" key={item.date}>
              <span className="timeline-dot" aria-hidden="true" />
              <p style={{ color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', margin: '0 0 0.25rem', textTransform: 'uppercase' }}>
                {item.date}
              </p>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                {item.event}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
