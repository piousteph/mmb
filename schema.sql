CREATE TABLE mmb_profile (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO mmb_profile (name) VALUES ('Utilisateur');
INSERT INTO mmb_profile (name) VALUES ('Administrateur');

CREATE TABLE mmb_user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_digest VARCHAR(255) NOT NULL,
    id_profile TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
);

INSERT INTO mmb_user (name, email, password_digest) VALUES ('Stephane', 'piousteph@gmail.com', "$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW");

CREATE TABLE mmb_shelf (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE mmb_provider (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    module VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);
