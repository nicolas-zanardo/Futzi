
/**
 * SQL - findUserByTokenURL
 * @returns {string}
 */
exports.findUserByTokenURL = () => {
    return "SELECT * FROM user WHERE tokenURL=?";
}

/**
 * SQL - findByTokenPassword
 * @return {string}
 */
exports.findUserByTokenPassword = () => {
    return "SELECT id, token_reset_password, token_time_validity FROM user WHERE token_reset_password=?"
}

/**
 * SQL - updateUserToken
 * @return {string}
 */
exports.updateUserToken = () => {
    return "UPDATE user SET token_reset_password=?, token_time_validity=?, tokenURL=?, token_valid_email=? WHERE id=?"
}

/**
 * SQL - findUserByTokenValidEmail
 * @return {string}
 */
exports.findUserByTokenValidEmail = () => {
    return "SELECT id, token_valid_email, token_time_validity FROM user WHERE token_valid_email=?"
}

/**
 * updateStatusValidEmail
 * @return {string}
 */
exports.updateStatusValidEmail = () => {
    return "UPDATE user SET is_valid_email=?, token_reset_password=?, token_time_validity=?, tokenURL=?, token_valid_email=? WHERE id=?"
}


