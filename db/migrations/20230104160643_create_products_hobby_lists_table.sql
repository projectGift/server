-- migrate:up
CREATE TABLE products_hobby_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    hobby_lists_id INT NOT NULL,
    CONSTRAINT products_hobby_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_hobby_lists_hobby_lists_fkey FOREIGN KEY (hobby_lists_id) REFERENCES hobby_lists (id)
)

-- migrate:down
DROP TABLE products_hobby_lists