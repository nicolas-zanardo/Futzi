const {haveKeyNotDefined} = require("../component/object/object-strict-required");
const {findFootballPitchByNameRepository, createFootballPitchRepository} = require("../repository/football-pitch.repository");
const {findCategoryByNameRepository, createCategoryRepository} = require("../repository/category.repository");
const {createTrainingRepository, getAllTrainingRepository, deleteTrainingRepository, countTrainingByCategoryRepository} = require("../repository/soocer-training.repository");
const {SoccerTraining} = require("../model/SoccerTraining.model");



/**
 * createTrainingController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.createTrainingController = async(req, res, next) => {
    try {
        const training =  new SoccerTraining();

        training.day = req.body.day;
        training.hour_start = req.body.hour_start;
        training.football_pitch = req.body.football_pitch;
        training.category = req.body.category;

        // -- PREPARE PITCH -- //
        const [pitch] = await findFootballPitchByNameRepository(training.football_pitch, res, false);
        if(!pitch) {
            const [creatPitch] = await createFootballPitchRepository(training.football_pitch, res, false);
            training.id_football_pitch = parseInt(creatPitch.insertId);
            training.is_new_football_pitch = true;
        } else {
            training.id_football_pitch = parseInt(pitch.id);
            training.is_new_football_pitch = false;
        }
        // -- PREPARE CATEGORY -- //
        const [category] = await findCategoryByNameRepository(training.category, res, false);
        if(!category) {
            const [createCategory] = await createCategoryRepository(training.category, res, false);
            training.id_category = parseInt(createCategory.insertId);
            training.is_new_category = true;
        } else {
            training.id_category = parseInt(category.id);
            training.is_new_category = false;
        }
        // Test Response isValid
        let isStrictObj = haveKeyNotDefined(training, ['id']);
        if(isStrictObj.findIt) {
           return res.status(400).json(`Erreur lors de la requête, les elements suivant ne sont pas pris en compte ou de valeur null : [ ${isStrictObj.value.toString()} ]`);
        }
        // CREATE SOCCER TRAINING
        const [createTraining] = await createTrainingRepository(res, training, false);
        training.id = createTraining.insertId;
        return res.status(201).json(training)
    } catch (e) {
        next(e);
    }
}

/**
 * getAllSoccerTraining
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>} ALL Soccer Training
 */
exports.getAllTrainingController = async(req, res, next) => {
    try{
        return await getAllTrainingRepository(req, res);
    } catch (e) {
        next(e);
    }
}

/**
 * deleteTrainingController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.deleteTrainingController = async(req, res, next) => {
    try {
        return await deleteTrainingRepository(req.params.id, res);
    } catch (e) {
        next(e);
    }
}

/**
 * countTrainingByCategoryController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.countTrainingByCategoryController = async(req, res, next) => {
    try {
        return await countTrainingByCategoryRepository(req, res);
    } catch (e) {
        next(e);
    }
}