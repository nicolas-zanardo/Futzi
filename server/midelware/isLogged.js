const fs = require("fs");
const {Database} = require("../Database/Database");
const jsonWebToken = require('jsonwebtoken');
const RSA_PUB = fs.readFileSync('./RSA/key.pub', 'utf8');
const sql = require("../query/user/user.query");
const {findRoleUser} = require("../component/auth/role-user");
const {ROLE} = require("../enum/ROLES");

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
                        console.log('✘ 🅴🆁🆁🅾🆁 NO ROWS')
                        return res.status(409).end();
                    };
                    if(findRoleUser(ROLE.BAN, rows[0].ROLE)) {
                        console.log('✘ 🅴🆁🆁🅾🆁 USER BAN')
                        return res.status(401).end();
                    };
                    if(findRoleUser(ROLE.USER, rows[0].ROLE)) {
                        req.user = rows[0];
                        next();
                    }
            }).catch(err => {
                console.log("✘ 🅴🆁🆁🅾🆁 SQL ERROR => ",err)
                res.json(err)
            }).then(db.connection.end());
        })
    } else {
        console.log("✘ 🅴🆁🆁🅾🆁 MIDELWARE : isLoggedIn NO TOKEN (401)")
        return res.status(401).end();
    }
}
