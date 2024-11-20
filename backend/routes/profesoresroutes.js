const express = require("express");
const router = express.Router();
const profesorescontroller = require("../controllers/profesorescontrollers.js");

router.route("/ecp/:id").get(profesorescontroller.consultarDetalle);
router.post("/",profesorescontroller.ingresar);


router.route("/:id")
.get(profesorescontroller.consultar)
.put(profesorescontroller.actualizar)
.delete(profesorescontroller.borrar);

module.exports = router;
