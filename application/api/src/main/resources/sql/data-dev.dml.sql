USE jar_it_dev; /* default schema for script */

SET autocommit = 0; /* false */

SET NAMES utf8mb4; /* charset */

DELETE FROM users;
DELETE FROM roles;
DELETE FROM users_roles;

INSERT INTO roles VALUES (1,'ROLE_USER','T'), (2,'ROLE_ADMIN','F');

INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('louiiuol', 'louiiuol@live.fr', '1995-11-17', 'm17', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (1,2);
INSERT INTO users_roles VALUES (1,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Juju58', 'juju@live.fr', '1986-04-24', 'g6', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (2,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('ElodieR', 'elodie@live.fr', '2001-09-16', 'g12', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (3,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Yakaru56', 'yakaru@live.fr', '1994-12-24', 'm8', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (4,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Johnny78', 'jonn@live.fr', '1990-06-18', 'm6', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (5,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Octavia', 'Octavia@live.fr', '1990-06-18', 'g1', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (6,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Yohan', 'Yohan@live.fr', '1990-06-18', 'm9', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (7,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Bernard', 'Bernard@live.fr', '1990-06-18', 'm5', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (8,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Roberta', 'Roberta@live.fr', '1990-06-18', 'g9', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (9,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Queenzz', 'Queenzz@live.fr', '1990-06-18', 'g4', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (10,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Patrick', 'Patrick@live.fr', '1990-06-18', 'm8', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (11,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Titi83', 'Titi83@live.fr', '1990-06-18', 'm1', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (12,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Frank78', 'Frank78@live.fr', '1990-06-18', 'm6', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (13,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Ioio46', 'Ioio46@live.fr', '1990-06-18', 'g12', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (14,1);
INSERT INTO users (username, email, birth_date, avatar, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES ('Norber78', 'Norber78@live.fr', '1990-06-18', 'm2', '$2a$10$.qnpE6nYCMJm9Id7SuwyP.u2xyXv1BWetauvdhGpy8iZgMzk8YdJK', 'T', 'T', 'T', 'T');
INSERT INTO users_roles VALUES (15,1);

INSERT INTO associations (name, code, description, link) VALUES ('WWF Environnement', 'WWF', 'This is a simple description...', 'http://www.wwf.org');
INSERT INTO associations (name, code, description, link) VALUES ('Médecins Sans Frontières', 'MSF', 'This is a simple description...', 'http://www.msf.org');
INSERT INTO associations (name, code, description, link) VALUES ('Mécénat Chirurgie Cardiaque', 'MCC', 'This is a simple description...', 'http://www.mcc.org');
INSERT INTO associations (name, code, description, link) VALUES ('Secours Catholique', 'SCAT', 'This is a simple description...', 'http://www.secours-catholique.org');
INSERT INTO associations (name, code, description, link) VALUES ('Plaine Commune', 'PCM', 'This is a simple description...', 'http://www.plaine-commune.org');
INSERT INTO associations (name, code, description, link) VALUES ('Aviation sans frontières', 'ASF', 'This is a simple description...', 'https://www.asf-fr.org/');
INSERT INTO associations (name, code, description, link) VALUES ('CONCORDIA', 'CNCD', 'This is a simple description...', 'https://www.concordia.fr/');
INSERT INTO associations (name, code, description, link) VALUES ('UNICEF', 'UCF', 'This is a simple description...', 'https://www.unicef.fr');
INSERT INTO associations (name, code, description, link) VALUES ('Amnestry International', 'AMNI', 'This is a simple description...', 'https://www.amnesty.fr/');
INSERT INTO associations (name, code, description, link) VALUES ('Green Peace', 'GP', 'This is a simple description...', 'https://www.greenpeace.fr/');

INSERT INTO jars (`closing_date`, `max_amount`, `reference_cost`, `starting_date`, `state`, `title`, `addressee_id`, `author_id`) VALUES ('2020-09-3', '20', '0.50', '2020-07-05', '0', 'Clean Up !', '1', '1');

INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('T', 0.00, '2020-07-05', 'F', '1', '1' ); --1
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('T', 0.00, '2020-07-05', 'F', '1', '2' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-07-06', 'F', '1', '4' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-07-06', 'F', '1', '5' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-07-06', 'F', '1', '6' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-07-06', 'F', '1', '7' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-07-06', 'F', '1', '8' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-07-06', 'F', '1', '9' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-07-06', 'F', '1', '10' );

INSERT INTO jars (`closing_date`, `max_amount`, `reference_cost`, `starting_date`, `state`, `title`, `addressee_id`, `author_id`) VALUES ('2020-08-17', '20', '0.5', '2020-06-13', '1', 'Behave Boys !!', '3', '5');

INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('T', 0.00, '2020-06-13', 'F', '2', '5' ); -- 10
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('T', 1.00, '2020-06-13', 'F', '2', '1' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.50, '2020-06-14', 'F', '2', '4' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-06-14', 'F', '2', '6' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 1.50, '2020-06-14', 'F', '2', '7' );

INSERT INTO confessions(date, swear, author_id) VALUES ('2020-07-06 09:43:50', 'Shiiit', '11');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-07-06 09:47:50', 'Hell noo', '12');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-07-06 09:53:50', 'Damnit', '11');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-07-06 10:13:50', 'Shiiit', '14');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-07-06 10:13:50', 'Shiiit', '14');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-07-06 10:13:50', 'Shiiit', '14');

INSERT INTO jars (`closing_date`, `max_amount`, `reference_cost`, `starting_date`, `state`, `title`, `addressee_id`, `author_id`) VALUES ('2020-06-17', '20', '0.5', '2020-04-13', '2', 'Support them all', '5', '1');

INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('T', 0.00, '2020-06-13', 'F', '3', '5' ); -- 15
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('T', 1.00, '2020-06-13', 'F', '3', '1' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.50, '2020-06-14', 'F', '3', '4' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-06-14', 'F', '3', '5' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.00, '2020-06-14', 'F', '3', '6' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.50, '2020-06-14', 'F', '3', '7' );

INSERT INTO confessions(date, swear, author_id) VALUES ('2020-04-14 09:43:50', 'Shiiit', '16');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-04-14 10:30:50', 'Hell noo', '16');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-04-14 11:43:50', 'Damnit', '17');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-04-14 14:43:50', 'Shiiit', '20');

INSERT INTO jars (`closing_date`, `max_amount`, `reference_cost`, `starting_date`, `state`, `title`, `addressee_id`, `author_id`) VALUES ('2020-05-17', '10', '1', '2020-02-13', '4', 'Calm Down please', '3', '1');

INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('T', 3.00, '2020-06-13', 'T', '4', '5' ); -- 21
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('T', 2.00, '2020-06-13', 'T', '4', '1' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 0.50, '2020-06-14', 'T', '4', '4' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 1.50, '2020-06-14', 'T', '4', '7' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 1.50, '2020-06-14', 'T', '4', '8' );
INSERT INTO members (admin, balance, joined, payed, jar_id, user_id) VALUES ('F', 1.50, '2020-06-14', 'T', '4', '10' );

INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '21');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '21');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '21');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '21');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '21');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '21');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Hell noo', '22');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Hell noo', '22');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Hell noo', '22');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Hell noo', '22');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Damnit', '23');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '24');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '24');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '24');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Fuck', '25');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Fuck', '25');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Fuck', '25');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '26');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '26');
INSERT INTO confessions(date, swear, author_id) VALUES ('2020-02-14 09:43:50', 'Shiiit', '26');

COMMIT;

SET autocommit = 1; /* true */
