const path = require("path");
const express = require("express");

const configViewEngine = (app) => {
  // Setup EJS as the view engine
  app.set("view engine", "ejs");
  // Set views directory (adjust if needed)
  app.set("views", path.join("./src", "view"));

  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
