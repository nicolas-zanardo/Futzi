const express = require('express');
const {isLogged} = require("../../midelware/isLogged");
const {isLoggedAdmin} = require("../../midelware/isLoggedAdmin");
const users = express.Router();
const {
    createUserController,
    updateUserInfoController,
    updateUserCredentialController,
    getAllUserController,
    updateRoleUserController,
    deleteUserController,
    findUserByTokenURLController,
    findUserByIdController,
} = require("../../controller/user.controller");

/**
 * CRUD USER
 */
users.post("/create", createUserController);
users.get("/token-url/:token", findUserByTokenURLController);
users.put("/edit-info", isLogged, updateUserInfoController);
users.put("/edit-credential", isLogged, updateUserCredentialController);
users.put("/edit-role", isLoggedAdmin, updateRoleUserController);
users.get("/all-users", isLoggedAdmin, getAllUserController);
users.get("/contact/:id", findUserByIdController);
users.delete("/delete/:id_user_update/:id_current_user", isLoggedAdmin, deleteUserController);

module.exports = users;
