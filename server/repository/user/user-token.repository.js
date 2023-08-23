const {Database} = require("../../Database/Database");
const {User} = require("../../model/User.model");
const {findUserByTokenURL, updateUserToken, findUserByTokenPassword, findUserByTokenValidEmail, updateStatusValidEmail} = require("../../query/user/user-token.query");
const {findUserById, updateUserCredential} = require("../../query/user/user.query");
const bcrypt = require("bcrypt");
const {sendEmailRepository} = require("../email.repository");
const {EmailTransport} = require("../../component/emails/EmailTransport");


/**
 * findUserByTokenURLRepository
 * @param token
 * @param res
 * @returns {Promise<Response>}
 */
exports.findUserByTokenURLRepository = async(token, res) => {
    const db = new Database();
    return await db.connection.promise().query(
        findUserByTokenURL(),
        token
    ).then(([row]) => {
        const user = new User();
        const statusCode = (row[0])?200:204;
        user.tokenURL = (row[0])?row[0].tokenURL:"";
        user.token_time_validity = (row[0])?row[0].token_time_validity:"";
        res.status(statusCode).json(user)
    })
}

/**
 * updateUserTokenRepository
 * @param user
 * @return {void}
 */
exports.updateUserTokenRepository = (user) => {
    const db = new Database();
    db.connection.promise().query(
        updateUserToken(), [
            user.token_reset_password,
            user.token_time_validity,
            user.tokenURL,
            user.token_valid_email,
            user.id
        ]).then(() => {
            console.log(`░▒▓ INFO : USER TOKEN HAS BEEN UPDATE : ${new Date()}`);
        }).catch((err) => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL updateUserTokenRepository : ${new Date()}, ${err}`);
        }).finally(db.connection.end());
}

/**
 * findUserByTokenResetPasswordRepository
 * @param token
 * @param res
 * @return {void}
 */
exports.findUserByTokenResetPasswordRepository = async(token, res) => {
    const db = new Database();
    return await db.connection.promise().query(
        findUserByTokenPassword(), [token.trim()]
    ).then(([row]) => {
        return res.status(200).json(row[0]);
    }).catch((err) => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL findUserByTokenResetPasswordRepository : ${new Date()}, ${err}`);
    }).finally(db.connection.end());
}

/**
 * resetPasswordRepository
 * @param req
 * @param res
 * @return {Promise<Response>}
 */
exports.resetPasswordRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(
        findUserById(), [req.body.id]
    ).then(([row]) => {
        let user = row[0];
        if(user) {
            // TEST TIME IS VALID
            if(user.token_time_validity < Date.now()) {
                return res.status(401).json("Time has exceeded its limits.")
            }
            user.token_time_validity = null;
            user.token_reset_password = null;
            user.tokenURL = null;
            user.token_valid_email = null;
            user.password = req.body.password.trim();
            this.updateUserTokenRepository(user);
            const db = new Database();
            return db.connection.promise().query(updateUserCredential(), [
                bcrypt.hashSync(user.password, bcrypt.genSaltSync(16)),
                user.id
            ]).then(() => {
                console.log(`░▒▓ INFO : USER PASSWORD HAS BEEN UPDATE : ${new Date()}`);
                sendEmailRepository(user, EmailTransport.sendEmail, 'password-user-update');
                return res.status(201).json("Le mot de passe a bien était modifié");
            }).catch((err) => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            }).finally(db.connection.end());
        }
        res.status(404).json("USER NOT FOUND");
    }).catch((err) => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
    }).finally(db.connection.end());
}

/**
 * findUserByTokenValidEmailRepository
 * @param token
 * @param res
 * @return {User|null}
 */
exports.findUserByTokenValidEmailRepository = async (token, res) => {
    const db = new Database();
    return await db.connection.promise().query(
        findUserByTokenValidEmail(), [token.trim()]
    ).then(([row]) => {

        return res.status(200).json(row[0]);
    }).catch((err) => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
    }).finally(db.connection.end());
}

/**
 * setValidEmailAddressRepository
 * @param userToken
 * @param res
 * @return {Promise<any>}
 */
exports.setValidEmailAddressRepository = async(userToken, res) => {
    const db = new Database();
    return await db.connection.promise().query(
        findUserById(), [userToken.id]
    ).then(([row]) => {
        let user = row[0];
        if(user && user.token_time_validity > Date.now()) {
            const db = new Database();
            return db.connection.promise().query(
                updateStatusValidEmail(),
                [true, null, null, null, null, user.id]
            ).then(() => {
                return res.status(200).json(user);
            }).catch((err) => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            }).finally(db.connection.end());
        }
    }).catch((err) => {
        console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
    }).finally(db.connection.end());
}
