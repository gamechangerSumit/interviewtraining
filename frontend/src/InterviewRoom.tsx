import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, LoaderCircle, Send, Sparkles } from "lucide-react";
import { coachApi, sessionApi } from "./api";
import "./room.css";

type Props = {
  role: string;
  experience: string;
  duration: string;
  questionStyle: string;
  customQuestions: string[];
  onExit: () => void;
};

export default function InterviewRoom({ role, experience, duration, questionStyle, customQuestions, onExit }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    sessionApi.create({ role, experience, mode: "INTERVIEW" })
      .then((session) => setSessionId(session.id))
      .catch(() => setError("Session history is unavailable. You can still practice, but this session may not be saved."));
  }, [role, experience]);

  const generateQuestion = async (previousContext = "") => {
    setLoading(true);
    setError("");
    setFeedback("");
    setAnswer("");
    try {
      if (questionStyle === "My custom questions" && customQuestions.length > 0) {
        const nextCustom = customQuestions[Math.floor(Math.random() * customQuestions.length)];
        setQuestion(nextCustom);
      } else {
        const result = await coachApi.question({ role, experience, question: "", previousContext: `Question style: ${questionStyle}. ${previousContext}` });
        setQuestion(result.content);
      }
      setStep((value) => value + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate a question.");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim() || !question) return;
    setLoading(true);
    setError("");
    try {
      const result = await coachApi.evaluate({ role, experience, question, answer });
      setFeedback(result.content);
      setHistory((items) => [...items, `Q: ${question}\nA: ${answer}`]);
      if (sessionId) await sessionApi.addTurn(sessionId, { question, answer, feedback: result.content });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not evaluate your answer.");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = async () => {
    setLoading(true);
    setError("");
    setFeedback("");
    try {
      const result = await coachApi.followUp({ role, experience, question, answer, previousContext: history.join("\n\n") });
      setQuestion(result.content);
      setAnswer("");
      setStep((value) => value + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate a follow-up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="interview-room">
      <header className="room-header">
        <button className="room-back" onClick={async () => { if (sessionId) { try { await sessionApi.complete(sessionId); } catch { setError("Could not mark the session complete."); return; } } onExit(); }}><ArrowLeft size={17} /> Exit practice</button>
        <div><span className="live-dot" /> AI INTERVIEW IN PROGRESS</div>
        <span className="room-duration">{duration}</span>
      </header>
      <section className="room-content">
        <div className="room-kicker"><Sparkles size={15} /> PERSONALIZED MOCK INTERVIEW</div>
        <h1>Let's practice for <span>{role}</span></h1>
        <p className="room-intro">Answer naturally. Your AI coach will give specific feedback and ask relevant follow-ups.</p>
        <div className="room-progress"><span>QUESTION {Math.max(step, 1)}</span><div><i style={{ width: `${Math.min(step * 12, 100)}%` }} /></div><span>{experience}</span></div>
        <article className="interviewer-card">
          <div className="interviewer-label"><div className="interviewer-avatar"><Bot size={22} /></div><div><strong>AI Interviewer</strong><small>Interviewer · {role}</small></div></div>
          {question ? <h2>{question}</h2> : <div className="empty-question"><p>Your interview is ready. Generate your first question when you are ready.</p><button className="room-primary" disabled={loading} onClick={() => generateQuestion()}>{loading ? <LoaderCircle className="spin" size={17} /> : <Sparkles size={17} />} Generate first question</button></div>}
        </article>
        {question && <section className="answer-card">
          <label htmlFor="candidate-answer">YOUR ANSWER</label>
          <textarea id="candidate-answer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer here. Explain your thinking and include a real example..." rows={7} />
          <div className="answer-actions"><span>{answer.trim().split(/\s+/).filter(Boolean).length} words · Your answer is sent for AI feedback</span><button className="room-primary" disabled={loading || !answer.trim()} onClick={submitAnswer}>{loading ? <LoaderCircle className="spin" size={16} /> : <Send size={16} />} Evaluate answer</button></div>
        </section>}
        {loading && <div className="room-loading"><LoaderCircle className="spin" size={18} /> Gemini is preparing your coaching response…</div>}
        {error && <div className="room-error" role="alert">{error}</div>}
        {feedback && <section className="feedback-card"><div className="feedback-title"><CheckCircle2 size={18} /><strong>Your coaching feedback</strong></div><pre>{feedback}</pre><button className="room-primary" onClick={nextQuestion} disabled={loading}><ArrowRight size={16} /> Ask a follow-up question</button><button className="room-secondary" onClick={() => generateQuestion(history.join("\n\n"))} disabled={loading}>New interview question</button></section>}
        <p className="room-privacy">Text-only interview · Your questions, answers and feedback are saved to your practice session.</p>
      </section>
    </main>
  );
}
