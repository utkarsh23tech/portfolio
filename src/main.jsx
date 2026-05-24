import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Gavel,
  Handshake,
  Landmark,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Twitter,
  UsersRound,
} from 'lucide-react';
import './styles.css';

const contact = {
  email: 'unnati.chauhan@example.com',
  phone: '+91 98765 43210',
  address: 'Chamber / Consultation Office, New Delhi, India',
  location: 'Available for matters across Supreme Court of India, High Courts, RERA, NCLT and NCLAT.',
};

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
  { label: 'X', href: 'https://x.com/', icon: Twitter },
  { label: 'WhatsApp', href: `https://wa.me/919876543210`, icon: MessageCircle },
];

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Contact Us', path: '/contact' },
];

const courts = ['Supreme Court', 'High Courts', 'RERA', 'NCLT', 'NCLAT'];

const services = [
  {
    title: 'Insolvency & Bankruptcy Law',
    icon: Landmark,
    text: 'Representation and advisory for insolvency proceedings, creditor-debtor disputes, resolution strategy and related company law issues.',
  },
  {
    title: 'Real Estate & RERA',
    icon: Building2,
    text: 'Developer-buyer disputes, delayed possession, refund claims, project compliance and real estate litigation before RERA authorities.',
  },
  {
    title: 'Arbitration',
    icon: Handshake,
    text: 'Pre-arbitration notices, interim relief, claim drafting, representation and enforcement support for commercial disputes.',
  },
  {
    title: 'Consumer Matters',
    icon: ShieldCheck,
    text: 'Consumer complaints, deficiency of service claims, unfair trade practice disputes and negotiated settlements.',
  },
  {
    title: 'Family & Matrimonial Law',
    icon: UsersRound,
    text: 'Divorce, maintenance, custody, domestic issues, family settlements and sensitive dispute resolution with careful client communication.',
  },
  {
    title: 'Service Law',
    icon: FileCheck2,
    text: 'Employment, disciplinary, appointment, promotion, termination and benefits-related matters for employees and institutions.',
  },
];

const reasons = [
  'Multi-forum practice exposure across courts, tribunals and regulatory authorities.',
  'Clear case assessment with practical next steps before litigation is escalated.',
  'Drafting-led strategy for notices, petitions, replies, settlement terms and appeals.',
  'Client communication that keeps timelines, documents and hearing updates organized.',
];

