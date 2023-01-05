-- migrate:up
CREATE TABLE products_relation_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    relation_lists_id INT NOT NULL,
    CONSTRAINT products_relation_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_relation_lists_relation_lists_fkey FOREIGN KEY (relation_lists_id) REFERENCES relation_lists (id)
)

-- migrate:down
DROP TABLE products_relation_lists