# CLAUDE.md — SHPE UH Website

## Self-Update Instructions
After every session, update this file if any of the following happened:
- A bug was caused by a pattern not listed here → add it to "What NOT to do"
- A new file, route, or dependency was added → update the relevant section
- A correction was made to existing instructions → fix it here
- A new "lesson learned" emerged → add it to "Key Rules & Lessons Learned"

Keep this file accurate. It is read at the start of every session.

## Project Overview
SHPE University of Houston chapter website. React + Vite frontend, FastAPI + SQLite backend.

## Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion, React Router v7, Axios
- **Backend:** FastAPI, SQLModel (ORM), SQLite (`database.db`), PyJWT, pwdlib (Argon2 hashing)
- **Auth:** JWT bearer tokens via `/login` and `/signup` endpoints

## Project Structure
```
shpe-uh-website/
  frontend/
    src/
      api/api.js          # Axios instance (baseURL from VITE_API_URL env var)
      components/         # Header, Footer, GalleryApproved, PrivateRoute
      pages/              # home, about, gallery, membershpe, sponsors, get-involved, dashboard, committees
      App.jsx             # Routes
  backend/
    main.py               # FastAPI app, routes: /login /signup /me /events/upcoming /committees (+ join/leave/members/messages) /notifications
    database.py           # SQLite engine + session factory
    seed.py               # Seeds test user, Academic Chair user, committees (with chair_role) and sample events — run once: python seed.py
    models/               # SQLModel table definitions (user.py, committee.py, committee_message.py, notification.py, event.py)
    security/             # jwt.py (token creation), hashing.py (Argon2)
    services/             # auth_user.py, dependencies.py, get_user.py
    validators/           # email.py (normalize_email)
    .env                  # SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES (never commit)
```

## Running Locally
**Backend** (requires `.venv` activated):
```bash
cd backend
python main.py        # or: uvicorn main:app --reload
```
Runs on http://localhost:8000

**Frontend:**
```bash
cd frontend
npm run dev
```
Runs on http://localhost:5173

## Environment Variables
**Backend** (`backend/.env`):
```
SECRET_KEY=<random hex — generate with: python3 -c "import secrets; print(secrets.token_hex(32))">
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Frontend** (`frontend/.env.local`):
```
VITE_API_URL=http://localhost:8000
```
The `api.js` axios instance reads `VITE_API_URL` — without this set, all API calls will fail.

## Key Rules & Lessons Learned

### Never commit secrets
- `backend/.env` and `frontend/.env.local` must stay out of git
- These should already be in `.gitignore` — verify before any commit

### Backend patterns
- Always use `SessionDependencies` (from `services/dependencies.py`) for DB sessions — do not create sessions manually
- Normalize emails with `normalize_email()` from `validators/email.py` before any DB lookup or insert
- New routes go in `main.py`; new DB models go in `models/` and must be imported before `create_db()` runs so SQLModel registers them
- Passwords are hashed with `get_password_hash()` from `security/hashing.py` — never store plaintext

### Frontend patterns
- All API calls go through the `api` axios instance in `src/api/api.js` — never use fetch or a raw axios import
- Pages live in `src/pages/`, reusable UI in `src/components/`
- Routes are defined in `App.jsx` — update there when adding new pages
- Tailwind v4 is used — do NOT use v3 syntax (e.g. `bg-[color]` utilities are fine, but config is in `tailwind.config.cjs`)

### Styling
- Use Tailwind utility classes first; only add custom CSS to `styles.css` or `App.css` when Tailwind can't do it
- Framer Motion is available for animations — use it for page transitions and reveals

### What NOT to do
- Do not use `python-jose` — the project uses `pyjwt` (imported as `jwt`)
- Do not add `python-dotenv` to requirements — it is already a transitive dependency; just call `load_dotenv()` at the top of any file that needs env vars
- Do not create new axios instances — reuse the one in `api/api.js`
- Do not use `React.useState` / `React.useEffect` — use named imports: `import { useState, useEffect } from 'react'`

## Pages & Routes
| Path | Component | Auth required |
|------|-----------|---------------|
| `/` | `pages/home.jsx` | No |
| `/about` | `pages/about.jsx` | No |
| `/membershpe` | `pages/membershpe.jsx` | No |
| `/sponsors` | `pages/sponsors.jsx` | No |
| `/gallery` | `pages/gallery.jsx` | No |
| `/calendar` | `pages/calendar.jsx` | No |
| `/get-involved` | `pages/get-involved.jsx` (commented out) | No |
| `/dashboard` | `pages/dashboard.jsx` | Yes (PrivateRoute) |
| `/committees` | `pages/committees.jsx` | Yes (PrivateRoute) |

## Protected Routes
`components/PrivateRoute.jsx` wraps any route that requires authentication. If `token` is null it redirects to `/signin` preserving the intended destination in `location.state.from`. After sign-in the user is forwarded to that destination (or `/dashboard` by default).

## Backend API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/login` | No | Returns JWT token |
| POST | `/signup` | No | Creates user, returns JWT token |
| GET | `/me` | Yes | Returns current user (includes `points`) |
| GET | `/events/upcoming?days=7` | Yes | Upcoming events within N days |
| GET | `/events` | No | All events ordered by start_time (public, powers the calendar) |
| GET | `/committees` | Yes | All committees with `is_member`, `is_chair`, and `chair` (name + email) |
| POST | `/committees/{id}/join` | Yes | Join a committee (notifies the member + the chair) |
| DELETE | `/committees/{id}/leave` | Yes | Leave a committee |
| GET | `/committees/{id}/members` | Yes (chair only) | Roster with name, email, phone; 403 if not the chair |
| POST | `/committees/{id}/messages` | Yes (chair only) | Broadcast a message; notifies every active member |
| GET | `/committees/{id}/messages` | Yes (member or chair) | Committee messages, newest first; 403 otherwise |
| GET | `/notifications` | Yes | Current user's notifications, newest first |
| POST | `/notifications/{id}/read` | Yes | Mark one notification read |

