import { useState } from 'react';

interface RSVPFormProps {
  eventName: string;
}

export default function RSVPForm({ eventName }: RSVPFormProps) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim() && email.trim()) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="confirmation-box">
        <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--gold)' }}><span aria-hidden="true">✦</span></div>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--gold)', fontWeight: 500, marginBottom: '0.4rem' }}>
          You're registered!
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
          Thanks, <strong style={{ color: 'var(--text-primary)' }}>{name}</strong>! Your RSVP for{' '}
          <strong style={{ color: 'var(--gold)' }}>{eventName}</strong> is confirmed.
          We'll reach out at {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label className="form-label-dark" htmlFor="rsvp-name">Name</label>
        <input
          id="rsvp-name"
          className="form-control form-control-dark"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: '1.25rem' }}>
        <label className="form-label-dark" htmlFor="rsvp-email">Email</label>
        <input
          id="rsvp-email"
          className="form-control form-control-dark"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-ghost" style={{ width: '100%' }}>
        Confirm RSVP
      </button>
    </form>
  );
}
