import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gavel,
  Handshake,
  Landmark,
  Scale,
  Linkedin,
  Copyright,
  Banknote,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  MessageSquareText,
  ShieldCheck,
  Twitter,
  ClipboardCheck,
  UsersRound,
} from 'lucide-react';
import './styles.css';
import logo from './assets/unnati-chauhan-logo.png';
import ContactForm from './components/ContactForm';
import LinkedInArticlesCarousel from './components/LinkedInArticlesCarousel';

const contact = {
  email: 'adv.unnatichauhan@gmail.com',
  phone: '+91 63863 78267',
  address: 'B-230, Block B, Sector 71, Noida, Uttar Pradesh - 201307',
  location: 'Available for matters across Supreme Court of India, High Courts, RERA, NCLT and NCLAT.',
};

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/unnati-chauhan-309904211/', icon: Linkedin },
  { label: 'X', href: 'https://x.com/', icon: Twitter },
  { label: 'WhatsApp', href: `https://wa.me/916386378267`, icon: MessageCircle },
];

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Contact Us', path: '/contact' },
];

const courts = ['Supreme Court', 'High Courts', 'RERA', 'NCLT', 'Consumer Court'];

const practiceAreas = [
  {
    title: 'Real Estate Laws',
    icon: Landmark,
    text: 'Representation in property disputes, RERA proceedings, developer–buyer disputes, title issues, delayed possession, refund claims, and real estate advisory.',
  },
  {
    title: 'Insolvency & Bankruptcy Code (IBC)',
    icon: Handshake,
    text: 'Advising financial and operational creditors, corporate debtors, and stakeholders in insolvency proceedings before the NCLT under the Insolvency and Bankruptcy Code.',
  },
  {
    title: 'Arbitration',
    icon: Scale,
    text: 'Comprehensive arbitration support, including drafting arbitration notices, claims and pleadings, interim relief proceedings, arbitral representation, and enforcement of awards.',
  },
  {
    title: 'Consumer Law',
    icon: ShieldCheck,
    text: 'Representation before Consumer Commissions in matters involving deficiency of service, unfair trade practices, product liability, and consumer compensation claims.',
  },
  {
    title: 'Recovery Matters',
    icon: Banknote,
    text: 'Legal assistance in recovery of outstanding dues through civil proceedings, commercial recovery actions, summary suits, cheque dishonour matters, and other statutory remedies.',
  },
  {
    title: 'Criminal Law',
    icon: Gavel,
    text: 'Representation in criminal investigations and proceedings, including bail applications, complaints, trial proceedings, criminal revisions, and allied criminal litigation.',
  },
  {
    title: 'Intellectual Property Rights (IPR)',
    icon: Copyright,
    text: 'Advisory and representation relating to trademarks, copyrights, intellectual property protection, infringement disputes, and brand protection strategies.',
  },
  {
    title: 'Due Diligence',
    icon: ClipboardCheck,
    text: 'Comprehensive legal due diligence, title verification, contract review, compliance assessment, and risk analysis for commercial transactions and investments.',
  },
  {
    title: 'Consultancy & Legal Advisory',
    icon: MessageSquareText,
    text: 'Strategic legal opinions, contract drafting and review, regulatory compliance, transaction structuring, risk assessment, and preventive legal advisory for individuals and businesses.',
  },
];

const services = [
  ...practiceAreas,
];

const reasons = [
  {
    title: 'Meticulous Drafting & Case Preparation',
    text: 'Every matter is built on thorough legal research, detailed drafting, and careful analysis of facts to present the strongest possible case from the very beginning.',
  },
  {
    title: 'Representation Across Multiple Forums',
    text: 'Representation before the Supreme Court of India, High Courts, NCLT, RERA, Consumer Commissions, District Courts, and various judicial forums, tribunals, and statutory authorities.',
  },
  {
    title: 'Strategic, Solution-Oriented Advice',
    text: 'Legal advice focused not only on the law but also on practical, commercially viable, and time-efficient solutions that align with each client\'s objectives.',
  },
  {
    title: 'Transparent Communication',
    text: 'Clients remain informed at every stage through clear guidance, timely updates, and straightforward advice, ensuring they understand the process and available legal options.',
  },
  {
    title: 'Personalised Attention to Every Matter',
    text: 'Every case receives direct involvement, careful planning, and tailored legal strategies instead of a one-size-fits-all approach.',
  },
  {
    title: 'From Advisory to Final Resolution',
    text: 'Comprehensive legal support from initial consultation and due diligence to negotiations, litigation, appeals, enforcement, and post-judgment assistance.',
  },

];

