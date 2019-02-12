DROP TABLE IF EXISTS mmb_user_shelf;
DROP TABLE IF EXISTS mmb_profile;
DROP TABLE IF EXISTS mmb_user;
DROP TABLE IF EXISTS mmb_shelf;
DROP TABLE IF EXISTS mmb_provider;

CREATE TABLE mmb_profile (
    upid INTEGER NOT NULL AUTO_INCREMENT,
    profile VARCHAR(128) NOT NULL,
    PRIMARY KEY (upid)
);

INSERT INTO mmb_profile (profile) VALUES ('Administrateur');
INSERT INTO mmb_profile (profile) VALUES ('Utilisateur');

CREATE TABLE mmb_user (
    uuid INTEGER NOT NULL AUTO_INCREMENT,
    user VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_digest VARCHAR(255) NOT NULL,
    id_profile TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (uuid)
);

INSERT INTO mmb_user (user, email, password_digest, id_profile) VALUES ('Stephane', 'piousteph@gmail.com', '$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW', 1);
INSERT INTO mmb_user (user, email, password_digest, id_profile) VALUES ('Sylvie', 'sylvie.tinseau@gmail.com', '$2b$12$CQ3GjefWKc13keQNXZdUo.h5iIX.bVYV6CzZc1ddiQ22hqOqHZHJW', 2);

CREATE TABLE mmb_shelf (
    usid INTEGER NOT NULL AUTO_INCREMENT,
    shelf VARCHAR(128) NOT NULL,
    icon VARCHAR(32) NOT NULL,
    PRIMARY KEY (usid)
);

INSERT INTO mmb_shelf (shelf, icon) VALUES ('Films', 'eva eva-film');

CREATE TABLE mmb_user_shelf (
    uusid INTEGER NOT NULL AUTO_INCREMENT,
    id_user INTEGER NOT NULL,
    id_shelf INTEGER NOT NULL,
    PRIMARY KEY (uusid)
);

INSERT INTO mmb_user_shelf (id_user, id_shelf) VALUES (1, 1);
INSERT INTO mmb_user_shelf (id_user, id_shelf) VALUES (2, 1);

CREATE TABLE mmb_provider (
    upid INTEGER NOT NULL AUTO_INCREMENT,
    provider VARCHAR(128) NOT NULL,
    module VARCHAR(32) NOT NULL,
    PRIMARY KEY (upid)
);