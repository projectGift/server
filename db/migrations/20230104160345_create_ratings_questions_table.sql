-- migrate:up
CREATE TABLE ratings_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating_id INT NOT NULL,
    question_id INT NOT NULL,
    CONSTRAINT ratings_questions_ratings_fkey FOREIGN KEY (rating_id) REFERENCES ratings (id),
    CONSTRAINT ratings_questions_question_fkey FOREIGN KEY (question_id) REFERENCES questions (id)
)

-- migrate:down
DROP TABLE ratings_questions
