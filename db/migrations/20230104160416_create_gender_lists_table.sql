-- migrate:up
CREATE TABLE gender_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500) NOT NULL
)

-- migrate:down
DROP TABLE gender_lists
