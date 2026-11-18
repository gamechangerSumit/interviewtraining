# Product Specification

## Goal
Help candidates repeatedly practice interviews and communication in realistic sessions, then turn observed performance into practical next steps.

## Core journeys

### 1:1 mock interview
1. Configure target role, experience, interview category, difficulty and duration.
2. Select random AI-generated questions, a curated pack or personal questions.
3. Review optional camera and microphone settings.
4. Start the session. The interviewer asks one question at a time.
5. Candidate responds by voice or text. Voice is the preferred practice path.
6. Ask contextual follow-up questions based on the answer.
7. End and review transcript, rubric and coaching suggestions.

### Custom question studio
- Create, edit, archive and tag questions.
- Fields: prompt, category, target role, difficulty, expected themes and optional reference answer.
- Select questions for a session or randomize them.
- Never show reference answers before the session ends.

### Group discussion
- Choose a topic or generate one randomly.
- Preparation timer followed by timed discussion.
- Simulated participants introduce different viewpoints and respond to the candidate.
- Candidate can make a point, respond to objections and conclude.
- Report relevance, structure, listening/response quality, turn balance, concise speaking and summary quality.
- MVP uses simulated participants; real multi-user rooms can follow later.

### Communication gym
Short drills for self-introduction, explaining a technical concept, STAR-format examples, giving an opinion with reasons, concise summaries and follow-up questions.

## Coaching rubric
Scores are explainable coaching signals, not objective hiring predictions.

| Dimension | Assessment |
|---|---|
| Relevance | Does the answer address the question? |
| Structure | Is there a clear beginning, reasoning/evidence and conclusion? |
| Specificity | Are examples, actions and outcomes concrete? |
| Clarity | Is the language understandable and concise? |
| Delivery | Pace, pauses and filler words when audio/transcript supports it |
| Listening | Does the response address the follow-up? |
| Technical accuracy | Correctness for role-specific questions, with uncertainty acknowledged |

Each improvement includes the observed issue, why it matters, a practice action and an example rewrite or answer outline. Never fabricate personal experiences for the candidate.

## Session report
- Overall coaching summary
- Dimension scores and evidence-based explanations
- Question-by-question transcript and feedback
- Strengths to repeat
- Top three improvement priorities
- Improved answer outline
- Suggested next practice set
- Comparison with previous sessions when available

## Capture and privacy
- Capture is opt-in per session and browser permission is required.
- Keep a clear active-capture indicator and stop controls visible.
- Voice-only and text-only modes must remain available.
- Raw audio/video are not retained by default.
- Camera-based cues may support narrow practice tasks such as framing only. Do not infer emotions, honesty, intelligence, personality or employability from appearance.
- Users can disable any delivery metric. Do not penalize disability, neurodivergence, accent, skin tone or culturally different communication styles.

## MVP acceptance criteria
1. Configure and start a mock interview.
2. Add custom questions and request randomized questions.
3. Progress one question at a time; allow typed responses.
4. Generate a structured, explainable report.
5. Make voice and camera permission explicit, optional and stoppable.
6. Provide a timed simulated group discussion.
7. Scope saved sessions to the authenticated user when authentication is implemented.
