const sgMail = require('@sendgrid/mail');
const pug = require('pug');
const htmlToText = require('html-to-text');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(name, email, url = '#') {
    this.to = email;
    this.name = name;
    this.from = 'autoschooldev@gmail.com';
    this.url = url;
  }

  async send(html, subject) {
    const msg = {
      to: this.to,
      from: this.from,
      subject,
      text: htmlToText.convert(html),
      html,
    };

    console.log('Sending email...');
    await sgMail.send(msg);
  }

  async sendInstructorPassword(password) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/instructorPassword.pug`,
      {
        name: this.name,
        password,
        url: this.url,
      }
    );

    await this.send(html, 'Master password for autoshool platform');
  }

  async verifyEmail() {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/verifyEmail.pug`,
      {
        name: this.name,
        url: this.url,
      }
    );

    await this.send(html, 'Verify Your Email Address');
  }

  async resetPassword() {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/passwordReset.pug`,
      { url: this.url }
    );

    await this.send(html, 'Reset your password (valid for 10 min)');
  }
};
