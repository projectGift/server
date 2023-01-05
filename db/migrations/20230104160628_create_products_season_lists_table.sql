-- migrate:up
CREATE TABLE products_season_lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    season_lists_id INT NOT NULL,
    CONSTRAINT products_season_lists_products_fkey FOREIGN KEY (products_id) REFERENCES products (id),
    CONSTRAINT products_season_lists_season_lists_fkey FOREIGN KEY (season_lists_id) REFERENCES season_lists (id)
)

-- migrate:down
DROP TABLE products_season_lists