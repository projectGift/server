-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(20) NULL,
    profile_image_url VARCHAR(1000) NULL,
    kakao_id bigint NULL,
    google_id bigint NULL
)

-- migrate:down
DROP TABLE users

