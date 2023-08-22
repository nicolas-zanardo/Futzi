const {Database} = require("../Database/Database");
const {findTeam, updateTeam, getContactTeam} = require("../query/team.query");
const {deleteOpposingTeam} = require("../query/opposing-team.query");

/**
 * findTeamRepository
 * @param teamName | string
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object
 */
exports.findTeamRepository = async(teamName, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(findTeam(), [teamName.toLowerCase().trim()])
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
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * updateTeamContactTeamRepository
 * @param req
 * @param res
 * @returns {Promise<unknown>}
 */
exports.updateTeamContactTeamRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(
        updateTeam(), [req.body.contact, req.body.id])
        .then((rows) => {
            console.log(`░▒▓ INFO : UPDATE CONTACT TEAM : ${new Date()} `);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * deleteTeamRepository
 * @param id
 * @param res
 * @param next
 * @return {Promise<unknown>}
 */
exports.deleteTeamRepository = async(id,res,next) => {
    const db = new Database();
    return await db.connection.promise().query(deleteOpposingTeam(), [id])
        .then((rows) => {
            console.log(`░▒▓ INFO : DELETE CONTACT TEAM : ${new Date()} `);
            return res.status(200).json(rows);
        }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
                contacter l'administrateur 🤬`);
        }).then(db.connection.end());
}

/**
 * getContactTeamRepository
 * @param res
 * @return {Promise<unknown>}
 */
exports.getContactTeamRepository = async(res=null) => {
    const db = new Database();
    return await db.connection.promise().query(getContactTeam(), [])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : GET CONTACT TEAM : ${new Date()} `);
            if(res) {
                return res.status(200).json(rows[0]);
            }
            return rows[0];
        }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
                contacter l'administrateur 🤬`);
        }).then(db.connection.end());
}
