package com.interviewtraining.sessions;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "practice_session")
public class PracticeSession {
    @Id
    private UUID id;
    @Column(nullable = false, length = 120)
    private String role;
    @Column(nullable = false, length = 40)
    private String experience;
    @Column(nullable = false, length = 30)
    private String mode;
    @Column(nullable = false, length = 20)
    private String status = "IN_PROGRESS";
    @Column(name = "started_at", nullable = false)
    private Instant startedAt;
    @Column(name = "ended_at")
    private Instant endedAt;
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected PracticeSession() {}
    public PracticeSession(String role, String experience, String mode) {
        this.role = role;
        this.experience = experience;
        this.mode = mode;
    }
    @PrePersist void onCreate() {
        if (id == null) id = UUID.randomUUID();
        startedAt = Instant.now();
        updatedAt = startedAt;
    }
    @PreUpdate void onUpdate() { updatedAt = Instant.now(); }
    public UUID getId() { return id; }
    public String getRole() { return role; }
    public String getExperience() { return experience; }
    public String getMode() { return mode; }
    public String getStatus() { return status; }
    public Instant getStartedAt() { return startedAt; }
    public Instant getEndedAt() { return endedAt; }
    public void complete() { status = "COMPLETED"; endedAt = Instant.now(); }
}
