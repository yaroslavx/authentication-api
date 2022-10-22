const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation on ${process.env.API_URL}`,
      text: '',
      html: `
                    <div>
                        <h1>For activation follow link</h1>
                        <a href="${activationLink}">${activationLink}</a>
                    </div>
                `,
    });
  }
}

module.exports = new MailService();
