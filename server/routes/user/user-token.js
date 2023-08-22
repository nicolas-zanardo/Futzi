const express = require('express');
const {forgetPasswordController} = require("../../controller/user/user.controller");
const {
    findUserByTokenURLController,
    findUserByTokenResetPasswordController,
    resetPasswordController,
    findUserByTokenValidEmailController,
    setValidEmailAddressController
} = require("../../controller/user/user-token.controller");

const usersToken = express.Router();

usersToken.post("/forget-password", forgetPasswordController);
usersToken.get("/token-url/:token", findUserByTokenURLController);
usersToken.get("/find-by-token-reste-password/:token", findUserByTokenResetPasswordController);
usersToken.get("/find-by-token-valid-email/:token",  findUserByTokenValidEmailController);
usersToken.post("/valid-token-reste-password", resetPasswordController);
usersToken.post("/valid-token-valid-email", setValidEmailAddressController);

module.exports = usersToken;
