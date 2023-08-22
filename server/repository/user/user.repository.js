const bcrypt = require("bcrypt");
const {Database} = require("../../Database/Database");
const {
    insertUser,
    updateUserInfo,
    updateRoleUser,
    deleteUser,
    updateUserCredential,
    findAllUser,
    findUserByEmail,
    findLiteUserById,
    findUserById
} = require("../../query/user/user.query");
const {authSocialTokenURl} = require("../../query/auth.query");
const {GenerateToken} = require("../../component/tool/GenerateToken");
const {updateUserTokenRepository} = require("./user-token.repository");
const {EmailTransport} = require("../../component/emails/EmailTransport");
const {sendEmailRepository} = require("../email.repository");

/**
 * @const addTimeValidityToken
 * @type {number}
 */
const addTimeValidityToken = 1000*60*15;

/**
 * findUserByIdRepository
 * @param id
 * @param res
 * @return {Promise<*>}
 */
exports.findUserByIdRepository = async(id, res=null) => {
    const db = new Database();
    return await db.connection.promise().query(findLiteUserById(), [id])
        .then(([row]) => {
            console.log(`░▒▓ INFO : FIND USER BY ID : ${new Date()}`);
            if(res) {
                return res.status(200).json(row[0])
            }
            return row[0];
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * findUserByEmailToResetPasswordRepository
 * @param email
 * @param res
 * @return {Promise<unknown>}
 */
exports.findUserByEmailToResetPasswordRepository = async(email, res) => {
    const db = new Database();
    return await db.connection.promise().query(findUserByEmail(), email.trim())
        .then(([row]) => {
            let resJson = false;
            let user = row[0];
            if(user.email) {
                resJson = true;
                let user = row[0];
                console.log(`░▒▓ INFO : FIND USER BY ID : ${new Date()}`);
                sendEmailRepository(user, EmailTransport.sendEmail, 'reset-email');
                const generateToken = new GenerateToken();
                user.token_reset_password = generateToken.create(250, generateToken.tokenURL);
                user.token_time_validity = Date.now() + addTimeValidityToken;
                user.tokenURL = null;
                user.token_valid_email = null
                updateUserTokenRepository(user);
            }
            return res.status(200).json(resJson);
        }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, contacter l'administrateur 🤬`);
        })
        .then(db.connection.end());
}

/**
 * createUserRepository
 * @param user User firstname, lastname, email, password, ROLE
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
            user.token_valid_email,
            user.tokenURL,
            user.token_time_validity
        ])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : USER HAS BEEN CREATED : ${new Date()}`);
            const db = new Database();
            db.connection.promise().query(
                findUserById(), [rows.insertId])
                .then(([row]) => {
                    let user = row[0];
                    console.log(`░▒▓ INFO : FIND USER BY ID : ${new Date()}`);
                    sendEmailRepository(user, EmailTransport.sendEmail, 'account-created');
                    const generateToken = new GenerateToken();
                    user.token_reset_password = null;
                    user.token_time_validity = Date.now() + addTimeValidityToken;
                    user.tokenURL = null;
                    user.token_valid_email = generateToken.create(250, generateToken.tokenURL);
                    updateUserTokenRepository(user);
                })
                .catch(err => {
                    console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
                })
                .then(db.connection.end());
            return res.status(201).json(rows);
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, contacter l'administrateur 🤬`);
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
            user.is_valid_mail,
            user.tokenURL,
            user.token_time_validity
        ])
        .then(() => {
            console.log(`░▒▓ INFO : USER HAS BEEN CREATED : ${new Date()}`);
            return db.connection.promise().query(findUserByEmail(), [user.email]).then(([rows]) => {
                return rows[0];
            }).catch(err => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL createUserStrategyRepository : ${new Date()}, ${err}`);
            }).then(db.connection.end());
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL NOT INSERT createUserStrategyRepository : ${new Date()}, ${err}`);
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
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, contacter l'administrateur 🤬`);
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
