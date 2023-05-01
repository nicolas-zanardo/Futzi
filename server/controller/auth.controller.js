const jsonWebToken = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");
const fs = require('fs');
const {authFindUserByIdForTokenRepository, authUserLoginRepository} = require("../repository/auth.repository");

/**
 * RSA
 * @type {string}
 */
const RSA_PUB = fs.readFileSync('RSA/key.pub', 'utf8');
const RSA_PRIVATE = fs.readFileSync('RSA/key', 'utf8');

/**
 * AUTH - login
 * @param req Request
 * @param res Response
 * @returns {Promise<void>}
 */
exports.loginController = async(req, res) => {
    try {
        return await authUserLoginRepository(req, res)
    } catch (e) {res.status(403).json('Mauvais email ou mot de passe')};
}

/**
 * refreshTokenController
 * @param req Request
 * @param res Response
 * @returns {Promise<void>}
 */
exports.refreshTokenController = async (req, res) => {
    let decoded = jwt_decode(req.body.token);
    jsonWebToken.verify(req.body.token, RSA_PUB, (err, decode) => {
        if (err) {console.log(`✘ 🅴🆁🆁🅾🆁 : ${new Date()} : Verify => ${err}`); return res.status(423).end()};
        jsonWebToken.sign({ROLE: decoded.ROLE, email: decoded.email,},
            RSA_PRIVATE,
            {
                algorithm: 'RS256',
                expiresIn: 60*15, // 15min
                subject: decode.sub,
        }, (err, token) => {
            if(err) {console.log(`✘ 🅴🆁🆁🅾🆁 : ${new Date()} Verify after create TOKEN => ${err}`); return res.status(423).end()};
            res.status(201).json(token);
        });
    })
}

/**
 * currentUserController
 * @param req Request
 * @param res Response
 * @returns {Promise<void>}
 */
exports.currentUserController = async(req, res) => {
    const token = req.body.token;
    if(token) {
        try{
            await jsonWebToken.verify(token, RSA_PUB, (err, decode) => {
                if (err) {
                    console.log(`░▒▓ INFO : CURRENT USER ${new Date()} : jsonWebToken Verify =>`, err);
                    return res.status(200).end()};
                if (decode) { return authFindUserByIdForTokenRepository(res, decode); }
                else {
                    console.log(`░▒▓ INFO : CURRENT USER ${new Date()} : jsonWebToken --DON'T HAVE A DECODE--`, err);
                    return res.status(200).end();}
            })
        } catch (err) {
            console.log(`░▒▓ INFO : CURRENT USER - ERROR undefined ${new Date()} : jsonWebToken `, err);
            res.status(200).end()}
    } else {
        console.log(`░▒▓ INFO : CURRENT USER DON'T HAVE A TOKEN`);
        res.status(200).end();}
}