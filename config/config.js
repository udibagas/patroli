require("dotenv").config();
const { DB_HOST } = process.env;

module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "patroli_dev",
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "patroli_test",
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "patroli_prod",
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
};
