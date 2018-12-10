var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"elecciones"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;