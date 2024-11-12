const db= require("../database/conexion.js");
class keyscontroller{

    construct(){}

    consultar(req,res){
        
        try{
            console.log("hola")
            console.log(req.body)
            const usuario = req.body;
            db.query('SELECT publickey FROM cursos.usuarios WHERE usuario=? ;',
            [usuario],(err,rows) => {
              if (err) {
                res.status(400).send(err.message);
              }
              res.status(200).json(rows[0]);
            });
          } catch (err) {
            res.status(500).send(err.message);
          }

    }
}
module.exports = new keyscontroller();