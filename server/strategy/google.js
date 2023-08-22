const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {findUserByEmail} = require("../query/user/user.query");
const {Database} = require("../Database/Database");
const {createUserStrategyRepository, updateUserAuthSocialTokenRepository} = require("../repository/user/user.repository");
const {User} = require("../model/User.model");
const bcrypt = require("bcrypt");
const {GenerateToken} = require("../component/tool/GenerateToken");

const addTimeValidityToken = 1000*30;

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
            scope: [ 'profile','email'],
            passReqToCallback: false
        },
        async function verify(accessToken, refreshToken, profile, cb) {
            const db = new Database();
            return await db.connection.promise().query(findUserByEmail(), [profile.emails[0].value]).then(([rows]) => {
                let user = rows[0]
                if (user) {
                    user.tokenURL = accessToken;
                    user.token_time_validity = Date.now() + addTimeValidityToken;
                    updateUserAuthSocialTokenRepository(accessToken, user.token_time_validity, user.id);
                    return cb(null, user);
                } else {
                    const newUser = new User;
                    newUser.email = profile.emails[0].value;
                    newUser.is_valid_mail = profile.emails[0].verified;
                    newUser.lastname = profile.name.familyName;
                    newUser.firstname = profile.name.givenName;
                    newUser.phone_number = "VEUILLEZ RENSEIGNER VOTRE NUMERO DE TELEPHONE";
                    newUser.ROLE = '["USER"]';
                    newUser.tokenURL = accessToken;
                    newUser.token_time_validity = Date.now() + addTimeValidityToken;
                    const genToken = new GenerateToken();
                    const PWD = genToken.create(200, genToken.tokenPassword);
                    newUser.password = bcrypt.hashSync(PWD, bcrypt.genSaltSync(16));
                    createUserStrategyRepository(newUser);
                    return cb(null, newUser);
                }
            })

        })
    );
}
