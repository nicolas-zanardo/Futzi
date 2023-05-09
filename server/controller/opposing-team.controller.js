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