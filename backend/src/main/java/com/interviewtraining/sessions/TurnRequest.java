package com.interviewtraining.sessions;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TurnRequest(
        @NotBlank @Size(max = 12000) String question,
        @NotBlank @Size(max = 12000) String answer,
        @Size(max = 12000) String feedback
) {}
