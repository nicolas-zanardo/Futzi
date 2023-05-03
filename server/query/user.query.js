
/**
 * SQL - insertUser
 * @returns {string} INSERT INTO user (id, fisrtname, lastname, email, password, ROLE) VALUES (user)
 */
exports.insertUser = () => {
    return "INSERT INTO user (firstname, lastname, phone_number, email, password, ROLE, is_valid_email) VALUES (?,?,?,?,?,?,?)";
}

/**
 * SQL - updateUserInfo
 * @returns {string} UPDATE user SET firstname=?, lastname=?, phone_number=?, email=?  WHERE id=?
 */
exports.updateUserInfo = () => {
    return "UPDATE user SET firstname=?, lastname=?, phone_number=?, email=?  WHERE id=?"
}

/**
 * SQL - updateUserInfo
 * @returns {string} UPDATE user SET firstname=?, lastname=?, phone_number=?, email=?  WHERE id=?
 */
exports.updateUserCredential = () => {
    return "UPDATE user SET password=? WHERE id=?"
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

