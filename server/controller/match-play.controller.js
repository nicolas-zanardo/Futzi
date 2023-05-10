const {haveKeyNotDefined} = require("../component/object/object-strict-required");
const {findTeamRepository} = require("../repository/team.repository");
const {checkIsAlreadySetMatchInThisDayRepository, createMatchPlayRepository, getAllMatchPlayRepository,
    deleteMatchRepository
} = require("../repository/match-play.repository");
const {findOpposingByNameRepository, createOpposingTeamRepository} = require("../repository/opposing-team.repository");
const {findFootballPitchByNameRepository, createFootballPitchRepository} = require("../repository/football-pitch.repository");
const {findCategoryByNameRepository, createCategoryRepository} = require("../repository/category.repository");
const {MatchPlay} = require("../model/MatchPlay.model");


/**
 * createMatchPlayController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.createMatchPlayController = async(req, res, next) => {
    try {
        const match = new MatchPlay();
        const insertData = new MatchPlay();

        // SET VALUE BODY
        match.date = req.body.date;
        match.hour_start = req.body.hour_start;
        match.is_local = req.body.is_local;
        match.football_pitch = req.body.football_pitch;
        match.team_opposing = req.body.team_opposing;
        match.category = req.body.category;
        match.match_of_the_day = req.body.match_of_the_day;
        match.team = req.body.team

        if(match.match_of_the_day) {
            const [matchOfDay] = await checkIsAlreadySetMatchInThisDayRepository(req, res, false);
            if(matchOfDay) {
                return res.status(406).json("Un Match est déjà selectionné pour cette journée")
            }
        }

        // PREPARE TEAM
        const [team] = await findTeamRepository(match.team, res, false);
        match.id_team = team.id;
        // PREPARE OPPOSING TEAM
        const [op_team] = await findOpposingByNameRepository(match.team_opposing, res, false);
        if(!op_team) {
            const [createOpTeam] = await createOpposingTeamRepository(match.team_opposing, res, false);
            match.id_team_opposing = parseInt(createOpTeam.insertId);
            insertData.team_opposing = true;
        } else {
            match.id_team_opposing = parseInt(op_team.id);
            insertData.team_opposing = false;
        }
        // -- PREPARE PITCH -- //
        if(req.body.football_pitch) {
            const [pitch] = await findFootballPitchByNameRepository(match.football_pitch, res, false);
            if(!pitch) {
                const [creatPitch] = await createFootballPitchRepository(match.football_pitch, res, false);
                match.id_football_pitch = parseInt(creatPitch.insertId);
                insertData.football_pitch = true;
            } else {
                match.id_football_pitch = parseInt(pitch.id);
                insertData.football_pitch = false;
            }
        } else {
            match.id_football_pitch = null;
            insertData.football_pitch = false;
        }
        // -- PREPARE CATEGORY -- //
        const [category] = await findCategoryByNameRepository(match.category, res, false);
        if(!category) {
            const [createCategory] = await createCategoryRepository(match.category, res, false);
            match.id_category = parseInt(createCategory.insertId);
            insertData.category = true;
        } else {
            match.id_category = parseInt(category.id);
            insertData.category = false;
        }
        console.log(match)
        // Test Response isValid
        let isStrictObj = haveKeyNotDefined(match, ['id_football_pitch', 'football_pitch', 'match_of_the_day']);
        if(isStrictObj.findIt) {
            return res.status(400).json(`Erreur lors de la requête, les elements suivant ne sont pas pris en compte ou de valeur null : [ ${isStrictObj.value.toString()} ]`);
        }
        await createMatchPlayRepository(res, match, false);
        return res.status(200).json(insertData);
    }catch (e) {
        next(e);
    }
}

/**
 * getAllNextMatchPlayController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getAllNextMatchPlayController = async(req, res, next) => {
    try {
        return await getAllMatchPlayRepository(res, "WHERE date >= DATE( NOW() )");
    } catch (e) {
        next(e);
    }
}

/**
 * getAllMatchPlayController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getAllMatchPlayController = async(req, res, next) => {
    try {
        return await getAllMatchPlayRepository(res);
    } catch (e) {
        next(e);
    }
}

/**
 * deleteMatchController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.deleteMatchController = async(req,res,next) => {
    try{
        return await deleteMatchRepository(req.params.id,res);
    } catch (e) {
        next(e);
    }
}

/**
 * getAllNextMatchOfTheDayController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getAllNextMatchOfTheDayController = async(req, res, next) => {
    try {
        return await getAllMatchPlayRepository(res, "WHERE date >= DATE( NOW() ) AND match_of_the_day=1 LIMIT 1");
    } catch (e) {
        next(e);
    }
}

/**
 * getMatchOfTheDayController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getMatchOfTheDayController = async(req, res, next) => {
    try {
        return  await getAllMatchPlayRepository(res, "WHERE match_of_the_day = 1 AND date >= DATE( NOW() ) ORDER BY match_play.date ASC LIMIT 1");
    } catch (e) {
        next(e);
    }
};

/**
 * getMatchOfTheDayController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getTehTenLastMatchController = async(req, res, next) => {
    try {
        return  await getAllMatchPlayRepository(res, "WHERE date >= DATE( NOW() ) ORDER BY match_play.date ASC LIMIT 10");
    } catch (e) {
        next(e);
    }
};
