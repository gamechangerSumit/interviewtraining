package com.interviewtraining.sessions;

import java.time.Instant;

public record SessionTurnResponse(Long id, String question, String answer, String feedback, Instant createdAt) {
    static SessionTurnResponse from(SessionTurn turn) {
        return new SessionTurnResponse(turn.getId(), turn.getQuestion(), turn.getAnswer(), turn.getFeedback(), turn.getCreatedAt());
    }
}
