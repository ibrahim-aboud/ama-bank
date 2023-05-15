DROP DATABASE IF EXISTS db_amabank_archive;

CREATE DATABASE db_amabank_archive;
USE db_amabank_archive;


CREATE TABLE `ab_banks` (
  `id_bank_archived` INT NOT NULL AUTO_INCREMENT,
  `id_bank` INT NOT NULL,
  `bank_name` VARCHAR(256) NOT NULL,
  `bank_description` TEXT,
  `bank_visits_count` INT DEFAULT 0,
  `bank_website_link` TEXT,
  `bank_update_date` DATE,
  `bank_archiving_date` DATE DEFAULT (NOW()),
  `status` ENUM("DELETED", "MODIFIED", "INSERTED"),
  PRIMARY KEY (`id_bank_archived`)
);

CREATE TABLE `ab_categories` (
  `id_categorie` INT NOT NULL AUTO_INCREMENT,
  `categorie_name` TINYTEXT NOT NULL,
  PRIMARY KEY (`id_categorie`)
);

CREATE TABLE `ab_prestations` (
  `id_prestation_archived` INT NOT NULL AUTO_INCREMENT,
  `id_prestation` INT NOT NULL,
  `prestation_bank_id` INT NOT NULL,
  `prestation_name` VARCHAR(256) NOT NULL,
  `prestation_categorie_id` INT,
  `prestation_type` ENUM("particulier", "professionnel", "entreprise") NOT NULL,
  `prestation_tarif` DOUBLE NOT NULL,
  `prestation_period` INT,
  `prestation_categorie_operation` ENUM("Gestion et tenue de compte", "Opération de paiement", "Monétique"),
  `prestation_archiving_date` DATE DEFAULT (NOW()),
  `status` ENUM("DELETED", "MODIFIED", "INSERTED"),
  PRIMARY KEY (`id_prestation_archived`)
);

CREATE TABLE `ab_dgs` (
  `id_dg_archived` INT NOT NULL AUTO_INCREMENT,
  `id_dg` INT NOT NULL,
  `dg_bank_id` INT,
  `dg_address` TINYTEXT NOT NULL,
  `dg_lat` DOUBLE,
  `dg_lng` DOUBLE,
  `dg_wilaya` INT NOT NULL,
  `dg_phone` TINYTEXT,
  `dg_fax` TINYTEXT,
  `dg_location_link` VARCHAR(500),
  `dg_archiving_date` DATE DEFAULT (NOW()),
  `status` ENUM("DELETED", "MODIFIED", "INSERTED"),
  PRIMARY KEY (`id_dg_archived`)
);

CREATE TABLE `ab_agencies` (
  `id_agency_archived` INT NOT NULL AUTO_INCREMENT,
  `id_agency` INT NOT NULL,
  `agency_bank_id` INT,
  `agency_address` TINYTEXT,
  `agency_lat` DOUBLE,
  `agency_lng` DOUBLE,
  `agency_wilaya` INT NOT NULL,
  `agency_phone` TINYTEXT,
  `agency_fax` TINYTEXT,
  `agency_location_link` VARCHAR(1000),
  `agency_archiving_date` DATE DEFAULT (NOW()),
  `status` ENUM("DELETED", "MODIFIED", "INSERTED"),
  PRIMARY KEY (`id_agency_archived`)
);

CREATE TABLE `ab_users` (
  `id_user_archived` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `user_name` VARCHAR(256)  NOT NULL,
  `user_email`VARCHAR(256)  NOT NULL,
  `user_password` TINYTEXT NOT NULL,
  `user_archiving_date` DATE DEFAULT (NOW()),
  `status` ENUM("DELETED", "MODIFIED", "INSERTED"),
  PRIMARY KEY (`id_user_archived`)
);

