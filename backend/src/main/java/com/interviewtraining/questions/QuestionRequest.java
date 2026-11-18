package com.interviewtraining.questions;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record QuestionRequest(
        @NotBlank @Size(max = 2000) String prompt,
        @NotBlank @Size(max = 60) String category,
        @Size(max = 120) String targetRole,
        @NotBlank @Size(max = 30) String difficulty,
        @Size(max = 4000) String expectedThemes,
        @Size(max = 10000) String referenceAnswer
) {}
