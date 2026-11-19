CREATE TABLE practice_session (
    id UUID PRIMARY KEY,
    role VARCHAR(120) NOT NULL,
    experience VARCHAR(40) NOT NULL,
    mode VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS',
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_practice_session_started_at ON practice_session (started_at DESC);

CREATE TABLE practice_session_turn (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES practice_session(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    feedback TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_practice_session_turn_session_created
    ON practice_session_turn (session_id, created_at);
