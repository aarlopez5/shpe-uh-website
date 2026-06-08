# SHPE UH Website

The official website for the **Society of Hispanic Professional Engineers (SHPE) — University of Houston** chapter. A full-stack web application for managing chapter membership, events, committees, and internal communications.

## Features

- **Authentication** — Secure sign-up and login with JWT tokens and Argon2 password hashing
- **Events Calendar** — Public calendar displaying upcoming chapter events
- **Dashboard** — Personalized member dashboard with upcoming events and notifications
- **Committees** — Browse, join, and leave committees; committee chairs can manage rosters and broadcast messages
- **Notifications** — In-app notification system for committee activity (joins, messages)
- **Gallery** — Photo gallery with an approval workflow
- **Points** — Member points tracking

## Tech Stack

**Frontend**
- React 19, React Router v7
- Vite, Tailwind CSS v4, Framer Motion
- Axios

**Backend**
- FastAPI, SQLModel (SQLAlchemy 2), SQLite
- PyJWT, pwdlib (Argon2), Pydantic v2, Uvicorn

## Prerequisites

- **Node.js** v18+ and npm
- **Python** 3.11+
- **Git**

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd shpe-uh-website
```

### 2. Backend setup

```bash
cd backend

# Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create the environment file
cp .env.example .env            # or create manually — see Environment Variables below
```

Edit `backend/.env` with your values (see [Environment Variables](#environment-variables)).

```bash
# Seed the database with test data (run once)
python seed.py

# Start the development server
python main.py
# or: uvicorn main:app --reload
```

Backend runs at **http://localhost:8000**. Interactive API docs at **http://localhost:8000/docs**.

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Create the environment file
cp .env.local.example .env.local   # or create manually — see Environment Variables below
```

Edit `frontend/.env.local` with your values, then:

```bash
npm run dev
```

Frontend runs at **http://localhost:5173**.

## Environment Variables

### `backend/.env`

| Variable | Description | Example |
|---|---|---|
| `SECRET_KEY` | Random hex secret for JWT signing | `python3 -c "import secrets; print(secrets.token_hex(32))"` |
| `ALGORITHM` | JWT signing algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifetime in minutes | `30` |

### `frontend/.env.local`

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend base URL | `http://localhost:8000` |

> **Never commit `.env` or `.env.local` to version control.**

## Project Structure

```
shpe-uh-website/
├── frontend/
│   └── src/
│       ├── api/            # Axios instance (api.js)
│       ├── components/     # Header, Footer, GalleryApproved, PrivateRoute
│       ├── pages/          # One file per route
│       ├── context/        # React context (auth state, etc.)
│       └── App.jsx         # Route definitions
└── backend/
    ├── main.py             # FastAPI app and all routes
    ├── database.py         # SQLite engine and session factory
    ├── seed.py             # Development seed data
    ├── models/             # SQLModel table definitions
    ├── security/           # JWT creation and password hashing
    ├── services/           # Auth helpers and FastAPI dependencies
    └── validators/         # Input validation (email normalization)
```

## Pages

| Path | Description | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/about` | About SHPE UH | No |
| `/membershpe` | Membership info | No |
| `/sponsors` | Sponsors | No |
| `/gallery` | Photo gallery | No |
| `/calendar` | Events calendar | No |
| `/signin` | Sign in | No |
| `/signup` | Sign up | No |
| `/dashboard` | Member dashboard | Yes |
| `/committees` | Committee management | Yes |

## API Reference

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/login` | No | Authenticate and receive a JWT token |
| POST | `/signup` | No | Register a new account |
| GET | `/me` | Yes | Current user profile (includes points) |
| GET | `/events` | No | All events (powers the public calendar) |
| GET | `/events/upcoming?days=7` | Yes | Upcoming events within N days |
| GET | `/committees` | Yes | All committees with membership/chair status |
| POST | `/committees/{id}/join` | Yes | Join a committee |
| DELETE | `/committees/{id}/leave` | Yes | Leave a committee |
| GET | `/committees/{id}/members` | Chair only | Roster with name, email, phone |
| POST | `/committees/{id}/messages` | Chair only | Broadcast a message to members |
| GET | `/committees/{id}/messages` | Member/Chair | Committee messages, newest first |
| GET | `/notifications` | Yes | Current user's notifications, newest first |
| POST | `/notifications/{id}/read` | Yes | Mark a notification as read |

## Running Tests

```bash
cd backend
source .venv/bin/activate
pytest
```