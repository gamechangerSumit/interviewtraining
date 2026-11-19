package com.interviewtraining.sessions;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/sessions")
public class PracticeSessionController {
    private final PracticeSessionService service;
    public PracticeSessionController(PracticeSessionService service) { this.service = service; }

    @GetMapping
    public List<SessionResponse> list() { return service.list(); }

    @PostMapping
    public SessionResponse create(@Valid @RequestBody SessionRequest request) { return service.create(request); }

    @GetMapping("/{id}/turns")
    public List<SessionTurnResponse> turns(@PathVariable UUID id) { return service.turns(id); }

    @PostMapping("/{id}/turns")
    public SessionTurnResponse addTurn(@PathVariable UUID id, @Valid @RequestBody TurnRequest request) {
        return service.addTurn(id, request);
    }

    @PostMapping("/{id}/complete")
    public SessionResponse complete(@PathVariable UUID id) { return service.complete(id); }
}
