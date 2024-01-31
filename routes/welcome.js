const express = require("express");
const router = express.Router();
const welcomeController = require("../controller/welcome");

router
    .get("/", welcomeController.welcome)



module.exports = router;
