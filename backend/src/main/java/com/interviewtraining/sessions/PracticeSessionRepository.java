package com.interviewtraining.sessions;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PracticeSessionRepository extends JpaRepository<PracticeSession, UUID> {
    List<PracticeSession> findTop20ByOrderByStartedAtDesc();
}
