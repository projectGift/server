-- migrate:up
CREATE TABLE assessments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE assessments