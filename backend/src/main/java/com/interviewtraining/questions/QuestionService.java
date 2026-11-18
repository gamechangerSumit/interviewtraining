package com.interviewtraining.questions;

import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class QuestionService {
    private final PracticeQuestionRepository repository;

    public QuestionService(PracticeQuestionRepository repository) {
        this.repository = repository;
    }

    public List<QuestionResponse> list(String category) {
        List<PracticeQuestion> questions = (category == null || category.isBlank())
                ? repository.findAllByActiveTrueOrderByCreatedAtDesc()
                : repository.findAllByActiveTrueAndCategoryIgnoreCaseOrderByCreatedAtDesc(category.trim());
        return questions.stream().map(QuestionResponse::from).toList();
    }

    public QuestionResponse create(QuestionRequest request) {
        PracticeQuestion question = new PracticeQuestion(
                request.prompt().trim(),
                request.category().trim(),
                clean(request.targetRole()),
                request.difficulty().trim(),
                clean(request.expectedThemes()),
                clean(request.referenceAnswer())
        );
        return QuestionResponse.from(repository.save(question));
    }

    public QuestionResponse update(UUID id, QuestionRequest request) {
        PracticeQuestion question = findActive(id);
        question.update(
                request.prompt().trim(),
                request.category().trim(),
                clean(request.targetRole()),
                request.difficulty().trim(),
                clean(request.expectedThemes()),
                clean(request.referenceAnswer())
        );
        return QuestionResponse.from(repository.save(question));
    }

    public void archive(UUID id) {
        PracticeQuestion question = findActive(id);
        question.archive();
        repository.save(question);
    }

    private PracticeQuestion findActive(UUID id) {
        PracticeQuestion question = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));
        if (!question.isActive()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found");
        }
        return question;
    }

    private String clean(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
