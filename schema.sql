CREATE TABLE login_user (
    id BIGSERIAL NOT NULL,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_digest VARCHAR(255) NOT NULL
)

ALTER TABLE login_user ADD CONSTRAINT login_user_pkey PRIMARY KEY (id);

CREATE TABLE shelf (
    id BIGSERIAL NOT NULL,
    shelf_name VARCHAR(128) NOT NULL
);

ALTER TABLE shelf ADD CONSTRAINT shelf_pkey PRIMARY KEY (id);
