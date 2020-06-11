USE jar_it_test; /* default schema for script */

SET autocommit = 0; /* false */

SET NAMES utf8mb4; /* charset */

DELETE FROM users;
DELETE FROM roles;
DELETE FROM users_roles;

INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('louiiuol', 'louiiuol@live.fr', '1995-11-17', 'm14', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Juju58', 'juju@live.fr', '1986-04-24', 'g06', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('ElodieR', 'elodie@live.fr', '2001-09-16', 'g12', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Yakaru56', 'yakaru@live.fr', '1994-12-24', 'm8', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Johnny78', 'jonn@live.fr', '1990-06-18', 'm6', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');

INSERT INTO roles VALUES (1,'ROLE_USER','T'), (2,'ROLE_ADMIN','F');

INSERT INTO users_roles VALUES (1,2);
INSERT INTO users_roles VALUES (1,1);
INSERT INTO users_roles VALUES (2,1);
INSERT INTO users_roles VALUES (3,1);
INSERT INTO users_roles VALUES (4,1);
INSERT INTO users_roles VALUES (5,1);

COMMIT;

INSERT INTO associations (name, code, description, link) VALUES ('WWF Environnement', 'WWF', 'This is a simple description...', 'http://www.wwf.org');
INSERT INTO associations (name, code, description, link) VALUES ('Médecins Sans Frontières', 'MSF', 'This is a simple description...', 'http://www.msf.org');
INSERT INTO associations (name, code, description, link) VALUES ('Croix Rouge', 'CR', 'This is a simple description...', 'http://www.cr.org');

COMMIT;

SET autocommit = 1; /* true */
