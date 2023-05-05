const sql = require('../query/auth.query');
const userSQL = require('../query/user.query');
const {Database} = require("../Database/Database");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const fs= require("fs");

/**
 * RSA
 * @type {string}
 */
const RSA_PRIVATE = fs.readFileSync('RSA/key', 'utf8');


/**
 * authFindUserByIdForTokenRepository
 * @param res Response
 * @param decode TOKEN
 */
exports.authFindUserByIdForTokenRepository = (res, decode) => {
    const db = new Database();
    db.connection.promise().query(
        sql.authFindUserByIdForToken(), [decode.sub])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : FIND USER FOR SET TOKEN : ${new Date()}`);
            res.status(201).json(rows[0]);
        }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            res.status(500).json(err);
        }
    ).then(db.connection.end());
}

/**
 * authUserLoginRepository
 * @param req Request
 * @param res Response
 */
exports.authUserLoginRepository = (req, res) => {
    const db = new Database();
    db.connection.promise().query(userSQL.findUserByEmail(), [req.body.email])
        .then(([rows, fields]) => {
            const user = rows[0];
            if(user && bcrypt.compareSync(req.body.password, user.password)) {
                return jsonWebToken.sign({ROLE: user.ROLE, email: user.email},
                    RSA_PRIVATE, {
                        algorithm: 'RS256',
                        subject : user.id.toString(),
                        expiresIn: 60*15// 15min
                    }, (err, token) => {
                        if(err) {
                            console.log(`✘ 🅴🆁🆁🅾🆁 ${new Date()} : Verify TOKEN => ${err}`);
                            return res.status(419).json(err.message);
                        };
                        console.log(`░▒▓ USER IS LOGIN - TOKEN CREATED AT : ${new Date()}`);
                        res.status(200).json({user : user, token: token})});
            } else {
                console.log(`░▒▓ INFO : USER USE BAD CREDENTIAL : ${new Date()}`);
                res.status(403).json('Mauvais email ou mot de passe');
            }
        }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 ${new Date()} : Verify TOKEN => ${err}`);
            res.status(500).json(err)
    }).then(db.connection.end());
}