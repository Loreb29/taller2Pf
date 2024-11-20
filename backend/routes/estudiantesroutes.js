const express = require("express");
const router = express.Router();
const estudiantescontroller = require("../controllers/estudiantescontrollers.js");
router.route("/ecp/:id").get(estudiantescontroller.consultarDetalle);
router.post("/",estudiantescontroller.ingresar);

router.route("/:id")
.get(estudiantescontroller.consultar)
.put(estudiantescontroller.actualizar)
.delete(estudiantescontroller.borrar);

module.exports = router;
