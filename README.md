# InterviewTraining AI

An AI-assisted interview and communication practice platform.

## Current implementation

- React + TypeScript + Vite dashboard.
- Spring Boot 3 / Java 21 backend and PostgreSQL question bank.
- Gemini-powered question generation, answer evaluation, contextual follow-ups and simulated group-discussion replies.
- Text-first mock interview and group-discussion rooms.
- Frontend Vite proxy to the local backend.

## Local development

1. Start PostgreSQL with `docker compose up -d db`. The compose file maps host port `5433` to container port `5432`.
2. Configure backend environment variables in your IDE:
   - `DATABASE_URL=jdbc:postgresql://localhost:5433/interviewtraining`
   - `DATABASE_USERNAME=interviewtraining`
   - `DATABASE_PASSWORD=<your local database password>`
   - `AI_PROVIDER=gemini`
   - `AI_API_KEY=<Google AI Studio key>`
   - `AI_MODEL=gemini-3.8-flash`
3. Run `InterviewTrainingApplication` from IntelliJ. The API listens on `8081` by default.
4. In `frontend`, run `npm install` and `npm run dev`. Open `http://localhost:5173`.
5. Verify the API at `http://localhost:8081/actuator/health`.

Never commit a real API key or local `.env` file. Keep the key in the backend run configuration or a local ignored environment file.

## AI endpoints

- `POST /api/v1/coach/question` — generate an interview question.
- `POST /api/v1/coach/evaluate` — evaluate a candidate answer with an explainable coaching rubric.
- `POST /api/v1/coach/follow-up` — ask a contextual follow-up question.
- `POST /api/v1/coach/discussion` — simulate a group-discussion participant.
- `GET/POST /api/v1/questions` — list and create question-bank entries.

All AI requests are made by the backend; the browser never receives the Gemini API key.

## Product roadmap / not yet complete

The current branch is a working MVP foundation, not a production-complete product. Persistent interview sessions and reports, authentication, voice transcription, optional camera framing, communication drills, complete progress analytics, rate limiting, and production deployment hardening remain to be implemented and tested.

## Privacy

Camera and microphone access must remain opt-in, with visible capture status and stop controls. This MVP is text-only and does not request camera or microphone permissions. Raw audio/video are not stored. Coaching scores are practice guidance, not hiring predictions.
