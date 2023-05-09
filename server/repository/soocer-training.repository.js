const {Database} = require("../Database/Database");
const {createTraining, getAllTraining, deleteTraining, countTrainingByCategory} = require("../query/soccer-training.query");

/**
 *
 * @param res
 * @param isResponseJSON boolean default true
 * @returns {Promise<unknown>} if boolean isResponseJSON return response Express JSON else return only an Object: FootballPitch
 */
exports.createTrainingRepository = async(res, soccerTraining, isResponseJSON = true) => {
    const db = new Database();
    return await db.connection.promise().query(createTraining(), [
        soccerTraining.day.toLowerCase(),
        soccerTraining.hour_start,
        soccerTraining.id_football_pitch,
        soccerTraining.id_category
    ])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : CREATE SOCCER TRAINING : ${new Date()}`);
            if(isResponseJSON) {
                return res.status(201).json(rows);
            }
            return [rows];

        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}

/**
 * getAllTrainingRepository
 * @param req
 * @param res
 * @returns {Promise<unknown>}
 */
exports.getAllTrainingRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(getAllTraining())
        .then(([rows]) => {
            console.log(`░▒▓ INFO : GET ALL SOCCER TRAINING : ${new Date()}`);
            return res.status(200).json(rows)
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}

/**
 * deleteTrainingRepository
 * @param id soccer_training
 * @param res
 * @returns {Promise<unknown>}
 */
exports.deleteTrainingRepository = async(id, res) => {
    const db = new Database();
    return await db.connection.promise().query(deleteTraining(), id)
        .then(([rows]) => {
            console.log(`░▒▓ INFO : DELETE SOCCER TRAINING : ${new Date()}`);
            return res.status(200).json(rows)
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}

exports.countTrainingByCategoryRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(countTrainingByCategory())
        .then(([rows]) => {
            console.log(`░▒▓ INFO : COUNT TRAINING BY CATEGORY : ${new Date()}`);
            return res.status(200).json(rows)
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(err)
        })
        .then(db.connection.end());
}
