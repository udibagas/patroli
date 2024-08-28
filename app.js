require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use("/api", require("./routes"));
app.use(require("./middlewares/errorHandler.middleware"));

module.exports = app;
