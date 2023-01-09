-- migrate:up
ALTER TABLE products MODIFY product_url VARCHAR(1000) NULL

-- migrate:down
DROP TABLE products