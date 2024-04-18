const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8cc21a581f02f2",
          pass: "bee9ee920d283a"
        },
      });

    const mailOptions = {
        from: "process.env.SMPT_MAIL",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions);
}