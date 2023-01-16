-- migrate:up
CREATE TABLE questionnaire_results (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    questionnaire_id INT NOT NULL,
    comment VARCHAR(1000) NULL,
    CONSTRAINT questionnaire_results_users_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT questionnaire_results_questionnaire_fkey FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id)
)

-- migrate:down
DROP TABLE questionnaire_results