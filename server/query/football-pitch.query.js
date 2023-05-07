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
    return "SELECT * FROM football_pitch WHERE name=?"
}

exports.createFootballPitch = () => {
    return "INSERT INTO football_pitch (name) VALUES (?)"
}