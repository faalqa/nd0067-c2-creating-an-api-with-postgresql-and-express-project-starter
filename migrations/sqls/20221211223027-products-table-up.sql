CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL,
  "name" VARCHAR(255) NOT NULL,
  "price" FLOAT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY("id")
);