const {Database} = require("../Database/Database");
const {createTraining, getAllTraining, deleteTraining, countTrainingByCategory, trainingByCategory} = require("../query/soccer-training.query");
const {sorterDay} = require("../component/date/sorter-day");

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
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
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
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
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
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * countTrainingByCategoryRepository
 * @param req
 * @param res
 * @return {Promise<unknown>}
 */
exports.countTrainingByCategoryRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(countTrainingByCategory())
        .then(([rows]) => {
            console.log(`░▒▓ INFO : COUNT TRAINING BY CATEGORY : ${new Date()}`);
            return res.status(200).json(rows)
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * trainingByCategoryRepository
 * @param req
 * @param res
 * @return {Promise<void>}
 */
exports.trainingByCategoryRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(trainingByCategory())
        .then(([row]) => {
            // collect data by category
            let arrTmp  = {};
            row.forEach((elt, key) => {
                if(arrTmp[elt.category] === undefined) arrTmp[elt.category] = [];
                arrTmp[elt.category].push(elt);
            })
            // create object with best practice for angular
            let arrResp = [];
            for (const [key, value] of Object.entries(arrTmp)) {
                let tmpArray = {};
                tmpArray["category"] = key;
                tmpArray["training"] = [];
                value.forEach((cat) => {
                    tmpArray["training"].push(cat)
                })
                tmpArray["training"].sort(function sortByDay(a, b) {
                    let day1 = a.day.toLowerCase();
                    let day2 = b.day.toLowerCase();
                    return sorterDay[day1] - sorterDay[day2];
                });
                arrResp.push(tmpArray);
            }
            res.status(200).json(arrResp);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}
