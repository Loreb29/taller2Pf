const express = require("express");
const router = express.Router();
const keyscontroller = require("../controllers/keyscontroller.js");
console.log("TRES")
router.route("/:mensaje")
.post(keyscontroller.consultar);

module.exports = router;