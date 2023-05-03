const sql = require('../query/user.query')
const {Database} = require("../Database/Database");
const bcrypt = require("bcrypt");

/**
 * createUserRepository
 * @param user user.firstname, user.lastname, user.email, user.password, user.ROLE
 * @param req
 * @returns {Promise<unknown>}
 */
exports.createUserRepository = (user, res) => {
    const db = new Database();
    return db.connection.promise().query(
        sql.insertUser(), [user.firstname, user.lastname, user.phone_number, user.email, user.password, user.ROLE, user.isValidMail])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : USER HAS BEEN CREATED : ${new Date()}`);
            res.status(201).json({
                message: "Le compte a bien été crée",
                info: rows
            });
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err.message}`);
            res.status(err.status).json(err.message)
        })
        .then(db.connection.end());
}

/**
 * updateUserInfoRepository
 * @param user User class
 * @param res Response
 */
exports.updateUserInfoRepository = (user, res) => {
    const db = new Database();
    db.connection.promise().query(
        sql.updateUserInfo(), [user.firstname, user.lastname, user.phone_number, user.email, user.id])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : USER HAS BEEN UPDATE : ${new Date()}`);
            res.status(201).json({
                message: "Le profil a bien était modifié",
                info: rows
            });
        })
        .catch(err => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err.message}`);
                res.status(err.status).json(err.message)
        })
        .then(db.connection.end());
}


exports.updateUserCredentialRepository = (req, res, next) => {
    const db = new Database();
    db.connection.promise().query(sql.updateUserCredential(), [
        bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(16)),
        req.body.id
    ])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : USER PASSWORD HAS BEEN UPDATE : ${new Date()}`);
            res.status(201).json("Le mot de passe a bien était modifié");
        })
        .catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err.message}`);
            res.status(err.status).json(err.message)
        })
        .then(db.connection.end())
}

