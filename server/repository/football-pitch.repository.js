const {Database} = require("../Database/Database");
const {getAllFootballPitch, getFootballPitchByName, createFootballPitch} = require("../query/football-pitch.query");

/**
 * getAllFootballPitchRepository
 * @param req
 * @param res
 */
exports.getAllFootballPitchRepository = async(req, res) => {
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
 * @param req
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.findFootballPitchByNameRepository = async(req, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(getFootballPitchByName(), [req.body.football_pitch.toLowerCase().trim()])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : GET ALL FOOTBALL PITCH : ${new Date()}`);
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
 * @param req
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.createFootballPitchRepository = async(req, res, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(createFootballPitch(), [req.body.football_pitch.toLowerCase().trim()])
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

