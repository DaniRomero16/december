var routes = require('../routes');
var chai = require('chai');
var chaiHttp = require('chai-http');
var con = require('../database');
var should = chai.should();
chai.use(chaiHttp);

describe('/GET colegio', () => {
    it('Comprueba si se ha asignado una mesa y devuelve datos del colegio.', (done) => {
        let data = {
            dni: 10111195
        }
        chai.request(routes)
            .get('/mesa/check')
            .query(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('direccion').be.a('string');
                res.body[0].should.have.property('poblacion').be.a('string');
                res.body[0].should.have.property('puesto').be.a('string');
                res.body[0].should.have.property('provincia').be.a('string');
                done();
            });
    });
});