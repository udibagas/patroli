require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { createHandler } = require("graphql-http/lib/use/express");
const cookieParser = require("cookie-parser");
const { ruruHTML } = require("ruru/server");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { schema } = require("./graphql/schema");
const { resolver: rootValue } = require("./graphql/resolver");
const { auth } = require("./middlewares/auth.middleware");
const app = express();

app.set("view engine", "ejs");

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:4000",
      "http://localhost:3000",
      "http://192.168.1.18:8081",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.all("/graphql", auth, createHandler({ schema, rootValue }));
app.get("/gql", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.use("/api", require("./routes"));
app.use(express.static("./frontend/.output/public"));

app.use(errorHandler);

module.exports = app;
