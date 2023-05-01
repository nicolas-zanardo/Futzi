const sql = require('../query/user.query')
const {Database} = require("../Database/Database");

/**
 * createUserRepository
 * @param user user.firstname, user.lastname, user.email, user.password, user.ROLE
 * @param req
 * @returns {Promise<unknown>}
 */
exports.createUserRepository = (user, res) => {
    const db = new Database();
    return db.connection.promise().query(
        sql.insertUser(), [user.firstname, user.lastname, user.email, user.password, user.ROLE, user.isValidMail])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : USER HAS BEEN CREATED : ${new Date()}`);
            res.status(201).json({
                message: "Le compte a bien été crée",
                info: rows
            });
        }).catch(
            err => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err.message}`);
                res.status(err.status).json(err.message)
            }
        ).then(db.connection.end());
}

