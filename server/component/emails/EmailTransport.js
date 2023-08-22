const Email = require("email-templates");
const {titleCase} = require("../tool/trasform-string");

/**
 * @description this class implement transporter for send email
 * @link https://mailtrap.io/blog/sending-emails-with-nodemailer/
 * @link https://nodemailer.com/about/
 * @link https://mailtrap.io/blog/send-emails-with-nodejs/
 * @link https://github.com/forwardemail/email-templates
 */
class EmailTransport {

    /**
     * _init
     * @description init transporter
     * @return {Email}
     * @private
     */
    static _init() {
        return new Email({
            message: {
                from: process.env.EMAIL_FROM
            },
            send: true,
            transport: {
                host: process.env.EMAIL_TRANSPORT_HOST,
                port: process.env.EMAIL_TRANSPORT_PORT,
                ssl:  process.env.EMAIL_TRANSPORT_SSL,
                tls:  process.env.EMAIL_TRANSPORT_TLS,
                auth: {
                    user: process.env.EMAIL_TRANSPORT_USER,
                    pass: process.env.EMAIL_TRANSPORT_PASS
                }
            }
        });
    }

    /**
     * sendEmail
     * @param user <User> user receive email
     * @param contact <User> contact team
     * @param template <string> template email name
     */
    static sendEmail(user, contact, template) {
        // USER FORMAT NAME
        user.firstname = titleCase(user.firstname);
        user.lastname = titleCase(user.lastname);
        // CONTACT FORMAT NAME
        contact.firstname = titleCase(contact.firstname);
        contact.lastname = titleCase(contact.lastname);
        // SEND EMAIL
        EmailTransport._init().send({
            template: template,
            message: {
                to: user.email
            },
            locals: {user: user, contact:contact}
        }).then(r => {});
        console.log(`░▒▓ INFO : EMAIL SEND : ${new Date()} `)
    }
}

module.exports = {EmailTransport}
