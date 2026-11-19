package com.interviewtraining.coach;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/coach")
public class CoachController {
    private final GeminiCoachService coachService;

    public CoachController(GeminiCoachService coachService) {
        this.coachService = coachService;
    }

    @PostMapping("/question")
    public ResponseEntity<CoachResponse> question(@Valid @RequestBody CoachRequest request) {
        return ResponseEntity.ok(coachService.coach(withMode(request, "question")));
    }

    @PostMapping("/evaluate")
    public ResponseEntity<CoachResponse> evaluate(@Valid @RequestBody CoachRequest request) {
        return ResponseEntity.ok(coachService.coach(withMode(request, "evaluate")));
    }

    @PostMapping("/follow-up")
    public ResponseEntity<CoachResponse> followUp(@Valid @RequestBody CoachRequest request) {
        return ResponseEntity.ok(coachService.coach(withMode(request, "followup")));
    }

    @PostMapping("/discussion")
    public ResponseEntity<CoachResponse> discussion(@Valid @RequestBody CoachRequest request) {
        return ResponseEntity.ok(coachService.coach(withMode(request, "discussion")));
    }

    private CoachRequest withMode(CoachRequest request, String mode) {
        return new CoachRequest(request.role(), request.experience(), mode,
                request.question(), request.answer(), request.previousContext());
    }
}
