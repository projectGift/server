-- migrate:up
ALTER TABLE products MODIFY thumbnail VARCHAR(1000) NULL

-- migrate:down
DROP TABLE products