import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
  try {
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL, // Sender address
      to: email, // User email
      subject: subject, // Subject line
      html: message, // HTML body
    });

    console.log(`Email sent to ${email} with subject "${subject}"`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
};

export default sendEmail;
