var routes = require('../routes');
var chai = require('chai');
var chaiHttp = require('chai-http');
var con = require('../database');
var should = chai.should();
chai.use(chaiHttp);

describe('/GET votante', () => {
    it('Devuelve datos de usuario al introducir DNI y Firma Digital.', (done) => {
        let data = {
            dni: 10111195,
            firmaDigital: 438416856
        }
        chai.request(routes)
            .get('/checkdata')
            .query(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('nombre').be.a('string');
                res.body[0].should.have.property('apellido1').be.a('string');
                res.body[0].should.have.property('apellido2').be.a('string');
                res.body[0].should.have.property('voto_parlamento').be.a('number');
                done();
            });
    });
    it('Devuelve el voto emitido de un usuario.', (done) => {
        let data = {
            dni: 10111195
        }
        chai.request(routes)
            .get('/votar/check')
            .query(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('voto_parlamento');
                done();
            });
    });
    it('Devuelve el escrutinio de votos actual.', (done) => {
        chai.request(routes)
            .get('/votos/count')
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('total');
                done();
            });
    });
});

describe('/POST voto', () => {
    it('Efectua el voto de manera correcta.', (done) => {
        let data = {
            dni: 10111195,
            voto: 3
        }
        chai.request(routes)
            .post('/votar')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('affectedRows').eql(1);
                done();
            });
    });
});