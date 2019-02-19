DROP TABLE IF EXISTS mmb_media;
DROP TABLE IF EXISTS mmb_shelf;
DROP TABLE IF EXISTS mmb_user;
DROP TABLE IF EXISTS mmb_provider;
DROP TABLE IF EXISTS mmb_profile;

CREATE TABLE mmb_profile (
    profile_id INTEGER NOT NULL AUTO_INCREMENT,
    profile VARCHAR(128) NOT NULL,
    PRIMARY KEY (profile_id)
);

INSERT INTO mmb_profile (profile) VALUES ('Administrateur');
INSERT INTO mmb_profile (profile) VALUES ('Utilisateur');

CREATE TABLE mmb_provider (
    provider_id INTEGER NOT NULL AUTO_INCREMENT,
    provider VARCHAR(128) NOT NULL,
    module VARCHAR(32) NOT NULL,
    PRIMARY KEY (provider_id)
);

INSERT INTO mmb_provider (provider, module) VALUES ('Amazon', 'DVD');

CREATE TABLE mmb_user (
    user_id INTEGER NOT NULL AUTO_INCREMENT,
    user VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_digest VARCHAR(255) NOT NULL,
    id_profile INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (user_id)
);

INSERT INTO mmb_user (user, email, password_digest, id_profile) VALUES ('Stephane', 'piousteph@gmail.com', '$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW', 1);
INSERT INTO mmb_user (user, email, password_digest, id_profile) VALUES ('Sylvie', 'sylvie.tinseau@gmail.com', '$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW', 2);

CREATE TABLE mmb_shelf (
    shelf_id INTEGER NOT NULL AUTO_INCREMENT,
    shelf VARCHAR(128) NOT NULL,
    icon VARCHAR(32) NOT NULL,
    provider_id INTEGER NOT NULL DEFAULT 1,
    id_user INTEGER NOT NULL,
    PRIMARY KEY (shelf_id)
);

INSERT INTO mmb_shelf (shelf, icon, id_user) VALUES ('Films', 'eva eva-film', 1);

CREATE TABLE mmb_media (
    media_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    id_shelf INTEGER NOT NULL,
    PRIMARY KEY (media_id)
);