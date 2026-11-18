import { useState } from "react";
import {
  Activity, ArrowUpRight, AudioLines, BookOpen, BrainCircuit, CalendarDays,
  CheckCircle2, ChevronRight, CircleHelp, Clock3, Code2, Compass,
  Flame, Home, Layers3, MessageSquareText, Plus, Settings2, ShieldCheck,
  Sparkles, Target, Users, Zap,
} from "lucide-react";

type Mode = "interview" | "group" | "communication";

const stats = [
  { label: "Practice sessions", value: "12", change: "+3 this week", icon: Activity },
  { label: "Practice time", value: "4.8h", change: "+1.2h this week", icon: Clock3 },
  { label: "Skills improving", value: "6", change: "Keep the streak going", icon: Target },
];

const modules = [
  { id: "interview" as Mode, title: "1-on-1 Interview", description: "Practice with an AI interviewer that asks follow-up questions.", icon: MessageSquareText, tag: "MOST POPULAR", tone: "violet" },
  { id: "group" as Mode, title: "Group Discussion", description: "Build confidence, structure your points and respond to different views.", icon: Users, tag: "INTERACTIVE", tone: "blue" },
  { id: "communication" as Mode, title: "Communication Gym", description: "Sharpen introductions, explanations and everyday speaking skills.", icon: AudioLines, tag: "DAILY PRACTICE", tone: "orange" },
];

const activity = [
  { title: "Digital Workplace Service Desk", type: "Technical + HR interview", date: "Yesterday", score: "78", color: "green" },
  { title: "Tell me about yourself", type: "Communication drill", date: "Mon, Nov 16", score: "72", color: "blue" },
  { title: "Cloud computing in simple words", type: "Technical explanation", date: "Nov 14", score: "68", color: "orange" },
];

