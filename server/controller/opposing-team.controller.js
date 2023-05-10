const {getAllOpposingTeamRepository} = require("../repository/opposing-team.repository");

/**
 * getAllOpposingTeamController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>} all Object Opposing Team
 */
exports.getAllOpposingTeamController = async(req, res, next) => {
    try {
        return await getAllOpposingTeamRepository(req, res)
    } catch (e) {
        next(e)
    }
}

/**
 * updateOpposingTeamController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateOpposingTeamController = async(req, res, next) => {
    try {
        // TODO
    } catch (e) {
        next(e)
    }
}

/**
 * deleteOpposingTeamController
 * @param req
 * @param req
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteOpposingTeamController = async(req, req, next) => {
    try {
//TODO
    } catch (e) {
        next(e);
    }
}