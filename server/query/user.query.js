
/**
 * SQL - insertUser
 * @returns {string} INSERT INTO user (id, fisrtname, lastname, email, password, ROLE) VALUES (user)
 */
exports.insertUser = () => {
    return "INSERT INTO user (firstname, lastname, email, password, ROLE, is_valid_email) VALUES (?,?,?,?,?,?)";
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

