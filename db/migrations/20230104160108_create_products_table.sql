-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(500) NOT NULL,
    product_price DECIMAL(9,2) NOT NULL,
    product_review_count int NOT NULL,
    product_url VARCHAR(2000) NOT NULL,
    thumbnail VARCHAR(1000) NOT NULL,
    product_ratings int NULL,
    ratings_count int NULL
)

-- migrate:down
DROP TABLE products
