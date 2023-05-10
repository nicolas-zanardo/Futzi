const bcrypt = require("bcrypt");
const {Database} = require("../Database/Database");
const {insertUser, updateUserInfo, updateRoleUser, deleteUser, updateUserCredential, findAllUser} = require("../query/user.query");

/**
 * createUserRepository
 * @param user user.firstname, user.lastname, user.email, user.password, user.ROLE
 * @param req
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
            user.password.trim(), user.ROLE, user.isValidMail])
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
                return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
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