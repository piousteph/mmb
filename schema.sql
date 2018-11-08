CREATE TABLE mmb_user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_digest VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE mmb_shelf (
    id INTEGER NOT NULL AUTO_INCREMENT,
    shelf_name VARCHAR(128) NOT NULL,
    PRIMARY KEY (id)
);

