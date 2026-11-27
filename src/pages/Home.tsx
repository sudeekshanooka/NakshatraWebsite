import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import heroFallback from '../assets/hero-fallback.jpg';
import heroVideo from '../assets/home-background.mp4';
import CountdownTimer from '../components/CountdownTimer';

export default function Home() {
  const [hasVideoError, setHasVideoError] = useState(false);

  return (
    <>
      <section className="hero-section">
        <video
          className="hero-background-video"
          src={heroVideo}
          poster={heroFallback}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="metadata"
          onError={() => setHasVideoError(true)}
          hidden={hasVideoError}
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
