const express = require('express');
const {isLogged} = require("../../midelware/isLogged");
const users = express.Router();
const {
    createUserController,
    updateUserInfoController,
    updateUserCredentialController
} = require("../../controller/user.controller");

/**
 * CRUD USER
 */
users.post("/create", createUserController);
users.put("/edit-info", isLogged, updateUserInfoController);
users.put("/edit-credential", isLogged, updateUserCredentialController)

module.exports = users;
