-- migrate:up
CREATE TABLE ratings_products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    product_id INT NOT NULL,
    rating_id INT NOT NULL,

    CONSTRAINT ratings_products_users_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT ratings_products_products_fkey FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT ratings_products_ratings_fkey FOREIGN KEY (rating_id) REFERENCES ratings (id)
)

-- migrate:down
DROP TABLE ratings_products