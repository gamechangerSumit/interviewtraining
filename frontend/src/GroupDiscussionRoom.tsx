import { useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle, MessageCircle, Send, Users } from "lucide-react";
import { coachApi, sessionApi } from "./api";
import "./room.css";

type Props = { onExit: () => void };

export default function GroupDiscussionRoom({ onExit }: Props) {
  const [topic, setTopic] = useState("Is artificial intelligence more beneficial than harmful to society?");
  const [point, setPoint] = useState("");
  const [turns, setTurns] = useState<Array<{ speaker: string; text: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    sessionApi.create({ role: "Group Discussion", experience: "Practice", mode: "GROUP" })
      .then((session) => setSessionId(session.id))
      .catch(() => setError("Session history is unavailable. Discussion can continue without saving."));
  }, []);

  const submitPoint = async () => {
    if (!point.trim() || !topic.trim()) return;
    const candidatePoint = point.trim();
    setTurns((items) => [...items, { speaker: "You", text: candidatePoint }]);
    setPoint("");
    setLoading(true);
    setError("");
    try {
      const response = await coachApi.discussion({
        role: "Group discussion participant",
        experience: "Practice",
        question: topic,
        answer: candidatePoint,
        previousContext: turns.map((turn) => `${turn.speaker}: ${turn.text}`).join("\n"),
      });
      setTurns((items) => [...items, { speaker: "AI participant", text: response.content }]);
      if (sessionId) {
        await sessionApi.addTurn(sessionId, { question: topic, answer: candidatePoint, feedback: response.content });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "The AI participant could not respond.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="interview-room">
      <header className="room-header">
        <button className="room-back" onClick={async () => { if (sessionId) { try { await sessionApi.complete(sessionId); } catch { setError("Could not mark the discussion complete."); return; } } onExit(); }}><ArrowLeft size={17} /> Exit discussion</button>
        <div><span className="live-dot" /> GROUP DISCUSSION PRACTICE</div>
        <span className="room-duration">AI simulation</span>
      </header>
      <section className="room-content">
        <div className="room-kicker"><Users size={15} /> DISCUSSION TRAINING ROOM</div>
        <h1>Make your point. <span>Back it up.</span></h1>
        <p className="room-intro">Share a clear viewpoint. An AI participant will respond with a different perspective and invite you to continue.</p>
        <article className="interviewer-card">
          <label className="room-kicker" htmlFor="discussion-topic">DISCUSSION TOPIC</label>
          <input id="discussion-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="discussion-topic-input" />
        </article>
        <section className="feedback-card">
          <div className="feedback-title"><MessageCircle size={18} /><strong>Discussion floor</strong></div>
          {turns.length === 0 && <p className="room-intro">You have the floor. Start with your opening point, then respond to the AI participant.</p>}
          {turns.map((turn, index) => <article className={turn.speaker === "You" ? "discussion-turn candidate" : "discussion-turn ai"} key={index}><strong>{turn.speaker}</strong><p>{turn.text}</p></article>)}
          {loading && <div className="room-loading"><LoaderCircle className="spin" size={18} /> AI participant is preparing a response…</div>}
        </section>
        <section className="answer-card">
          <label htmlFor="discussion-point">YOUR NEXT POINT</label>
          <textarea id="discussion-point" value={point} onChange={(e) => setPoint(e.target.value)} placeholder="State your view, give a reason and support it with an example..." rows={4} />
          <div className="answer-actions"><span>{point.trim().split(/\s+/).filter(Boolean).length} words</span><button className="room-primary" disabled={loading || !point.trim() || !topic.trim()} onClick={submitPoint}><Send size={16} /> Take the floor</button></div>
        </section>
        {error && <div className="room-error" role="alert">{error}</div>}
        <p className="room-privacy">Simulated participant · Discussion turns and AI responses are saved to your practice session.</p>
      </section>
    </main>
  );
}
