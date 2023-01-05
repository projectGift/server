-- migrate:up
CREATE TABLE products_personality_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    personality_lists_id INT NOT NULL,
    CONSTRAINT products_personality_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_personality_lists_personality_lists_fkey FOREIGN KEY (personality_lists_id) REFERENCES personality_lists (id)
)

-- migrate:down
DROP TABLE products_personality_lists
