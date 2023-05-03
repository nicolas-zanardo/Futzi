const fs = require("fs");
const {Database} = require("../Database/Database");
const jsonWebToken = require('jsonwebtoken');
const RSA_PUB = fs.readFileSync('./RSA/key.pub', 'utf8');
const sql = require("../query/user.query");

exports.isLogged = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jsonWebToken.verify(token, RSA_PUB, (err , decoded ) => {
            if (err) {
                console.log("✘ 🅴🆁🆁🅾🆁 MIDELWARE : isLoggedIn NO TOKEN (401)",err)
                return res.status(401).end();
            }
            const db = new Database();
            return db.connection.promise().query(
                sql.findUserById(), [decoded.sub])
                .then(([rows]) => {
                    if (!rows[0]) {
                        res.status(409).end()
                    }
                    req.user = rows[0];
                    next();

            }).catch(e => {
                console.log("✘ 🅴🆁🆁🅾🆁 SQL ERROR => ",err)
                res.json(e)
            }).then(db.connection.end());
                   })
    } else {
        console.log("✘ 🅴🆁🆁🅾🆁 MIDELWARE : isLoggedIn NO TOKEN (401)")
        return res.status(401).end();
    }
}