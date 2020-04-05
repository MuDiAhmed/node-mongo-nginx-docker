const mongoose = require("mongoose");
const env = require("./env").getEnv();
let dbConnection = creatConnection();
mongoose.plugin(require("./plugins/updatedAt"));

function creatConnection() {
  const connection = mongoose.createConnection(
    `mongodb://${env.dbConnection.url}`,
    {
      useNewUrlParser: env.dbMongooseConfig.NEW_URL_PARSER,
      useUnifiedTopology: env.dbMongooseConfig.UNIFIED_TOPOLOGY,
      useCreateIndex: env.dbMongooseConfig.CREATE_INDEX,
      bufferCommands: env.dbMongooseConfig.BUFFER_COMMANDS,
      autoIndex: env.dbMongooseConfig.AUTO_INDEX,
      autoCreate: env.dbMongooseConfig.AUTO_CREATE,
      keepAlive: env.dbMongooseConfig.KEEP_ALIVE,
    }
  );
  connection
    .on("error", () => console.log("db connection error: "))
    .on("disconnected", () => (dbConnection = creatConnection()));
  return connection;
}

module.exports = dbConnection;
