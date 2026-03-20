"use client";

import { useEffect, useState } from "react";

const IB_WORK = [
  {
    num: "001",
    subject: "Extended Essay",
    subject_area: "Business Management",
    title: "Microsoft 365 Copilot and Enterprise Productivity",
    question: "To what extent has Microsoft's deployment of Microsoft 365 Copilot impacted the organization and productivity for global enterprise consumers?",
    words: "3,951",
    desc: "An analysis of AI-driven productivity at enterprise scale. Examines individual cognitive gains, organizational implementation challenges, SWOT analysis, revenue growth trajectory, and shifts in investor confidence across Microsoft's global consumer base.",
    sections: ["Individual Productivity Gains", "Enterprise Scale Implementation", "SWOT Analysis", "Revenue Growth & Market Position", "Investor Confidence"],
    link: "",
  },
  {
    num: "002",
    subject: "Literature HL Essay",
    subject_area: "Language & Literature HL",
    title: "Identity Under Oppression in Maus",
    question: "How and to what extent does Art Spiegelman utilize fragmentation, motifs, and personification in Maus: A Survivor's Tale to illustrate the removal of cultural, social, and personal identities under an oppressive regime?",
    words: "1,471",
    desc: "A close literary analysis of Spiegelman's Pulitzer Prize-winning graphic novel. Investigates how visual fragmentation, recurring motifs, and animal personification expose the systematic erasure of Jewish identity under the Nazi regime.",
    sections: ["Fragmentation", "Motifs", "Personification", "Cultural Identity", "Social Identity"],
    link: "",
  },
  {
    num: "003",
    subject: "Mathematics IA",
    subject_area: "Mathematics AA SL",
    title: "Kinematics and Natural Phenomenon",
    question: "Do kinematics equations accurately predict natural phenomenon?",
    words: "3,651",
    desc: "Inspired by Roger Federer's tennis mechanics, this IA investigates systematic discrepancies between kinematic predictions and real-world projectile motion times. Controlled experimentation quantifies estimation error and explores its implications for applied physics.",
    sections: ["Kinematic Modeling", "Experimental Design", "Error Analysis", "Statistical Comparison"],
    link: "",
  },
  {
    num: "004",
    subject: "Physics IA",
    subject_area: "Physics SL",
    title: "Electrical Resistance and Temperature",
    question: "How is the electrical resistance of a copper coil influenced by changes in temperature?",
    words: "In progress",
    desc: "An experimental investigation into how temperature affects the resistivity of copper conductors. Explores implications for precision electrical engineering, semiconductor design, and thermal performance of electrical devices.",
    sections: ["Resistance Theory", "Experimental Setup", "Temperature Variation", "Data Analysis"],
    link: "",
  },
  {
    num: "005",
    subject: "Psychology IA",
    subject_area: "Psychology SL",
    title: "Memory Recall Conditions",
    question: "To what extent does the type of memory recall condition impact the accuracy of memory retrieval among high school students?",
    words: "2,160",
    desc: "A replication of Bahrick et al. (1975) investigating how free recall vs. cued recall conditions affect memory accuracy. Conducted with high school student participants, examining ecological validity and retrieval-induced forgetting.",
    sections: ["Theory", "Replication Design", "Sample Characteristics", "Ethical Considerations", "Results"],
    link: "",
  },
  {
    num: "006",
    subject: "Theory of Knowledge Essay",
    subject_area: "Theory of Knowledge",
    title: "Doubt and the Pursuit of Knowledge",
    question: "To what extent do you agree that doubt is central to the pursuit of knowledge?",
    words: "1,593",
    desc: "Drawing on Descartes' methodological skepticism, this essay examines how rigorous doubt functions as a utility for establishing certainty and creating new knowledge across natural sciences and history.",
    sections: ["Methodological Doubt", "Natural Sciences", "History", "Limits of Doubt"],
    link: "",
  },
];

