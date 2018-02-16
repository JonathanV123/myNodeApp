const nodeMailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const promisify = require('es6-promisify');

const transport = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// transport.sendMail({
//     from : 'Jon <jonathanvox01@gmail.com>',
//     to: 'randy@exmaple.com',
//     subject: 'Testing this out',
//     text: 'HEY!',
// });

exports.send = async (options) => {
    const html = generateHTML(options.filename, options);
    const mailOptions = {
        from: "Jon App <noreply@jonathanvoxland.com>",
        to: options.user.email,
        subject: options.subject,
        html,
        text: 'test',
    }
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
};

const generateHTML = (filename, options = {}) => {
    const html = pug.renderFile(`${__dirname}/./views/email/${filename}.pug`, options);
    return html;
};