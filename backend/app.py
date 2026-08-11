import json
import secrets
import time
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

from mock_data import DESTINATIONS
from recommender import build_itinerary, recommend, suggest_by_description

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR.parent / "frontend"
BOOKINGS_FILE = BASE_DIR / "bookings.json"

ADMIN_USERNAME = "laksh"
ADMIN_PASSWORD = "laksh123"

app = Flask(__name__, static_folder=None)

_admin_tokens = set()


def _load_bookings():
    if not BOOKINGS_FILE.exists():
        return []
    try:
        data = json.loads(BOOKINGS_FILE.read_text(encoding="utf-8"))
        return data if isinstance(data, list) else []
    except (ValueError, OSError):
        return []


def _save_bookings(bookings):
    BOOKINGS_FILE.write_text(
        json.dumps(bookings, indent=2), encoding="utf-8"
    )


def _require_admin():
    auth = request.headers.get("Authorization", "")
    token = auth.replace("Bearer ", "").strip()
    return token in _admin_tokens


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()})


@app.get("/api/destinations")
def destinations():
    return jsonify(DESTINATIONS)


@app.get("/api/recommend")
def recommend_endpoint():
    preferences = {
        "budget_level": request.args.get("budget_level", "mid"),
        "interests": request.args.get("interests", ""),
        "duration_days": request.args.get("duration_days", 5),
    }
    matches = recommend(preferences)
    return jsonify(
        {
            "preferences": preferences,
            "destinations": matches,
            "itinerary": build_itinerary(matches),
        }
    )


@app.get("/api/assistant")
def assistant_greeting():
    return jsonify(
        {
            "message": "Define your dream place for a tour and I'll suggest places that match.",
        }
    )


@app.post("/api/assistant")
def assistant_reply():
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or data.get("message") or "").strip()
    if not text:
        return jsonify(
            {
                "message": "Tell me about your dream trip — like \"sandy beaches and great food\" or \"snowy mountains for adventure\".",
                "suggestions": [],
            }
        )
    suggestions, matched = suggest_by_description(text)
    if not suggestions:
        return jsonify(
            {
                "message": "Hmm, I couldn't pin that down. Try describing what you love — like \"romantic sunset beaches\" or \"ancient temples and street food\".",
                "suggestions": [],
            }
        )
    return jsonify(
        {
            "message": "Got it — here are places that fit what you described:",
            "query": text,
            "interests": ",".join(sorted(matched)) if matched else "",
            "suggestions": suggestions,
        }
    )


@app.get("/api/bookings")
def list_bookings():
    return jsonify(_load_bookings())


@app.post("/api/bookings")
def create_booking():
    data = request.get_json(silent=True) or {}
    destination = (data.get("destination") or "").strip()
    if not destination:
        return jsonify({"error": "destination is required"}), 400
    try:
        travelers = int(data.get("travelers") or 1)
    except (TypeError, ValueError):
        travelers = 1
    booking = {
        "id": data.get("id") or int(time.time() * 1000),
        "name": (data.get("name") or "").strip(),
        "destination": destination,
        "region": (data.get("region") or "").strip(),
        "date": (data.get("date") or "").strip(),
        "travelers": travelers,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    bookings = _load_bookings()
    bookings.append(booking)
    _save_bookings(bookings)
    return jsonify(booking), 201


@app.delete("/api/bookings/<int:booking_id>")
def delete_booking(booking_id):
    bookings = [b for b in _load_bookings() if b.get("id") != booking_id]
    _save_bookings(bookings)
    return jsonify({"ok": True})


@app.post("/api/admin/login")
def admin_login():
    data = request.get_json(silent=True) or {}
    if (
        data.get("username") == ADMIN_USERNAME
        and data.get("password") == ADMIN_PASSWORD
    ):
        token = secrets.token_hex(16)
        _admin_tokens.add(token)
        return jsonify({"token": token, "username": ADMIN_USERNAME})
    return jsonify({"error": "Invalid username or password"}), 401


@app.post("/api/admin/logout")
def admin_logout():
    auth = request.headers.get("Authorization", "")
    _admin_tokens.discard(auth.replace("Bearer ", "").strip())
    return jsonify({"ok": True})


@app.get("/api/admin/bookings")
def admin_bookings():
    if not _require_admin():
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify(_load_bookings())


@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(FRONTEND_DIR, filename)


@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


if __name__ == "__main__":
    print("Wanderly running at http://localhost:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)
