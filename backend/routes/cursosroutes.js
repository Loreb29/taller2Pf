const express = require("express");
const router = express.Router();
const cursoscontroller = require("../controllers/CursosController.js");

router.route("/ecp/:id").get(cursoscontroller.consultarDetalle);

router.post("/",cursoscontroller.ingresar);

router.route("/registraEstudiante/ecp/:id").get(cursoscontroller.consultarDetalleEst);

router.post("/registraEstudiante",cursoscontroller.asociarEstudiante);

router.route("/:id")
.get(cursoscontroller.consultar)
.put(cursoscontroller.actualizar)
.delete(cursoscontroller.borrar);

router.route("/registraEstudiante/:curso_id")
.get(cursoscontroller.consultarEst)
.put(cursoscontroller.actualizarEst)
.delete(cursoscontroller.borrarEst);
module.exports = router;
