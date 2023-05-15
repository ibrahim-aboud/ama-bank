DROP DATABASE IF EXISTS db_amabank;
DROP DATABASE IF EXISTS db_admin_amabank;

CREATE DATABASE db_amabank;
USE db_amabank;


CREATE TABLE `ab_banks` (
  `id_bank` INT NOT NULL AUTO_INCREMENT,
  `bank_name` VARCHAR(256) NOT NULL UNIQUE,
  `bank_description` TEXT,
  `bank_visits_count` INT DEFAULT 0,
  `bank_website_link` TEXT,
  `bank_update_date` DATE DEFAULT (NOW()),
  PRIMARY KEY (`id_bank`)
);

CREATE TABLE `ab_categories` (
  `id_categorie` INT NOT NULL AUTO_INCREMENT,
  `categorie_name` VARCHAR(256) NOT NULL UNIQUE,
  PRIMARY KEY (`id_categorie`)
);

CREATE TABLE `ab_prestations` (
  `id_prestation` INT NOT NULL AUTO_INCREMENT,
  `prestation_bank_id` INT NOT NULL,
  `prestation_name` VARCHAR(256) NOT NULL,
  `prestation_categorie_id` INT,
  `prestation_type` ENUM("particulier", "professionnel", "entreprise") NOT NULL,
  `prestation_tarif` DOUBLE NOT NULL,
  `prestation_period` INT,
  `prestation_categorie_operation` ENUM("Gestion et tenue de compte", "Opération de paiement", "Monétique"),
  PRIMARY KEY (`id_prestation`),
  FOREIGN KEY (`prestation_categorie_id`) REFERENCES `ab_categories`(`id_categorie`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`prestation_bank_id`) REFERENCES `ab_banks`(`id_bank`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `ab_dgs` (
  `id_dg` INT NOT NULL AUTO_INCREMENT,
  `dg_bank_id` INT,
  `dg_address` TINYTEXT NOT NULL,
  `dg_lat` DOUBLE,
  `dg_lng` DOUBLE,
  `dg_wilaya` INT NOT NULL,
  `dg_phone` TINYTEXT,
  `dg_fax` TINYTEXT,
  `dg_location_link` VARCHAR(500),
  PRIMARY KEY (`id_dg`),
  FOREIGN KEY (`dg_bank_id`) REFERENCES `ab_banks`(`id_bank`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `ab_agencies` (
  `id_agency` INT NOT NULL AUTO_INCREMENT,
  `agency_bank_id` INT,
  `agency_address` TINYTEXT,
  `agency_lat` DOUBLE,
  `agency_lng` DOUBLE,
  `agency_wilaya` INT NOT NULL,
  `agency_phone` TINYTEXT,
  `agency_fax` TINYTEXT,
  `agency_location_link` VARCHAR(1000),
  `agency_location` TINYTEXT,
  PRIMARY KEY (`id_agency`),
  FOREIGN KEY (`agency_bank_id`) REFERENCES `ab_banks`(`id_bank`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `ab_info` (
  `id_info` INT NOT NULL AUTO_INCREMENT,
  `phone` TINYTEXT,
  `email` TINYTEXT,
  `fax` TINYTEXT,
  `description` TEXT,
  `facebook_link` TINYTEXT,
  `linkedin_link` TINYTEXT,
  `instagram_link` TINYTEXT,
  `twitter_link` TINYTEXT,
  PRIMARY KEY (`id_info`)
);


CREATE TABLE `ab_users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(256) UNIQUE NOT NULL,
  `user_email`VARCHAR(256) UNIQUE NOT NULL,
  `user_password` TINYTEXT NOT NULL,
  PRIMARY KEY (`id_user`)
);

CREATE TABLE ab_slideshow (   id_slideshow INT NOT NULL AUTO_INCREMENT, link_slideshow TINYTEXT, PRIMARY KEY (id_slideshow) );

CREATE DATABASE db_admin_amabank;
USE db_admin_amabank;

# TO BE PUT IN ANOTHER DATABASE!
CREATE TABLE `ab_admins` (
  `id_admin` INT NOT NULL AUTO_INCREMENT,
  `admin_name` VARCHAR(256) UNIQUE NOT NULL,
  `admin_email` VARCHAR(256) UNIQUE NOT NULL,
  `admin_password` TINYTEXT NOT NULL,
  PRIMARY KEY (`id_admin`)
);
