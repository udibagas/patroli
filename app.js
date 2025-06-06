require("dotenv").config();
const express = require("express");
const pdf = require("express-pdf");
const cors = require("cors");
const { createHandler } = require("graphql-http/lib/use/express");
const cookieParser = require("cookie-parser");
const { ruruHTML } = require("ruru/server");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { schema } = require("./graphql/schema");
const { resolver: rootValue } = require("./graphql/resolver");
const app = express();

const { ALLOWED_ORIGIN = "" } = process.env;

app.set("view engine", "ejs");
app.use(pdf);

app.use(
  cors({
    origin: ALLOWED_ORIGIN.split(","),
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/apk", express.static("apk"));

app.all("/graphql", createHandler({ schema, rootValue }));
app.get("/gql", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.use("/api", require("./routes"));
app.use(express.static("./frontend/.output/public"));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "./frontend/.output/public" });
});

app.use(errorHandler);

module.exports = app;
