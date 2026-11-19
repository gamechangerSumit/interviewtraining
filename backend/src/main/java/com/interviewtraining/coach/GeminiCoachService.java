package com.interviewtraining.coach;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Service
public class GeminiCoachService {
    private final RestClient restClient;
    private final String apiKey;
    private final String model;

    public GeminiCoachService(
            RestClient.Builder builder,
            @Value("${ai.api-key:}") String apiKey,
            @Value("${ai.model:gemini-3.8-flash}") String model
    ) {
        this.restClient = builder.baseUrl("https://generativelanguage.googleapis.com").build();
        this.apiKey = apiKey;
        this.model = model;
    }

    public CoachResponse coach(CoachRequest request) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Gemini is not configured. Set AI_API_KEY in the backend environment.");
        }

        String instruction = switch (request.mode().toLowerCase()) {
            case "question" -> """
                    Act as a realistic, supportive interview interviewer. Generate exactly one relevant interview question
                    for the target role and experience. Do not include an answer. If prior context exists, ask a natural
                    follow-up that probes the candidate's previous answer. Return only the question.
                    """;
            case "followup" -> """
                    Act as a realistic interviewer. Ask exactly one concise follow-up question based on the candidate's
                    answer. Probe an unclear claim, practical example, trade-off, or measurable result. Return only the question.
                    """;
            case "discussion" -> """
                    Act as one simulated group-discussion participant. Respond to the candidate's point with a distinct,
                    respectful viewpoint, then ask one open question that invites the candidate to respond. Keep it under 100 words.
                    """;
            default -> """
                    Act as a practical interview coach. Evaluate the candidate's answer against the question.
                    Return structured plain text with these headings: Overall feedback, Relevance (0-100),
                    Structure (0-100), Specificity (0-100), Clarity (0-100), What worked, What to improve,
                    Suggested answer outline, One practice action. Scores are coaching signals, not hiring predictions.
                    Be specific, fair and encouraging. Do not invent experience or facts about the candidate.
                    """;
        };

        String prompt = """
                Target role: %s
                Experience: %s
                Question: %s
                Candidate answer: %s
                Previous context: %s
                """.formatted(
                safe(request.role()), safe(request.experience()), safe(request.question()),
                safe(request.answer()), safe(request.previousContext()));

        Map<String, Object> body = Map.of(
                "systemInstruction", Map.of("parts", List.of(Map.of("text", instruction))),
                "contents", List.of(Map.of("role", "user", "parts", List.of(Map.of("text", prompt)))),
                "generationConfig", Map.of("temperature", 0.7, "maxOutputTokens", 900)
        );

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restClient.post()
                    .uri("/v1beta/models/{model}:generateContent", model)
                    .header("x-goog-api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(Map.class);
            String content = extractText(response);
            if (content.isBlank()) {
                throw new IllegalStateException("Gemini returned an empty response. Please try again.");
            }
            return new CoachResponse(content, "gemini", model);
        } catch (RestClientResponseException exception) {
            throw new IllegalStateException("Gemini request failed (" + exception.getStatusCode().value()
                    + "). Check the API key, model name and Google AI Studio quota.");
        }
    }

    private String extractText(Map<String, Object> response) {
        if (response == null) return "";
        Object candidatesValue = response.get("candidates");
        if (!(candidatesValue instanceof List<?> candidates) || candidates.isEmpty()) return "";
        Object contentValue = ((Map<?, ?>) candidates.getFirst()).get("content");
        if (!(contentValue instanceof Map<?, ?> content)) return "";
        Object partsValue = content.get("parts");
        if (!(partsValue instanceof List<?> parts)) return "";
        StringBuilder text = new StringBuilder();
        for (Object part : parts) {
            if (part instanceof Map<?, ?> map && map.get("text") instanceof String value) {
                if (!text.isEmpty()) text.append("\n");
                text.append(value);
            }
        }
        return text.toString().trim();
    }

    private String safe(String value) {
        return value == null || value.isBlank() ? "Not provided" : value.trim();
    }
}
