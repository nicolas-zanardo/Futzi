/**
 * SQL - findUserById
 * @returns {string} "SELECT * FROM team"
 */
exports.findTeam = () => {
    return "SELECT * FROM team where name_team=? LIMIT 1;";
}

/**
 * updateTeam
 * @returns {string} "UPDATE team SET id_user=? WHERE id=?";
 */
exports.updateTeam = () => {
    return "UPDATE team SET id_user=? WHERE id=?";
}

/**
 * getContactTeam
 * @return {string}
 */
exports.getContactTeam = () => {
    return "SELECT user.email, user.firstname, user.lastname, user.phone_number FROM team inner join user where team.id_user = user.id";
}
