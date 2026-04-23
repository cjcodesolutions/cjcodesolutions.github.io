import { useState, useEffect } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={`preloader ${hidden ? 'hidden' : ''}`}>
      <div className="preloader-inner">
        <div className="preloader-logo">
          <img src="/logo.png" alt="CJ Code Solutions" />
        </div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
