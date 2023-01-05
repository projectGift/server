-- migrate:up
CREATE TABLE products_time_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    time_lists_id INT NOT NULL,
    CONSTRAINT products_time_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_time_lists_time_lists_fkey FOREIGN KEY (time_lists_id) REFERENCES time_lists (id)
)

-- migrate:down
DROP TABLE products_time_lists