"use client";

import { useEffect, useState } from "react";

const PROJECTS = [
  {
    num: "001",
    title: "EcoIdentify",
    year: "2024",
    role: "Founder & Lead Engineer",
    desc: "Built a full automated recycling bin with 8 engineers using a machine vision model. Sorted 5lbs of waste in just one week.",
    tags: ["Raspberry Pi", "Roboflow", "TensorFlow", "Python"],
    link: "https://ecoclimsolutions.wordpress.com/ecoidentifyv2-0/",
    big: true,
  },
  {
    num: "002",
    title: "Mars Aerobraking Sim",
    year: "2024-25",
    role: "Student Researcher · UCCS",
    desc: "Collaborated with Dr. Lynnane George to simulate crewed Mars surface insertion via aerobraking using MarsGRAM and a RK4 propagator.",
    tags: ["Python", "MarsGRAM", "RK4", "Aerospace"],
    link: "https://github.com/Infinity500/Aerobraking-Research",
    big: true,
  },
  {
    num: "003",
    title: "Topicly",
    year: "2022-Now",
    role: "Founder",
    desc: "Today, more than 64 million research papers have been published, yet access to this research remains limited. Topicly, an organization that initially started as a STEM magazine website, has today turned into a full-fl fledged research platform.",
    tags: ["Research", "Community"],
    link: "https://topiclyorg.wordpress.com",
    big: true,
  },
];

const ROLES = [
  { title: "Safety & Training Captain", place: "Rocky Mountain Robotics FIRST Team 662", when: "Aug 2025–" },
  { title: "Cybersecurity Researcher", place: "UCCS Lab for Cybersecurity Dynamics", when: "May 2025–" },
  { title: "Aerospace Researcher", place: "University of Colorado Colorado Springs", when: "Apr 2024–" },
  { title: "Quantum Pre-Apprentice", place: "Infinite 8 Institute", when: "Jun 2023–" },
  { title: "Founder & Lead", place: "Topicly", when: "Jun 2022–" },
  { title: "Founder & Head Developer", place: "EcoClim Solutions", when: "Nov 2023–" },
];



