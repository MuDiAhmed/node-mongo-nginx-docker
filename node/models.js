const fs = require("fs");
const join = require("path").join;
const models = join(__dirname, "./src/models");
const dbConnectio = require("./db");

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)).Model(dbConnectio));