function App() {
  const [activeMode, setActiveMode] = useState<Mode>("interview");
  const [role, setRole] = useState("DevOps Engineer");
  const [level, setLevel] = useState("Fresher");
  const [duration, setDuration] = useState("20 minutes");
  const [customQuestion, setCustomQuestion] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questions, setQuestions] = useState<string[]>([
    "Tell me about yourself.",
    "Explain a project you have worked on.",
    "How do you troubleshoot a production issue?",
  ]);
  const [notice, setNotice] = useState("Your practice workspace is ready. Choose a session to get started.");

  const startPractice = () => {
    setNotice(`Setup ready: ${activeMode === "interview" ? "1-on-1 interview" : activeMode === "group" ? "Group discussion" : "Communication gym"} · ${role} · ${level} · ${duration}. Session engine is the next implementation milestone.`);
  };

  const addQuestion = () => {
    const trimmed = customQuestion.trim();
    if (!trimmed) return;
    setQuestions((current) => [...current, trimmed]);
    setCustomQuestion("");
    setShowQuestionForm(false);
    setNotice("Your custom question was added to this practice list.");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><BrainCircuit size={22} /></div>
          <div><strong>interview<span>mate</span></strong><small>AI PRACTICE STUDIO</small></div>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <button className="nav-item active"><Home size={17} /> Overview</button>
          <button className="nav-item" onClick={() => setActiveMode("interview")}><MessageSquareText size={17} /> Mock interviews</button>
          <button className="nav-item" onClick={() => setActiveMode("group")}><Users size={17} /> Group discussions</button>
          <button className="nav-item" onClick={() => setActiveMode("communication")}><AudioLines size={17} /> Communication gym</button>
          <button className="nav-item" onClick={() => setNotice("Question library selected. Add your own questions in the panel below.")}><BookOpen size={17} /> Question library</button>
          <button className="nav-item" onClick={() => setNotice("Progress reports will appear here after practice sessions are implemented.")}><Layers3 size={17} /> My progress</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card">
            <div className="streak-icon"><Flame size={18} /></div>
            <div><strong>Build your streak</strong><p>Small practice, big progress.</p></div>
            <span>3 days</span>
          </div>
          <button className="nav-item"><Settings2 size={17} /> Settings</button>
          <div className="profile">
            <div className="avatar">A</div>
            <div className="profile-info"><strong>Your workspace</strong><small>Personal account</small></div>
            <ChevronRight size={16} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <ChevronRight size={14} /> <strong>Overview</strong></div>
          <div className="top-actions"><span className="system-status"><i /> Practice engine setup</span><button className="icon-button" aria-label="Help"><CircleHelp size={18} /></button><div className="avatar small">A</div></div>
        </header>

        <div className="content-wrap">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL AI COACH</div>
              <h1>Let's get you <span>interview-ready.</span></h1>
              <p>Build confidence one answer at a time. Your next opportunity starts with practice.</p>
            </div>
            <div className="date-chip"><CalendarDays size={15} /> Wednesday, November 18</div>
          </section>

          <section className="hero-card">
            <div className="hero-copy">
              <div className="hero-pill"><Zap size={13} /> YOUR NEXT PRACTICE</div>
              <h2>Show up prepared.<br /><em>Speak with confidence.</em></h2>
              <p>Walk into your next interview knowing you've already done it before.</p>
              <button className="primary-button" onClick={() => document.getElementById("practice-setup")?.scrollIntoView({ behavior: "smooth" })}>Start a practice session <ArrowUpRight size={17} /></button>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="visual-core"><BrainCircuit size={54} strokeWidth={1.25} /></div>
              <div className="float-card float-top"><AudioLines size={17} /><span><b>Clear communication</b><small>One skill at a time</small></span><CheckCircle2 size={17} /></div>
              <div className="float-card float-bottom"><Target size={18} /><span><b>Personal feedback</b><small>Actionable improvement</small></span></div>
            </div>
          </section>

          <section className="stats-grid" aria-label="Practice statistics">
            {stats.map(({ label, value, change, icon: Icon }) => <article className="stat-card" key={label}><div className="stat-top"><span>{label}</span><Icon size={17} /></div><div className="stat-value">{value}</div><div className="stat-change">{change}</div></article>)}
          </section>

          <section className="section-block" id="practice-setup">
            <div className="section-heading"><div><div className="eyebrow">CHOOSE YOUR FORMAT</div><h2>What would you like to practice?</h2><p>Pick a training room. We'll help you make every attempt count.</p></div><span className="section-link">Explore all modules <ArrowUpRight size={14} /></span></div>
            <div className="module-grid">
              {modules.map(({ id, title, description, icon: Icon, tag, tone }) => <button className={`module-card ${activeMode === id ? "selected" : ""}`} key={id} onClick={() => setActiveMode(id)}><div className="module-card-top"><div className={`module-icon ${tone}`}><Icon size={20} /></div><span className="module-tag">{tag}</span></div><h3>{title}</h3><p>{description}</p><div className="module-footer"><span>{activeMode === id ? "Selected for practice" : "Choose this format"}</span><span className="round-arrow"><ChevronRight size={16} /></span></div></button>)}
            </div>
          </section>

          <section className="practice-layout">
            <div className="setup-card">
              <div className="section-heading compact"><div><div className="eyebrow">SESSION CONFIGURATION</div><h2>Make it yours</h2><p>Set up a session that matches your goals.</p></div><div className="setup-icon"><Compass size={19} /></div></div>
              <div className="form-grid">
                <label>Target role<input value={role} onChange={(event) => setRole(event.target.value)} placeholder="e.g. DevOps Engineer" /></label>
                <label>Experience level<select value={level} onChange={(event) => setLevel(event.target.value)}><option>Fresher</option><option>0–2 years</option><option>2–5 years</option><option>5+ years</option></select></label>
                <label>Session duration<select value={duration} onChange={(event) => setDuration(event.target.value)}><option>10 minutes</option><option>20 minutes</option><option>30 minutes</option><option>45 minutes</option></select></label>
                <label>Question style<select defaultValue="Mixed questions"><option>Mixed questions</option><option>Random questions</option><option>My custom questions</option><option>HR focused</option><option>Technical focused</option></select></label>
              </div>
              <div className="capture-note"><ShieldCheck size={17} /><span><strong>Your privacy matters.</strong> Camera and microphone will only be requested when you choose to enable them in a practice room.</span></div>
              <button className="primary-button full" onClick={startPractice}>Prepare my session <ArrowUpRight size={17} /></button>
              <div className="notice" role="status">{notice}</div>
            </div>

            <div className="question-card">
              <div className="question-heading"><div><div className="eyebrow">YOUR QUESTION BANK</div><h2>Practice your way</h2></div><button className="add-button" onClick={() => setShowQuestionForm((value) => !value)} aria-label="Add custom question"><Plus size={17} /></button></div>
              <p className="question-subtitle">Add the questions you want to master.</p>
              {showQuestionForm && <div className="add-question-form"><input value={customQuestion} onChange={(event) => setCustomQuestion(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addQuestion()} placeholder="Write your question..." /><button onClick={addQuestion}>Add</button></div>}
              <div className="question-list">{questions.map((question, index) => <div className="question-row" key={`${question}-${index}`}><span className="question-number">{String(index + 1).padStart(2, "0")}</span><span>{question}</span><ChevronRight size={15} /></div>)}</div>
              <button className="text-button" onClick={() => setNotice("Random question selection will be connected to the interview engine in the next phase.")}>Explore question library <ArrowUpRight size={14} /></button>
            </div>
          </section>

          <section className="section-block recent-block">
            <div className="section-heading"><div><div className="eyebrow">YOUR JOURNEY</div><h2>Recent practice</h2><p>Look back, learn and keep moving forward.</p></div><button className="view-all" onClick={() => setNotice("Your complete session history will be available when the backend is connected.")}>View history <ArrowUpRight size={14} /></button></div>
            <div className="activity-table"><div className="activity-head"><span>SESSION</span><span>TYPE</span><span>DATE</span><span>DEMO SCORE</span></div>{activity.map((item) => <div className="activity-row" key={item.title}><div className="activity-title"><div className={`activity-icon ${item.color}`}><Code2 size={16} /></div><strong>{item.title}</strong></div><span>{item.type}</span><span>{item.date}</span><span className={`score ${item.color}`}>{item.score}<small>/100</small></span></div>)}</div>
            <p className="demo-disclaimer">Illustrative sample data — real scores will be generated from completed sessions.</p>
          </section>

          <footer className="footer"><span>© 2026 InterviewMate AI</span><span>Built to help you become a better communicator.</span><span><ShieldCheck size={13} /> Practice privately</span></footer>
        </div>
      </main>
    </div>
  );
}

export default App;
