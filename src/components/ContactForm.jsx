import { useEffect, useId, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './ContactForm.css';

const SCRIPT_URL = import.meta.env.VITE_CONTACT_SCRIPT_URL ?? '';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '';
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';
const isTestTurnstile = TURNSTILE_SITE_KEY === TURNSTILE_TEST_SITE_KEY;

function ContactForm({ services }) {
  const honeypotId = useId();
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [matterType, setMatterType] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [turnstileError, setTurnstileError] = useState(false);

  const isConfigured = Boolean(SCRIPT_URL && TURNSTILE_SITE_KEY);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) {
      return undefined;
    }

    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !turnstileRef.current || !window.turnstile) {
        return;
      }

      if (widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'light',
        'success-callback': () => setTurnstileError(false),
        'error-callback': () => setTurnstileError(true),
        'expired-callback': () => setTurnstileError(false),
        'timeout-callback': () => setTurnstileError(true),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return () => {
        cancelled = true;
        if (widgetIdRef.current !== null && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      script.remove();
    };
  }, []);

  const resetTurnstile = () => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', text: '' });

    if (!isConfigured) {
      setStatus({
        type: 'error',
        text: 'The contact form is not configured yet. Please try again later.',
      });
      return;
    }

    const token = document.querySelector('[name="cf-turnstile-response"]')?.value ?? '';

    if (!token) {
      setStatus({
        type: 'error',
        text: 'Please complete the verification check before sending.',
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      matterType: matterType.trim(),
      message: message.trim(),
      website: honeypot,
      page: window.location.href,
      token,
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          text: "Thanks! Your enquiry has been sent. I'll get back to you soon.",
        });
        setName('');
        setEmail('');
        setPhone('');
        setMatterType('');
        setMessage('');
        setHoneypot('');
        resetTurnstile();
      } else {
        setStatus({
          type: 'error',
          text: result.error || 'Submission failed. Please try again.',
        });
        resetTurnstile();
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Network error. Please check your connection and try again.',
      });
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="contact-name">
        Name
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="Your full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoComplete="name"
        />
      </label>

      <label htmlFor="contact-email">
        Email
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />
      </label>

      <label htmlFor="contact-phone">
        Phone
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
          autoComplete="tel"
        />
      </label>

      <label htmlFor="contact-matter-type">
        Matter Type
        <select
          id="contact-matter-type"
          name="matterType"
          value={matterType}
          onChange={(event) => setMatterType(event.target.value)}
          required
        >
          <option value="" disabled>
            Select a practice area
          </option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="contact-message">
        Brief Case Note
        <textarea
          id="contact-message"
          name="message"
          placeholder="Mention the court/forum, case stage, dates and urgent deadlines."
          rows="5"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </label>

      <div className="contact-form-honeypot" aria-hidden="true">
        <label htmlFor={honeypotId}>Website</label>
        <input
          id={honeypotId}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div className="contact-form-turnstile" ref={turnstileRef} />
      ) : isDev ? (
        <p className="contact-form-config" role="status">
          Turnstile site key is missing. Add <code>VITE_TURNSTILE_SITE_KEY</code> to <code>.env</code> and restart
          the dev server.
        </p>
      ) : null}

      {isDev && isTestTurnstile ? (
        <p className="contact-form-config" role="status">
          Local dev mode: using Cloudflare test verification. Production uses your real Turnstile widget on
          GitHub Pages.
        </p>
      ) : null}

      {turnstileError && !isTestTurnstile ? (
        <p className="contact-form-status error" role="status">
          Verification could not load. Add <strong>localhost</strong> and <strong>127.0.0.1</strong> to your
          Turnstile widget hostnames in Cloudflare, or use <code>npm run dev</code> with the included{' '}
          <code>.env.development</code> test key.
        </p>
      ) : null}

      {!SCRIPT_URL && isDev ? (
        <p className="contact-form-config" role="status">
          Form endpoint is missing. Add your Google Apps Script URL as <code>VITE_CONTACT_SCRIPT_URL</code> in{' '}
          <code>.env</code>, then restart <code>npm run dev</code>.
        </p>
      ) : null}

      <button type="submit" className="primary-action" disabled={isSubmitting || !isConfigured}>
        {isSubmitting ? 'Sending...' : 'Send Enquiry'} {!isSubmitting ? <ChevronRight size={18} /> : null}
      </button>

      {status.text ? (
        <p className={`contact-form-status ${status.type}`} role="status" aria-live="polite">
          {status.text}
        </p>
      ) : null}
    </form>
  );
}

export default ContactForm;
