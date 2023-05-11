const {Database} = require("../Database/Database");
const {getAllOpposingTeam, findOpposingTeamByName, createOpposingTeam, updateOpposingTeam, deleteOpposingTeam} = require("../query/opposing-team.query");
const {createCategory} = require("../query/category.query");

/**
 * getAllOpposingTeamRepository
 * @param req
 * @param res
 */
exports.getAllOpposingTeamRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(getAllOpposingTeam())
        .then(([rows]) => {
            console.log(`░▒▓ INFO :GET ALL OPPOSING TEAM : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL getAllOpposingTeam: ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
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
exports.findOpposingByNameRepository = async(name, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(findOpposingTeamByName(), [name.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : FIND BY NAME OPPOSING TEAM : ${new Date()}`);
            if(isResponseJSON){
                return res.status(201).json(rows)
            }
            return rows;
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * createOpposingTeamRepository
 * @param name string
 * @param res
 * @param isResponseJSON
 * @returns {Promise<unknown>}
 */
exports.createOpposingTeamRepository = async(name, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(createOpposingTeam(), [name.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : CREATE OPPOSING TEAM : ${new Date()}`);
            if(isResponseJSON) {
                return res.status(201).json(rows)
            }
            return [rows];
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * updateOpposingTeamRepository
 * @param name string
 * @param res
 * @returns {Promise<unknown>}
 */
exports.updateOpposingTeamRepository = async(name, res) => {
    const db = new Database();
    return await db.connection.promise().query(updateOpposingTeam(), [name.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : UPDATE OPPOSING TEAM : ${new Date()}`);
            return res.status(201).json(rows)
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

exports.deleteOpposingTeamRepository = async(id, res) => {
    const db = new Database();
    return await db.connection.promise().query(deleteOpposingTeam(), [id])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : DELETE OPPOSING TEAM : ${new Date()}`);
            return res.status(200).json(rows)
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}