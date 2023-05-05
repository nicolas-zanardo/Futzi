const {
    findTeamRepository, updateTeamContactTeamRepository
} = require("../repository/team.repository");

/**
 * findTeamController
 * @param req
 * @param res
 * @param next
 */
exports.findTeamController = async(req, res, next) => {
    try {
        return await findTeamRepository(req, res);
    } catch (e) {
        next(e);
    }
}

/**
 * updateTeamController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.updateTeamController = async(req, res, next) => {
    try {
        return await updateTeamContactTeamRepository(req, res);
    } catch (e) {
        next(e);
    }
}