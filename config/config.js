require("dotenv").config();
const { DB_HOST } = process.env;

module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "patroli_dev",
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false,
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
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: +process.env.PGPORT || 5432,
    dialect: "postgres",
    logging: false,
  },
};
