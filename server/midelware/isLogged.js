const fs = require("fs");
const {Database} = require("../Database/Database");
const jsonWebToken = require('jsonwebtoken');
const RSA_PUB = fs.readFileSync('RSA/key.pub', 'utf8');
const sql = require("../query/user.query");

exports.isLogged = async(req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jsonWebToken.verify(token, RSA_PUB, (err , decoded ) => {
            if (err) {
                console.log("isLoggedIn with TOKEN (401) => ",err)
                return res.status(401).end();
            }
            const sub = decoded.sub;
            const db = new Database();
            return db.connection.promise().query(sql.findUserById(), [sub.id]).then(([rows, fields]) => {
                const user = rows[0];
                if(!user) { res.status(409).end() }
                req.user = user;
            }).catch(e => res.json(e)).then(db.connection.end());
        })
    } else {
        console.log("isLoggedIn NO TOKEN (401)")
        return res.status(401).end();
    }
}