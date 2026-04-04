# Jargon Translator

> **Decode the language behind the words.**
> Corporate speak, legal mumbo jumbo, HR doublespeak — translated into brutally honest plain English.

---

## What is Jargon Translator?

Every day, millions of people receive emails, job listings, legal documents, and HR notices written in a language designed to obscure meaning, avoid accountability, or sound important. Jargon Translator rips the mask off.

Paste any piece of professional text — our AI breaks it down sentence by sentence, tells you what it *actually* means, flags red flags, and rates the severity. No sugarcoating.

```
"We are pursuing strategic workforce optimization."
→ "We are laying people off."  🚨 Alarm
```

---

## Live Demo

> Coming soon after deployment

---

## Features

- **5 Decode Modes** — Corporate, Job Listing, Legal, HR, Startup/VC
- **Line-by-line analysis** — every sentence decoded separately
- **Red flag detection** — AI flags suspicious or misleading language
- **Severity rating** — Mild / Spicy / Alarm
- **Translation history** — all past decodings saved to your account
- **Google OAuth** — one-click login with Google
- **Email/Password auth** — traditional signup with welcome email
- **Copy to clipboard** — share any decoded result instantly
- **Fully responsive** — works on mobile, tablet, desktop

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18+ | UI framework |
| TypeScript | 5+ | Type safety across the entire frontend |
| Vite | 5+ | Build tool & dev server |
| Redux Toolkit | 2+ | Global state management |
| React Redux | 9+ | React bindings for Redux |
| React Router DOM | 6+ | Client-side routing |
| Axios | 1+ | HTTP client with interceptors |
| Tailwind CSS | 4+ | Utility-first styling |
| HeroUI | 3+ | UI component library |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20+ | Runtime environment |
| Express | 5+ | Web framework |
| TypeScript | 5+ | Type safety across the entire backend |
| Prisma ORM | 5+ | Database ORM & migrations |
| PostgreSQL | 15+ | Relational database (via NeonDB) |
| Passport.js | 0.7+ | Authentication middleware |
| passport-google-oauth20 | 2+ | Google OAuth 2.0 strategy |
| bcryptjs | 3+ | Password hashing |
| jsonwebtoken | 9+ | JWT creation & verification |
| Nodemailer | 8+ | Transactional email |
| express-rate-limit | 8+ | API rate limiting |
| dotenv | 17+ | Environment variable management |
| cors | 2+ | Cross-origin resource sharing |

### AI & Database

| Service | Purpose |
|---|---|
| Groq API (LLaMA 3.3 70B) | AI translation engine — fast inference |
| NeonDB | Serverless PostgreSQL — cloud database |

### Deployment

| Service | Purpose |
|---|---|
| Vercel | Frontend deployment (React app) |
| Render | Backend deployment (Node.js server) |
| NeonDB | Database (always-on serverless Postgres) |

---

## Project Structure

```
jargon-translator/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ModeSelector.tsx    # 5 mode tabs
│   │   │   ├── TranslatorBox.tsx   # Main input + results
│   │   │   ├── ResultCard.tsx      # Single decoded result
│   │   │   └── HistorySidebar.tsx  # Past translations
│   │   ├── pages/
│   │   │   ├── Login.tsx           # Login page
│   │   │   ├── Register.tsx        # Registration page
│   │   │   ├── Home.tsx            # Main app page
│   │   │   └── AuthCallback.tsx    # Google OAuth callback
│   │   ├── store/
│   │   │   ├── index.ts            # Redux store setup
│   │   │   ├── authSlice.ts        # Auth state management
│   │   │   └── translateSlice.ts   # Translation state management
│   │   ├── hooks/
│   │   │   └── useTranslate.ts     # Typed Redux hooks
│   │   ├── services/
│   │   │   └── api.ts              # Axios instance + interceptors
│   │   ├── types/
│   │   │   └── index.ts            # Shared TypeScript interfaces
│   │   ├── App.tsx                 # Router + protected routes
│   │   └── main.tsx                # React entry point
│   ├── .env
│   └── package.json
│
├── server/                     # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts               # Prisma client
│   │   │   └── passport.ts         # Google OAuth strategy
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts  # Register, login, OAuth
│   │   │   └── translate.controller.ts # Translate, history, delete
│   │   ├── middleware/
│   │   │   ├── auth.ts             # JWT verification
│   │   │   └── rateLimit.ts        # Rate limiting
│   │   ├── routes/
│   │   │   ├── auth.routes.ts      # /auth/* routes
│   │   │   └── translate.routes.ts # /translate/* routes
│   │   ├── services/
│   │   │   ├── groq.service.ts     # Groq AI integration
│   │   │   └── mail.service.ts     # Nodemailer email service
│   │   ├── types/
│   │   │   └── index.ts            # Shared TypeScript interfaces
│   │   └── index.ts                # Express app entry point
│   ├── prisma/
│   │   └── schema.prisma           # Database schema
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## How It Works

### Authentication Flow

```
Email/Password:
User → Register/Login → bcrypt hash → JWT token → localStorage

Google OAuth:
User → Google button → Backend /auth/google → Google consent →
/auth/google/callback → JWT token → Frontend /auth/callback →
Redux state → Home page
```

### Translation Flow

```
User pastes text → selects mode → clicks Decode
    ↓
Frontend → POST /translate/ (with JWT in Authorization header)
    ↓
Backend → verifyToken middleware → rate limiter
    ↓
Groq API (LLaMA 3.3 70B) → structured JSON response
    ↓
