-- Run this script once to prepare the database.
-- Compatible with MySQL 5.7+ and MySQL 8.x.

CREATE DATABASE IF NOT EXISTS school_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
  id        INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  name      VARCHAR(255)    NOT NULL,
  address   VARCHAR(500)    NOT NULL,
  latitude  FLOAT(10, 6)   NOT NULL,
  longitude FLOAT(10, 6)   NOT NULL,
  created_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
