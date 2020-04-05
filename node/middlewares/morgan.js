const rfs = require("rotating-file-stream");
const path = require("path");
const morgan = require("morgan");
const env = require("../env").getEnv();
const accessLog = env.log.ALL;
const errorLog = env.log.ERROR;
const logPath = path.join(__dirname, `../${env.log.DIR}`);

const pad = num => (num > 9 ? "" : "0") + num;

const generator = logFile => (time, index) => {
  if (!time) return logFile;

  var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  var hour = pad(time.getHours());
  var minute = pad(time.getMinutes());

  return `${month}/${month}${day}-${hour}${minute}-${index}-${logFile}`;
};

const accessLogStream = rfs.createStream(generator(accessLog), {
  interval: "1d", // rotate daily
  size: "10M", // rotate every 10 MegaBytes written
  compress: "gzip", // compress rotated files
  path: logPath
});

const errorLogStream = rfs.createStream(generator(errorLog), {
  interval: "1d", // rotate daily
  size: "10M", // rotate every 10 MegaBytes written
  compress: "gzip", // compress rotated files
  path: logPath
});

module.exports.logAll = morgan("combined", { stream: accessLogStream });
module.exports.logError = morgan("combined", {
  stream: errorLogStream,
  skip: function(req, res) {
    return res.statusCode < 400;
  }
});
