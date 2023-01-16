-- migrate:up
ALTER TABLE products 
DROP product_ratings,
DROP ratings_count;

-- migrate:down
DROP TABLE products