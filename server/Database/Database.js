const mysql = require('mysql2');

/**
 * @class Database
 * Implement database connection with npm mysql2
 * @link https://www.npmjs.com/package/mysql2
 */
class Database {
    connection = null;

    constructor() {
        this.connection = mysql.createConnection(
        {
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PWD,
            database: process.env.SQL_DATABASE}
        );
    }

}

module.exports = { Database }
