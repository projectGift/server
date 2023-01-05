-- migrate:up
CREATE TABLE products_event_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    event_lists_id INT NOT NULL,
    CONSTRAINT products_event_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_event_lists_event_lists_fkey FOREIGN KEY (event_lists_id) REFERENCES event_lists (id)
)

-- migrate:down
DROP TABLE products_event_lists