-- PostgreSQL schema for Render deployment
CREATE TABLE IF NOT EXISTS schools (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  address    VARCHAR(500)  NOT NULL,
  latitude   FLOAT         NOT NULL,
  longitude  FLOAT         NOT NULL,
  created_at TIMESTAMP     NOT NULL DEFAULT NOW()
);
