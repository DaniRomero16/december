var con = require('./database');
var app = require('./app');

//rutas
app.get('/',function(req, res){
    res.render('index');
});
app.get('/acceso',function(req, res){
    res.render('acceso');
});
app.get('/mesa',function(req, res){
    res.render('mesa');
});
app.get('/resultados',function(req, res){
    res.render('resultados');
});
app.get('/programas',function(req, res){
    res.render('programas');
});

//insert tareas
app.post('/tareas/add',function(req,res){
    let sql = `INSERT INTO tarea (nombre) VALUES ('${req.body.nombre}')`;
    con.query(sql, function(err, result){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            let tarea = {
                id: result.insertId,
                nombre: req.body.nombre,
                estado: req.body.estado
            }
            res.send(tarea);
        }
    });
});

//consultar registros
app.get('/tareas/get', function(req, res){
    let sql = 'SELECT * from tarea';
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//eliminar registros
app.post('/tareas/delete', function(req, res){
    let sql = `delete from tarea where id=${req.body.id}`;
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//modificar registros
app.post('/tareas/update', function(req, res){
    let sql = `update tarea set estado='${req.body.estado}' where id=${req.body.id}`;
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            let tarea = {
                nombre: req.body.nombre,
                result: result
            }
            res.send(tarea);
        }
    });
});

module.exports = app;
module.exports = con;