## Committee leadership, notifications & messaging
- `Committee.chair_role` (a `Role` enum value, nullable) maps a committee to the chair role that leads it (1:1). There is **no** separate chair-assignment table.
  - The **chair of a committee** = the `User` whose `role == committee.chair_role`.
  - A user **is the chair** of the committee whose `chair_role` equals their own `role`. `CommitteeOut.is_chair` exposes this for the current user.
- `models/notification.py` — `Notification` rows are per-user (`user_id`), with optional `committee_id`, `is_read`, and a `body` string. Joining a committee creates a welcome notification for the joiner AND a "X joined" notification for the chair. Sending a committee message creates one notification per active member (sender excluded).
- `models/committee_message.py` — `CommitteeMessage` is a chair→committee broadcast. `CommitteeMessageOut` includes a resolved `sender_name`.
- Frontend: the Committees page shows "Led by …" (chair name + email) on each card; chairs get a **Manage committee** panel (roster with phone + message composer), members get a read-only **View messages** panel. The Dashboard shows a **Notifications** panel (unread highlighted; click to mark read).
- New `api/api.js` functions: `getCommitteeMembers`, `getCommitteeMessages`, `sendCommitteeMessage`, `getNotifications`, `markNotificationRead`.

## SQLite / datetime note
SQLite stores datetimes as plain text. Store and compare using naive UTC datetimes (`datetime.utcnow()`), not timezone-aware ones. The `Event.start_time` field uses naive UTC. On the frontend, append `'Z'` when constructing a `Date` object so the browser interprets it as UTC: `new Date(event.start_time + 'Z')`.

## Authenticated API calls
New API functions in `api/api.js` read the token from `localStorage` via the internal `authHeaders()` helper — do not pass the token as a parameter (that pattern is only used by the legacy `getMe(token)` function). **Public** endpoints (e.g. `getAllEvents()` → `GET /events`, which powers the public `/calendar` page) must NOT send `authHeaders()`.

## Before Writing Code
1. Check this file for existing patterns — follow them exactly
2. Check the relevant model in `models/` before touching DB logic
3. Check `api/api.js` before making any API call in the frontend
4. If adding a new page, add its route in `App.jsx`