export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const iv = setInterval(() => setTick(t => t + 1), 1000);
    const onMove = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => { clearInterval(iv); window.removeEventListener("mousemove", onMove); };
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&family=JetBrains+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0E0E0E;
          --ink: #F0EBE1;
          --electric: #00C2FF;
          --lime: #B8FF3C;
          --mid: #6B6B6B;
          --rule: rgba(240,235,225,0.08);
          --grad-a: #00C2FF;
          --grad-b: #B8FF3C;
          --grad-c: #FF6B6B;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--ink);
          font-family: 'Fraunces', Georgia, serif;
          overflow-x: hidden;
          cursor: none;
        }

        ::selection { background: var(--electric); color: #0E0E0E; }

        .cur-dot {
          position: fixed; width: 8px; height: 8px;
          background: var(--ink); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transform: translate(-50%,-50%);
          transition: background 0.2s, transform 0.2s;
        }
        .cur-dot.active { background: var(--electric); transform: translate(-50%,-50%) scale(1.5); }
        .cur-ring {
          position: fixed; width: 36px; height: 36px;
          border: 1px solid rgba(240,235,225,0.3); border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transform: translate(-50%,-50%);
          transition: left 0.09s ease, top 0.09s ease, border-color 0.2s;
        }
        .cur-ring.active { border-color: var(--electric); }

        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 1rem 2.5rem;
          border-bottom: 1px solid var(--rule);
          background: rgba(14,14,14,0.88);
          backdrop-filter: blur(16px);
        }
        .nav-left {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.05em;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .nav-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--lime);
          animation: pulse 2.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .nav-logo-wrap {
          display: flex; align-items: center; gap: 0.75rem;
          text-decoration: none; justify-content: center;
        }
        .nav-initials {
          width: 32px; height: 32px; border-radius: 6px;
          background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem; letter-spacing: 0.05em;
          color: #0E0E0E;
        }
        .nav-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 0.08em;
          color: var(--ink);
        }
        .nav-right {
          display: flex; gap: 2rem;
          justify-content: flex-end; list-style: none;
        }
        .nav-right a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300;
          color: var(--mid); text-decoration: none;
          letter-spacing: 0.12em; text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-right a:hover { color: var(--ink); }

        .hero {
          padding: 9rem 2.5rem 3rem;
          min-height: 100vh;
          display: grid;
          grid-template-rows: 1fr auto;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--rule);
        }

        .hero-watermark {
          position: absolute;
          right: -2rem; top: 50%; transform: translateY(-55%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(12rem, 30vw, 28rem);
          line-height: 1;
          background: linear-gradient(135deg, rgba(0,194,255,0.07) 0%, rgba(184,255,60,0.04) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          pointer-events: none; user-select: none;
          letter-spacing: -0.02em;
        }

        .hero-main { display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 1; }

        .hero-eyebrow {
          display: flex; align-items: center; gap: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 1.5rem;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s;
        }
        .hero-eyebrow.in { opacity: 1; transform: none; }
        .eyebrow-badge {
          padding: 0.2rem 0.6rem;
          border: 1px solid var(--lime);
          color: var(--lime);
          font-size: 0.58rem; letter-spacing: 0.12em;
          border-radius: 2px;
        }

        .hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4.5rem, 14vw, 15rem);
          line-height: 0.88; letter-spacing: 0.01em;
          color: var(--ink);
          opacity: 0; transform: translateY(60px);
          transition: opacity 0.75s ease 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s;
        }
        .hero-name.in { opacity: 1; transform: none; }
        .hero-name .stroke {
          -webkit-text-stroke: 1.5px var(--ink);
          color: transparent;
        }
        .hero-name .grad {
          background: linear-gradient(90deg, var(--grad-a), var(--grad-b));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-tagline {
          margin-top: 2.5rem;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 2rem; align-items: end;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
          position: relative; z-index: 1;
        }
        .hero-tagline.in { opacity: 1; transform: none; }
        .hero-tagline p {
          font-size: clamp(0.95rem, 1.5vw, 1.2rem);
          font-weight: 300; font-style: italic;
          line-height: 1.6; color: rgba(240,235,225,0.6);
        }
        .hero-tagline em { color: var(--electric); font-style: normal; }

        .hero-stats { display: flex; gap: 2rem; justify-content: flex-end; align-items: flex-end; }
        .stat-item { text-align: right; }
        .stat-n {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.8rem; line-height: 1;
          background: linear-gradient(135deg, var(--electric), var(--lime));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-l {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hero-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 2rem; border-top: 1px solid var(--rule);
          position: relative; z-index: 1;
          opacity: 0; transition: opacity 0.5s ease 0.6s;
        }
        .hero-footer.in { opacity: 1; }
        .hero-tags-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .hero-tag-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 300;
          padding: 0.25rem 0.65rem;
          border: 1px solid var(--rule); color: var(--mid);
          border-radius: 999px; letter-spacing: 0.06em;
        }
        .hero-scroll {
          display: flex; align-items: center; gap: 0.6rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; color: var(--mid);
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .scroll-arrow {
          width: 26px; height: 26px;
          border: 1px solid var(--rule); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          animation: bob 2s ease-in-out infinite;
        }
        @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }



        .divider {
          display: flex; align-items: center; gap: 1.5rem;
          padding: 0.9rem 2.5rem;
          border-bottom: 1px solid var(--rule);
        }
        .div-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.2em;
          text-transform: uppercase; white-space: nowrap;
        }
        .div-line { flex: 1; height: 1px; background: var(--rule); }

        .projects { padding: 0 2.5rem 6rem; }
        .proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }

        .proj-card {
          padding: 3rem 2.5rem 3rem 0;
          border-bottom: 1px solid var(--rule);
          border-right: 1px solid var(--rule);
          text-decoration: none; color: inherit;
          display: block; position: relative; overflow: hidden;
          cursor: none; transition: background 0.3s;
        }
        .proj-card:nth-child(even) { padding: 3rem 0 3rem 2.5rem; border-right: none; }
        .proj-card.big { grid-column: 1 / -1; padding: 3.5rem 0; border-right: none; }
        .proj-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,194,255,0.12), rgba(184,255,60,0.08));
          opacity: 0; transition: opacity 0.4s;
        }
        .proj-card:hover::before { opacity: 1; }
        .proj-card > * { position: relative; z-index: 1; }

        .proj-top {
          display: flex; justify-content: space-between;
          align-items: baseline; margin-bottom: 1rem;
        }
        .proj-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.1em;
        }
        .proj-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300; color: var(--mid);
        }
        .proj-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 4rem);
          line-height: 0.95; letter-spacing: 0.02em; margin-bottom: 0.75rem;
          transition: color 0.3s;
        }
        .proj-card.big .proj-title { font-size: clamp(3rem, 6vw, 6rem); }
        .proj-card:hover .proj-title {
          background: linear-gradient(90deg, var(--electric), var(--lime));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .proj-role {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.05em; margin-bottom: 0.75rem;
        }
        .proj-desc {
          font-size: 0.88rem; font-weight: 300; line-height: 1.7;
          color: rgba(240,235,225,0.45); max-width: 520px;
        }
        .proj-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 1.2rem; }
        .proj-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.56rem; font-weight: 300;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.18rem 0.5rem;
          border: 1px solid var(--rule); color: var(--mid);
          transition: all 0.2s;
        }
        .proj-card:hover .proj-tag { border-color: rgba(0,194,255,0.3); color: var(--electric); }

        .about { border-bottom: 1px solid var(--rule); }
        .about-grid {
          display: grid; grid-template-columns: 1fr 1.4fr;
        }

        .about-col1 {
          padding: 5rem 2.5rem;
          border-right: 1px solid var(--rule);
          display: flex; flex-direction: column; gap: 3rem;
        }

        .initials-block { position: relative; }
        .initials-bg {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(6rem, 12vw, 12rem);
          line-height: 0.85; letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--grad-a) 0%, var(--grad-b) 50%, var(--grad-c) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }
        .initials-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.15em;
          text-transform: uppercase; margin-top: 0.5rem;
        }

        .about-quote {
          font-size: 1rem; font-weight: 300; font-style: italic;
          line-height: 1.7; color: rgba(240,235,225,0.55);
          border-left: 2px solid var(--electric);
          padding-left: 1.25rem;
        }
        .about-quote em { color: var(--electric); font-style: normal; }

        .about-col2 {
          padding: 5rem 3rem;
          border-right: 1px solid var(--rule);
        }
        .about-col2 h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem; letter-spacing: 0.02em;
          margin-bottom: 2rem;
        }
        .about-body p {
          font-size: 0.9rem; font-weight: 300;
          line-height: 1.85; color: rgba(240,235,225,0.55);
          margin-bottom: 1.1rem;
        }
        .about-body p strong { color: var(--ink); font-weight: 700; }
        .about-body p .elec { color: var(--electric); }

        .skills-wrap { margin-top: 2.5rem; }
        .skills-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 0.85rem;
        }
        .skills-list { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .skill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300;
          padding: 0.3rem 0.7rem;
          border: 1px solid var(--rule);
          color: var(--mid); letter-spacing: 0.05em;
          transition: all 0.2s;
        }
        .skill:hover { border-color: var(--lime); color: var(--lime); }





        .experience { padding: 0 2.5rem 6rem; }
        .exp-row {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center; gap: 2rem;
          padding: 1.6rem 1rem 1.6rem 0;
          border-bottom: 1px solid var(--rule);
          transition: padding-left 0.3s;
        }
        .exp-row:hover { padding-left: 0.75rem; }
        .exp-row:hover .exp-title {
          background: linear-gradient(90deg, var(--electric), var(--lime));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .exp-idx {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.1em;
        }
        .exp-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem; letter-spacing: 0.03em;
          transition: color 0.25s;
        }
        .exp-place {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300;
          color: var(--mid); margin-top: 0.2rem;
        }
        .exp-when {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 300;
          color: var(--mid); white-space: nowrap;
        }

        .contact { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
        .contact-left { padding: 5rem 2.5rem; border-right: 1px solid var(--rule); display: flex; flex-direction: column; justify-content: space-between; }
        .contact-big {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 7vw, 8rem); line-height: 0.88; letter-spacing: 0.01em;
        }
        .contact-big .grad-text {
          background: linear-gradient(135deg, var(--electric), var(--lime));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-note {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.05em; line-height: 1.8;
        }
        .contact-right { padding: 5rem 2.5rem 5rem 4rem; display: flex; flex-direction: column; justify-content: space-between; }
        .contact-links { display: flex; flex-direction: column; gap: 1.2rem; }
        .contact-link {
          font-family: 'Fraunces', serif;
          font-size: 1.4rem; font-weight: 300; font-style: italic;
          color: rgba(240,235,225,0.5); text-decoration: none;
          display: flex; align-items: center; gap: 0.75rem;
          transition: color 0.2s;
        }
        .contact-link:hover { color: var(--ink); }
        .contact-link:hover .cl-label { color: var(--electric); }
        .cl-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.1em;
          text-transform: uppercase; font-style: normal;
          transition: color 0.2s;
        }

        footer {
          padding: 1.4rem 2.5rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        footer p {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 300;
          color: var(--mid); letter-spacing: 0.06em;
        }
        .footer-sig {
          font-family: 'Fraunces', serif;
          font-style: italic; font-size: 0.85rem;
          color: var(--mid);
        }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-col1 { border-right: none; }
          .contact { grid-template-columns: 1fr; }
          .contact-left { border-right: none; }
        }
        @media (max-width: 768px) {
          nav { grid-template-columns: auto 1fr; }
          .nav-left { display: none; }
          .nav-right { gap: 1.2rem; }
          .hero { padding: 7rem 1.5rem 2.5rem; }
          .hero-watermark { display: none; }
          .hero-tagline { grid-template-columns: 1fr; }
          .hero-stats { justify-content: flex-start; }
          .divider, .projects, .experience { padding-left: 1.5rem; padding-right: 1.5rem; }
          .proj-grid { grid-template-columns: 1fr; }
          .proj-card, .proj-card:nth-child(even), .proj-card.big { padding: 2.5rem 0; border-right: none; }
            .about-col1, .about-col2 { padding: 3rem 1.5rem; }
          .exp-row { grid-template-columns: 50px 1fr; }
          .exp-when { display: none; }
          .contact-left, .contact-right { padding: 3rem 1.5rem; }
          footer { flex-direction: column; gap: 0.5rem; text-align: center; padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className={`cur-dot ${hovered !== null ? "active" : ""}`} style={{ left: mouseX, top: mouseY }} />
      <div className={`cur-ring ${hovered !== null ? "active" : ""}`} style={{ left: mouseX, top: mouseY }} />

      <nav>
        <div className="nav-left">
          <div className="nav-dot" />
          {timeStr} · COS, CO
        </div>
        <a href="#top" className="nav-logo-wrap">
          <div className="nav-initials">AT</div>
          <span className="nav-name">ARYAN TUTEJA</span>
        </a>
        <ul className="nav-right">
          <li><a href="#work">Work</a></li>
          <li><a href="/research">Research</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="top">
        <div className="hero-watermark">AT</div>
        <div className="hero-main">
          <div className={`hero-eyebrow ${loaded ? "in" : ""}`}>
            <span className="eyebrow-badge">Class of 2026</span>
            Discovery Canyon Campus · Colorado Springs, CO
          </div>
          <h1 className={`hero-name ${loaded ? "in" : ""}`}>
            BUILDER<br />
            <span className="stroke">RESEARCHER</span><br />
            <span className="grad">FOUNDER</span>
          </h1>
          <div className={`hero-tagline ${loaded ? "in" : ""}`}>
            <p>
              I dismantle things to understand them.<br />
              Then build something better.<br />
              But through every project. <br />
              The question remains the same:<br />
              <em>What if?</em>
            </p>
            </div>
        </div>
        <div className={`hero-footer ${loaded ? "in" : ""}`}>
          <div className="hero-tags-row">
            {["Electrical Engineering", "FIRST Robotics", "Speech & Debate"].map(t => (
              <span key={t} className="hero-tag-pill">{t}</span>
            ))}
          </div>
          <div className="hero-scroll">
            <div className="scroll-arrow">↓</div>
            scroll
          </div>
        </div>
      </section>

      <div className="divider" id="work">
        <div className="div-label">Research</div>
        <div className="div-line" />
        <div className="div-label">{String(PROJECTS.length).padStart(2)} projects</div>
      </div>
      <section className="projects">
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <a
              key={p.num}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className={`proj-card${p.big ? " big" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="proj-top">
                <span className="proj-num">{p.num}</span>
                <span className="proj-year">{p.year}</span>
              </div>
              <h2 className="proj-title">{p.title}</h2>
              <div className="proj-role">{p.role}</div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="divider" id="about">
        <div className="div-label">About</div>
        <div className="div-line" />
      </div>
      <section className="about">
        <div className="about-grid">
          <div className="about-col1">
            <div className="initials-block">
              <span className="initials-bg">AT</span>
              <div className="initials-sub">Aryan Tuteja · b. 2007 · Colorado</div>
            </div>
            <blockquote className="about-quote">
              "Someone who debates in a three-piece suit on weekends and dodges flying slippers
              from an angry sibling on weekdays, but every day dares to ask, <em>'What if?'</em>"
            </blockquote>
          </div>

          <div className="about-col2">
            <h3>The Full Picture</h3>
            <div className="about-body">
              <p>
                I'm a <strong>senior at Discovery Canyon Campus</strong> As soon as I heard the $6,000 price tag to work with a university researcher,
                I looked for solutions. Eventually, I built Topicly instead. Now connecting 32+ students from 9 countries with professors, for free.
                That's the kind of barrier I enjoy tearing down.
              </p>
              <p>
                My mission is to <strong>make research accessible, and allow everyone to transform theoretical ideas into reality</strong>. 
                I'm also always eager to learn and grow, continuously seeking out new opportunities to expand my knowledge. 
              </p>
              <p>
                In my freetime, you can find me at <strong>an aerospace research lab</strong> simulating crewed Mars landings, <strong>a cybersecurity research lab</strong> workingon
                satellite vulnerabilities, <span className="elec">a FIRST Robotics competition</span> leading safety and training, or
                <strong>a Speech & Debate round</strong> competing in International Extemporaneous speaking.
              </p>
              <p>
                Aspiring <strong>electrical engineer</strong>, fascinated by semiconductors, photovoltaics,
                and quantum computing.
              </p>
            </div>
            <div className="skills-wrap">
              <div className="skills-label">Technical Stack</div>
              <div className="skills-list">
                {["React","Next.js","Python","TensorFlow","Roboflow","Raspberry Pi","MarsGRAM","JPL Horizons","Streamlit","Git","Breadboarding"].map(s => (
                  <span key={s} className="skill">{s}</span>
                ))}
              </div>
            </div>
          </div>


        </div>
      </section>

      <div className="divider">
        <div className="div-label">Experience</div>
        <div className="div-line" />
        <div className="div-label">{String(ROLES.length).padStart(2,"0")} roles</div>
      </div>
      <section className="experience">
        {ROLES.map((r, i) => (
          <div className="exp-row" key={i}
            onMouseEnter={() => setHovered(100+i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="exp-idx">{String(i+1).padStart(2,"0")}</div>
            <div>
              <div className="exp-title">{r.title}</div>
              <div className="exp-place">{r.place}</div>
            </div>
            <div className="exp-when">{r.when}</div>
          </div>
        ))}
      </section>

      <div className="divider" id="contact">
        <div className="div-label">Get in Touch</div>
        <div className="div-line" />
      </div>
      <section className="contact">
        <div className="contact-left">
          <div className="contact-big">
            LET'S<br />
            BUILD<br />
            <span className="grad-text">SOMETHING.</span>
          </div>
          <p className="contact-note">
            Open to internships, research collaborations,<br />
            and conversations about hard problems.<br />
            The problems worth solving are never the easy ones.
          </p>
        </div>
        <div className="contact-right">
          <div className="contact-links">
            <a href="mailto:aryantutejacollege@gmail.com" className="contact-link">
              <span className="cl-label">Email</span>
              aryantutejacollege@gmail.com
            </a>
            <a href="https://linkedin.com/in/aryantuteja1" target="_blank" rel="noreferrer" className="contact-link">
              <span className="cl-label">LinkedIn</span>
              /in/aryantuteja1
            </a>
            <a href="https://topiclyorg.wordpress.com" target="_blank" rel="noreferrer" className="contact-link">
              <span className="cl-label">Topicly</span>
              topiclyorg.wordpress.com
            </a>
            <a href="https://github.com/Infinity500" target="_blank" rel="noreferrer" className="contact-link">
              <span className="cl-label">GitHub</span>
              github.com/Infinity500
            </a>
          </div>
          <p className="contact-note">
            Discovery Canyon Campus High School<br />
            Class of 2026 · Colorado Springs, CO
          </p>
        </div>
      </section>

      <footer>
        <p>© 2026 Aryan Tuteja, MIT LICENSE</p>
        <span className="footer-sig">What if?</span>
      </footer>
    </>
  );
}
