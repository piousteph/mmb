DROP TABLE IF EXISTS mmb_profile;
DROP TABLE IF EXISTS mmb_user;
DROP TABLE IF EXISTS mmb_shelf;
DROP TABLE IF EXISTS mmb_provider;

CREATE TABLE mmb_profile (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO mmb_profile (name) VALUES ('Administrateur');
INSERT INTO mmb_profile (name) VALUES ('Utilisateur');

CREATE TABLE mmb_user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_digest VARCHAR(255) NOT NULL,
    id_profile TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
);

INSERT INTO mmb_user (name, email, password_digest, id_profile) VALUES ('Stephane', 'piousteph@gmail.com', '$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW', 1);
INSERT INTO mmb_user (name, email, password_digest, id_profile) VALUES ('Sylvie', 'sylvie.tinseau@gmail.com', '$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW', 2);

CREATE TABLE mmb_shelf (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    icon VARCHAR(32) NOT NULL,
    id_user INTEGER NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO mmb_shelf (name, icon, id_user) VALUES ('Films', 'eva eva-film', 1);

CREATE TABLE mmb_provider (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    module VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);