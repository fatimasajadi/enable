DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phoneNumber VARCHAR(255) NOT NULL,
  email VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE contracts (
  id SERIAL PRIMARY KEY NOT NULL,
  worker_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  patient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  service_date DATE,
  description VARCHAR(255),
  rate INTEGER,
  type_of_pay VARCHAR(255),
  status TEXT
);

CREATE TABLE purchases (
  id SERIAL PRIMARY KEY NOT NULL,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
  bill_image BYTEA
);