function useRoute() {
  const readHashPath = () => {
    const hashPath = window.location.hash.replace(/^#/, '');
    return navItems.some((item) => item.path === hashPath) ? hashPath : '/';
  };

  const [path, setPath] = useState(readHashPath);

  useEffect(() => {
    const onHashChange = () => setPath(readHashPath());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (nextPath) => {
    if (readHashPath() !== nextPath) {
      window.location.hash = nextPath;
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { path, navigate };
}

function Navbar({ path, navigate }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/" onClick={(event) => routeClick(event, '/', navigate)}>
        <span className="brand-mark">
          <Scale size={22} />
        </span>
        <span>
          <strong>Unnati Chauhan</strong>
          <small>Advocate, India</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.path}
            className={path === item.path ? 'active' : ''}
            href={`#${item.path}`}
            onClick={(event) => routeClick(event, item.path, navigate)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="social-links" aria-label="Social media links">
        {socials.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} aria-label={label} title={label} target="_blank" rel="noreferrer">
            <Icon size={18} />
          </a>
        ))}
      </div>
    </header>
  );
}

function routeClick(event, path, navigate) {
  event.preventDefault();
  navigate(path);
}

function Home({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <div className="court-visual">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Advocate for complex civil, commercial and family disputes</p>
          <h1>Advocate Unnati Chauhan</h1>
          <p>
            Practising in India with case experience across the Supreme Court, High Courts, RERA, NCLT and NCLAT.
            Her work focuses on insolvency and bankruptcy law, real estate disputes, arbitration, consumer matters,
            family law and service law.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => navigate('/contact')}>
              Book a Consultation <ArrowRight size={18} />
            </button>
            <button className="secondary-action" onClick={() => navigate('/services')}>
              Explore Practice Areas
            </button>
          </div>
        </div>
      </section>

      <section className="court-strip" aria-label="Forums handled">
        {courts.map((court) => (
          <span key={court}>{court}</span>
        ))}
      </section>

      <section className="section split">
        <div>
          <p className="section-kicker">Career & Education</p>
          <h2>A business-law foundation with litigation practice across forums.</h2>
        </div>
        <div className="timeline">
          <article>
            <span>Education</span>
            <h3>BBA LL.B.</h3>
            <p>
              Graduated from ICFAI University, Dehradun: Institute of Chartered Financial Analysts of India
              University, Dehradun.
            </p>
          </article>
          <article>
            <span>Practice</span>
            <h3>Advocate handling litigation and advisory matters</h3>
            <p>
              Works with clients on strategy, drafting and representation in disputes before courts, tribunals and
              statutory authorities.
            </p>
          </article>
        </div>
      </section>

      <section className="section practice-band">
        <p className="section-kicker">Practice & Expertise</p>
        <h2>Focused legal support for disputes where procedure, documents and timing matter.</h2>
        <div className="service-grid compact">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="section why">
        <div>
          <p className="section-kicker">Why Choose Her</p>
          <h2>Calm advice, prepared drafting and forum-aware strategy.</h2>
          <p>
            Every matter is approached with a structured reading of facts, risks, reliefs and available remedies so
            clients can decide with confidence.
          </p>
        </div>
        <div className="reason-list">
          {reasons.map((reason) => (
            <div key={reason}>
              <CheckCircle2 size={20} />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Services() {
  return (
    <>
      <PageIntro
        kicker="Services"
        title="Practice areas for individuals, homebuyers, businesses and professionals."
        text="Advocate Unnati Chauhan assists with representation, drafting, negotiation and legal strategy across courts, tribunals and regulatory bodies."
      />
      <section className="section service-grid">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </section>
      <section className="section process">
        <div>
          <p className="section-kicker">How Matters Move</p>
          <h2>A clear working rhythm from consultation to resolution.</h2>
        </div>
        <div className="process-grid">
          {[
            ['01', 'Fact Review', 'Documents, timelines, parties and reliefs are mapped before advice is given.'],
            ['02', 'Strategy', 'The suitable forum, remedy and filing route are identified with practical risks.'],
            ['03', 'Drafting', 'Notices, petitions, replies, applications and settlement terms are prepared.'],
            ['04', 'Representation', 'Proceedings, hearings, follow-ups and client updates are handled with care.'],
          ].map(([step, title, text]) => (
            <article key={step}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <>
      <PageIntro
        kicker="Contact Us"
        title="Start with a focused consultation."
        text="Share the forum, case stage, important dates and key documents so the matter can be assessed efficiently."
      />
      <section className="section contact-layout">
        <div className="contact-panel">
          <h2>Contact Information</h2>
          <ContactLine icon={Phone} label="Phone" value={contact.phone} href={`tel:${contact.phone.replaceAll(' ', '')}`} />
          <ContactLine icon={Mail} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactLine icon={MapPin} label="Address" value={contact.address} />
          <ContactLine icon={Landmark} label="Location & Forums" value={contact.location} />
          <div className="availability">
            <Clock3 size={18} />
            <span>Consultations by prior appointment. Virtual meetings available for outstation clients.</span>
          </div>
        </div>
        <form className="contact-form">
          <label>
            Name
            <input type="text" placeholder="Your full name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Matter Type
            <select defaultValue="">
              <option value="" disabled>
                Select a practice area
              </option>
              {services.map((service) => (
                <option key={service.title}>{service.title}</option>
              ))}
            </select>
          </label>
          <label>
            Brief Case Note
            <textarea placeholder="Mention the court/forum, case stage, dates and urgent deadlines." rows="5"></textarea>
          </label>
          <button type="button" className="primary-action">
            Send Enquiry <ChevronRight size={18} />
          </button>
        </form>
      </section>
    </>
  );
}

function PageIntro({ kicker, title, text }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <article className="service-card">
      <div className="service-icon">
        <Icon size={22} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
    </article>
  );
}

function ContactLine({ icon: Icon, label, value, href }) {
  const content = href ? <a href={href}>{value}</a> : <span>{value}</span>;
  return (
    <div className="contact-line">
      <Icon size={20} />
      <div>
        <strong>{label}</strong>
        {content}
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div>
        <div className="footer-brand">
          <Scale size={28} />
          <span>Advocate Unnati Chauhan</span>
        </div>
        <p>
          Legal representation and advisory support for insolvency, real estate, arbitration, consumer, family and
          service law matters in India.
        </p>
        <p className="disclaimer">
          This website is for informational purposes only and does not constitute advertising, solicitation or legal
          advice. No advocate-client relationship is created by viewing this website.
        </p>
      </div>
      <div>
        <h3>Quick Links</h3>
        {navItems.map((item) => (
          <a key={item.path} href={`#${item.path}`} onClick={(event) => routeClick(event, item.path, navigate)}>
            {item.label}
          </a>
        ))}
      </div>
      <div>
        <h3>Practice Forums</h3>
        {courts.map((court) => (
          <span key={court}>{court}</span>
        ))}
      </div>
      <div>
        <h3>Connect</h3>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={`tel:${contact.phone.replaceAll(' ', '')}`}>{contact.phone}</a>
        <span>{contact.address}</span>
      </div>
    </footer>
  );
}

function App() {
  const { path, navigate } = useRoute();
  const Page = useMemo(() => {
    if (path === '/services') return Services;
    if (path === '/contact') return Contact;
    return Home;
  }, [path]);

  return (
    <div>
      <Navbar path={path} navigate={navigate} />
      <main>
        <Page navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
