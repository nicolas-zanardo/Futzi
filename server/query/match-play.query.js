exports.createMatchPlay = () => {
    return `INSERT INTO match_play 
                (date, is_local, hour_start, match_of_the_day, id_football_pitch, id_category, id_team_opposing, id_team) 
            VALUES (?,?,?,?,?,?,?,?)`;
}


/**
 * getAllMatch
 * @param WHERE_SQL_CONDITION EX : WHERE date >= DATE( NOW() )
 * @returns {string} INNER JOIN [football_pitch category team_opposing team]
 */
exports.getAllMatch = (WHERE_SQL_CONDITION = "") => {
    return `SELECT 
                match_play.id, 
                match_play.date, 
                match_play.is_local, 
                match_play.hour_start, 
                football_pitch.name as football_pitch,
                category.name as category, 
                team_opposing.name as team_opposing, 
                team.name_team  
            FROM 
                match_play
            INNER JOIN football_pitch ON football_pitch.id = match_play.id_football_pitch
            INNER JOIN category ON category.id = match_play.id_category
            INNER JOIN team_opposing ON team_opposing.id = match_play.id_team_opposing
            INNER JOIN team ON team.id = match_play.id_team
           ${WHERE_SQL_CONDITION}`;
}

exports.deleteMatch = () => {
    return "DELETE FROM match_play WHERE id=?";
}

exports.findMatchOfTheDayInTheSameDate = () => {
    return "SELECT * FROM match_play WHERE date=? AND match_of_the_day=1";
}