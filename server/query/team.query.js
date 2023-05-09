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