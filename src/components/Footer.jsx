import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="CJ Code Solutions" />
            </Link>
            <p>Helping students deliver quality IT & software engineering projects since 2025.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/reviews">Reviews</Link>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="https://wa.me/94779446684" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="mailto:cjcodesolutions@gmail.com">Email</a>
              <a href="https://www.fiverr.com/s/7YeYXKL" target="_blank" rel="noopener noreferrer">Fiverr</a>
              <a href="https://github.com/cjcodesolutions" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CJ Code Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
