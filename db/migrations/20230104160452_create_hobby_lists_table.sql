-- migrate:up
CREATE TABLE hobby_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500) NOT NULL
)

-- migrate:down
DROP TABLE hobby_lists