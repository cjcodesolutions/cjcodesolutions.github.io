import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [statsCounted, setStatsCounted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsCounted) {
          setStatsCounted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsCounted]);

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-bg-effects">
          <div className="hero-grid"></div>
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="floating-code floating-code-1">const success = true;</div>
          <div className="floating-code floating-code-2">npm run deliver</div>
          <div className="floating-code floating-code-3">git push origin main</div>
          <div className="floating-code floating-code-4">{'// no bugs here 🚀'}</div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Available for assignments
          </div>
          <h1 className="hero-title">
            <span className="hero-line">Assignments Piling Up?</span>
            <span className="hero-line hero-gradient">We've Got You Covered.</span>
          </h1>
          <p className="hero-subtitle">
            With <strong>1+ year</strong> of experience and <strong>25+ completed projects</strong>,
            our undergraduate team delivers clean, reliable IT & software engineering work — without the stress.
          </p>
          <div className="hero-actions">
            <a href="https://www.fiverr.com/s/7YeYXKL" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
              View My Gig on Fiverr
            </a>
            <Link to="/projects" className="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              See Our Work
            </Link>
          </div>
          <div className="hero-stats-row" ref={statsRef}>
            <StatCounter target={25} suffix="+" label="Projects Done" animate={statsCounted} />
            <div className="hero-stat-divider"></div>
            <StatCounter target={1} suffix="+" label="Year Experience" animate={statsCounted} />
            <div className="hero-stat-divider"></div>
            <StatCounter target={100} suffix="%" label="On-Time Delivery" animate={statsCounted} />
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{'// about us'}</span>
            <h2 className="section-title">Your Assignment <span className="gradient-text">Lifeline</span></h2>
            <p className="section-desc">We're a team of undergraduate developers who've been through the same grind. We know the struggle — and we're here to help.</p>
          </div>
          <div className="about-grid">
            <div className="about-card about-card-main">
              <div className="about-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3>Undergraduate Team</h3>
              <p>We're students helping students. We understand your curriculum, your deadlines, and your professors' expectations — because we've been there.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3>Clean Code</h3>
              <p>Well-structured, documented, and easy to present. Your professor will approve.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3>Fast Delivery</h3>
              <p>We work within your timeline. Even tight deadlines are manageable for us.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3>Friendly Support</h3>
              <p>Message us anytime. We'll explain the code so you can confidently present it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{'// process'}</span>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-desc">Getting your assignment done is simple — just 4 steps and you're stress-free.</p>
          </div>
          <div className="process-timeline">
            {[
              { num: '01', title: 'Send Your Requirements', desc: 'Message us on Fiverr or WhatsApp with your assignment details, deadline, and any specific instructions.' },
              { num: '02', title: 'Get a Quick Quote', desc: 'We review your requirements and give you a fair price with a clear timeline.' },
              { num: '03', title: 'We Build & Deliver', desc: 'Our team works on your project with regular updates and clean, well-documented code.' },
              { num: '04', title: 'Review & Submit', desc: 'You review the work, we make any revisions needed, and you submit with confidence.' },
            ].map((step) => (
              <div key={step.num} className="process-step">
                <div className="process-number">{step.num}</div>
                <div className="process-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCounter({ target, suffix, label, animate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * target));
      if (progress < 1) requestAnimationFrame(update);
      else setCount(target);
    }
    requestAnimationFrame(update);
  }, [animate, target]);

  return (
    <div className="hero-stat">
      <span className="hero-stat-number">{count}</span>
      <span className="hero-stat-plus">{suffix}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}
