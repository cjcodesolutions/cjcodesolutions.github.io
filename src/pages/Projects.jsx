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
        </div>
      </section>
    </div>
  );
}
