import Container from 'react-bootstrap/Container';
import originsLogo from '../assets/Origins_Logo.png';
import aharyaLogo from '../assets/PreviousTeams/aharya_white.png';
import avahitaLogo from '../assets/PreviousTeams/avahita_white.png';
import omkaraLogo from '../assets/PreviousTeams/omkara_white.png';
import pushpanjaliLogo from '../assets/PreviousTeams/pushpanjali_white.png';
import shaktiLogo from '../assets/PreviousTeams/shakti_white.png';
import taaraUclaLogo from '../assets/PreviousTeams/taara_ucla_white.png';
import tuftsPulseLogo from '../assets/PreviousTeams/tufts_pulse_white.png';
import ucSdPushpanjaliPhoto from '../assets/TeamPhotos/team-06960.webp';
import uciAvahitaPhoto from '../assets/TeamPhotos/team-06841.webp';
import jhuShaktiPhoto from '../assets/TeamPhotos/team-06885.webp';

const previousTeams = [
  { name: 'Aharya', image: aharyaLogo },
  { name: 'Avahita', image: avahitaLogo },
  { name: 'Omkara', image: omkaraLogo },
  { name: 'Pushpanjali', image: pushpanjaliLogo },
  { name: 'Shakti', image: shaktiLogo },
  { name: 'Taara UCLA', image: taaraUclaLogo },
  { name: 'Tufts Pulse', image: tuftsPulseLogo },
];

const lastYearWinners = [
  {
    place: '1st',
    team: 'UCSD Pushpanjali',
    originsNote: '5th at Origins 2026',
    image: ucSdPushpanjaliPhoto,
    performanceUrl: 'https://www.youtube.com/watch?v=p_c20G5tnSs',
  },
  {
    place: '2nd',
    team: 'JHU Shakti',
    originsNote: 'Origins 2026 Winners',
    image: uciAvahitaPhoto,
    performanceUrl: 'https://www.youtube.com/watch?v=JspuJ_tg09g',
  },
  {
    place: '3rd',
    team: 'UCI Avahita',
    originsNote: null,
    image: jhuShaktiPhoto,
    performanceUrl: 'https://www.youtube.com/watch?v=fKMhzsT-66I&t=211s',
  },
];

export default function Competition() {
  return (
    <div className="page-wrapper competition-page">
      <Container>
        <header className="competition-header">
          <h1 className="competition-title">The Competitors</h1>
          <p className="competition-intro">
            We select eight of the best collegiate Indian classical dance teams
            to come to Madison and compete.
          </p>
        </header>

        <section className="competition-section" aria-labelledby="previous-teams-heading">
          <h2 id="previous-teams-heading" className="competition-section-title">
            Previous Teams
          </h2>
          <div className="competition-logo-marquee">
            <div className="competition-logo-track">
              {[0, 1].map(group => (
                <div
                  key={group}
                  className="competition-logo-group"
                  aria-hidden={group === 1}
                >
                  {previousTeams.map(({ name, image }) => (
                    <div className="competition-logo-slot" key={name}>
                      <img
                        className="competition-logo-image"
                        src={image}
                        alt={`${name} logo`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="competition-section competition-details" aria-labelledby="origins-heading">
          <h2 id="origins-heading" className="competition-section-title">
            The Road to Origins
          </h2>
          <p>
            As an official bid competition for the Origins Dance Championship,
            Nakshatra awards points that count toward teams&apos; placement in the
            National Championship. Points earned here help teams reach the top
            nine and qualify for Origins. Teams are scored using an ELO system.
          </p>
          <img
            className="competition-origins-logo"
            src={originsLogo}
            alt="Origins Dance Championship logo"
          />
        </section>

        <section className="competition-section" aria-labelledby="winners-heading">
          <h2 id="winners-heading" className="competition-section-title">
            Last Year&apos;s Winners
          </h2>
          <div className="competition-winners">
            {lastYearWinners.map(({ place, team, originsNote, image, performanceUrl }) => (
              <article className="competition-winner-card" key={team}>
                <a
                  className="competition-winner-video-link"
                  href={performanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${team}'s performance on YouTube`}
                >
                  <img
                    className="competition-winner-photo"
                    src={image}
                    alt={`${team}, ${place} place`}
                  />
                  <span className="competition-winner-video-overlay" aria-hidden="true">
                    Watch performance
                  </span>
                </a>
                <p className="competition-winner-place">{place} Place</p>
                <h3 className="competition-winner-name">{team}</h3>
                {originsNote && (
                  <p className="competition-winner-origins">{originsNote}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="competition-order" aria-labelledby="show-order-heading">
          <h2 id="show-order-heading" className="competition-section-title">
            3.0 Show Order
          </h2>
          <p>TBD</p>
        </section>
      </Container>
    </div>
  );
}
