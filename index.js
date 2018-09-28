const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const config = require("./config/server-config");

app.disable("x-powered-by");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join("public")));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(require("./routes/get-text"));

app.use((_req, res) => res.sendStatus(404));

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set("Content-Type", "text/plain")
      .send(err.message);
  }

  if (err.status) {
    return res
      .status(err.status)
      .set("Content-Type", "text/plain")
      .send(err.errors);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(config.PORT, () => {
  if (app.get("env") !== "test") {
    console.log(`Listening on port ${config.PORT}`);
  }
});

module.exports = app;
