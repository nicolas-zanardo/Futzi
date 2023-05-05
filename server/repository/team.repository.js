const {Database} = require("../Database/Database");
const sql = require('../query/team.query');

/**
 * findTeamRepository
 * @param req
 * @param res
 */
exports.findTeamRepository = (req, res) => {
    const db = new Database();
    db.connection.promise().query(sql.findTeam())
        .then((rows) => {
            console.log(`░▒▓ INFO : FIND TEAM : ${new Date()}`);
            res.status(200).json(rows[0][0]);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            res.status(500).json(err)
        })
        .then(db.connection.end());
}

exports.updateTeamContactTeamRepository = (req, res) => {
    const db = new Database();
    db.connection.promise().query(
        sql.updateTeam(), [req.body.contact, req.body.id])
        .then((r) => {
            console.log(`░▒▓ INFO : UPDATE CONTACT TEAM : ${new Date()} `);
            res.status(200).json(r);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            res.status(500).json(err)
        })
        .then(db.connection.end());
}