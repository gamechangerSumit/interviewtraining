# Architecture

## Initial design

```text
React Client
  |-- Dashboard / setup / Question studio
  |-- Interview room (question turns, mic transcript, optional camera)
  |-- Group discussion room
  |-- Transcript, coaching report and history
  |
  | HTTPS REST (WebSocket only if streaming becomes necessary)
  v
Spring Boot API
  |-- Session orchestration
  |-- Question bank
  |-- Answer/transcript service
  |-- Feedback and scoring service
  |-- Discussion moderation
  |-- AI provider adapter
  |
  +--> PostgreSQL
  +--> External AI / speech provider
```

## Proposed domain model
- PracticeSession: owner, mode, role, difficulty, status, startedAt, completedAt, settings.
- Question: owner or system, prompt, category, role, difficulty, tags, active.
- SessionQuestion: session, question, order, askedAt.
- Answer: sessionQuestion, transcript, duration, createdAt.
- Feedback: answer/session reference, rubric dimensions, evidence and improvement actions.
- DiscussionTurn: session, speaker, content, order and timestamp.
- UserPreference: capture settings, coaching preferences and retention controls.

## API outline
- POST /api/v1/sessions — create session.
- GET /api/v1/sessions/{id} — retrieve session.
- POST /api/v1/sessions/{id}/start — start session.
- POST /api/v1/sessions/{id}/answers — submit transcript/answer.
- POST /api/v1/sessions/{id}/next-question — obtain next question/follow-up.
- POST /api/v1/sessions/{id}/complete — complete and generate report.
- GET /api/v1/sessions/{id}/report — retrieve report.
- GET /api/v1/questions — search question bank.
- POST /api/v1/questions — create custom question.
- PUT /api/v1/questions/{id} — update custom question.
- DELETE /api/v1/questions/{id} — archive/delete custom question.
- POST /api/v1/discussions — create discussion session.
- POST /api/v1/discussions/{id}/turns — submit a discussion turn.

## AI provider boundary
Use interfaces such as InterviewCoach, SpeechTranscriber and DiscussionModerator. Keep provider SDKs, prompts and credentials behind these interfaces. Never call AI providers directly from frontend code.

## Data and privacy
- Do not persist raw audio/video by default.
- Persist transcript and feedback with clear user notice.
- Use explicit opt-in for any recording storage.
- Add data export and deletion endpoints before public launch.
- Avoid sending camera frames to an AI service unless the user explicitly enables a clearly explained feature.
