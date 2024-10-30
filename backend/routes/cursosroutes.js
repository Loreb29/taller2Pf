const express = require("express");
const router = express.Router();
const cursoscontroller = require("../controllers/CursosController.js");

router.get("/",cursoscontroller.consultar);
router.post("/",cursoscontroller.ingresar);
router.get("/registraEstudiante",cursoscontroller.consultarEst);
router.post("/registraEstudiante",cursoscontroller.asociarEstudiante);

router.route("/:id")
.get(cursoscontroller.consultarDetalle)
.put(cursoscontroller.actualizar)
.delete(cursoscontroller.borrar);

router.route("/registraEstudiante/:curso_id")
.get(cursoscontroller.consultarDetalleEst)
.put(cursoscontroller.actualizarEst)
.delete(cursoscontroller.borrarEst);
module.exports = router;
