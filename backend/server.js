const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const mongoose = require("mongoose"); // MongoDB
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// =============================
// Middleware
// =============================
app.use(cors());
app.use(express.json());


// =============================
// MongoDB Configuration
// =============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });


// =============================
// MongoDB Contact Schema
// =============================
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// =============================
// MongoDB Contact Model
// =============================
const Contact = mongoose.model("Contact", contactSchema);


// =============================
// Home API
// =============================
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running!");
});

// =============================
// Admin Login API
// =============================
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });

  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
});


// =============================
// Admin Authentication Middleware
// =============================
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please login again.",
    });
  }
};


// =============================
// Get Contact Connections
// =============================
app.get("/api/admin/contacts", verifyAdmin, async (req, res) => {
  try {

    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: contacts.length,
      contacts,
    });

  } catch (error) {
    console.error("Get contacts error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch contacts.",
    });
  }
});


// =============================
// Resend Email Configuration
// =============================
const resend = new Resend(process.env.RESEND_API_KEY);

// =============================
// Contact API
// =============================
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // =============================
    // Validation
    // =============================
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // =============================
    // Save Contact in MongoDB
    // =============================
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    console.log("Contact saved in MongoDB");

    // =============================
    // Send success immediately
    // =============================
    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

    // =============================
    // Email Notification
    // =============================
    resend.emails
      .send({
        from: "Portfolio Contact <onboarding@resend.dev>",

        to: [process.env.RECEIVER_EMAIL],

        replyTo: email,

        subject: `Portfolio message from ${name}`,

        text: `
    Name: ${name}
    Email: ${email}

    Message:
    ${message}
        `,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error("Resend email failed:", error);
          return;
        }

        console.log("Email notification sent successfully:", data);
      })
      .catch((error) => {
        console.error("Resend email failed:", error);
      });

  } catch (error) {
    console.error("Contact save error:", error);

    // Yahan failure ka matlab MongoDB me bhi save nahi hua
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Unable to save message. Please try again.",
      });
    }
  }
});


// =============================
// Start Server
// =============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});