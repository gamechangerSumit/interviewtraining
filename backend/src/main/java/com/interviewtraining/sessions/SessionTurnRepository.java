package com.interviewtraining.sessions;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionTurnRepository extends JpaRepository<SessionTurn, Long> {
    List<SessionTurn> findAllBySessionIdOrderByCreatedAtAsc(java.util.UUID sessionId);
    long countBySessionId(java.util.UUID sessionId);
}
