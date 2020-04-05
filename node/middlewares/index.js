const morgan = require("./morgan");
const morganAccess = morgan.logAll;
const morganError = morgan.logError;
const helmet = require("./helmet");
const express = require("express");
const router = express.Router();
const env = require("../env").getEnv();
const docDir = `${__dirname}/../${env.api_doc_dir}`;

router.use(morganAccess);
router.use(morganError);
router.use(helmet);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(env.api_doc_url, express.static(docDir));

module.exports = router;
