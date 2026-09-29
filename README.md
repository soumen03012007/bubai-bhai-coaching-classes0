# BUBAI MONDAL Online Coaching Classes

A full-stack coaching website for a private online tuition teacher, built with React + Vite on the frontend and Express + SQLite + Prisma on the backend.

## Features

- Responsive landing page for student enquiries
- About, teacher profile, success stories, subject pricing, and fee calculator
- Dynamic class and subject selection with live monthly fee calculation
- Admission application form with validation and duplicate protection
- Secure admin login with JWT-based protection
- Admin dashboard for viewing, searching, filtering, updating status, and deleting applications
- SQLite database with Prisma ORM for local development
- Backend validation to recompute fees on the server

## Tech Stack

- Frontend: React, Vite, React Router, CSS
- Backend: Node.js, Express.js
- Database: SQLite + Prisma
- Auth: JWT + bcryptjs
- Security: Helmet, CORS, rate limiting

## Project Structure

```text
Bubai_Bhai/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   └── package.json
├── README.md
├── .gitignore
└── package.json (optional root shell)
```

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npx prisma db push
node src/seed.js
npm run dev
```

## Environment Variables

Backend environment variables are stored in `backend/.env` and example values are in `backend/.env.example`.

```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="CHANGE_THIS_SECRET"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
NODE_ENV="development"
```

## Database Setup

This project uses SQLite for development.

```bash
cd backend
npx prisma db push
node src/seed.js
```

## Admin Login

Use the seeded demo admin account:

- Email: admin@example.com
- Password: admin123

This account is created in development mode only and should be changed before production deployment.

## Running the Project

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

Frontend runs on:

- http://localhost:5173

Backend runs on:

- http://localhost:5000

## Deployment Notes

### Frontend

- Deploy to Vercel or Netlify from the `frontend` folder.
- Set environment variables for API URL if needed.

### Backend

- Deploy to Render, Railway, or similar.
- Use PostgreSQL for production if desired.
- Keep `.env` values secret and never expose JWT secrets or admin credentials in frontend code.

## Updating Teacher / Contact / Fees

Core configuration is centralized in the backend config file:

- `backend/src/config.js`

You can update the teacher name, contact details, pricing, and success stories there.

## Notes

- Demo success stories are clearly marked as sample values and should be replaced with real data later.
- The backend recomputes the fee based on class + selected subjects to prevent manipulated frontend values.
- Duplicate application protection is implemented using phone number + recent submission window.
