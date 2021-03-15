CREATE TABLE "users" (
  "username" text PRIMARY KEY,
  "email" text,
  "first_name" text,
  "last_name" text,
  "password" text,
  "api_hash" text,
  "api_username" text
);

CREATE TABLE "meals" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "calories" int
);

CREATE TABLE "users_meals" (
  "id" SERIAL PRIMARY KEY,
  "username" text,
  "meal_id" int,
  "date" date
);

CREATE TABLE "bookmarks" (
  "id" SERIAL PRIMARY KEY,
  "username" text,
  "meal_id" int
);

CREATE TABLE "nutrients" (
  "id" SERIAL PRIMARY KEY,
  "meal_id" int,
  "nutrient_id" int,
  "nutrient_amount" int
);

CREATE TABLE "macros" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);

CREATE TABLE "vitamins" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);

CREATE TABLE "minerals" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);

ALTER TABLE "users_meals" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "users_meals" ADD FOREIGN KEY ("meal_id") REFERENCES "meals" ("id");

ALTER TABLE "bookmarks" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "bookmarks" ADD FOREIGN KEY ("meal_id") REFERENCES "meals" ("id");

ALTER TABLE "nutrients" ADD FOREIGN KEY ("meal_id") REFERENCES "meals" ("id");

ALTER TABLE "nutrients" ADD FOREIGN KEY ("nutrient_id") REFERENCES "macros" ("id");

ALTER TABLE "nutrients" ADD FOREIGN KEY ("nutrient_id") REFERENCES "vitamins" ("id");

ALTER TABLE "nutrients" ADD FOREIGN KEY ("nutrient_id") REFERENCES "minerals" ("id");
