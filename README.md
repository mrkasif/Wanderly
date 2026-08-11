# Wanderly — AI Travel Planner

> **Wander far. Return different.** Tell Wanderly your budget, trip duration and interests — or just describe your dream trip in plain language — and it finds the destinations that fit you best.

Wanderly is a full-stack AI travel planner. It scores 50 real-world destinations against your preferences, builds a ranked shortlist with match percentages, drafts a day-by-day itinerary, and lets you "mock book" trips. A built-in admin panel shows every booking made across users.

**Made by Kashif Sayyad** ✦

---

## Features

- **Smart destination matching** — 50 destinations worldwide scored against your budget, duration, and interests (92% down to 72% match).
- **Free-text AI assistant** — describe your dream trip ("snowy mountains and hiking", "romantic sunset beaches") and get instant suggestions.
- **Itinerary builder** — the top matches become a numbered day-by-day style itinerary preview.
- **Mock booking flow** — book any destination with name, start date, and traveler count; bookings persist on the server.
- **My Bookings** — per-device list of your bookings with cancel support.
- **Admin panel** — token-based login and a table of every customer's bookings.
- **Responsive design** — works on desktop and mobile, with a sunset/plum theme.

## Tech stack

| Layer     | Technology |
|-----------|-----------|
| Backend   | Python + Flask (REST API, JSON file storage) |
| Frontend  | Plain HTML + CSS + vanilla JavaScript (no build tools) |
| Fonts     | Sora, Inter, JetBrains Mono |
| Data      | `bookings.json` (swap for SQLite/PostgreSQL later) |

## Getting started

### Requirements

- Python 3.10+ (tested with 3.14)
- Flask 3.x

### Run it

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000

The backend serves the frontend from the same server, so no separate build step is needed.

### Default admin login

```
username: laksh
password: laksh123
```

Hard-coded for the demo; sessions are token-based.

## Project structure

```
.
├── backend/
│   ├── app.py            # REST API server and routing
│   ├── recommender.py    # matching / scoring / itinerary logic
│   ├── mock_data.py      # 50-destination catalog + keyword dictionary
│   ├── bookings.json     # JSON file storage for bookings (runtime data)
│   └── requirements.txt
└── frontend/
    ├── index.html        # home / plan page (budget, duration, interests)
    ├── results.html      # ranked matches + itinerary preview
    ├── trips.html        # full destination catalog + booking modal
    ├── bookings.html     # "My Bookings" list (per device)
    ├── admin.html        # admin login + all-bookings table
    ├── css/style.css     # shared design system
    └── js/               # page scripts + shared book / assistant logic
```

## REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/destinations` | Full destination catalog |
| GET | `/api/recommend?budget_level=mid&duration_days=5&interests=beach,food` | Ranked matches + itinerary |
| GET | `/api/assistant` | Assistant welcome message |
| POST | `/api/assistant` | `{ "text": "snowy mountains and hiking" }` → suggestions |
| GET | `/api/bookings` | List all bookings |
| POST | `/api/bookings` | Create a booking `{ name, destination, region, date, travelers }` |
| DELETE | `/api/bookings/<id>` | Remove a booking |
| POST | `/api/admin/login` | `{ username, password }` → session token |
| POST | `/api/admin/logout` | Discard session token |
| GET | `/api/admin/bookings` | All bookings (requires `Authorization: Bearer <token>`) |

## How it works

1. **Plan** — set a daily budget, trip duration, and pick interests (or ask the assistant in your own words).
2. **Matches** — Wanderly scores each destination and returns the top 5 as ticket-style cards with match %, budget, climate, and duration fit.
3. **Book** — confirm a mock booking with your name, start date, and traveler count.
4. **My Bookings** — review or cancel your trips.
5. **Admin** — sign in to see every booking made across all users.

## Roadmap

- Swap JSON storage for a real database (SQLite/PostgreSQL)
- Hash admin credentials instead of hard-coding them
- User accounts so bookings follow the user, not the device
- Expand the destination catalog and keyword dictionary
- Real-time pricing/weather data via external APIs
- Unit tests for the recommendation engine

## License

MIT
