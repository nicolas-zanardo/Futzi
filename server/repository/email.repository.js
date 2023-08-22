const {Database} = require("../Database/Database");
const {getContactTeam} = require("../query/team.query");

/**
 * sendEmail
 * @param user User
 * @param fnSendEmail <EmailTransport> send to email with template
 * @param templateEmail <string> template name email
 * @return {Promise<unknown>}
 */
exports.sendEmailRepository = async(user, fnSendEmail, templateEmail) => {
    const db = new Database();
    return await db.connection.promise().query(getContactTeam(), [])
        .then(([rows]) => {
            console.log(`░▒▓ INFO : GET CONTACT TEAM : ${new Date()} `);
            const contact = rows[0];
            fnSendEmail(user, contact, templateEmail);
        }).catch(err => {
            console.log(`✘ 🅴🆁🆁🅾🆁 SQL : ${new Date()}, ${err}`);
        }).then(db.connection.end());
}
