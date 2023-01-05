-- migrate:up
CREATE TABLE products_mbti_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    mbti_lists_id INT NOT NULL,
    CONSTRAINT products_mbti_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_mbti_lists_mbti_lists_fkey FOREIGN KEY (mbti_lists_id) REFERENCES mbti_lists (id)
)

-- migrate:down
DROP TABLE products_mbti_lists