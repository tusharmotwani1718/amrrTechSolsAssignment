import nodemailer from 'nodemailer';
import envconf from '../config/envconf.js';

const sendEmail = async (content, receiverMail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: envconf.mailAddress,   // your Gmail address
        pass: envconf.mailPassword,  // Gmail app password (not your normal password)
      },
      logger: true,
      debug: true,
    });

    await transporter.sendMail({
      from: `"AMRR TechSols 👋" <${envconf.mailAddress}>`,
      to: receiverMail,
      subject: 'Verify Your Email',
      html: content,
    });

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export default sendEmail;
