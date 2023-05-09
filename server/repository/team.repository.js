const {Database} = require("../Database/Database");
const sql = require('../query/team.query');

/**
 * findTeamRepository
 * @param team
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object
 */
exports.findTeamRepository = async(team, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(sql.findTeam(), [team.toLowerCase().trim()])
        .then(([rows]) => {
            if(isResponseJSON) {
                console.log(`░▒▓ INFO : FIND TEAM : ${new Date()}`);
                return res.status(200).json(rows[0]);
            } else {
                return rows;
            }

        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
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