package com.interviewtraining.questions;

import java.time.Instant;
import java.util.UUID;

public record QuestionResponse(
        UUID id,
        String prompt,
        String category,
        String targetRole,
        String difficulty,
        String expectedThemes,
        String referenceAnswer,
        Instant createdAt
) {
    static QuestionResponse from(PracticeQuestion question) {
        return new QuestionResponse(
                question.getId(),
                question.getPrompt(),
                question.getCategory(),
                question.getTargetRole(),
                question.getDifficulty(),
                question.getExpectedThemes(),
                question.getReferenceAnswer(),
                question.getCreatedAt()
        );
    }
}