const disclaimerStorageKey = 'unnati-chauhan-disclaimer-accepted';

function hasAcceptedDisclaimer() {
  try {
    return window.localStorage.getItem(disclaimerStorageKey) === 'true';
  } catch {
    return false;
  }
}

function saveDisclaimerAcceptance() {
  try {
    window.localStorage.setItem(disclaimerStorageKey, 'true');
  } catch {
    // The in-memory state still lets this visit continue if storage is unavailable.
  }
}

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
        <img className="brand-logo" src={logo} alt="Law Office of Unnati Chauhan" />
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
      <section className="hero" id="hero">
        <div className="hero-copy">
          <p className="eyebrow">Advocate for civil, commercial and family disputes</p>
          <h1 className="hero-title">
            <span>Prepared strategy. Clear advocacy.</span>
            Legal support when the next step matters.
          </h1>
          <p className="hero-motto">Measured counsel for urgent disputes, careful filings and practical resolution.</p>
          <p className="hero-summary">
            Practising in India with case experience across the Supreme Court, High Courts, RERA, NCLT and NCLAT.
            Her work focuses on insolvency, real estate, arbitration, consumer, family and service law matters.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => navigate('/contact')}>
              Book a Consultation <ArrowRight size={18} />
            </button>
            <button className="secondary-action" onClick={() => navigate('/services')}>
              <Gavel size={18} /> Practice Areas
            </button>
            <a className="quiet-action" href={`tel:${contact.phone.replaceAll(' ', '')}`}>
              <Phone size={18} /> Call
            </a>
            <a className="quiet-action" href={socials.find((social) => social.label === 'WhatsApp')?.href}>
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
          <div className="hero-proof" aria-label="Consultation focus">
            <span>
              <CheckCircle2 size={18} /> Case review
            </span>
            <span>
              <Clock3 size={18} /> Prior appointment
            </span>
            <span>
              <Landmark size={18} /> Multi-forum practice
            </span>
          </div>
        </div>
        <div className="hero-media" aria-label="Unnati Chauhan Law Offices">
          <div className="hero-emblem">
            <img src={logo} alt="Law Office of Unnati Chauhan" />
          </div>
        </div>
      </section>

      <section className="section about-office split" id="about">
        <div>
          <p className="section-kicker">About</p>
          <h2>About the Office</h2>
          <p>
          Founded in 2024 by Advocate Unnati Chauhan, the Law Office of Unnati Chauhan is a Delhi NCR-based independent law practice committed to delivering strategic, practical, and result-oriented legal solutions. 
          The office represents individuals, businesses, financial institutions, and commercial entities, combining meticulous legal analysis, precise drafting, and effective advocacy to safeguard clients' interests at every stage of a dispute or transaction.
          </p>
          <p>
          The practice advises and represents clients in matters relating to Insolvency & Bankruptcy (IBC), Real Estate and RERA, Consumer Disputes, Family Disputes, Criminal Matters, Recovery Proceedings, Legal Advisory, and Due Diligence, as well as a broad range of commercial and civil disputes. 
          Guided by the principles of integrity, professionalism, and client-focused service, the office is dedicated to providing pragmatic legal solutions and effective representation before courts, tribunals, and regulatory authorities across India.
          </p>
        </div>
        <aside className="about-panel" aria-label="Practice forums">
          <h3>Courts & Forums</h3>
          <h4>Appearances Before Courts, Tribunals & Regulatory Authorities</h4>
          <p>Regularly represents and advises clients before the Supreme Court of India, High Courts, National Company Law Tribunal (NCLT), Real Estate Regulatory Authority (RERA), Consumer Commissions, District Courts, and a wide range of judicial forums, tribunals, and statutory authorities across India.</p>
          <div className="forum-tags">
            {courts.map((court) => (
              <span key={court}>{court}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className="section split founder-section" id="founder">
        <div>
          <p className="section-kicker">Founder</p>
          <h2>Advocate Unnati Chauhan</h2>
          <p>
          Advocate Unnati Chauhan is the Founder of the Law Office of Unnati Chauhan, established in 2024. 
          Based in Delhi NCR, her practice encompasses litigation, dispute resolution, and legal advisory across diverse areas of law. 
          </p>
          <p>She regularly appears and advises clients before the Supreme Court of India, High Courts, National Company Law Tribunal (NCLT), 
          Real Estate Regulatory Authority (RERA), Consumer Commissions, District Courts, and various other judicial forums, tribunals, 
          and statutory authorities across India.</p>
        </div>
        <div className="timeline">
          <article>
            <span>Education</span>
            <h3>B.B.A. LL.B.</h3>
            <h4>ICFAI University, Dehradun</h4>
            <p>
              Graduated from ICFAI University, Dehradun: Institute of Chartered Financial Analysts of India
              University, Dehradun.
            </p>
          </article>
          <article>
            <span>Courts & Forums</span>
            <h3>Appearances Before Courts, Tribunals & Regulatory Authorities</h3>
            <p>
            Regularly represents and advises clients before the Supreme Court of India, High Courts, National Company Law Tribunal (NCLT), Real Estate Regulatory Authority (RERA), Consumer Commissions, District Courts, and a wide range of judicial forums, tribunals, and statutory authorities across India.
            </p>
          </article>
        </div>
      </section>

      <section className="section practice-band" id="practice">
        <p className="section-kicker">Area of Practice</p>
        <h3>Legal Expertise Across Diverse Practice Areas</h3>
        <p>Providing strategic representation, effective dispute resolution, and trusted legal advisory across a broad spectrum of practice areas.</p>
        <div className="service-grid home-practice">
          {practiceAreas.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="section why" id="why-us">
        <div>
          <p className="section-kicker">Out Approach</p>
          <h3>Trusted Counsel. Strategic Representation. Practical Solutions.</h3>
          <p>
          Every legal matter deserves careful preparation, clear communication, and a strategy tailored to the client's objectives. 
          We combine meticulous legal drafting with practical advice and dedicated representation to help clients navigate complex disputes with confidence.
          </p>
        </div>
        <div className="reason-list">
          {reasons.map((reason) => (
            <article key={reason.title} className="reason-item">
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <LinkedInArticlesCarousel />
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
        <ContactForm services={services} />
      </section>
    </>
  );
}

function PageIntro({ kicker, title, text }) {
  return (
    <section className="page-intro">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <aside className="intro-panel" aria-label="Practice forums">
        <img src={logo} alt="Law Office of Unnati Chauhan" />
        <div>
          {courts.map((court) => (
            <span key={court}>{court}</span>
          ))}
        </div>
      </aside>
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
      <div className="footer-text">
        <div className="footer-brand">
          <img className="footer-logo" src={logo} alt="Law Office of Unnati Chauhan" />
        </div>
        <div>
        <p>
          Legal representation and advisory support for insolvency, real estate, arbitration, consumer, family and
          service law matters in India.
        </p>
         <p className="disclaimer">
          This website is for informational purposes only and does not constitute advertising, solicitation or legal advice. No advocate-client relationship is created by viewing this website.
        </p>
        </div>
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

function DisclaimerGate() {
  const [isAccepted, setIsAccepted] = useState(hasAcceptedDisclaimer);

  const acceptDisclaimer = () => {
    saveDisclaimerAcceptance();
    setIsAccepted(true);
  };

  const declineDisclaimer = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isAccepted) return null;

  return (
    <div className="disclaimer-gate" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <section className="disclaimer-dialog">
        <div className="disclaimer-brand">
          <img src={logo} alt="Law Office of Unnati Chauhan" />
        </div>
        <div className="disclaimer-copy">
          <p className="section-kicker">Legal Notice</p>
          <h2 id="disclaimer-title">Website Disclaimer</h2>
          <p>
            This website is intended only to provide general information about Advocate Unnati Chauhan and her areas of
            practice. The content on this website does not constitute legal advice, advertising, solicitation or an
            invitation to create an advocate-client relationship. By clicking Accept, you confirm that you are visiting
            this website voluntarily for information purposes only.
          </p>
        </div>
        <div className="disclaimer-actions">
          <button type="button" className="primary-action" onClick={acceptDisclaimer}>
            Accept
          </button>
          <button type="button" className="secondary-action" onClick={declineDisclaimer}>
            Decline
          </button>
        </div>
      </section>
    </div>
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
      <DisclaimerGate />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
