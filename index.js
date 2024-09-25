const mysql = require("mysql2")
const config = {
    host: "localhost",
    port: 3306,
    database: "taller2db",
    user: "root",
    password: "",
}
const connection = mysql.createConnection(config)
connection.connect(function(err) {
    if (err) throw(err);
    console.log("Connected!");
    /*let newData="INSERT INTO estudiantes (dni, nombre, apellidos, email) VALUES ('1000162190', 'Juan', 'Navarrete Ni', 'juanda2915@gmail.com');"
    connection.query(newData,function(err, results, fields){
            if(err){
                console.log(err.message);
            }
        });*/
});

const http = require('http');
http.createServer(function (req,res){
res.writeHead(200,{'Content-Type':'text/html'});
res.end('Hello World!');
}).listen(8080);


