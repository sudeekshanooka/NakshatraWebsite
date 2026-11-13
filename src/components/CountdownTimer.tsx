import { useState, useEffect } from 'react';

const COMPETITION_DATE = new Date('2027-02-27T00:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = COMPETITION_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

  return (
    <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem)', textAlign: 'center' }}>
      <p className="countdown-title">
        Countdown To A Whole New World
      </p>

      <div className="countdown-wrap">
        {UNITS.map((unit, i) => (
          <div key={unit} className="countdown-unit">
            <span className="countdown-number">{String(values[i]).padStart(2, '0')}</span>
            <span className="countdown-label">{unit}</span>
          </div>
        ))}
      </div>

      <p className="countdown-date">
        February 27, 2027
      </p>
    </div>
  );
}
