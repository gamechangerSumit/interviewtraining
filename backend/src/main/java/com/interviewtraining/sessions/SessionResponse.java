package com.interviewtraining.sessions;

import java.time.Instant;
import java.util.UUID;

public record SessionResponse(
        UUID id, String role, String experience, String mode,
        String status, Instant startedAt, Instant endedAt, long turnCount
) {}
