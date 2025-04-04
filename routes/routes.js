const express = require("express");
const router = express.Router();
const {homeRequestHandler,postgressDataHandler} = require("../controllers/controllers");
// routes are specified
router.route("/email").get(homeRequestHandler);
router.route("/postgressData").get(postgressDataHandler);
// 
module.exports = router;
