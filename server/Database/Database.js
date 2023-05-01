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
        {host:'localhost', user: 'root', password: 'root', database: 'footzi'}
        );
    }


}

module.exports = { Database }