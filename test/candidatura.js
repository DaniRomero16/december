var routes = require('../routes');
var chai = require('chai');
var chaiHttp = require('chai-http');
var con = require('../database');
var should = chai.should();
chai.use(chaiHttp);

describe('/GET candidatura', () => {
    it('Devuelve datos de una candidatura.', (done) => {
        let data = {
            id: 2
        }
        chai.request(routes)
            .get('/programas/partido')
            .query(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('nombre').be.a('string');
                res.body[0].should.have.property('programa').be.a('string');
                done();
            });
    });
    it('Devuelve politicos de una candidatura.', (done) => {
        let data = {
            id: 2
        }
        chai.request(routes)
            .get('/programas/candidatos')
            .query(data)
            .end((err, res) => {     
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.length(10);
                done();
            });
    });
});