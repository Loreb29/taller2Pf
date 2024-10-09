const mysql = require("mysql2");
const db = mysql.createConnection ({
    host: "localhost",//"192.168.0.4",//"192.168.20.132", //"201.221.172.25",201.221.172.0
    user: "root",//"jpgarzon",S
    password: "",
    database: "taller2db",
});

db.connect((err)=> {
    if (err) {
        throw err;
    }
    console.log ("BD Mysql Conectado");
});

module.exports = db;
