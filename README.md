# InterviewTraining AI

An AI-assisted interview and communication practice platform.

See [Product Specification](docs/PRODUCT_SPEC.md), [Architecture](docs/ARCHITECTURE.md), and [Roadmap](docs/ROADMAP.md).

## Vision
Practice realistic 1:1 interviews, group discussions, communication drills and custom question sets. Receive explainable coaching feedback after each session.

## Proposed stack
- React + TypeScript + Vite + Tailwind CSS
- Java 21 + Spring Boot
- PostgreSQL
- Provider-independent AI and speech adapters
- Browser camera and microphone APIs

## Core modules
1. AI mock interviews with contextual follow-ups
2. Custom question bank and randomized question sets
3. Voice practice with transcription, pace and filler-word feedback
4. Optional camera framing practice
5. Simulated group discussion with timers and participant viewpoints
6. Coaching reports and progress history

## Privacy
Camera and microphone access is opt-in and permission-gated. Show an active-capture indicator and stop control. Do not store raw audio/video by default. Coaching must not infer personality, honesty, emotion or employability from appearance.

## Status
Repository foundation. Runtime application features are not implemented yet.
