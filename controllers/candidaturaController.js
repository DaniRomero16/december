var con = require('../database');

var controller = {

    getCandidatura: function (req, res) {
        let sql = `SELECT * from candidatura where candidatura_id=${req.query.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    getPoliticos: function (req, res) {
        let sql = `select * from votante v 
        inner join politico p on (p.politico_id = v.votante_id) 
        where p.candidatura=${req.query.id}`;
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