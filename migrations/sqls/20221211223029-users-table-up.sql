CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL,
  "firstname" VARCHAR(255) NOT NULL,
  "lastname" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY("id")
);