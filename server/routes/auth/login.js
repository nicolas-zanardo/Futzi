const express = require('express');
const passport = require('passport');
const {
    loginController,
    refreshTokenController,
    currentUserController,
    authSocialRedirectController, authSocialValidTokenController
} = require("../../controller/auth/auth.controller");
const auth = express.Router();

/**
 * AUTH
 */
// LOCAL
auth.post("/login", loginController);
auth.post("/refresh-token", refreshTokenController);
auth.post("/current-user", currentUserController);

// SOCIAL AUTH
auth.post("/social-valid-token", authSocialValidTokenController)

// GOOGLE
auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }, null));
auth.get('/google/redirection', passport.authenticate('google', { failureRedirect: '/api/auth/google'}, null), authSocialRedirectController);

module.exports = auth;