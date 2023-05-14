const {Database} = require("../Database/Database");
const {createMatchPlay, getAllMatch, deleteMatch, findMatchOfTheDayInTheSameDate, countAllMatchInSeason} = require("../query/match-play.query");

/**
 * createMatchPlayRepository
 * @param req
 * @param res
 */
exports.createMatchPlayRepository = async(res, match, isResponseJSON = true) => {
    const db = new Database()
    return await db.connection.promise().query(createMatchPlay(), [
        match.date,
        match.is_local,
        match.hour_start,
        match.match_of_the_day,
        match.id_football_pitch,
        match.id_category,
        match.id_team_opposing,
        match.id_team
    ]).then(([rows]) => {
        console.log(`░▒▓ INFO :CREATE MATCH : ${new Date()}`);
        if(isResponseJSON) {
            return res.status(201).json(rows);
        }
        return [rows];
    }).catch(err => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
        return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
    }).then(db.connection.end());
}

/**
 * getAllMatchPlayRepository
 * @param res
 * @param CONDITION_SQL string
 * @returns {Promise<unknown>}
 */
exports.getAllMatchPlayRepository = async(res, CONDITION_SQL = "", values = []) => {
    const db = new Database()
    return await db.connection.promise().query(
        getAllMatch(CONDITION_SQL), values
    ).then(([rows]) => {
        console.log(`░▒▓ INFO : GET ALL MATCH : ${new Date()}`);
        return res.status(200).json(rows);
    }).catch(err => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
        return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
    }).then(db.connection.end());
}

/**
 * deleteMatchRepository
 * @param id
 * @param res
 * @returns {Promise<unknown>}
 */
exports.deleteMatchRepository = async(id,res) => {
    const db = new Database()
    return await db.connection.promise().query(
        deleteMatch(), [id]
    ).then(([rows]) => {
        console.log(`░▒▓ INFO :CREATE MATCH : ${new Date()}`);
        return res.status(200).json(rows);
    }).catch(err => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
        return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
    }).then(db.connection.end());
}

/**
 * checkIsAlreadySetMatchInThisDayRepository
 * @param req
 * @param res
 * @param responseJSON
 * @returns {Promise<unknown>}
 */
exports.checkIsAlreadySetMatchInThisDayRepository = async(req, res, responseJSON = true) => {
    const db = new Database()
    return await db.connection.promise().query(
        findMatchOfTheDayInTheSameDate(), [req.body.date]
    ).then(([rows]) => {
        console.log(`░▒▓ INFO :CREATE MATCH : ${new Date()}`);
        if(responseJSON) {
            return res.status(200).json(rows);
        }
        return rows;
    }).catch(err => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
        return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
    }).then(db.connection.end());
}