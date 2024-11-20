const express = require("express");
const router = express.Router();
const keyscontroller = require("../controllers/keyscontroller.js");

console.log("TRES")
router.post("/",keyscontroller.consultar);
console.log("cuatro")
module.exports = router;