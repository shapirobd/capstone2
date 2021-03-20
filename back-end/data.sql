CREATE TABLE "users" (
  "username" text PRIMARY KEY,
  "email" text,
  "first_name" text,
  "last_name" text,
  "password" text,
  "weight" int,
  "weight_goal" int,
  "calorie_goal" int,
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

ALTER TABLE "bookmarks" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "nutrients" ADD FOREIGN KEY ("meal_id") REFERENCES "meals" ("id");

ALTER TABLE "nutrients" ADD FOREIGN KEY ("nutrient_id") REFERENCES "macros" ("id");

ALTER TABLE "nutrients" ADD FOREIGN KEY ("nutrient_id") REFERENCES "vitamins" ("id");

ALTER TABLE "nutrients" ADD FOREIGN KEY ("nutrient_id") REFERENCES "minerals" ("id");

INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 716627, '2021-03-14');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 716408, '2021-03-14');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 716426, '2021-03-15');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 715594, '2021-03-15');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 715497, '2021-03-16');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 644387, '2021-03-16');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 715392, '2021-03-17');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 716268, '2021-03-17');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 716381, '2021-03-18');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 782601, '2021-03-18');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 715446, '2021-03-19');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 715415, '2021-03-19');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 716426, '2021-03-20');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 766453, '2021-03-20');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 716627, '2021-03-21');
INSERT INTO "users_meals" ("username", "meal_id", "date") VALUES ('shapirobd', 716408, '2021-03-21');

-- ALTER TABLE "users_meals" ADD FOREIGN KEY ("meal_id") REFERENCES "meals" ("id");

-- ALTER TABLE "bookmarks" ADD FOREIGN KEY ("meal_id") REFERENCES "meals" ("id");

