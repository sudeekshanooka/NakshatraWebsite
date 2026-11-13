import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import teamPhoto0264 from '../assets/TeamPhotos/team-img-0264.webp';
import teamPhoto06960 from '../assets/TeamPhotos/team-06960.webp';
import teamPhoto0118 from '../assets/TeamPhotos/team-img-0118.webp';
import teamPhoto0163 from '../assets/TeamPhotos/team-img-0163.webp';
import teamPhoto06841 from '../assets/TeamPhotos/team-06841.webp';
import teamPhoto0178 from '../assets/TeamPhotos/team-img-0178.webp';
import teamPhoto0193 from '../assets/TeamPhotos/team-img-0193.webp';
import teamPhoto06885 from '../assets/TeamPhotos/team-06885.webp';
import teamPhoto0224 from '../assets/TeamPhotos/team-img-0224.webp';
import teamPhoto0228 from '../assets/TeamPhotos/team-img-0228.webp';

const teamPhotos = [
  { src: teamPhoto0264, alt: 'Dancers in green and orange costumes performing together' },
  { src: teamPhoto06960, alt: 'A dance team holding a banner after their performance' },
  { src: teamPhoto0118, alt: 'Classical dancers performing in a line under stage lights' },
  { src: teamPhoto0163, alt: 'Dancers in pink costumes performing a classical dance' },
  { src: teamPhoto06841, alt: 'A dance team celebrating with their trophy' },
  { src: teamPhoto0178, alt: 'Classical dancers performing under red stage lighting' },
  { src: teamPhoto0193, alt: 'Dancers in orange and blue costumes performing on stage' },
  { src: teamPhoto06885, alt: 'A team of dancers and organizers celebrating with a trophy' },
  { src: teamPhoto0224, alt: 'A group of classical dancers performing under red stage lighting' },
  { src: teamPhoto0228, alt: 'Dancers in magenta and purple costumes performing on stage' },
];

export default function Teams() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: '100px' }}>
      <Container>
        <section aria-labelledby="teams-coming-soon-heading">
          <Row className="text-center mb-4">
            <Col>
              <h2 id="teams-coming-soon-heading" style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--gold)',
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                letterSpacing: '0.04em',
                lineHeight: 1.3,
                marginBottom: '0.75rem',
              }}>
                Dancers taking us on a magic carpet ride: Flying in Soon!
              </h2>
            </Col>
          </Row>
        </section>

        <section className="team-photo-marquee" aria-label="Photos from Nakshatra 2026">
          <div className="team-photo-track">
            {[false, true].map(isDuplicate => (
              <div
                key={isDuplicate ? 'duplicate' : 'original'}
                className="team-photo-group"
                aria-hidden={isDuplicate}
              >
                {teamPhotos.map(photo => (
                  <div className="team-photo-frame" key={photo.src}>
                    <img
                      src={photo.src}
                      alt={isDuplicate ? '' : photo.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <Row className="text-center mt-5">
          <Col>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.7 }}>
              In the meantime, learn how the competition works!
            </p>
            <Link to="/competition" className="btn-ghost" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Competition
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
