# Omar – Modern Portfolio (Frontend + Backend)

A modern personal portfolio for showcasing projects, skills, and contact information.  
The site has a custom animated background, smooth UI, and a real **Node.js backend** that sends contact form messages directly to your email.

---

## 🧠 TL;DR

- **Frontend:** Plain HTML + modern CSS + JavaScript.
- **Backend:** Node.js + Express + Nodemailer + Zod.
- **Features:**
  - Animated background (particles).
  - Smooth section navigation (Home, About, Skills, Projects, Contact).
  - Contact form with validation on both frontend & backend.
  - Messages are sent as real emails via SMTP (Gmail App Password or other provider).

---

## 🧱 Tech Stack

**Frontend**

- HTML5
- CSS3 (custom design, no framework)
- Vanilla JavaScript

**Backend**

- Node.js
- Express
- Nodemailer (SMTP email)
- Zod (request validation)
- CORS
- dotenv

---

## 📁 Project Structure

```bash
Portfolio /
├── frontend/
│   ├── index.html        # Main portfolio page
│   ├── styles.css        # Layout & animations
│   └── script.js         # Navbar, particles, contact form logic
│
├── backend/
│   ├── server.js         # Express API (health + contact)
│   ├── package.json      # Backend dependencies & scripts
│   ├── package-lock.json
│   ├── .env              # Local environment variables (NOT committed)
│   └── .env.example      # Example env file (safe to commit)
│
└── .gitignore
