package com.interviewtraining.questions;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "practice_question")
public class PracticeQuestion {
    @Id
    private UUID id;

    @Column(nullable = false, length = 2000)
    private String prompt;

    @Column(nullable = false, length = 60)
    private String category;

    @Column(name = "target_role", length = 120)
    private String targetRole;

    @Column(nullable = false, length = 30)
    private String difficulty;

    @Column(name = "expected_themes", columnDefinition = "text")
    private String expectedThemes;

    @Column(name = "reference_answer", columnDefinition = "text")
    private String referenceAnswer;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected PracticeQuestion() {}

    public PracticeQuestion(String prompt, String category, String targetRole,
                            String difficulty, String expectedThemes, String referenceAnswer) {
        this.prompt = prompt;
        this.category = category;
        this.targetRole = targetRole;
        this.difficulty = difficulty;
        this.expectedThemes = expectedThemes;
        this.referenceAnswer = referenceAnswer;
        this.active = true;
    }

    @PrePersist
    void onCreate() {
        if (id == null) id = UUID.randomUUID();
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }

    public UUID getId() { return id; }
    public String getPrompt() { return prompt; }
    public String getCategory() { return category; }
    public String getTargetRole() { return targetRole; }
    public String getDifficulty() { return difficulty; }
    public String getExpectedThemes() { return expectedThemes; }
    public String getReferenceAnswer() { return referenceAnswer; }
    public boolean isActive() { return active; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

    public void update(String prompt, String category, String targetRole,
                       String difficulty, String expectedThemes, String referenceAnswer) {
        this.prompt = prompt;
        this.category = category;
        this.targetRole = targetRole;
        this.difficulty = difficulty;
        this.expectedThemes = expectedThemes;
        this.referenceAnswer = referenceAnswer;
    }

    public void archive() { this.active = false; }
}
