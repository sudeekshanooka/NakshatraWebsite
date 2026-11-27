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
  { date: 'February 27th, 2027', event: 'Competition Day' },
];

const roles = [
  {
    id: 'executive-board',
    title: 'Executive Board',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSd33Rthab5BJcEkEMjmJRAeZZ6ArK_0Xk5flRvQgrU0Tp2MPQ/viewform',
    description:
      'Lead the vision and operations of Nakshatra. Executive board members oversee all aspects of the competition, from securing venues and sponsors to managing judges, logistics, marketing, and more.',
    expectations: [
      'Roles include Events, Finance, Fundraising, Head Liaisons, Hospitality, Judging, Logistics, Marketing, Philanthropy, Registration, Risk & Affiliation, and Tech.',
      'Strong organizational and leadership skills',
      'Significant time commitment throughout the academic year',
      'Prior event or leadership experience preferred',
    ],
  },
  {
    id: 'liaison',
    title: 'Liaison',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSe_XhRfAlfuOP2BCeBJVsRSKgYUPfNkTL6JpdR7ydEQyWR0LQ/viewform',
    description:
      "Serve as the primary point of contact for your assigned competing dance team throughout competition weekend. Help your team move smoothly through tech rehearsal, hotel room decorating, crafts day, and performances, while supporting their safety and experience from arrival to departure.",
    expectations: [
      'Available for the full competition weekend (February 26th–28th, 2027)',
      'Able to attend mandatory meetings and SAP/AOD training beforehand',
      'Complete one concession shift and obtain ServSafe certification',
    ],
  },
  {
    id: 'event-manager',
    title: 'Event Manager',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSe_XhRfAlfuOP2BCeBJVsRSKgYUPfNkTL6JpdR7ydEQyWR0LQ/viewform',
    description:
      'Support the board and liaisons in bringing competition weekend to life. Event managers help set up the mixer, create props and decorations for crafts day, assist during performances and tech time, and fill in for liaison roles when needed.',
    expectations: [
      'Available for the full competition weekend (February 26th–28th, 2027)',
      'Able to attend mandatory meetings and SAP/AOD training beforehand',
      'Complete one concession shift and obtain ServSafe certification',
    ],
  },
];

export default function Apply() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: '100px' }}>
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 0 }}>
              Register your interest!
            </h1>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, textAlign: 'center', marginBottom: '2rem' }}>
              Interested in being a part of Nakshatra? Explore the roles and expectations below, then select a tile to open its interest form.
            </p>
            <section aria-labelledby="open-roles-title">
              <h2 id="open-roles-title" className="section-title mb-4">
                <span className="gold-underline">Roles</span>
              </h2>
              <Row className="g-4">
                {roles.map(role => (
                  <Col key={role.id} md={4}>
                    <a
                      className="glass-card role-card role-card-link d-block"
                      href={role.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${role.title} responsibilities and expectations. Open interest form in a new tab.`}
                      style={{ padding: '2rem' }}
                    >
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.6rem' }}>
                        {role.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                        {role.description}
                      </p>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        Responsibilities &amp; expectations
                      </h4>
                      <ul style={{ paddingLeft: '1.1rem', color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0, lineHeight: 1.8 }}>
                        {role.expectations.map(expectation => <li key={expectation}>{expectation}</li>)}
                      </ul>
                      <span className="role-card-cta">View interest form</span>
                    </a>
                  </Col>
                ))}
              </Row>
            </section>
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
              <p className="timeline-date">
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
