const db = require("./db");
const app = require("./bootstrap");
const env = require("./env").getEnv();
const debug = require("debug")(env.server_debug);

const startSever = () => {
  app.listen(env.port, () => debug(`listening to port ${env.port}`));
};
db.on("error", console.log.bind(console, "connection error: "))
  .on("connected", () => {
    console.log("connected successfully");
    startSever();
  })
  .on("disconnected", () => {
    console.log("disconnected");
  });
