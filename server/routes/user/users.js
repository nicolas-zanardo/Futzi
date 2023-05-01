const express = require('express');
const {createUserController, currentUserController} = require("../../controller/user.controller");
const {isLogged} = require("../../midelware/isLogged");
const users = express.Router();

/**
 * CRUD USER
 */
users.post("/create", createUserController);

module.exports = users;
