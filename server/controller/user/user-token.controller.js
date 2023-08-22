/**
 * @module User Token
 * @description manage Token USer
 */
const {findUserByTokenURLRepository, findUserByTokenResetPasswordRepository, resetPasswordRepository,
    findUserByTokenValidEmailRepository, setValidEmailAddressRepository
} = require("../../repository/user/user-token.repository");
const {User} = require("../../model/User.model");

/**
 * findUserByTokenURLController
 * @param req
 * @param res
 * @param next
 * @returns {Promise<Response>}
 */
exports.findUserByTokenURLController = async(req, res, next) => {
    try{
        return await findUserByTokenURLRepository(req.params.token.trim(), res);
    }catch (e) {
        next(e);
    }
}

/**
 * findUserByTokenResetPasswordController
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
exports.findUserByTokenResetPasswordController = async(req, res, next) => {
    try {
        if(!req.params.token) return res.status(404).json(null);
        return findUserByTokenResetPasswordRepository(req.params.token.trim(), res)
    } catch (e) {
        next(e);
    }
}

/**
 * resetPasswordController
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 */
exports.resetPasswordController = async(req,res,next) => {
    try {
        if(req.body.token_time_validity < Date.now()) {
            return await res.status(401).json("Time has exceeded.")
        }
        return await resetPasswordRepository(req, res);
    } catch (e) {
        next(e);
    }
};

/**
 * findUserByTokenValidEmailController
 * @param req
 * @param res
 * @param next
 * @return {Promise<User|null>}
 */
exports.findUserByTokenValidEmailController = async(req, res, next) => {
    try {
        if(!req.params.token) return res.status(404).json(null);
        return await findUserByTokenValidEmailRepository(req.params.token.trim(), res);
    } catch (e) {
        next(e);
    }
}

/**
 * setValidEmailAddressController
 * @param req
 * @param res
 * @param next
 * @return {Promise<Response>}
 */
exports.setValidEmailAddressController = async(req,res,next) => {
    try {
        const user = new User();
        user.id = req.body.id;
        user.token_time_validity = req.body.token_time_validity;
        user.token_valid_email = req.body.token_valid_email;
        if(user.token_time_validity < Date.now()) {
            return await res.status(401).json("Time has exceeded.")
        }
        return await setValidEmailAddressRepository(user,res);
    } catch (e) {
        next(e);
    }
}