export default function ResearchPage() {
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
          --bg: #0E0E0E; --ink: #F0EBE1; --electric: #00C2FF;
          --lime: #B8FF3C; --mid: #6B6B6B; --rule: rgba(240,235,225,0.08);
          --grad-a: #00C2FF; --grad-b: #B8FF3C; --grad-c: #FF6B6B;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--ink); font-family: 'Fraunces', Georgia, serif; overflow-x: hidden; cursor: none; }
        ::selection { background: var(--electric); color: #0E0E0E; }

        .cur-dot { position: fixed; width: 8px; height: 8px; background: var(--ink); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); transition: background 0.2s, transform 0.2s; }
        .cur-dot.active { background: var(--electric); transform: translate(-50%,-50%) scale(1.5); }
        .cur-ring { position: fixed; width: 36px; height: 36px; border: 1px solid rgba(240,235,225,0.3); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); transition: left 0.09s ease, top 0.09s ease, border-color 0.2s; }
        .cur-ring.active { border-color: var(--electric); }

        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 1rem 2.5rem; border-bottom: 1px solid var(--rule); background: rgba(14,14,14,0.88); backdrop-filter: blur(16px); }
        .nav-left { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 300; color: var(--mid); letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem; }
        .nav-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--lime); animation: pulse 2.5s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .nav-logo-wrap { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; justify-content: center; }
        .nav-initials { width: 32px; height: 32px; border-radius: 6px; background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 0.85rem; letter-spacing: 0.05em; color: #0E0E0E; }
        .nav-name { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.08em; color: var(--ink); }
        .nav-right { display: flex; gap: 2rem; justify-content: flex-end; list-style: none; }
        .nav-right a { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 300; color: var(--mid); text-decoration: none; letter-spacing: 0.12em; text-transform: uppercase; transition: color 0.2s; }
        .nav-right a:hover { color: var(--ink); }

        /* HERO */
        .hero { padding: 9rem 2.5rem 4rem; border-bottom: 1px solid var(--rule); position: relative; overflow: hidden; }
        .hero-watermark { position: absolute; right: -1rem; top: 50%; transform: translateY(-55%); font-family: 'Bebas Neue', sans-serif; font-size: clamp(10rem, 22vw, 22rem); line-height: 1; background: linear-gradient(135deg, rgba(0,194,255,0.06), rgba(184,255,60,0.03)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; pointer-events: none; user-select: none; }
        .hero-eyebrow { display: flex; align-items: center; gap: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 300; color: var(--mid); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem; opacity: 0; transform: translateY(10px); transition: opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s; }
        .hero-eyebrow.in { opacity: 1; transform: none; }
        .eyebrow-badge { padding: 0.2rem 0.6rem; border: 1px solid var(--lime); color: var(--lime); font-size: 0.58rem; letter-spacing: 0.12em; border-radius: 2px; }
        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem, 12vw, 13rem); line-height: 0.88; letter-spacing: 0.01em; opacity: 0; transform: translateY(60px); transition: opacity 0.75s ease 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s; }
        .hero-title.in { opacity: 1; transform: none; }
        .hero-title .stroke { -webkit-text-stroke: 1.5px var(--ink); color: transparent; }
        .hero-title .grad { background: linear-gradient(90deg, var(--grad-a), var(--grad-b)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub { margin-top: 2rem; max-width: 560px; font-size: clamp(0.9rem, 1.3vw, 1.1rem); font-weight: 300; font-style: italic; line-height: 1.7; color: rgba(240,235,225,0.5); opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s; }
        .hero-sub.in { opacity: 1; transform: none; }

        /* DIVIDER */
        .divider { display: flex; align-items: center; gap: 1.5rem; padding: 0.9rem 2.5rem; border-bottom: 1px solid var(--rule); }
        .div-label { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 300; color: var(--mid); letter-spacing: 0.2em; text-transform: uppercase; white-space: nowrap; }
        .div-line { flex: 1; height: 1px; background: var(--rule); }

        /* AEROSPACE SECTION */
        .aero-section { padding: 0 2.5rem; }

        .aero-hero {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; padding: 4rem 0;
          border-bottom: 1px solid var(--rule);
        }
        .aero-left { display: flex; flex-direction: column; gap: 2rem; }
        .aero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 5.5rem); line-height: 0.9; letter-spacing: 0.01em; }
        .aero-title .grad { background: linear-gradient(90deg, var(--electric), var(--lime)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .aero-meta { display: flex; flex-direction: column; gap: 0.6rem; }
        .aero-meta-row { display: flex; gap: 1rem; align-items: baseline; }
        .aero-meta-label { font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; font-weight: 300; color: var(--electric); letter-spacing: 0.15em; text-transform: uppercase; flex-shrink: 0; width: 80px; }
        .aero-meta-val { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 300; color: rgba(240,235,225,0.6); line-height: 1.5; }

        .aero-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .aero-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.56rem; font-weight: 300; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.2rem 0.55rem; border: 1px solid var(--rule); color: var(--mid); }

        .aero-links { display: flex; flex-direction: column; gap: 0.5rem; }
        .aero-link { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 300; color: var(--mid); text-decoration: none; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.6rem; transition: color 0.2s; }
        .aero-link:hover { color: var(--electric); }
        .aero-link-label { font-size: 0.52rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mid); border: 1px solid var(--rule); padding: 0.12rem 0.4rem; }

        .aero-right { display: flex; flex-direction: column; gap: 2rem; justify-content: flex-start; padding-top: 0.5rem; }

        .aero-summary { font-size: 0.95rem; font-weight: 300; font-style: italic; line-height: 1.8; color: rgba(240,235,225,0.55); border-left: 2px solid var(--electric); padding-left: 1.5rem; }

        .finding-box { display: flex; gap: 1.5rem; align-items: center; padding: 1rem 1.5rem; border: 1px solid rgba(0,194,255,0.2); background: rgba(0,194,255,0.04); }
        .finding-label { font-family: 'JetBrains Mono', monospace; font-size: 0.52rem; font-weight: 300; color: var(--electric); letter-spacing: 0.15em; text-transform: uppercase; white-space: nowrap; }
        .finding-val { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--ink); line-height: 1; letter-spacing: 0.02em; }
        .finding-sub { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--mid); margin-top: 0.2rem; }

        /* QUOTE from rec letter */
        .rec-quote {
          margin: 0 2.5rem;
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
          padding: 3rem 0;
          display: grid; grid-template-columns: auto 1fr;
          gap: 3rem; align-items: start;
        }
        .rec-label { font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; font-weight: 300; color: var(--mid); letter-spacing: 0.2em; text-transform: uppercase; writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); }
        .rec-body { display: flex; flex-direction: column; gap: 1rem; }
        .rec-text { font-size: clamp(0.9rem, 1.4vw, 1.15rem); font-weight: 300; font-style: italic; line-height: 1.8; color: rgba(240,235,225,0.5); border-left: 2px solid var(--lime); padding-left: 1.5rem; }
        .rec-attribution { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 300; color: var(--mid); letter-spacing: 0.06em; padding-left: 1.5rem; }

        /* METHODOLOGY GRID */
        .method-section { padding: 0 2.5rem 5rem; }
        .method-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; }
        .method-card { padding: 2.5rem 2rem 2.5rem 0; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
        .method-card:nth-child(3n) { padding-right: 0; border-right: none; }
        .method-card:nth-child(4), .method-card:nth-child(5), .method-card:nth-child(6) { border-bottom: none; }
        .method-num { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 300; color: var(--mid); letter-spacing: 0.1em; margin-bottom: 0.75rem; }
        .method-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: 0.02em; margin-bottom: 0.75rem; color: var(--ink); }
        .method-text { font-size: 0.8rem; font-weight: 300; line-height: 1.75; color: rgba(240,235,225,0.4); }

        /* RESULTS */
        .results-section { padding: 0 2.5rem 5rem; }
        .results-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
        .result-cell { padding: 2rem 1.5rem 2rem 0; border-right: 1px solid var(--rule); }
        .result-cell:last-child { border-right: none; }
        .result-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; line-height: 1; letter-spacing: -0.01em; background: linear-gradient(135deg, var(--electric), var(--lime)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.4rem; }
        .result-label { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 300; color: var(--mid); letter-spacing: 0.08em; line-height: 1.5; }

        /* FUTURE WORK */
        .future-section { padding: 0 2.5rem 5rem; }
        .future-list { display: flex; flex-direction: column; }
        .future-item { display: grid; grid-template-columns: 60px 1fr; gap: 1.5rem; align-items: start; padding: 1.5rem 0; border-bottom: 1px solid var(--rule); }
        .future-item:first-child { border-top: 1px solid var(--rule); }
        .future-idx { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--mid); padding-top: 0.15rem; }
        .future-text { font-size: 0.88rem; font-weight: 300; line-height: 1.7; color: rgba(240,235,225,0.5); }

        /* IB SECTION */
        .ib-section { padding: 0 2.5rem 6rem; }
        .ib-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .ib-card { padding: 2.5rem 2.5rem 2.5rem 0; border-bottom: 1px solid var(--rule); border-right: 1px solid var(--rule); position: relative; overflow: hidden; transition: background 0.3s; text-decoration: none; color: inherit; display: block; cursor: none; }
        .ib-card:nth-child(even) { padding: 2.5rem 0 2.5rem 2.5rem; border-right: none; }
        .ib-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(184,255,60,0.06), rgba(0,194,255,0.04)); opacity: 0; transition: opacity 0.4s; }
        .ib-card:hover::before { opacity: 1; }
        .ib-card > * { position: relative; z-index: 1; }
        .ib-card.no-link { cursor: default; }

        .ib-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem; }
        .ib-num { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 300; color: var(--mid); letter-spacing: 0.1em; }
        .ib-subject-area { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 300; color: var(--lime); letter-spacing: 0.06em; }
        .ib-subject { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 300; color: var(--mid); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
        .ib-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.4rem, 2.5vw, 2.2rem); line-height: 0.95; letter-spacing: 0.02em; margin-bottom: 0.75rem; transition: color 0.3s; }
        .ib-card:hover .ib-title { background: linear-gradient(90deg, var(--lime), var(--electric)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ib-question { font-size: 0.8rem; font-weight: 300; font-style: italic; line-height: 1.65; color: rgba(240,235,225,0.4); margin-bottom: 0.85rem; max-width: 400px; }
        .ib-desc { font-size: 0.78rem; font-weight: 300; line-height: 1.65; color: rgba(240,235,225,0.32); }
        .ib-sections { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 1rem; }
        .ib-section-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.54rem; font-weight: 300; letter-spacing: 0.07em; padding: 0.15rem 0.45rem; border: 1px solid var(--rule); color: var(--mid); }
        .ib-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem; }
        .ib-words { font-family: 'JetBrains Mono', monospace; font-size: 0.56rem; color: var(--mid); letter-spacing: 0.08em; }
        .ib-read { font-family: 'JetBrains Mono', monospace; font-size: 0.54rem; color: var(--electric); letter-spacing: 0.1em; text-transform: uppercase; opacity: 0; transition: opacity 0.2s; }
        .ib-card:hover .ib-read { opacity: 1; }

        footer { border-top: 1px solid var(--rule); padding: 1.4rem 2.5rem; display: flex; justify-content: space-between; align-items: center; }
        footer p { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 300; color: var(--mid); letter-spacing: 0.06em; }
        .footer-sig { font-family: 'Fraunces', serif; font-style: italic; font-size: 0.85rem; color: var(--mid); }

        @media (max-width: 900px) {
          .aero-hero { grid-template-columns: 1fr; gap: 2rem; }
          .method-grid { grid-template-columns: 1fr 1fr; }
          .method-card:nth-child(2n) { border-right: none; }
          .results-grid { grid-template-columns: 1fr 1fr; }
          .result-cell:nth-child(2n) { border-right: none; }
          .ib-grid { grid-template-columns: 1fr; }
          .ib-card, .ib-card:nth-child(even) { padding: 2rem 0; border-right: none; }
          .rec-quote { grid-template-columns: 1fr; }
          .rec-label { writing-mode: horizontal-tb; transform: none; }
        }
        @media (max-width: 768px) {
          nav { grid-template-columns: auto 1fr; }
          .nav-left { display: none; }
          .nav-right { gap: 1.2rem; }
          .hero { padding: 7rem 1.5rem 3rem; }
          .hero-watermark { display: none; }
          .divider, .aero-section, .method-section, .results-section, .future-section, .ib-section { padding-left: 1.5rem; padding-right: 1.5rem; }
          .rec-quote { margin: 0 1.5rem; }
          .method-grid { grid-template-columns: 1fr; }
          .method-card, .method-card:nth-child(3n) { padding-right: 0; border-right: none; padding: 2rem 0; }
          .results-grid { grid-template-columns: 1fr 1fr; }
          footer { flex-direction: column; gap: 0.5rem; text-align: center; padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className={`cur-dot ${hovered !== null ? "active" : ""}`} style={{ left: mouseX, top: mouseY }} />
      <div className={`cur-ring ${hovered !== null ? "active" : ""}`} style={{ left: mouseX, top: mouseY }} />

      <nav>
        <div className="nav-left"><div className="nav-dot" />{timeStr} · COS, CO</div>
        <a href="/" className="nav-logo-wrap">
          <div className="nav-initials">AT</div>
          <span className="nav-name">ARYAN TUTEJA</span>
        </a>
        <ul className="nav-right">
          <li><a href="/">Home</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-watermark">RESEARCH</div>
        <div className={`hero-eyebrow ${loaded ? "in" : ""}`}>
          <span className="eyebrow-badge">IB Diploma Candidate</span>
          Discovery Canyon Campus · Class of 2026
        </div>
        <h1 className={`hero-title ${loaded ? "in" : ""}`}>
          ACADEMIC<br />
          <span className="stroke">RESEARCH</span><br />
          <span className="grad">AND INQUIRY</span>
        </h1>
        <p className={`hero-sub ${loaded ? "in" : ""}`}>
          From orbital mechanics on Mars to memory retrieval in psychology,
          from enterprise AI to the role of doubt in knowledge. Research is how I think.
        </p>
      </section>

      {/* Aerospace */}
      <div className="divider" id="aerospace">
        <div className="div-label">University Research</div>
        <div className="div-line" />
        <div className="div-label">Space Systems Lab · 2024-25</div>
      </div>

      <section className="aero-section">
        <div className="aero-hero">
          <div className="aero-left">
            <h2 className="aero-title">
              Feasibility of Crewed Mars Mission Landing with <span className="grad">Aerobraking</span>
            </h2>

            <div className="aero-meta">
              <div className="aero-meta-row">
                <span className="aero-meta-label">Mentor</span>
                <span className="aero-meta-val">Dr. Lynnane George, PhD<br />Associate Professor of Teaching, Mechanical and Aerospace Engineering</span>
              </div>
              <div className="aero-meta-row">
                <span className="aero-meta-label">Location</span>
                <span className="aero-meta-val">Space Systems Lab, University of Colorado Colorado Springs</span>
              </div>
              <div className="aero-meta-row">
                <span className="aero-meta-label">Presented</span>
                <span className="aero-meta-val">AIAA Rocky Mountain Section Annual Technical Symposium, Sept 12, 2025</span>
              </div>
              <div className="aero-meta-row">
                <span className="aero-meta-label">Duration</span>
                <span className="aero-meta-val">5 hrs/week, June 1 to August 25 + independent work</span>
              </div>
              <div className="aero-meta-row">
                <span className="aero-meta-label">Department</span>
                <span className="aero-meta-val">Aeronautics and Astronautics</span>
              </div>
            </div>

            <div className="aero-tags">
              {["Python", "MarsGRAM", "EarthGRAM", "RK4 Propagator", "NumPy", "SciPy", "Matplotlib", "Pandas", "Orbital Mechanics"].map(t => (
                <span key={t} className="aero-tag">{t}</span>
              ))}
            </div>

            <div className="aero-links">
              <a href="https://github.com/Infinity500/Aerobraking-Research" target="_blank" rel="noreferrer" className="aero-link"
                onMouseEnter={() => setHovered(0)} onMouseLeave={() => setHovered(null)}>
                <span className="aero-link-label">Code</span>
                github.com/Infinity500/Aerobraking-Research
              </a>
              <a href="https://www.aiaa-rm.org/post/discovery-canyon-student-shines-at-regional-aerospace-symposium" target="_blank" rel="noreferrer" className="aero-link"
                onMouseEnter={() => setHovered(0)} onMouseLeave={() => setHovered(null)}>
                <span className="aero-link-label">Media</span>
                AIAA Rocky Mountain Feature
              </a>
            </div>
          </div>

          <div className="aero-right">
            <p className="aero-summary">
              Crewed Martian exploration has long been an ambitious dream. Conventional EDL (Entry, Descent, Land) procedures rely on hypersonic entry and supersonic retropropulsion, creating g-loads and dynamic pressures incompatible with human missions. This research proposes aerobraking — multi-pass atmospheric drag deceleration — as a safer, more fuel-efficient alternative for crewed surface insertion.
            </p>

            <div className="finding-box">
              <div>
                <div className="finding-val">752.16 m/s</div>
                <div className="finding-sub">delta-v reduction achieved in just 3 passes</div>
              </div>
              <div style={{borderLeft: "1px solid rgba(240,235,225,0.08)", paddingLeft: "1.5rem"}}>
                <div className="finding-val">{"<5g"}</div>
                <div className="finding-sub">peak gravitational load, within human tolerance</div>
              </div>
            </div>

            <div className="finding-box" style={{borderColor: "rgba(184,255,60,0.2)", background: "rgba(184,255,60,0.03)"}}>
              <div>
                <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", color: "var(--lime)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.4rem"}}>Ideal Landing Site</div>
                <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "rgba(240,235,225,0.6)"}}>40 deg E, 60 deg N</div>
                <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "var(--mid)", marginTop: "0.2rem"}}>Near-equatorial, high density, flat terrain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rec letter quote */}
      <div className="rec-quote">
        <div className="rec-label">Letter of Rec</div>
        <div className="rec-body">
          <p className="rec-text">
            "Aryan's intellectual curiosity, willingness to innovate, and ability to independently troubleshoot problems set him apart — qualities I often see only in advanced undergraduate or even graduate students."
          </p>
          <div className="rec-attribution">Dr. Lynnane E. George, PhD · Associate Professor, Mechanical and Aerospace Engineering · University of Colorado Colorado Springs · Sept 13, 2025</div>
        </div>
      </div>

      {/* Methodology */}
      <div className="divider">
        <div className="div-label">Methodology</div>
        <div className="div-line" />
      </div>

      <section className="method-section">
        <div className="method-grid">
          {[
            { title: "Atmospheric Modeling", text: "Used NASA's MarsGRAM to model Martian atmospheric density and temperature at 100 km altitude. Compared with EarthGRAM to quantify the difference in atmospheric variability between Earth and Mars." },
            { title: "Site Selection", text: "Identified optimal landing coordinates (40 deg E, 60 deg N) based on proximity to the equator for lower pressure, higher atmospheric density for efficient braking, and flat terrain for accessible landing." },
            { title: "Orbital Propagation", text: "Implemented Keplerian state propagation using a 4th-order Runge-Kutta integrator — chosen over Euler's method for significantly higher accuracy — to model spacecraft position and velocity over time." },
            { title: "Drag Modeling", text: "Differentiated state vectors with respect to time to isolate acceleration due to drag. Applied drag corrections after velocity differentiation to account for the highly elliptical orbits formed (average eccentricity of 0.73)." },
            { title: "Multi-Pass Simulation", text: "Executed multiple atmospheric passes, recording state vectors after each pass. Applied optional retrograde delta-v at apoapsis between passes. Tracked peak-g, dynamic pressure, and cumulative delta-v reduction." },
            { title: "Feasibility Assessment", text: "Evaluated crewed mission constraints: peak gravitational load must remain below 5g (vs. 13g for Curiosity), and dynamic pressure below safe thresholds. Confirmed aerobraking meets both constraints within 3 passes." },
          ].map((m, i) => (
            <div className="method-card" key={i}>
              <div className="method-num">{String(i+1).padStart(2,"0")}</div>
              <div className="method-title">{m.title}</div>
              <p className="method-text">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <div className="divider">
        <div className="div-label">Key Results</div>
        <div className="div-line" />
      </div>

      <section className="results-section">
        <div className="results-grid">
          {[
            { num: "752 m/s", label: "Delta-v reduced\nacross 3 passes" },
            { num: "3", label: "Atmospheric passes\nto achieve safe insertion" },
            { num: "0.73", label: "Average orbital\neccentricity" },
            { num: "1504 min", label: "Total mission time\nat 0 m/s retro delta-v" },
          ].map((r, i) => (
            <div className="result-cell" key={i}>
              <div className="result-num">{r.num}</div>
              <div className="result-label" style={{whiteSpace: "pre-line"}}>{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Work */}
      <div className="divider">
        <div className="div-label">Future Work</div>
        <div className="div-line" />
      </div>

      <section className="future-section">
        <div className="future-list">
          {[
            "Run a Systems Tool Kit (STK) simulation to replace assumptions on initial altitude, flight path angle, and velocity with realistic mission-derived numbers.",
            "Assess whether current spacecraft (including Orion) can structurally withstand multiple atmospheric passes — accounting for repetitive thermal cycling, pressure fluctuations, and composite material interactions.",
            "Integrate this aerobraking leg into the broader Earth-Mars-Ceres mission architecture, analyzing how retro delta-v budgets affect overall mission duration and crew safety.",
            "Explore harvesting atmospheric drag as kinetic energy via turbine and thermal generators to supplement life support systems onboard a crewed spacecraft.",
          ].map((f, i) => (
            <div className="future-item" key={i}>
              <div className="future-idx">{String(i+1).padStart(2,"0")}</div>
              <div className="future-text">{f}</div>
            </div>
          ))}
        </div>
      </section>

      {/* IB Work */}
      <div className="divider" id="ib">
        <div className="div-label">IB Diploma Papers</div>
        <div className="div-line" />
        <div className="div-label">{String(IB_WORK.length).padStart(2,"0")} papers</div>
      </div>

      <section className="ib-section">
        <div className="ib-grid">
          {IB_WORK.map((item, i) => {
            const Tag = item.link ? "a" : "div";
            const extraProps = item.link
              ? { href: item.link, target: "_blank", rel: "noreferrer" }
              : {};
            return (
              <Tag
                key={i}
                className={`ib-card${!item.link ? " no-link" : ""}`}
                {...extraProps}
                onMouseEnter={() => setHovered(100+i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="ib-top">
                  <span className="ib-num">{item.num}</span>
                  <span className="ib-subject-area">{item.subject_area}</span>
                </div>
                <div className="ib-subject">{item.subject}</div>
                <h3 className="ib-title">{item.title}</h3>
                <p className="ib-question">"{item.question}"</p>
                <p className="ib-desc">{item.desc}</p>
                <div className="ib-sections">
                  {item.sections.map(s => <span key={s} className="ib-section-tag">{s}</span>)}
                </div>
                <div className="ib-footer">
                  <span className="ib-words">{item.words} words</span>
                  {item.link && <span className="ib-read">Read paper</span>}
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      <footer>
        <p>© 2026 Aryan Tuteja · Discovery Canyon Campus · Colorado Springs, CO</p>
        <span className="footer-sig">What if?</span>
      </footer>
    </>
  );
}