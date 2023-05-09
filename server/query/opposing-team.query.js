/**
 * getAllOpposingTeam
 * @returns {string} 'SELECT * FROM team_opposing'
 */
exports.getAllOpposingTeam = () => {
    return 'SELECT * FROM team_opposing';
}

/**
 * findOpposingTeamByName
 * @returns {string}
 */
exports.findOpposingTeamByName = () => {
    return 'SELECT * FROM team_opposing WHERE name=?';
}

/**
 * createOpposingTeam
 * @returns {string}
 */
exports.createOpposingTeam = () => {
    return 'INSERT INTO team_opposing (name) VALUES (?)';
}