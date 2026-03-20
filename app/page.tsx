"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01",
    title: "Project Alpha",
    description: "A full-stack web app that does something incredible.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "#",
  },
  {
    id: "02",
    title: "Project Beta",
    description: "An ML model that predicts the future (almost).",
    tags: ["Python", "TensorFlow", "FastAPI"],
    link: "#",
  },
  {
    id: "03",
    title: "Project Gamma",
    description: "A mobile app built for speed and simplicity.",
    tags: ["React Native", "Firebase"],
    link: "#",
  },
];

export default function Page() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);

    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:ital,wght@0,400;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0a;
          --fg: #f0ece4;
          --accent: #ff4d00;
          --accent2: #ffcc00;
          --muted: #2a2a2a;
          --border: rgba(240,236,228,0.1);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--fg);
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        ::selection { background: var(--accent); color: var(--bg); }

        .cursor {
          position: fixed;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease, width 0.2s, height 0.2s, background 0.2s;
          mix-blend-mode: difference;
        }

        .cursor-ring {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1px solid var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: left 0.12s ease, top 0.12s ease, width 0.2s, height 0.2s;
          opacity: 0.5;
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 3rem;
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(12px);
          background: rgba(10,10,10,0.6);
        }

        .nav-logo {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--fg);
          text-decoration: none;
        }

        .nav-logo span { color: var(--accent); }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          font-size: 0.8rem;
          font-family: 'DM Mono', monospace;
          color: rgba(240,236,228,0.5);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: var(--fg); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 6rem 3rem 4rem;
          position: relative;
          overflow: hidden;
        }

        .hero-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(8rem, 20vw, 22rem);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px rgba(240,236,228,0.04);
          white-space: nowrap;
          pointer-events: none;
          letter-spacing: -0.04em;
          user-select: none;
        }

        .hero-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }

        .hero-tag.visible { opacity: 1; transform: translateY(0); }

        .hero-title {
          font-size: clamp(3.5rem, 9vw, 9rem);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.04em;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }

        .hero-title.visible { opacity: 1; transform: translateY(0); }

        .hero-title .outline {
          -webkit-text-stroke: 2px var(--fg);
          color: transparent;
        }

        .hero-title .accent { color: var(--accent); }

        .hero-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s;
        }

        .hero-bottom.visible { opacity: 1; transform: translateY(0); }

        .hero-desc {
          max-width: 380px;
          font-size: 1rem;
          color: rgba(240,236,228,0.5);
          line-height: 1.7;
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
        }

        .hero-scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: rgba(240,236,228,0.3);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }

        /* MARQUEE */
        .marquee-wrap {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
          overflow: hidden;
          background: var(--accent);
        }

        .marquee-track {
          display: flex;
          gap: 3rem;
          animation: marquee 18s linear infinite;
          width: max-content;
        }

        .marquee-track span {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--bg);
          white-space: nowrap;
        }

        .marquee-track .dot {
          color: rgba(10,10,10,0.4);
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* PROJECTS */
        .projects-section {
          padding: 8rem 3rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.5rem;
        }

        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--accent);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .section-count {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: rgba(240,236,228,0.3);
          letter-spacing: 0.1em;
        }

        .project-list { display: flex; flex-direction: column; }

        .project-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          align-items: start;
          gap: 2rem;
          padding: 2.5rem 0;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: background 0.3s;
          position: relative;
          overflow: hidden;
        }

        .project-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: var(--muted);
          transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 0;
        }

        .project-item:hover::before { width: 100%; }

        .project-item > * { position: relative; z-index: 1; }

        .project-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent);
          padding-top: 0.3rem;
          letter-spacing: 0.05em;
        }

        .project-info { display: flex; flex-direction: column; gap: 0.75rem; }

        .project-title {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          transition: color 0.2s;
        }

        .project-item:hover .project-title { color: var(--accent2); }

        .project-desc {
          font-size: 0.85rem;
          color: rgba(240,236,228,0.45);
          font-family: 'DM Mono', monospace;
          max-width: 500px;
          line-height: 1.6;
        }

        .project-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.25rem 0.6rem;
          border: 1px solid var(--border);
          color: rgba(240,236,228,0.4);
          transition: border-color 0.2s, color 0.2s;
        }

        .project-item:hover .tag {
          border-color: var(--accent2);
          color: var(--accent2);
        }

        .project-arrow {
          font-size: 1.5rem;
          color: rgba(240,236,228,0.2);
          transition: transform 0.3s, color 0.3s;
          padding-top: 0.2rem;
          align-self: center;
        }

        .project-item:hover .project-arrow {
          transform: translate(4px, -4px);
          color: var(--accent2);
        }

        /* ABOUT */
        .about-section {
          padding: 8rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          border-top: 1px solid var(--border);
        }

        .about-left .big-text {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 2rem;
        }

        .about-left .big-text span { color: var(--accent); }

        .about-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2rem;
        }

        .about-right p {
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          color: rgba(240,236,228,0.55);
          line-height: 1.8;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .skill-chip {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border);
          color: rgba(240,236,228,0.5);
          text-align: center;
          transition: all 0.2s;
        }

        .skill-chip:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(255,77,0,0.05);
        }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border);
          padding: 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        footer p {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: rgba(240,236,228,0.25);
          letter-spacing: 0.05em;
        }

        .social-links {
          display: flex;
          gap: 2rem;
        }

        .social-links a {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: rgba(240,236,228,0.35);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .social-links a:hover { color: var(--accent); }

        @media (max-width: 768px) {
          nav { padding: 1rem 1.5rem; }
          .nav-links { gap: 1.5rem; }
          .hero { padding: 5rem 1.5rem 3rem; }
          .hero-title { font-size: clamp(2.8rem, 12vw, 5rem); }
          .hero-bottom { flex-direction: column; gap: 2rem; align-items: flex-start; }
          .projects-section { padding: 5rem 1.5rem; }
          .project-item { grid-template-columns: 50px 1fr; }
          .project-arrow { display: none; }
          .about-section { grid-template-columns: 1fr; gap: 3rem; padding: 5rem 1.5rem; }
          footer { flex-direction: column; gap: 1.5rem; padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* Custom cursor */}
      <div
        className="cursor"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <div
        className="cursor-ring"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Nav */}
      <nav>
        <a href="#" className="nav-logo">
          Aryan<span>.</span>
        </a>
        <ul className="nav-links">
          <li><a href="#projects">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="mailto:you@email.com">Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg-text">ARYAN</div>

        <p className={`hero-tag ${loaded ? "visible" : ""}`}>
          ✦ Available for opportunities
        </p>

        <h1 className={`hero-title ${loaded ? "visible" : ""}`}>
          I build<br />
          <span className="outline">things for</span><br />
          the <span className="accent">web.</span>
        </h1>

        <div className={`hero-bottom ${loaded ? "visible" : ""}`}>
          <p className="hero-desc">
            High school student in Colorado — obsessed with building
            products that are fast, beautiful, and actually useful.
          </p>
          <div className="hero-scroll">
            <div className="scroll-line" />
            <span>scroll</span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {Array(2).fill(null).map((_, i) => (
            <div key={i} style={{ display: "flex", gap: "3rem" }}>
              {["React", "★", "Next.js", "★", "TypeScript", "★", "Node.js", "★", "Tailwind", "★", "PostgreSQL", "★", "Python", "★", "Open to work", "★"].map((item, j) => (
                <span key={j} className={item === "★" ? "dot" : ""}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <section className="projects-section" id="projects">
        <div className="section-header">
          <span className="section-label">Selected Work</span>
          <span className="section-count">{String(projects.length).padStart(2, "0")} projects</span>
        </div>

        <div className="project-list">
          {projects.map((project, i) => (
            <a
              key={project.id}
              href={project.link}
              className="project-item"
              style={{ textDecoration: "none", color: "inherit" }}
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <span className="project-num">{project.id}</span>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <span className="project-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <div className="about-left">
          <h2 className="big-text">
            Code.<br />
            <span>Create.</span><br />
            Ship.
          </h2>
        </div>
        <div className="about-right">
          <p>
            I'm Aryan — a high school student from Colorado Springs with a
            passion for building things on the internet. I love turning ideas
            into real products that people actually use.
          </p>
          <p>
            When I'm not coding, I'm probably tinkering with some new tech,
            playing sports, or looking for my next big project idea.
          </p>
          <div className="skills-grid">
            {["React", "Next.js", "TypeScript", "Python", "Node.js", "Tailwind", "PostgreSQL", "Git", "Figma"].map((s) => (
              <div key={s} className="skill-chip">{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Aryan Tuteja — Built with Next.js</p>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:you@email.com">Email</a>
        </div>
      </footer>
    </>
  );
}