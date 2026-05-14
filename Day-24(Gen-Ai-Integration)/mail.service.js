import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("✅ Email transporter is ready");
  })
  .catch((err) => {
    console.log("❌ Email transporter not ready:", err.message);
  });

const sendEmail = async (to, html, subject) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
    return `Email sent successfully to ${to}`;
  } catch (err) {
    console.log("❌ Email not sent:", err.message);
    return "Failed to send email";
  }
};

export default sendEmail;