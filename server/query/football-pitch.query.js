/**
 * getAllFootballPitch
 * @returns {string} "SELECT * FROM football_pitch";
 */
exports.getAllFootballPitch = () => {
    return "SELECT * FROM football_pitch";
}

/**
 * getFootballPitchByName
 * @returns {string} "SELECT * FROM football_pitch WHERE name=?"
 */
exports.getFootballPitchByName = () => {
    return "SELECT * FROM football_pitch WHERE name=?";
}

/**
 * createFootballPitch
 * @returns {string} "INSERT INTO football_pitch (name) VALUES (?)"
 */
exports.createFootballPitch = () => {
    return "INSERT INTO football_pitch (name) VALUES (?)";
}

/**
 * updateFootballPitch
 * @returns {string} "UPDATE football_pitch set name=? WHERE id=?"
 */
exports.updateFootballPitch = () => {
    return "UPDATE football_pitch set name=? WHERE id=?";
}

/**
 * deleteFootballPitch
 * @returns {string}
 */
exports.deleteFootballPitch = () => {
    return "DELETE FROM football_pitch WHERE id=?";
}