package com.interviewtraining.sessions;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "practice_session_turn")
public class SessionTurn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "session_id", nullable = false)
    private PracticeSession session;
    @Column(nullable = false, columnDefinition = "text")
    private String question;
    @Column(nullable = false, columnDefinition = "text")
    private String answer;
    @Column(name = "feedback", columnDefinition = "text")
    private String feedback;
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected SessionTurn() {}
    public SessionTurn(PracticeSession session, String question, String answer, String feedback) {
        this.session = session;
        this.question = question;
        this.answer = answer;
        this.feedback = feedback;
        this.createdAt = Instant.now();
    }
    public Long getId() { return id; }
    public String getQuestion() { return question; }
    public String getAnswer() { return answer; }
    public String getFeedback() { return feedback; }
    public Instant getCreatedAt() { return createdAt; }
}
