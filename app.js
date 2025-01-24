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
const { auth } = require("./middlewares/auth.middleware");
const { generatePdf } = require("./controllers/inspections.controller");
const app = express();

app.set("view engine", "ejs");
app.use(pdf);

app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://localhost",
      "http://192.168.1.10:3000",
      "http://10.10.101.194:3000",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.all("/graphql", auth, createHandler({ schema, rootValue }));
app.get("/gql", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.get("/api/inspections/generatePdf", generatePdf);
app.use("/api", require("./routes"));
app.use(express.static("./frontend/.output/public"));

app.use(errorHandler);

module.exports = app;
