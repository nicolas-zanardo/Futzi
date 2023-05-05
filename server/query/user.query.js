/**
 * SQL - insertUser
 * @returns {string} INSERT INTO user (id, fisrtname, lastname, email, password, ROLE) VALUES (user)
 */
const {response} = require("express");

exports.insertUser = () => {
    return "INSERT INTO user (firstname, lastname, phone_number, email, password, ROLE, is_valid_email, createdAt, updateAt) VALUES (?,?,?,?,?,?,?, NOW(), NOW())";
}

/**
 * SQL - updateUserInfo
 * @returns {string} UPDATE user SET firstname=?, lastname=?, phone_number=?, email=?  WHERE id=?
 */
exports.updateUserInfo = () => {
    return "UPDATE user SET firstname=?, lastname=?, phone_number=?, email=?, updateAt=NOW() WHERE id=?"
}

/**
 * SQL - updateUserCredential
 * @returns {string} UPDATE user SET password=? WHERE id=?
 */
exports.updateUserCredential = () => {
    return "UPDATE user SET password=?, updateAt=NOW() WHERE id=?"
}

/**
 * SQL - findUserByEmail
 * @returns {string} SELECT email FROM user where email=?
 */
exports.findUserByEmail = () => {
    return "SELECT * FROM user where email=?";
}

/**
 * SQL - findUserById
 * @returns {string}
 */
exports.findUserById = () => {
    return "SELECT * FROM user where id=?";
}

/**
 * SQL - findAllUser
 * @returns {string}
 */
exports.findAllUser = () => {
    return "SELECT id, firstname, lastname, phone_number, email, ROLE, is_valid_email, id_category, createdAt, updateAt FROM user";
}

/**
 * updateRoleUser
 * @returns {string} "UPDATE user SET ROLE=? WHERE id=?"
 */
exports.updateRoleUser = () => {
    return "UPDATE user SET ROLE=? WHERE id=?"
}

exports.deleteUser = () => {
    return "DELETE FROM user WHERE id=?"
}