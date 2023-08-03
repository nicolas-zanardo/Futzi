const bcrypt = require("bcrypt");
const {Database} = require("../Database/Database");
const jsonWebToken = require("jsonwebtoken");
const fs= require("fs");
const {authFindUserByIdForToken} = require("../query/auth.query");
const {findUserByEmail, findUserByTokenURL} = require("../query/user.query");

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
exports.authFindUserByIdForTokenRepository = async(res, decode) => {
    const db = new Database();
    return await db.connection.promise().query(
        authFindUserByIdForToken(), [decode.sub])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : FIND USER FOR SET TOKEN : ${new Date()}`);
            return res.status(201).json(rows[0]);
        }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
        }
    ).then(db.connection.end());
}

/**
 * authUserLoginRepository
 * @param req Request
 * @param res Response
 */
exports.authUserLoginRepository = async(req, res) => {
    const db = new Database();
    return await db.connection.promise().query(findUserByEmail(), [req.body.email.toLowerCase().trim()])
        .then(([rows]) => {
            const user = rows[0];
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                setToken(user, res);
            } else {
                console.log(`░▒▓ INFO : USER USE BAD CREDENTIAL : ${new Date()}`);
                return res.status(403).json('Mauvais email ou mot de passe');
            }
        }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 ${new Date()} : Verify TOKEN => ${err}`);
            return res.status(500).json(`⚽ ERROR: PROBLEME SUR LE CODE, 
            contacter l'administrateur 🤬`);
    }).then(db.connection.end());
}

/**
 * authUserLoginSocialRepository
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
exports.authUserLoginSocialRepository = async (req, res) => {
    console.log(req.body)
    const db = new Database();
    return await db.connection.promise().query(findUserByTokenURL(), [req.body.tokenURL])
        .then(([row]) => {
            const user = row[0];
            console.log(user.token_time_validity)
            if(user && user.token_time_validity >= Date.now()) {
                setToken(user, res);
            } else {
                res.status(401).json({message: "Le token de connection n'est plus valide"});
            }
        })
}

/**
 * setToken
 * @param user
 * @param res
 * @returns {Promise<*>}
 */
async function setToken(user, res) {
    user.password = null;
    return await jsonWebToken.sign({ROLE: user.ROLE, email: user.email},
        RSA_PRIVATE, {
            algorithm: 'RS256',
            subject: user.id.toString(),
            expiresIn: 60 * 15// 15min
        }, (err, token) => {
            if (err) {
                console.log(`✘ 🅴🆁🆁🅾🆁 ${new Date()} : Verify TOKEN => ${err}`);
                return res.status(419).json(err);
            }
            console.log(`░▒▓ USER IS LOGIN - TOKEN CREATED AT : ${new Date()}`);
            return res.status(200).json({user: user, token: token})
        });
}