import Container from 'react-bootstrap/Container';
import CountdownTimer from '../components/CountdownTimer';

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <video
          className="hero-background-video"
          src={`${import.meta.env.BASE_URL}videos/home-background.mp4`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="hero-content">
          <h1 className="hero-title">Nakshatra</h1>
          <p className="hero-subtitle">
            UW–Madison&apos;s Premier Indian Classical Dance Competition
          </p>
          <p className="hero-event-label">
            An Official Origins 2027 Bid Competition
          </p>
        </div>
      </section>

      <section className="home-countdown-section">
        <Container>
          <CountdownTimer />
        </Container>
      </section>
    </>
  );
}
