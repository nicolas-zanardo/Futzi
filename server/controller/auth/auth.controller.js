const jsonWebToken = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");
const fs = require('fs');
const {authUserLoginRepository, authFindUserByIdForTokenRepository} = require("../../repository/auth.repository");

/**
 * RSA
 * @type {string}
 */
const RSA_PUB = fs.readFileSync('RSA/key.pub', 'utf8');
const RSA_PRIVATE = fs.readFileSync('RSA/key', 'utf8');

/**
 * REGEX - TOKEN
 * @type {RegExp}
 */
const REGEX_TOKEN = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gm;


/**
 * AUTH - login
 * @param req Request
 * @param res Response
 * @returns {Promise<void>}
 */
exports.loginController = async(req, res, next) => {
    try {
        return await authUserLoginRepository(req, res)
    } catch (e) {
        next(e)
    };
}

/**
 * refreshTokenController
 * @param req Request
 * @param res Response
 * @returns {Promise<void>}
 */
exports.refreshTokenController = (req, res) => {
    const token = req.body.token;
    if(token.length <= 0) {
        console.log(`✘ 🅴🆁🆁🅾🆁 : ${new Date()} NO TOKEN PROVIDE`);
        return res.status(401).json("NO - TOKEN PROVIDE");}
    if(!token.match(REGEX_TOKEN)) {
        console.log(`✘ 🅴🆁🆁🅾🆁 : ${new Date()} FAKE TOKEN PROVIDE`);
        return res.status(401).json("FAKE  - TOKEN PROVIDE");}
    let decoded = jwt_decode(token);
    jsonWebToken.verify(token, RSA_PUB, (err, decode) => {
        if (err) {console.log(`✘ 🅴🆁🆁🅾🆁 : ${new Date()} : Verify => ${err}`); return res.status(498).end()};
        jsonWebToken.sign({ROLE: decoded.ROLE, email: decoded.email,},
            RSA_PRIVATE,
            {
                algorithm: 'RS256',
                expiresIn: 60*15, // 15min
                subject: decode.sub,
        }, (err, token) => {
            if(err) {console.log(`✘ 🅴🆁🆁🅾🆁 : ${new Date()} Verify after create TOKEN => ${err}`); return res.status(498).end()};
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
            if(!token.match(REGEX_TOKEN)) {
                console.log(`✘ 🅴🆁🆁🅾🆁 : ${new Date()} FAKE TOKEN PROVIDE`);
                return res.status(498).json("FAKE  - TOKEN PROVIDE");}
            await jsonWebToken.verify(token, RSA_PUB, (err, decode) => {
                if (err) { console.log(`░▒▓ INFO : CURRENT USER ${new Date()} : jsonWebToken Verify =>`, err);
                    return res.status(200).json(err.message)};
                if (decode) { return authFindUserByIdForTokenRepository(res, decode); }
                else { console.log(`░▒▓ INFO : CURRENT USER ${new Date()} : jsonWebToken --DON'T HAVE A DECODE--`, err);
                    return res.status(200).end();}
            })
        } catch (err) { console.log(`░▒▓ INFO : CURRENT USER - ERROR undefined ${new Date()} : jsonWebToken `, err);
            res.status(200).end()}
    } else { console.log(`░▒▓ INFO : CURRENT USER DON'T HAVE A TOKEN`);
        res.status(200).end();}
}



