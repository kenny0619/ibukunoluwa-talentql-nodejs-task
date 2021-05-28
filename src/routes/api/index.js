// import express router as router
const router = require("express").Router();

// route endpoints
router.use("/auth", require("./auth.route"));
router.use("/posts", require("./post.route"));

module.exports = router;
