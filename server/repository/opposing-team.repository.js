const {Database} = require("../Database/Database");
const {getAllOpposingTeam, findOpposingTeamByName, createOpposingTeam} = require("../query/opposing-team.query");
const {createCategory} = require("../query/category.query");

/**
 * getAllOpposingTeamRepository
 * @param req
 * @param res
 */
exports.getAllOpposingTeamRepository = (req, res) => {
    const db = new Database();
    db.connection.promise().query(getAllOpposingTeam())
        .then(([rows]) => {
            console.log(`░▒▓ INFO :GET ALL OPPOSING TEAM : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL getAllOpposingTeam: ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}

/**
 * findOpposingRepository
 * @param req
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object
 */
exports.findOpposingByNameRepository = async(req, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(findOpposingTeamByName(), [req.body.team_opposing.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : FIND BY NAME OPPOSING TEAM : ${new Date()}`);
            if(isResponseJSON){
                return res.status(201).json(rows)
            }
            return rows;
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}

exports.createOpposingTeamRepository = async(req, res, isResponseJSON = true) => {
    const db = new Database();

    return await db.connection.promise().query(createOpposingTeam(), [req.body.team_opposing.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : CREATE OPPOSING TEAM : ${new Date()}`);
            if(isResponseJSON) {
                return res.status(201).json(rows)
            }
            return [rows];
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}