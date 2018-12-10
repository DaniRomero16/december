var con = require('../database');

var controller = {

    checkData: function (req, res) {
        let sql = `select * from votante where votante_id=${req.query.dni} and firma_digital=${req.query.firmaDigital};`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    checkVoto: function (req, res) {
        let sql = `select voto_parlamento from votante where votante_id=${req.query.dni};`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    vote: function (req, res) {
        let sql = `update votante set voto_parlamento=${req.body.voto} where votante_id=${req.body.dni}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    count: function (req, res) {
        let sql = `select count(*) as total, voto_parlamento as partido from votante group by voto_parlamento;`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    }

};

module.exports = controller;