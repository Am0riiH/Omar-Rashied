require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { z } = require("zod");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is up" });
});

// -------- Validation  --------
const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(10, "Message is too short").max(2000),
});

// --------  Nodemailer --------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("Error verifying mail transporter:", err.message);
  } else {
    console.log("Mail transporter is ready");
  }
});
//-----API-------
app.post("/api/contact", async (req, res) => {
  console.log("Incoming /api/contact request body:", req.body);

  try {
    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issues) => issues.message);
      console.warn("Validation error:", errors);
      return res.status(400).json({
        ok: false,
        message: "Validation error",
        errors,
      });
    }

    const { name, email, message } = parsed.data;

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_INBOX,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-line;">${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully for:", email);

    return res.json({
      ok: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Error in /api/contact:", err);
    return res.status(500).json({
      ok: false,
      message: "Server error, please try again later.",
    });
  }
});

const port = Number(process.env.PORT || "4000");
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
