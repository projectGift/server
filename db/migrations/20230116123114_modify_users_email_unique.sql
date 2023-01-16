-- migrate:up
ALTER TABLE users
  MODIFY COLUMN email VARCHAR(50) NOT NULL UNIQUE;

-- migrate:down
DROP TABLE users

