-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema jar_it_dev
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema jar_it_dev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jar_it_dev` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `jar_it_dev` ;

-- -----------------------------------------------------
-- Table `jar_it_dev`.`associations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jar_it_dev`.`associations` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` CHAR(5) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `link` VARCHAR(255) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `association_name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `association_code_UNIQUE` (`code` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jar_it_dev`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jar_it_dev`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_non_expired` ENUM('T', 'F') NOT NULL DEFAULT 'T',
  `account_non_locked` ENUM('T', 'F') NOT NULL DEFAULT 'T',
  `avatar` VARCHAR(255) NOT NULL,
  `birth_date` DATE NOT NULL,
  `credentials_non_expired` ENUM('T', 'F') NOT NULL DEFAULT 'T',
  `email` VARCHAR(100) NOT NULL,
  `enabled` ENUM('T', 'F') NOT NULL DEFAULT 'T',
  `password` VARCHAR(255) NOT NULL,
  `username` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jar_it_dev`.`jars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jar_it_dev`.`jars` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `closing_date` DATE NOT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `max_amount` DOUBLE NOT NULL,
  `reference_cost` DOUBLE NOT NULL,
  `start_date` DATE NOT NULL,
  `state` INT NULL DEFAULT NULL,
  `title` VARCHAR(20) NOT NULL,
  `addressee_id` BIGINT UNSIGNED NOT NULL,
  `author_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKmg9b5kmdwb36om4t6x75ff4ve` (`addressee_id` ASC) VISIBLE,
  INDEX `FKaaujemst5wwfdr8pg0sqdmw6u` (`author_id` ASC) VISIBLE,
  CONSTRAINT `FKaaujemst5wwfdr8pg0sqdmw6u`
    FOREIGN KEY (`author_id`)
    REFERENCES `jar_it_dev`.`users` (`id`),
  CONSTRAINT `FKmg9b5kmdwb36om4t6x75ff4ve`
    FOREIGN KEY (`addressee_id`)
    REFERENCES `jar_it_dev`.`associations` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jar_it_dev`.`members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jar_it_dev`.`members` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin` VARCHAR(1) NOT NULL,
  `balance` DOUBLE NOT NULL,
  `joined` DATETIME NOT NULL,
  `payed` VARCHAR(1) NOT NULL,
  `jar_id` BIGINT UNSIGNED NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK2bcuhxk3knfg0e6orp5y4pp4a` (`jar_id` ASC) VISIBLE,
  INDEX `FKpj3n6wh5muoeakc485whgs3x5` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK2bcuhxk3knfg0e6orp5y4pp4a`
    FOREIGN KEY (`jar_id`)
    REFERENCES `jar_it_dev`.`jars` (`id`),
  CONSTRAINT `FKpj3n6wh5muoeakc485whgs3x5`
    FOREIGN KEY (`user_id`)
    REFERENCES `jar_it_dev`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jar_it_dev`.`confessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jar_it_dev`.`confessions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `swear` VARCHAR(20) NOT NULL,
  `author_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKbgmc069r1mh69qxlb6wbwyrni` (`author_id` ASC) VISIBLE,
  CONSTRAINT `FKbgmc069r1mh69qxlb6wbwyrni`
    FOREIGN KEY (`author_id`)
    REFERENCES `jar_it_dev`.`members` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jar_it_dev`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jar_it_dev`.`roles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` CHAR(10) NOT NULL,
  `default_role` ENUM('T', 'F') NOT NULL DEFAULT 'T',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `roles_code_UNIQUE` (`code` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `jar_it_dev`.`users_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jar_it_dev`.`users_roles` (
  `user_id` BIGINT UNSIGNED NOT NULL,
  `role_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `FKj6m8fwv7oqv74fcehir1a9ffy` (`role_id` ASC) VISIBLE,
  CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa`
    FOREIGN KEY (`user_id`)
    REFERENCES `jar_it_dev`.`users` (`id`),
  CONSTRAINT `FKj6m8fwv7oqv74fcehir1a9ffy`
    FOREIGN KEY (`role_id`)
    REFERENCES `jar_it_dev`.`roles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;