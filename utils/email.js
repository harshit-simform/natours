const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: 'f9e6b5bbcd7e62',
      pass: '5b561629e99b0d',
    },
  });

  //2) define the email options
  const mailOptions = {
    form: 'Harshit Gupta <hello@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3) actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