Save to PostgreSQL (NeonDB) → return to frontend
    ↓
Redux state update → ResultCard components render
```

### AI Prompt Design

The core of the app is the prompt engineering. Each translation returns:

```json
[
  {
    "original": "strategic workforce optimization",
    "translation": "we are firing people",
    "red_flag": true,
    "severity": "alarm"
  }
]
```

The AI is instructed to be sharp, honest, and occasionally witty — but always grounded in truth.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- NeonDB account (free)
- Google Cloud Console project (for OAuth)
- Groq API key (free)
- Gmail account (for Nodemailer)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/jargon-translator.git
cd jargon-translator
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
DATABASE_URL=postgresql://...pooled...neon.tech/...?sslmode=require
DIRECT_URL=postgresql://...direct...neon.tech/...?sslmode=require
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_random_secret_string
GROQ_API_KEY=gsk_...
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
CLIENT_URL=http://localhost:5173
```

Push database schema:

```bash
npx prisma generate
npx prisma db push
```

Start backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## Environment Variables

### Server

| Variable | Description | Where to get |
|---|---|---|
| `DATABASE_URL` | NeonDB pooled connection string | NeonDB dashboard |
| `DIRECT_URL` | NeonDB direct connection string | NeonDB dashboard |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Google Cloud Console |
| `JWT_SECRET` | Random string for JWT signing | Generate any random string |
| `GROQ_API_KEY` | Groq API key | console.groq.com |
| `EMAIL_USER` | Gmail address | Your Gmail |
| `EMAIL_PASS` | Gmail app password | Google Account → Security → App Passwords |
| `PORT` | Server port | 5000 (default) |
| `CLIENT_URL` | Frontend URL | http://localhost:5173 (dev) |

### Client

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |

---

## API Reference

### Auth Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | ❌ | Register with email & password |
| POST | `/auth/login` | ❌ | Login with email & password |
| GET | `/auth/google` | ❌ | Initiate Google OAuth |
| GET | `/auth/google/callback` | ❌ | Google OAuth callback |
| GET | `/auth/me` | ✅ | Get current user |

### Translation Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/translate/` | ✅ | Translate text |
| GET | `/translate/history` | ✅ | Get user's translation history |
| DELETE | `/translate/:id` | ✅ | Delete a translation |

### Request Examples

**Register:**
```json
POST /auth/register
{
  "name": "Abdullah Shaikh",
  "email": "abdullah@example.com",
  "password": "securepass123"
}
```

**Translate:**
```json
POST /translate/
Headers: Authorization: Bearer <token>

{
  "text": "We are pursuing strategic workforce optimization.",
  "mode": "corporate"
}
```

**Response:**
```json
{
  "message": "Translation successful!",
  "translation": {
    "id": 1,
    "mode": "corporate",
    "input_text": "We are pursuing strategic workforce optimization.",
    "output_json": [
      {
        "original": "We are pursuing strategic workforce optimization.",
        "translation": "We are laying people off to cut costs.",
        "red_flag": true,
        "severity": "alarm"
      }
    ],
    "created_at": "2025-04-04T11:46:32.554Z"
  }
}
```

---

## Decode Modes

| Mode | What it decodes |
|---|---|
| **Corporate** | Office emails, business memos, management speak |
| **Job Listing** | Recruitment posts, job descriptions, hiring language |
| **Legal** | Contracts, terms & conditions, fine print |
| **HR** | Performance reviews, company policies, layoff notices |
| **Startup / VC** | Pitch decks, investor updates, startup jargon |

---

## Why Jargon Translator?

### The Problem

Professional language is often weaponized — not to communicate, but to confuse, minimize, or mislead.

- **"Areas of opportunity"** means your performance is poor
- **"Fast-paced environment"** means understaffed and chaotic
- **"Competitive salary"** means they won't tell you the number
- **"Strategic restructuring"** means people are getting fired

People sign contracts they don't understand. They apply to jobs that misrepresent reality. They sit through performance reviews that say nothing directly.

### Our Solution

Jargon Translator gives people the power to see through professional language in seconds. No law degree needed. No corporate experience required.

### What Makes It Different

- **Not just a summarizer** — it does line-by-line analysis
- **Red flag detection** — actively warns you about concerning language
- **Mode-aware** — different prompts for different contexts
- **Honest, not mean** — exposes systems, not people
- **Fast** — Groq's LLaMA 3.3 70B is one of the fastest LLMs available

---

## Security

- Passwords hashed with **bcryptjs** (12 salt rounds)
- JWT tokens expire in **7 days**
- Rate limiting — **10 translations per 15 minutes**
- Rate limiting — **5 login attempts per 15 minutes**
- Authorization checks on all delete operations
- CORS restricted to frontend domain only
- Environment variables for all secrets

---

## Deployment

### Backend → Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repo → select `server/` as root directory
4. Build command: `npm install && npx prisma generate && npm run build`
5. Start command: `npm start`
6. Add all environment variables in Render dashboard

### Frontend → Vercel

1. Create new project on Vercel
2. Connect GitHub repo → select `client/` as root directory
3. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com`
4. Deploy

### Post-deployment

Update these values:
- `CLIENT_URL` in Render env → your Vercel URL
- Google OAuth redirect URI → `https://your-render-url.onrender.com/auth/google/callback`

---

## Author

**Abdullah Shaikh**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: 2k23-swe-18@usindh.edu.pk

---

## License

MIT License — do whatever you want with it.

---

*Built with frustration, caffeine, and a deep hatred for corporate speak.*