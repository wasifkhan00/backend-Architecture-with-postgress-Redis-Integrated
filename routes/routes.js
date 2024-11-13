const express = require("express");
const router = express.Router();
const homeRequestHandler = require("../controllers/controllers");
// routes are specified
router.route("/").get(homeRequestHandler);

module.exports = router;
