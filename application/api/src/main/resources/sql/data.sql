INSERT INTO `etin_dev`.`users` (`account_non_expired`, `account_non_locked`, `avatar`, `credentials_non_expired`, `email`, `enabled`, `password`, `username`) VALUES ('T', 'T', 'm17', 'T', 'louiiuol@live.fr', 'T', '$2y$12$.sQ8fOFAfpk3SLT/zILghe3WI/3A88layJDwcgEToEdXkyuRWqrom', 'louiiuol');
INSERT INTO `etin_dev`.`users` (`account_non_expired`, `account_non_locked`, `avatar`, `credentials_non_expired`, `email`, `enabled`, `password`, `username`) VALUES ('T', 'T', 'g14', 'T', 'juliette@mail.fr', 'T', '$2y$12$.sQ8fOFAfpk3SLT/zILghe3WI/3A88layJDwcgEToEdXkyuRWqrom', 'Juliette');
INSERT INTO `etin_dev`.`users` (`account_non_expired`, `account_non_locked`, `avatar`, `credentials_non_expired`, `email`, `enabled`, `password`, `username`) VALUES ('T', 'T', 'm12', 'T', 'marco@mail.fr', 'T', '$2y$12$.sQ8fOFAfpk3SLT/zILghe3WI/3A88layJDwcgEToEdXkyuRWqrom', 'Marco42');

INSERT INTO `etin_dev`.`roles` VALUES (1,'ROLE_USER','T'),  (2,'ROLE_ADMIN','F');

COMMIT;

INSERT INTO `etin_dev`.`users_roles` VALUES (1,2);
INSERT INTO `etin_dev`.`users_roles` VALUES (1,1);
INSERT INTO `etin_dev`.`users_roles` VALUES (2,1);
INSERT INTO `etin_dev`.`users_roles` VALUES (3,1);

COMMIT;