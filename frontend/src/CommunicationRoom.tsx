import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, CameraOff, CheckCircle2, LoaderCircle, Mic, MicOff, Send, Sparkles, Video } from "lucide-react";
import { coachApi, sessionApi } from "./api";
import "./room.css";

type Props = { onExit: () => void };
type SpeechResultEvent = Event & { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const drills = [
  { title: "Professional introduction", prompt: "Introduce yourself professionally in 60–90 seconds. Include your current focus, one relevant project or skill, and the role you are targeting." },
  { title: "Explain a technical concept", prompt: "Explain a technical concept you know well as if the listener is a non-technical colleague. Use a simple analogy and one practical example." },
  { title: "STAR behavioural answer", prompt: "Describe a real challenge you handled using Situation, Task, Action and Result. Be specific about your own contribution." },
  { title: "Give a structured opinion", prompt: "Share your opinion on a workplace or technology topic. State your position, give two reasons, acknowledge another perspective and conclude clearly." },
];

export default function CommunicationRoom({ onExit }: Props) {
  const [drillIndex, setDrillIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const speechRef = useRef<SpeechRecognitionLike | null>(null);
  const drill = drills[drillIndex];

  useEffect(() => {
    sessionApi.create({ role: "Communication Skills", experience: "Practice", mode: "COMMUNICATION" })
      .then((session) => setSessionId(session.id))
      .catch(() => setError("Session history is unavailable. You can still complete this drill."));
  }, []);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    speechRef.current?.stop();
  }, []);

  const toggleCamera = async () => {
    if (cameraOn) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraOn(false);
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera access requires HTTPS or localhost and a supported browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
      setCameraError("");
    } catch {
      setCameraError("Camera permission was not granted. You can continue with text-only practice.");
    }
  };

  const toggleMic = () => {
    if (micOn) {
      speechRef.current?.stop();
      setMicOn(false);
      return;
    }
    const speechWindow = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const SpeechRecognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setError("Speech-to-text is not supported in this browser. Type your answer instead.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join(" ");
      setAnswer((current) => current ? current + " " + transcript : transcript);
    };
    recognition.onerror = () => { setError("Microphone input failed. Check browser permission or type your answer."); setMicOn(false); };
    recognition.onend = () => setMicOn(false);
    speechRef.current = recognition;
    try {
      recognition.start();
      setMicOn(true);
      setError("");
    } catch {
      setError("Could not start speech recognition. Try again or type your answer.");
    }
  };

  const evaluate = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await coachApi.evaluate({
        role: "Communication skills practice",
        experience: "Practice",
        question: drill.prompt,
        answer,
      });
      setFeedback(result.content);
      if (sessionId) await sessionApi.addTurn(sessionId, { question: drill.prompt, answer, feedback: result.content });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not evaluate this response.");
    } finally {
      setLoading(false);
    }
  };

  const selectDrill = (index: number) => {
    setDrillIndex(index);
    setAnswer("");
    setFeedback("");
    setError("");
  };

  return (
    <main className="interview-room">
      <header className="room-header">
        <button className="room-back" onClick={async () => { if (sessionId) { try { await sessionApi.complete(sessionId); } catch { setError("Could not mark the drill complete."); return; } } onExit(); }}><ArrowLeft size={17} /> Exit communication gym</button>
        <div><span className="live-dot" /> COMMUNICATION PRACTICE</div>
        <span className="room-duration">Daily drills</span>
      </header>
      <section className="room-content">
        <div className="room-kicker"><Sparkles size={15} /> SPEAK CLEARLY AND WITH CONFIDENCE</div>
        <h1>Build your <span>communication skills.</span></h1>
        <p className="room-intro">Choose a short drill, speak or type your response, then get practical feedback on structure, clarity and relevance.</p>
        <div className="drill-picker">{drills.map((item, index) => <button key={item.title} className={index === drillIndex ? "drill-chip active" : "drill-chip"} onClick={() => selectDrill(index)}>{index + 1}. {item.title}</button>)}</div>
        <article className="interviewer-card">
          <div className="room-kicker">TODAY'S EXERCISE</div>
          <h2>{drill.prompt}</h2>
        </article>
        <section className="answer-card">
          <div className="capture-controls">
            <button className={cameraOn ? "capture-toggle active" : "capture-toggle"} onClick={toggleCamera}>{cameraOn ? <CameraOff size={15} /> : <Camera size={15} />} {cameraOn ? "Turn camera off" : "Enable camera preview"}</button>
            <button className={micOn ? "capture-toggle active" : "capture-toggle"} onClick={toggleMic}><Mic size={15} /> {micOn ? "Stop microphone" : "Dictate answer"}</button>
          </div>
          {cameraOn && <div className="camera-preview"><video ref={videoRef} autoPlay muted playsInline /><span><Video size={13} /> Camera preview active · local only</span></div>}
          {cameraError && <p className="capture-message">{cameraError}</p>}
          {!speechSupported && <p className="capture-message">Speech-to-text is unavailable in this browser.</p>}
          <label htmlFor="communication-answer">YOUR RESPONSE</label>
          <textarea id="communication-answer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write or dictate your response here..." rows={7} />
          <div className="answer-actions"><span>{answer.trim().split(/\s+/).filter(Boolean).length} words · Camera is optional</span><button className="room-primary" disabled={loading || !answer.trim()} onClick={evaluate}>{loading ? <LoaderCircle className="spin" size={16} /> : <Send size={16} />} Get feedback</button></div>
        </section>
        {loading && <div className="room-loading"><LoaderCircle className="spin" size={18} /> Reviewing your response…</div>}
        {error && <div className="room-error" role="alert">{error}</div>}
        {feedback && <section className="feedback-card"><div className="feedback-title"><CheckCircle2 size={18} /><strong>Communication coaching</strong></div><pre>{feedback}</pre><button className="room-primary" onClick={() => selectDrill((drillIndex + 1) % drills.length)}>Next exercise</button></section>}
        <p className="room-privacy">Camera preview is never uploaded. Speech recognition uses your browser's speech service; check its privacy terms. No audio or video is stored by this app.</p>
      </section>
    </main>
  );
}
