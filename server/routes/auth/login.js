const express = require('express');
const passport = require('passport');
const {loginController, refreshTokenController, currentUserController} = require("../../controller/auth/auth.controller");
const {authGoogleController} = require("../../controller/auth/auth-google.controller");
const auth = express.Router();


/**
 * AUTH
 */
// LOCAL
auth.post("/login", loginController);
auth.post("/refresh-token", refreshTokenController);
auth.post("/current-user", currentUserController);

// GOOGLE
auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }, null));
auth.get('/google/redirection', passport.authenticate('google', {}, null), authGoogleController);



module.exports = auth;