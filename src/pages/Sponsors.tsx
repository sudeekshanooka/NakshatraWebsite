import { useState, type FormEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import raisingCaneLogo from '../assets/raising_canes.webp';
import aashramRealtyLogo from '../assets/aashram_realty.webp';
import lmntLogo from '../assets/lmnt_logo_transparent.webp';
import bubblrLogo from '../assets/bubblrlogo.png';
import mirchMasalaLogo from '../assets/mirch_masala.webp';

const partnerLogos = [
  { name: "Raising Cane's", image: raisingCaneLogo },
  { name: 'Aashram Realty', image: aashramRealtyLogo },
  { name: 'LMNT', image: lmntLogo },
  { name: 'Bubblr', image: bubblrLogo },
  { name: 'Mirch Masala', image: mirchMasalaLogo },
];

const submissionErrors: Partial<Record<number, string>> = {
  400: 'Some details need checking. Enter your name, a valid email address, how you’d like to help, and a message.',
  413: 'Your inquiry is too long. Shorten your message and try again.',
  422: 'Enter a phone number with 7 to 15 digits, such as (608) 555-0123, or leave Phone blank.',
  429: 'Too many inquiries were sent in a short time. Please wait and try again later.',
};
const unavailableMessage = 'The sponsorship form is temporarily unavailable. Please try again later.';

export default function Sponsors() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(import.meta.env.VITE_SPONSORSHIP_API_URL || '/api/sponsorship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          organization: formData.get('organization'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          interest: formData.get('interest'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      });
      if (!response.ok) {
        const error = response.status === 400 ? await response.json().catch(() => null) : null;
        const message = error?.code === 'emoji_not_allowed'
          ? 'Remove emojis from your inquiry and try again.'
          : submissionErrors[response.status] ?? unavailableMessage;
        setStatus({ type: 'danger', message });
        return;
      }

      const result = await response.json().catch(() => null);
      if (typeof result?.message !== 'string') {
        setStatus({ type: 'danger', message: 'We couldn’t confirm that your inquiry was sent. You can email us directly below.' });
        return;
      }

      form.reset();
      setStatus({ type: 'success', message: 'Thanks for reaching out. We’ll follow up by email.' });
    } catch {
      setStatus({
        type: 'danger',
        message: 'We couldn’t reach the sponsorship form. Check your internet connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-wrapper sponsors-page">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <p className="sponsors-eyebrow">Partner With Us</p>
            <h1 className="sponsors-heading">Become a Sponsor</h1>
            <p className="sponsors-intro">
              Want to support Nakshatra? Fill out the form below and
              let us know how you and your organization would like to support
              us in bringing the best collegiate Indian classical dance teams
              to Madison.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={9} xl={8}>
            <div className="glass-card sponsor-form-card">
              <h2 className="sponsor-section-heading">Sponsorship Inquiry</h2>
              <p className="sponsor-form-note">
                Complete the details below and we will follow up by email.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="visually-hidden" aria-hidden="true">
                  <label htmlFor="sponsor-website">Leave this field empty</label>
                  <input id="sponsor-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <Row className="g-3">
                  <Col md={6}>
                    <label className="form-label-dark" htmlFor="sponsor-name">Full Name</label>
                    <input id="sponsor-name" name="name" className="form-control form-control-dark" autoComplete="name" maxLength={120} required />
                  </Col>
                  <Col md={6}>
                    <label className="form-label-dark" htmlFor="sponsor-organization">Company or Organization <span className="sponsor-optional">(optional)</span></label>
                    <input id="sponsor-organization" name="organization" className="form-control form-control-dark" autoComplete="organization" maxLength={160} />
                  </Col>
                  <Col md={6}>
                    <label className="form-label-dark" htmlFor="sponsor-email">Email</label>
                    <input id="sponsor-email" name="email" type="email" className="form-control form-control-dark" autoComplete="email" maxLength={254} required />
                  </Col>
                  <Col md={6}>
                    <label className="form-label-dark" htmlFor="sponsor-phone">Phone <span className="sponsor-optional">(optional)</span></label>
                    <input id="sponsor-phone" name="phone" type="tel" className="form-control form-control-dark" autoComplete="tel" maxLength={40} placeholder="(608) 555-0123" />
                  </Col>
                  <Col xs={12}>
                    <label className="form-label-dark" htmlFor="sponsor-interest">How would you like to support Nakshatra?</label>
                    <select id="sponsor-interest" name="interest" className="form-select form-select-dark" defaultValue="" required>
                      <option value="" disabled>Select an area of interest</option>
                      <option>Financial sponsorship</option>
                      <option>Products or services</option>
                      <option>Community or promotional partnership</option>
                      <option>Other</option>
                    </select>
                  </Col>
                  <Col xs={12}>
                    <label className="form-label-dark" htmlFor="sponsor-message">Message</label>
                    <textarea id="sponsor-message" name="message" className="form-control form-control-dark" rows={4} maxLength={4000} placeholder="Share any questions or details about your sponsorship idea." required />
                  </Col>
                  <Col xs={12}>

                    <button className="btn-ghost sponsor-submit" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending…' : 'Submit'}
                    </button>
                    {status && (
                      <div className={`alert alert-${status.type} mt-3 mb-0`} role="status" aria-live="polite">
                        {status.message}
                        {status.type === 'danger' && (
                          <div className="mt-2">
                            Email <a className="alert-link" href="mailto:nakshatrauw@gmail.com">nakshatrauw@gmail.com</a> for help.
                          </div>
                        )}
                      </div>
                    )}
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>

        <section className="sponsor-gallery" aria-labelledby="past-partners-heading">
          <div className="text-center">
            <h2 id="past-partners-heading" className="sponsor-section-heading">Past Partners</h2>
            <p className="sponsor-gallery-intro">
              We are grateful to the organizations that have supported Nakshatra.
            </p>
          </div>
          <Row className="g-3 justify-content-center">
            {partnerLogos.map(({ name, image }) => (
              <Col key={name} xs={12} sm={6} lg={4}>
                <div className="partner-logo-card" aria-label={`${name} logo`}>
                  <img className="partner-logo-image" src={image} alt={`${name} logo`} loading="lazy" />
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
}
