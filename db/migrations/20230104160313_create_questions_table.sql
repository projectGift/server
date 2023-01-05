-- migrate:up
CREATE TABLE questions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(1000) NOT NULL
)

-- migrate:down
DROP TABLE questions