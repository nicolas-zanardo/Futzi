const {getAllFootballPitchRepository, updateFootballPitchRepository, deleteFootballPitchRepository} = require("../repository/football-pitch.repository");
const {FootballPitch} = require("../model/FootballPitch");

/**
 * getAllFootballPitchController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getAllFootballPitchController = async(req, res, next) => {
    try{
        return await getAllFootballPitchRepository(res);
    } catch (e) {
        next(e);
    }
}

/**
 * updateFootballController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateFootballController = async(req, res, next) => {
    try{
        const footballPitch = new FootballPitch();
        footballPitch.id = req.body.id;
        footballPitch.name = req.body.name;

        return await updateFootballPitchRepository(footballPitch, res);
    } catch (e) {
        next(e);
    }
}

/**
 * deleteFootballController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteFootballController = async(req, res, next) => {
    try {
       return  await deleteFootballPitchRepository(req.params.id, res);
    } catch (e) {
        next(e)
    }
}

