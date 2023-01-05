-- migrate:up
CREATE TABLE products_age_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    age_lists_id INT NOT NULL,
    CONSTRAINT products_age_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_age_lists_age_lists_fkey FOREIGN KEY (age_lists_id) REFERENCES age_lists (id)
)

-- migrate:down
DROP TABLE products_age_lists