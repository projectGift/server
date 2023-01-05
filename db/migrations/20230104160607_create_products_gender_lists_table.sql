-- migrate:up
CREATE TABLE products_gender_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    gender_lists_id INT NOT NULL,
    CONSTRAINT products_gender_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_gender_lists_gender_lists_fkey FOREIGN KEY (gender_lists_id) REFERENCES gender_lists (id)
)

-- migrate:down
DROP TABLE products_gender_lists
