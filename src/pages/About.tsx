import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import adithyaPhoto from '../assets/ExecBoardPhotos/Adithya.webp';
import ananyaShankarPhoto from '../assets/ExecBoardPhotos/AnanyaS.webp';
import ananyaYanduruPhoto from '../assets/ExecBoardPhotos/AnanyaY.webp';
import ayushPhoto from '../assets/ExecBoardPhotos/Ayush.webp';
import ashwathPhoto from '../assets/ExecBoardPhotos/Ashwath.webp';
import aathmikhaPhoto from '../assets/ExecBoardPhotos/Aathmikha.webp';
import chetanaPhoto from '../assets/ExecBoardPhotos/Chetana.webp';
import diyaPhoto from '../assets/ExecBoardPhotos/Diya.webp';
import jairamPhoto from '../assets/ExecBoardPhotos/Jairam.webp';
import hiyaPhoto from '../assets/ExecBoardPhotos/Hiya.webp';
import joshithaPhoto from '../assets/ExecBoardPhotos/Joshitha.webp';
import krishnaPhoto from '../assets/ExecBoardPhotos/Krishna.webp';
import nandiniPhoto from '../assets/ExecBoardPhotos/Nandini.webp';
import patriciaPhoto from '../assets/ExecBoardPhotos/Patricia.webp';
import pransiPhoto from '../assets/ExecBoardPhotos/Pransi.webp';
import riyaPhoto from '../assets/ExecBoardPhotos/Riya.webp';
import rohitPhoto from '../assets/ExecBoardPhotos/Rohit.webp';
import roystonPhoto from '../assets/ExecBoardPhotos/Royston.webp';
import saiPhoto from '../assets/ExecBoardPhotos/Sai.webp';
import sanjayPhoto from '../assets/ExecBoardPhotos/Sanjay.webp';
import sanjnaPhoto from '../assets/ExecBoardPhotos/Sanjna.webp';
import shaktiPhoto from '../assets/ExecBoardPhotos/Shakti.webp';
import snehaPhoto from '../assets/ExecBoardPhotos/Sneha.webp';
import srikarPhoto from '../assets/ExecBoardPhotos/Srikar.webp';
import sripadaPhoto from '../assets/ExecBoardPhotos/Sripada.webp';
import siratPhoto from '../assets/ExecBoardPhotos/Sirat.webp';
import srutiPhoto from '../assets/ExecBoardPhotos/Sruti.webp';
import fullBoardPhoto from '../assets/FullBoard-520.webp';
import fullBoardPhotoLarge from '../assets/FullBoard-1040.webp';

// ── Scroll-reveal hook ────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ── Reveal wrapper ────────────────────────────────────────────
function Reveal({ children, delay = 0, height }: { children: React.ReactNode; delay?: number; height?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        height,
      }}
    >
      {children}
    </div>
  );
}

// ── Helper function for initials ──────────────────────────────
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

