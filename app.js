require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(require("./routes"));

module.exports = app;
