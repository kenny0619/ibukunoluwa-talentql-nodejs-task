const router = require("express").Router();

// route api
router.use("/api/v1", require("./api"));

module.exports = router;
