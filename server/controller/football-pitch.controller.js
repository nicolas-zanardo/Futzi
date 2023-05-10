const {getAllFootballPitchRepository} = require("../repository/football-pitch.repository");

/**
 * getAllFootballPitchController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.getAllFootballPitchController = async(req, res, next) => {
    try{
        return await getAllFootballPitchRepository(req, res);
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
        //TODO
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
       // TODO
    } catch (e) {
        next(e)
    }
}

