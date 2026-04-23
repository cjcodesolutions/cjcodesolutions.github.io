import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const filters = [
  { label: 'All Projects', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'AI / ML', value: 'ai' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Blockchain', value: 'blockchain' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category.includes(activeFilter);
  });

  return (
    <div className="page-transition">
      <section className="section" style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{'// portfolio'}</span>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <p className="section-desc">Here's a glimpse of the 25+ projects we've successfully delivered. Each one built with care, tested thoroughly, and delivered on time.</p>
          </div>
          <div className="projects-filter">
            {filters.map((f) => (
              <button
                key={f.value}
                className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="projects-more">
            <a href="https://github.com/cjcodesolutions" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
