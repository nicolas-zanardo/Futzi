const express = require('express');
const {loginController, refreshTokenController, currentUserController} = require("../../controller/auth.controller");
const {isLogged} = require("../../midelware/isLogged");
const auth = express.Router();

/**
 * AUTH
 */
auth.post("/login", loginController);
auth.post("/refresh-token", refreshTokenController);
auth.post("/current-user", currentUserController);

module.exports = auth;