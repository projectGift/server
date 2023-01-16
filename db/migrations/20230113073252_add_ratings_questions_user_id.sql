-- migrate:up
ALTER TABLE ratings_questions 
ADD COLUMN user_id INT NULL;

ALTER TABLE ratings_questions 
ADD CONSTRAINT ratings_questions_users_fkey FOREIGN KEY (user_id) REFERENCES users (id);

-- migrate:down
DROP TABLE ratings_questions