package com.interviewtraining.sessions;

import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PracticeSessionService {
    private final PracticeSessionRepository sessions;
    private final SessionTurnRepository turns;

    public PracticeSessionService(PracticeSessionRepository sessions, SessionTurnRepository turns) {
        this.sessions = sessions;
        this.turns = turns;
    }

    @Transactional
    public SessionResponse create(SessionRequest request) {
        PracticeSession session = sessions.save(new PracticeSession(
                request.role().trim(), request.experience().trim(), request.mode().trim().toUpperCase()));
        return response(session);
    }

    @Transactional(readOnly = true)
    public List<SessionResponse> list() {
        return sessions.findTop20ByOrderByStartedAtDesc().stream().map(this::response).toList();
    }

    @Transactional(readOnly = true)
    public List<SessionTurnResponse> turns(UUID id) {
        requireSession(id);
        return turns.findAllBySessionIdOrderByCreatedAtAsc(id).stream().map(SessionTurnResponse::from).toList();
    }

    @Transactional
    public SessionTurnResponse addTurn(UUID id, TurnRequest request) {
        PracticeSession session = requireSession(id);
        if ("COMPLETED".equals(session.getStatus())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This practice session is already completed");
        }
        SessionTurn turn = turns.save(new SessionTurn(session, request.question().trim(),
                request.answer().trim(), request.feedback()));
        return SessionTurnResponse.from(turn);
    }

    @Transactional
    public SessionResponse complete(UUID id) {
        PracticeSession session = requireSession(id);
        session.complete();
        return response(sessions.save(session));
    }

    private PracticeSession requireSession(UUID id) {
        return sessions.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Practice session not found"));
    }

    private SessionResponse response(PracticeSession session) {
        return new SessionResponse(session.getId(), session.getRole(), session.getExperience(),
                session.getMode(), session.getStatus(), session.getStartedAt(), session.getEndedAt(),
                turns.countBySessionId(session.getId()));
    }
}
