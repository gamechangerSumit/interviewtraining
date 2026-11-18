CREATE TABLE practice_question (
    id UUID PRIMARY KEY,
    prompt VARCHAR(2000) NOT NULL,
    category VARCHAR(60) NOT NULL,
    target_role VARCHAR(120),
    difficulty VARCHAR(30) NOT NULL,
    expected_themes TEXT,
    reference_answer TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_practice_question_active_category
    ON practice_question (active, category);

CREATE INDEX idx_practice_question_role
    ON practice_question (target_role);
