const {Database} = require("../Database/Database");
const {getAllFootballPitch, getFootballPitchByName, createFootballPitch, updateFootballPitch, deleteFootballPitch} = require("../query/football-pitch.query");

/**
 * getAllFootballPitchRepository
 * @param res
 */
exports.getAllFootballPitchRepository = async(res) => {
    const db = new Database();
    return await db.connection.promise().query(getAllFootballPitch())
        .then(([rows]) => {
            console.log(`░▒▓ INFO : GET ALL FOOTBALL PITCH : ${new Date()}`);
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
 * findFootballPitchByNameRepository
 * @param name | String
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.findFootballPitchByNameRepository = async(name, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(getFootballPitchByName(), [name.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : GET FOOTBALL BY NAME PITCH : ${new Date()}`);
            if(isResponseJSON) {
                return res.status(200).json(rows);
            }
            return rows
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * createFootballPitchRepository
 * @param name | string
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.createFootballPitchRepository = async(name, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(createFootballPitch(), [name.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : CREATE FOOTBALL PITCH : ${new Date()}`);
            if(isResponseJSON) {
                return res.status(200).json(rows);
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
 * updateFootballPitchRepository
 * @param footballPitch FootballPitch
 * @param res
 * @returns {Promise<unknown>}
 */
exports.updateFootballPitchRepository = async(footballPitch, res) => {
    const db = new Database();
    return await db.connection.promise().query(updateFootballPitch(), [footballPitch.name.toLowerCase().trim(), footballPitch.id])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : UPDATE FOOTBALL PITCH : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

exports.deleteFootballPitchRepository = async(id, res) => {
    const db = new Database();
    return await db.connection.promise().query(deleteFootballPitch(), [id])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : DELETE FOOTBALL PITCH : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}