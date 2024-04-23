const sgMail = require('@sendgrid/mail');
const catchAsync = require('./catchAsync');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (messageOptions, next) => {
  console.log(messageOptions);
  const msg = {
    to: messageOptions.toEmail,
    from: 'autoschooldev@gmail.com',
    subject: messageOptions.subject,
    text: messageOptions.text,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  console.log('Sending email...');
  try {
    await sgMail.send(msg);
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmail;
