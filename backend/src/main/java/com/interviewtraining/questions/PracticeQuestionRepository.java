package com.interviewtraining.questions;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PracticeQuestionRepository extends JpaRepository<PracticeQuestion, UUID> {
    List<PracticeQuestion> findAllByActiveTrueOrderByCreatedAtDesc();
    List<PracticeQuestion> findAllByActiveTrueAndCategoryIgnoreCaseOrderByCreatedAtDesc(String category);
}
