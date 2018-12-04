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

//consultar registros
app.get('/programas/partido', function(req, res){
    let sql = `SELECT * from candidatura where candidatura_id=${req.query.id}`;
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/programas/candidatos', function(req, res){
    let sql = `select * from votante v inner join politico p on (p.politico_id = v.votante_id) where p.candidatura=${req.query.id}`;
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/checkdata', function(req, res){
    let sql = `select * from votante where votante_id=${req.query.dni} and firma_digital=${req.query.firmaDigital};`;
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/mesa/check', function(req, res){
    let sql = `select * 
    from colegio c 
    inner join mesaElectoral m on(c.colegio_id = m.colegio) 
    inner join puestoMesa p on (p.votante =${req.query.dni} and p.mesa = m.mesa_id);`;
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/votar/check', function(req, res){
    let sql = `select voto_parlamento from votante where votante_id=${req.query.dni};`;
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//modificar registros
app.post('/votar', function(req, res){
    let sql = `update votante set voto_parlamento=${req.body.voto} where votante_id=${req.body.dni}`;
    con.query(sql, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = app;
module.exports = con;