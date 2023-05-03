/**
 * authFindUserByIdForToken
 * @returns {string} - id, firstname, lastname, email, password, ROLE, is_valid_email, id_category
 */
exports.authFindUserByIdForToken = () => {
    return "SELECT id, firstname, lastname, phone_number, email, ROLE, is_valid_email, id_category FROM user where id=?";
}