// ── Data ──────────────────────────────────────────────────────
const departments: {
  dept: string;
  email: string;
  members: { name: string; photo?: string }[];
}[] = [
  {
    dept: 'Directors',
    email: 'nakshatrauw@gmail.com',
    members: [
      { name: 'Krishna Maganti', photo: krishnaPhoto },
      { name: 'Riya Mathews', photo: riyaPhoto },
      { name: 'Srikar Kalapala', photo: srikarPhoto },
    ],
  },
  {
    dept: 'Events',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Ananya Shankar', photo: ananyaShankarPhoto },
      { name: 'Ananya Yanduru', photo: ananyaYanduruPhoto },
    ],
  },
  {
    dept: 'Finance',
    email: 'nakshatrauw.finance@gmail.com',
    members: [
      { name: 'Hiya Tanna', photo: hiyaPhoto },
    ],
  },
  {
    dept: 'Fundraising',
    email: 'nakshatrauw.finance@gmail.com',
    members: [
      { name: 'Sneha Manchandani', photo: snehaPhoto },
      { name: 'Sripada Thammera', photo: sripadaPhoto },
      { name: 'Ashwath Vijayaraghavan', photo: ashwathPhoto },
    ],
  },
  {
    dept: 'Head Liaisons',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Sanjna Akula', photo: sanjnaPhoto },
      { name: 'Patricia Prakasam', photo: patriciaPhoto },
    ],
  },
  {
    dept: 'Hospitality',
    email: 'nakshatrauw.finance@gmail.com',
    members: [
      { name: 'Royston Marques', photo: roystonPhoto },
      { name: 'Chetana Vysangi', photo: chetanaPhoto },
    ],
  },
  {
    dept: 'Judging',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Rohit Raghunathan', photo: rohitPhoto },
      { name: 'Aditya Sunderesan', photo: adithyaPhoto },
    ],
  },
  {
    dept: 'Logistics',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Sirat Mokha', photo: siratPhoto },
      { name: 'Sruti Palla', photo: srutiPhoto },
    ],
  },
  {
    dept: 'Marketing',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Shakti Iyer', photo: shaktiPhoto },
      { name: 'Jairam Narayanan', photo: jairamPhoto },
      { name: 'Pransi Patel', photo: pransiPhoto },
    ],
  },
  {
    dept: 'Philanthropy',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Nandini Nambiar', photo: nandiniPhoto },
    ],
  },
  {
    dept: 'Registration',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Diya Raghunath', photo: diyaPhoto },
      { name: 'Joshitha Senthil', photo: joshithaPhoto },
    ],
  },
  {
    dept: 'Risk & Affiliation',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Ayush Harish', photo: ayushPhoto },
      { name: 'Aathmikha Somi Ashok Kumar', photo: aathmikhaPhoto },
    ],
  },
  {
    dept: 'Tech',
    email: 'nakshatrauw.relations@gmail.com',
    members: [
      { name: 'Sanjay Murali', photo: sanjayPhoto },
      { name: 'Saikrishna Sunkara', photo: saiPhoto },
    ],
  },
];

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '3.5rem 0' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold-muted)' }} />
      <div style={{ width: '7px', height: '7px', background: 'var(--gold)', transform: 'rotate(45deg)', margin: '0 16px', boxShadow: '0 0 8px var(--gold-glow)' }} />
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold-muted)' }} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: '100px' }}>
      <Container>

        {/* Heading */}
        <Row className="text-center mb-2">
          <Col>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
              What is Nakshatra?
            </h1>
          </Col>
        </Row>

        {/* Narrative */}
        <Row className="align-items-center mb-4">
          <Col lg={7}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.25rem' }}>
              Nakshatra is the premier Indian classical dance competition at the University of
              Wisconsin-Madison, showcasing the rich traditions of Indian dance. This annual event
              invites eight highly skilled Indian classical dance teams from across the nation.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.25rem' }}>
              The competition is organized by a dedicated executive board, supported by liaisons
              and event managers, who work tirelessly to deliver a spectacular cultural showcase.
              Nakshatra not only celebrates the art of Indian classical dance but also enriches the
              Madison community by offering a glimpse into various classical Indian dance forms.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.9, margin: 0 }}>
              Affiliated with the Multicultural Student Center at the University of Wisconsin–Madison,
              Nakshatra is open to all students and welcomes anyone passionate about Indian culture,
              the performing arts, and community-building.
            </p>
          </Col>
          <Col lg={5} className="text-center mt-4 mt-lg-0">
            <img
              src={fullBoardPhoto}
              srcSet={`${fullBoardPhoto} 520w, ${fullBoardPhotoLarge} 1040w`}
              sizes="(min-width: 1400px) 520px, (min-width: 1200px) 451px, (min-width: 992px) 376px, (min-width: 544px) 520px, calc(100vw - 24px)"
              width={520}
              height={836}
              alt="Nakshatra full board"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '520px',
                border: '1px solid var(--border-gold)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
                display: 'block',
                margin: '0 auto',
              }}
            />
            <p style={{
              marginTop: '1rem',
              marginBottom: 0,
              color: '#fff',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.9rem, 1.6vw, 1.2rem)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
            }}>
              Nakshatra 3.0 Executive Board
            </p>
          </Col>
        </Row>

        <Divider />

        {/* Executive Board heading */}
        <Row className="mb-5">
          <Col>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
              Executive Board
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
              Need to reach out to a specific member of our board? Find their email below, or send a general inquiry to {' '}
              <a href="mailto:nakshatrauw@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                nakshatrauw@gmail.com
              </a>
            </p>
          </Col>
        </Row>

        {/* Department sections — each dept is its own reveal group */}
        {departments.map((dept, di) => (
          <div key={dept.dept} style={{ marginBottom: '2.5rem' }}>

            {/* Department title slides up first */}
            <Reveal delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.06em', margin: 0 }}>
                  {dept.dept}
                </h2>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-gold)' }} />
                <a href={`mailto:${dept.email}`} style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  {dept.email}
                </a>
              </div>
            </Reveal>

            {/* Cards stagger in after the title */}
            <Row className="g-2 justify-content-center">
              {dept.members.map((m, mi) => (
                <Col key={mi} xs={12} sm={6} md={4} lg={3}>
                  <Reveal delay={0.1 + mi * 0.08}>
                    <div className="about-member-card">
                      {m.photo && (
                        <img
                          className="about-member-portrait"
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          style={{
                            display: 'block',
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLDivElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      )}
                      <div
                        className="about-member-portrait"
                        role="img"
                        aria-label={m.name}
                        style={{
                          background: 'rgba(107, 33, 168, 0.2)',
                          color: '#fff',
                          display: m.photo ? 'none' : 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontFamily: 'var(--font-heading)'
                        }}
                      >
                        {getInitials(m.name)}
                      </div>
                      <div style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>
                        {m.name}
                      </div>
                    </div>
                  </Reveal>
                </Col>
              ))}
            </Row>

            {di < departments.length - 1 && (
              <div style={{ height: '1px', background: 'var(--border-gold)', marginTop: '2rem', opacity: 0.4 }} />
            )}
          </div>
        ))}

        <Divider />

        {/* Affiliations */}
        <Row className="g-4 align-items-stretch">
          <Col md={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <Reveal delay={0} height="100%">
              <div className="glass-card" style={{ flex: 1, padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Affiliation
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.5rem' }}>
                  Multicultural Student Center (MSC)
                </p>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  Dual-affiliated with the Multicultural Student Center (MSC) at UW-Madison. Through the MSC affiliation program, Nakshatra gains access to priority space reservations, eligibility for the Multicultural Council Grant, and co-sponsorship opportunities with Identity Centers.
                </p>
              </div>
            </Reveal>
          </Col>
          <Col md={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <Reveal delay={0.1} height="100%">
              <div className="glass-card" style={{ flex: 1, padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Affiliation
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.5rem' }}>
                  International Student Services (ISS)
                </p>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  Affiliated with International Student Services (ISS) at UW-Madison. Through this affiliation, Nakshatra has the opportunity to host Global Café, a biweekly cultural event bringing together international and U.S. students, table at the International Student Organization Fair, and access additional funding through the Global Badger Experience Grant (GBEG).
                </p>
              </div>
            </Reveal>
          </Col>
          <Col md={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <Reveal delay={0.2} height="100%">
              <div className="glass-card" style={{ flex: 1, padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Accreditation
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.5rem' }}>
                  SOLI Accredited RSO
                </p>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  Recognized as an Accredited RSO by the Office for Student Organizations, Leadership & Involvement (SOLI) at UW-Madison, an acknowledgement of our commitment to member experience and organizational excellence.
                </p>
              </div>
            </Reveal>
          </Col>
        </Row>

      </Container>
    </div>
  );
}
