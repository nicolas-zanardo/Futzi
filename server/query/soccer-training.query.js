/**
 * createTraining
 * @returns {string} "INSERT INTO (day, hour_start, id_football_pitch, id_category) VALUES (?,?,?,?)"
 */
exports.createTraining = () => {
    return "INSERT INTO soccer_training (day, hour_start, id_football_pitch, id_category) VALUES (?,?,?,?)";
}

/**
 * getAllTraining
 * @returns {string} -INNER JOIN category- AND -INNER JOIN football_pitch-
 */
exports.getAllTraining = () => {
    return `SELECT 
                soccer_training.id,
                soccer_training.day, 
                soccer_training.hour_start as hour_start, 
                category.name as category,
                football_pitch.name as football_pitch
            FROM 
                soccer_training 
            INNER JOIN category ON category.id = id_category
            INNER JOIN football_pitch ON football_pitch.id = id_football_pitch`;
}

/**
 * deleteTraining
 * @returns {string}
 */
exports.deleteTraining = () => {
    return "DELETE FROM soccer_training WHERE id=?";

}

/**
 * countTrainingByCategory
 * @return {string}
 */
exports.countTrainingByCategory = () => {
    return `SELECT 
                category.name as category, COUNT(*) as number_training
            FROM soccer_training 
            INNER JOIN category ON category.id = id_category GROUP BY category`;
}

/**
 * trainingByCategory
 * @return {string}
 */
exports.trainingByCategory = () => {
    return `SELECT 
                soccer_training.id, 
                soccer_training.day, 
                soccer_training.hour_start, 
                category.name as category, 
                football_pitch.name as football_pitch
            FROM soccer_training
            INNER JOIN  category
            ON soccer_training.id_category = category.id
            INNER JOIN football_pitch
            ON soccer_training.id_football_pitch = football_pitch.id`;
}
