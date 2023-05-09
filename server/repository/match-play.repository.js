const {Database} = require("../Database/Database");
const {createMatchPlay, getAllMatch, deleteMatch, findMatchOfTheDayInTheSameDate} = require("../query/match-play.query");

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
        return res.status(500).json(err)
    }).then(db.connection.end());
}

exports.getAllMatchPlayRepository = async(res, CONDITION_SQL = "") => {
    const db = new Database()
    return await db.connection.promise().query(
        getAllMatch(CONDITION_SQL)
    ).then(([rows]) => {
        console.log(`░▒▓ INFO :CREATE MATCH : ${new Date()}`);
        return res.status(200).json(rows);
    }).catch(err => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
        return res.status(500).json(err)
    }).then(db.connection.end());
}

exports.deleteMatchRepository = async(req,res) => {
    const db = new Database()
    return await db.connection.promise().query(
        deleteMatch(), [req.params.id]
    ).then(([rows]) => {
        console.log(`░▒▓ INFO :CREATE MATCH : ${new Date()}`);
        return res.status(200).json(rows);
    }).catch(err => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
        return res.status(500).json(err)
    }).then(db.connection.end());
}

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
        return res.status(500).json(err)
    }).then(db.connection.end());
}