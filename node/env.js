const config = require("config");

const dbConnection = config.get("DB_CONNECTION");
const env = {
  port: config.has("ENV_PORT") ? config.get("ENV_PORT") : config.get("PORT"),
  env: config.util.getEnv("NODE_ENV"),
  server_debug: config.get("APP_DEBUG.SERVER"),
  api_debug: config.get("APP_DEBUG.API"),
  log: config.get("LOG"),
  dbMongooseConfig: config.get("DB_MONGOOSE_CONFIG"),
  dbConnection: {
    url: config.has("ENV_DB_URL") ? config.get("ENV_DB_URL") : dbConnection.URL,
  },
  models: config.get("MODELS"),
  api_doc_url: config.get("API_DOCS.URL"),
  api_doc_dir: config.has("API_DOC_DIR")
    ? config.get("API_DOC_DIR")
    : config.get("API_DOCS.DIR"),
};

const getEnv = () => {
  return { ...env };
};

const setAppEnv = (app) => {
  app.set("env", env.env);
};
module.exports.getEnv = getEnv;
module.exports.setAppEnv = setAppEnv;
