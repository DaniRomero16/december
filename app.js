var express = require('express');
var bodyParser = require('body-parser');
const PORT = 3000;
var app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//------------
//configuracion de archivos
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//------------
//creacion del servidor
app.listen(PORT, () =>{
    console.log('Servidor corriendo correctamente');
});

module.exports = app;