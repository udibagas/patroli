require("dotenv").config();
const express = require("express");
const app = express();
const { errorHandler } = require("./middlewares/errorHandler.middleware");

app.set("view engine", "ejs");
app.use(express.json());
app.use("/api", require("./routes"));
app.use(errorHandler);

module.exports = app;
