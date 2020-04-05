const express = require("express");
const app = express();
const routes = require("./src/routes");
const middlewares = require("./middlewares");
const env = require("./env");
require("./models");
require("./globals");

env.setAppEnv(app);
app.use(middlewares);
app.use(routes);

module.exports = app;
