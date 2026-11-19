# InterviewTraining AI

An AI-assisted interview and communication practice platform.

## Implemented MVP

- React + TypeScript + Vite dashboard with interview, group discussion and communication practice rooms.
- Spring Boot 3 / Java 21 backend and PostgreSQL question bank.
- Gemini-powered interview question generation, answer evaluation, contextual follow-ups and simulated group-discussion replies.
- Persistent practice sessions, question/answer turns and coaching feedback in PostgreSQL.
- Custom question creation and question-style selection (mixed, random, HR, technical and saved custom questions).
- Communication drills for introductions, technical explanations, STAR answers and structured opinions.
- Optional camera preview in the browser and opt-in speech-to-text where browser support is available.
- Vite API proxy to the Spring Boot backend and GitHub Actions frontend/backend build workflow.

## Local development

1. Start PostgreSQL with `docker compose up -d db`. The compose file maps host port `5433` to container port `5432`.
2. Configure backend environment variables in IntelliJ:
   - `DATABASE_URL=jdbc:postgresql://localhost:5433/interviewtraining`
   - `DATABASE_USERNAME=interviewtraining`
   - `DATABASE_PASSWORD=<your local database password>`
   - `AI_PROVIDER=gemini`
   - `AI_API_KEY=<Google AI Studio key>`
   - `AI_MODEL=gemini-2.5-flash`
3. Run `InterviewTrainingApplication` from IntelliJ. The API listens on `8081` by default.
4. In `frontend`, run `npm install` and `npm run dev`. Open `http://localhost:5173`.
5. Verify the API at `http://localhost:8081/actuator/health`.

Never commit a real API key or local `.env` file. Keep the key in the backend run configuration or a local ignored environment file.

## API endpoints

- `GET/POST /api/v1/questions` — list and create question-bank entries.
- `POST /api/v1/coach/question` — generate an interview question.
- `POST /api/v1/coach/evaluate` — evaluate an answer using a coaching rubric.
- `POST /api/v1/coach/follow-up` — ask a contextual follow-up question.
- `POST /api/v1/coach/discussion` — simulate a group-discussion participant.
- `GET/POST /api/v1/sessions` — list and create practice sessions.
- `GET/POST /api/v1/sessions/{id}/turns` — read and save practice turns.
- `POST /api/v1/sessions/{id}/complete` — complete a practice session.

All AI requests are made by the backend; the browser never receives the Gemini API key.

## Privacy and limitations

- Camera is opt-in and only used for a local browser preview; it is not uploaded or stored.
- Microphone speech-to-text is opt-in and depends on the browser's speech-recognition service. Its processing/privacy terms are controlled by that browser provider.
- The app does not store raw audio or video.
- This MVP does not yet include user authentication, multi-user account isolation, advanced progress analytics, production rate limiting, or production deployment hardening.
- Coaching scores are practice guidance, not hiring predictions.
