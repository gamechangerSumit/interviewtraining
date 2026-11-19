package com.interviewtraining.sessions;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SessionRequest(
        @NotBlank @Size(max = 120) String role,
        @NotBlank @Size(max = 40) String experience,
        @NotBlank @Size(max = 30) String mode
) {}
