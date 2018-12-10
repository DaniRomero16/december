var ColegioController = require('./controllers/colegioController');
var VotanteController = require('./controllers/votanteController');
var CandidaturaController = require('./controllers/candidaturaController');
var app = require('./app');

//rutas
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/acceso', function (req, res) {
    res.render('acceso');
});
app.get('/mesa', function (req, res) {
    res.render('mesa');
});
app.get('/resultados', function (req, res) {
    res.render('resultados');
});
app.get('/programas', function (req, res) {
    res.render('programas');
});

//consultar registros
app.get('/programas/partido', CandidaturaController.getCandidatura);

app.get('/programas/candidatos', CandidaturaController.getPoliticos);

app.get('/checkdata', VotanteController.checkData);

app.get('/mesa/check', ColegioController.checkMesa);

app.get('/votar/check', VotanteController.checkVoto);

app.get('/votos/count', VotanteController.count);

//modificar registros
app.post('/votar', VotanteController.vote);

module.exports = app;