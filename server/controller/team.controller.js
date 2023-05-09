const {findTeamRepository, updateTeamContactTeamRepository} = require("../repository/team.repository");

/**
 * findTeamController
 * @param req
 * @param res
 * @param next
 */
exports.findTeamController = async(req, res, next) => {
    try {
        let teamName = req.params.currentTeam.toLowerCase().trim();
        if(!req.params.currentTeam) {
            teamName = "osny";
        }
        return await findTeamRepository(teamName, res);
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