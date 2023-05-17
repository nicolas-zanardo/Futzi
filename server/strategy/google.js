const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {findUserByEmail} = require("../query/user.query");
const {Database} = require("../Database/Database");
const jsonWebToken = require("jsonwebtoken");
const fs = require('fs');

/**
 * RSA
 * @type {string}
 */
const RSA_PRIVATE = fs.readFileSync('RSA/key', 'utf8');


exports.googleStrategy = () => {

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            cb(
                null,
                {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone_number: user.phone_number,
                    email: user.email,
                    ROLE: user.ROLE,
                    token: user.token
                }
            );
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });

    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
            scope: [ 'profile','email' ],
            passReqToCallback: false
        },
        async function verify(accessToken, refreshToken, profile, cb) {
            const db = new Database();
            return await db.connection.promise().query(findUserByEmail(), ["nicolas@zanardo.com"]).then(([rows]) => {
                const user = rows[0]
                user.password = null;
                if (rows.length > 0) {
                    jsonWebToken.sign({ROLE: user.ROLE, email: user.email},
                        RSA_PRIVATE, {
                            algorithm: 'RS256',
                            subject: user.id.toString(),
                            expiresIn: 60 * 15// 15min
                        }, (err, token) => {
                            if (err) {
                                console.log(`✘ 🅴🆁🆁🅾🆁 ${new Date()} : Verify TOKEN => ${err}`);
                                user.token = null;
                                return cb(err, user);
                            };
                            console.log(`░▒▓ USER IS LOGIN - TOKEN CREATED AT : ${new Date()}`);
                            user.token = token;
                            return cb(null, user);
                        });

                }

            })

        })
    );
}