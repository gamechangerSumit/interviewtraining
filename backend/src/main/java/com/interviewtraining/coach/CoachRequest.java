package com.interviewtraining.coach;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CoachRequest(
        @NotBlank @Size(max = 120) String role,
        @NotBlank @Size(max = 40) String experience,
        @Size(max = 40) String mode,
        @Size(max = 2000) String question,
        @Size(max = 12000) String answer,
        @Size(max = 12000) String previousContext
) {}
