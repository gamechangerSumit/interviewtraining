package com.interviewtraining.coach;

public record CoachResponse(
        String content,
        String provider,
        String model
) {}
