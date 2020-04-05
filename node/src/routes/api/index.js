const router = require("express").Router();
const posts = require("./post");
const users = require("./user");
const comments = require("./comment");

router.use("/api/posts", posts);
router.use("/api/users", users);
router.use("/api/comments", comments);

module.exports = router;
