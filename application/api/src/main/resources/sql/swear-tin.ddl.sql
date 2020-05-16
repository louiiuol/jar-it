CREATE SCHEMA `jar_it` ;

USE `jar_it`; /* default schema for script */

SET autocommit = 0; /* false */

SET NAMES utf8mb4; /* charset */

create table roles (
    id BIGINT(20) UNSIGNED not null auto_increment,
    code CHAR(10) not null,
    default_role ENUM('T', 'F') DEFAULT 'T' not null,
    primary key (id)
);

create table users (
    id BIGINT(20) UNSIGNED not null auto_increment,
    account_non_expired ENUM('T', 'F') DEFAULT 'T' not null,
    account_non_locked ENUM('T', 'F') DEFAULT 'T' not null,
    avatar varchar(255) not null,
    birth_date DATE not null,
    credentials_non_expired ENUM('T', 'F') DEFAULT 'T' not null,
    email VARCHAR(100) not null,
    enabled ENUM('T', 'F') DEFAULT 'T' not null,
    password varchar(255) not null,
    username VARCHAR(12) not null,
    primary key (id)
);

create table users_roles (
    user_id BIGINT(20) UNSIGNED not null,
    role_id BIGINT(20) UNSIGNED not null,
    primary key (user_id, role_id)
);

create table associations (
    id BIGINT(20) UNSIGNED not null auto_increment,
    code CHAR(5) not null,
    description varchar(255),
    link varchar(255) not null,
    name VARCHAR(50) not null,
    primary key (id)
);

alter table roles 
    add constraint roles_code_UNIQUE unique (code);

alter table users 
    add constraint user_username_UNIQUE unique (username);

alter table users 
    add constraint user_email_UNIQUE unique (email);

alter table users_roles 
    add constraint FKj6m8fwv7oqv74fcehir1a9ffy 
    foreign key (role_id) 
    references roles (id);

alter table users_roles 
    add constraint FK2o0jvgh89lemvvo17cbqvdxaa 
    foreign key (user_id) 
    references users (id);

COMMIT;

SET autocommit = 1; /* true */
