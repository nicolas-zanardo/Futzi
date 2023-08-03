const bcrypt = require("bcrypt");
const {Database} = require("../Database/Database");
const {insertUser, updateUserInfo, updateRoleUser, deleteUser, updateUserCredential, findAllUser, findUserById,
    findUserByEmail, findUserByTokenURL
} = require("../query/user.query");
const {authSocialTokenURl} = require("../query/auth.query");
const {User} = require("../model/User.model");

/**
 * createUserRepository
 * @param user User user.firstname, user.lastname, user.email, user.password, user.ROLE
 * @param res
 * @returns {Promise<unknown>}
 */
exports.createUserRepository = async(user, res) => {
    const db = new Database();
    return await db.connection.promise().query(
        insertUser(), [
            user.firstname.toLowerCase().trim(),
            user.lastname.toLowerCase().trim(),
            user.phone_number.trim(),
            user.email.toLowerCase().trim(),
            user.password.trim(),
            user.ROLE,
            user.isValidMail,
            user.tokenURL,
            user.token_time_validity
        ])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : USER HAS BEEN CREATED : ${new Date()}`);
            return res.status(201).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * createUserStrategyRepository
 * @param user User
 * @returns {Promise<unknown>}
 */
exports.createUserStrategyRepository = async (user) => {
    const db = new Database();
    return await db.connection.promise().query(
        insertUser(), [
            user.firstname.toLowerCase().trim(),
            user.lastname.toLowerCase().trim(),
            user.phone_number.trim(),
            user.email.toLowerCase().trim(),
            user.password.trim(),
            user.ROLE,
            user.isValidMail,
            user.tokenURL,
            user.tokenTimeValidity
        ])
        .then(() => {
            console.log(`░▒▓ INFO : USER HAS BEEN CREATED : ${new Date()}`);
            return db.connection.promise().query(findUserByEmail(), [user.email]).then(([rows]) => {
                return rows[0];
            }).catch(err => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL createUserStrategyRepository : ${new Date()}, ${err}`);
                return err;
            }).then(db.connection.end());
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL NOT INSERT createUserStrategyRepository : ${new Date()}, ${err}`);
            return err;
        })
}

/**
 * updateUserAuthSocialToken
 * @param token
 * @param time
 * @param id
 * @returns {Promise<unknown>}
 */
exports.updateUserAuthSocialTokenRepository = async(token, time, id) => {
    const db = new Database();
    return await db.connection.promise().query(
        authSocialTokenURl(), [
            token,
            time,
            id
        ])
        .then(([row]) => {
            console.log(`░▒▓ INFO : USER TOKEN HAS BEEN UPDATE : ${new Date()}`);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
        })
        .finally(db.connection.end());
}

/**
 * findUserByTokenURLRepository
 * @param token
 * @param res
 * @returns {Promise<void>}
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
        user.tokenTimeValidity = (row[0])?row[0].token_time_validity:"";
        res.status(statusCode).json(user)
    })
}

/**
 * updateUserInfoRepository
 * @param user User class
 * @param res Response
 */
exports.updateUserInfoRepository = async(user, res) => {
    const db = new Database();
    return await db.connection.promise().query(
        updateUserInfo(), [
            user.firstname.toLowerCase().trim(),
            user.lastname.toLowerCase().trim(),
            user.phone_number,
            user.email.toLowerCase().trim(),
            user.id])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : USER HAS BEEN UPDATE : ${new Date()}`);
            return res.status(201).json({
                message: "Le profil a bien était modifié",
                info: rows
            });
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * updateUserCredentialRepository
 * @param req
 * @param res
 */
exports.updateUserCredentialRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(updateUserCredential(), [
        bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(16)),
        req.body.id
    ])
        .then(() => {
            console.log(`░▒▓ INFO : USER PASSWORD HAS BEEN UPDATE : ${new Date()}`);
            return res.status(201).json("Le mot de passe a bien était modifié");
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * getAllUserRepository
 * @param req
 * @param res
 */
exports.getAllUserRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(findAllUser())
        .then(([rows]) => {
            console.log(`░▒▓ INFO : GET ALL USER : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * updateRoleUserRepository
 * @param req
 * @param res
 */
exports.updateRoleUserRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(updateRoleUser(), [req.body.ROLE, req.body.id_user_update])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : UPDATE ROLE USER : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end())
}

/**
 * deleteUserRepository
 * @param req
 * @param res
 */
exports.deleteUserRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(deleteUser(), [req.params.id_user_update])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : USER WAS BEEN DELETED : ${new Date()}`);
            return res.status(200).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        })
        .then(db.connection.end())
}