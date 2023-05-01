const em = require("../repository/user.repository");
const {User} = require("../model/User.model");
const {ROLE} = require("../enum/ROLES");
const bcrypt = require("bcrypt");
const {Database} = require("../Database/Database");
const sql = require("../query/user.query");

/**
 * Create USER
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.createUserController = async(req, res, next) => {
    try {
        const user = new User();
        user.email = req.body.email;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(16));
        user.ROLE = JSON.stringify([ROLE.USER]);
        user.isValidMail = false;

        const db = new Database();
        db.connection.promise().query(
            sql.findUserByEmail(), [user.email])
            .then(async ([rows, fields]) => {
                if (rows.length > 0) {
                    if(rows.length > 0) {
                        console.log(`░▒▓ INFO : FIND USER WITH THE SAME EMAIL ${new Date()}`);
                        res.status(401).json("Un compte est déjà crée avec cet email");
                    }
                } else {
                    return await em.createUserRepository(user, res);
                }
            }).catch(err => {
                console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()} : Verify => ${err}`)
                res.status(err.status).json(err)
        }).then(db.connection.end());

    } catch (e) {
        next(e);
    }
}


