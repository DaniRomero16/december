var con = require('../database');

var controller = {

    checkMesa: function (req, res) {
        let sql = `select * 
        from colegio c 
        inner join mesaElectoral m on(c.colegio_id = m.colegio) 
        inner join puestoMesa p on (p.votante =${req.query.dni} 
        and p.mesa = m.mesa_id);`;
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