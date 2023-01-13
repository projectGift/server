-- migrate:up
CREATE TABLE questionnaire (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    assessment_id INT NOT NULL,
    CONSTRAINT questionnaire_questions_fkey FOREIGN KEY (question_id) REFERENCES questions (id),
    CONSTRAINT questionnaire_assessments_fkey FOREIGN KEY (assessment_id) REFERENCES assessments (id)
)

-- migrate:down
DROP TABLE questionnaire