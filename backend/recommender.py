import re

from mock_data import ASSISTANT_AREAS, DESTINATIONS, MOODS

KEYWORDS = {
    # beaches / islands / sea
    "beach": {"beach", "relaxation"},
    "beaches": {"beach", "relaxation"},
    "sand": {"beach"},
    "sandy": {"beach"},
    "island": {"beach"},
    "islands": {"beach"},
    "sea": {"beach"},
    "ocean": {"beach"},
    "swim": {"beach"},
    "swimming": {"beach"},
    "surf": {"beach", "adventure"},
    "waves": {"beach"},
    "dive": {"beach", "adventure"},
    "diving": {"beach", "adventure"},
    "snorkel": {"beach"},
    "coral": {"beach"},
    "sunbathe": {"beach", "relaxation"},
    "coast": {"beach", "nature"},
    "lighthouse": {"beach", "nature"},
    "lagoon": {"beach"},
    "spice": {"market", "food"},
    "monaster": {"culture", "history", "mountains"},
    "backwater": {"nature", "relaxation"},
    "safari": {"adventure", "nature"},
    "rainforest": {"nature", "adventure"},
    "volcano": {"nature", "adventure"},
    "volcanoes": {"nature", "adventure"},
    "desert": {"nature", "adventure"},
    "luxury": {"relaxation"},
    "rooftop": {"nightlife", "food"},
    "canal": {"culture", "romance"},
    "backpack": {"adventure"},
    # mountains / nature / outdoors
    "mountain": {"mountains", "nature", "adventure"},
    "mountains": {"mountains", "nature", "adventure"},
    "hill": {"mountains", "nature"},
    "hills": {"mountains", "nature"},
    "hike": {"mountains", "adventure", "nature"},
    "hiking": {"mountains", "adventure", "nature"},
    "trek": {"adventure", "mountains"},
    "trekking": {"adventure", "mountains"},
    "snow": {"nature", "mountains"},
    "snowy": {"nature", "mountains"},
    "peak": {"mountains", "nature"},
    "peaks": {"mountains", "nature"},
    "alps": {"mountains", "nature"},
    "glacier": {"nature", "adventure"},
    "nature": {"nature"},
    "forest": {"nature"},
    "forests": {"nature"},
    "lake": {"nature"},
    "lakes": {"nature"},
    "waterfall": {"nature", "adventure"},
    "waterfalls": {"nature", "adventure"},
    "wildlife": {"nature"},
    "jungle": {"nature"},
    "green": {"nature"},
    "valley": {"nature", "mountains"},
    "camping": {"adventure", "nature"},
    "outdoors": {"nature", "adventure"},
    "starry": {"nature", "romance"},
    # food
    "food": {"food"},
    "eat": {"food"},
    "eating": {"food"},
    "cuisine": {"food"},
    "restaurant": {"food"},
    "restaurants": {"food"},
    "street food": {"food"},
    "taste": {"food"},
    "tasting": {"food"},
    "wine": {"food"},
    "gastronomy": {"food"},
    "dining": {"food"},
    "eat out": {"food"},
    "breakfast": {"food"},
    "dessert": {"food"},
    "delicious": {"food"},
    "yummy": {"food"},
    "gourmet": {"food"},
    "tea": {"food", "culture"},
    "coffee": {"food"},
    # history / culture
    "history": {"history", "culture"},
    "historical": {"history", "culture"},
    "old": {"history", "culture"},
    "ancient": {"history", "culture"},
    "heritage": {"history", "culture"},
    "museum": {"culture", "history"},
    "museums": {"culture", "history"},
    "temple": {"culture", "history"},
    "temples": {"culture", "history"},
    "architecture": {"culture", "history"},
    "culture": {"culture"},
    "cultural": {"culture"},
    "art": {"culture"},
    "church": {"culture", "history"},
    "ruins": {"history", "culture"},
    "castle": {"history", "culture"},
    "palace": {"history", "culture"},
    "festival": {"culture", "nightlife"},
    "monument": {"culture", "history"},
    "tradition": {"culture"},
    "traditional": {"culture"},
    "market": {"market"},
    "markets": {"market"},
    "shopping": {"market"},
    "bazaar": {"market"},
    "souk": {"market"},
    "spice": {"market", "food"},
    # romance
    "romantic": {"romance"},
    "romance": {"romance"},
    "honeymoon": {"romance"},
    "couple": {"romance"},
    "love": {"romance"},
    "sunset": {"romance", "beach"},
    "sunsets": {"romance", "beach"},
    "candlelight": {"romance"},
    "intimate": {"romance"},
    "cozy": {"romance", "relaxation"},
    # relaxation / wellness
    "relax": {"relaxation"},
    "relaxing": {"relaxation"},
    "relaxation": {"relaxation"},
    "calm": {"relaxation"},
    "chill": {"relaxation"},
    "spa": {"relaxation", "wellness"},
    "quiet": {"relaxation"},
    "peaceful": {"relaxation"},
    "rest": {"relaxation"},
    "resting": {"relaxation"},
    "slow": {"relaxation"},
    "wellness": {"wellness", "relaxation"},
    "yoga": {"wellness", "relaxation"},
    "escape": {"relaxation"},
    "tranquil": {"relaxation"},
    "retreat": {"relaxation", "wellness"},
    "sleep": {"relaxation"},
    "lazy": {"relaxation"},
    # adventure / thrill
    "adventure": {"adventure"},
    "adventures": {"adventure"},
    "adventurous": {"adventure"},
    "thrill": {"adventure"},
    "thrilling": {"adventure"},
    "extreme": {"adventure"},
    "adrenaline": {"adventure"},
    "bungee": {"adventure"},
    "ski": {"adventure", "nature", "mountains"},
    "skiing": {"adventure", "nature", "mountains"},
    "kayak": {"adventure"},
    "kayaking": {"adventure"},
    "rafting": {"adventure"},
    "climb": {"adventure", "mountains"},
    "climbing": {"adventure", "mountains"},
    "road trip": {"adventure", "road-trip"},
    "explore": {"adventure", "culture"},
    "discover": {"adventure", "culture"},
    "off the beaten": {"adventure"},
    "expedition": {"adventure"},
    "zip line": {"adventure"},
    "paraglid": {"adventure"},
    "windsurf": {"beach", "adventure"},
    # nightlife / party
    "night": {"nightlife"},
    "nightlife": {"nightlife"},
    "party": {"nightlife"},
    "partying": {"nightlife"},
    "club": {"nightlife"},
    "clubs": {"nightlife"},
    "bars": {"nightlife"},
    "dance": {"nightlife"},
    "dancing": {"nightlife"},
    "music": {"nightlife"},
    "live music": {"nightlife"},
    "city lights": {"nightlife"},
    "vibrant": {"nightlife", "culture"},
    "city": {"nightlife", "culture"},
    "cities": {"nightlife", "culture"},
    "neon": {"nightlife"},
    "lively": {"nightlife"},
    "festive": {"nightlife"},
    # northern lights
    "northern lights": {"northern-lights", "nature"},
    "aurora": {"northern-lights", "nature"},
}


def analyze_text(text):
    """Extract matched destination features from a free-text description."""
    lower = (text or "").lower()
    matched = set()
    for phrase, features in KEYWORDS.items():
        if phrase in lower:
            matched |= features
    return matched


def suggest_by_description(text):
    """Score every destination against the features found in a free-text description."""
    lower = (text or "").lower()
    matched = analyze_text(text)

    def score(destination):
        value = 0
        features = set(destination["tags"]) | set(destination["moods"])
        value += len(matched & features) * 2
        if destination["name"].lower() in lower:
            value += 6
        if destination["region"].lower() in lower:
            value += 4
        if destination["area"].lower() in lower:
            value += 3
        if destination["climate"] in lower:
            value += 3
        return value

    if not matched and not any(score(d) for d in DESTINATIONS):
        return [], set()

    scored = [(score(d), d) for d in DESTINATIONS]
    scored.sort(key=lambda item: item[0], reverse=True)
    top = [d for s, d in scored if s > 0][:5]
    if not top:
        return [], set()

    suggestions = []
    for index, destination in enumerate(top):
        item = dict(destination)
        item["match"] = max(55, 95 - index * 6)
        suggestions.append(item)
    return suggestions, matched


def _score(destination, budget, interests, duration):
    score = 0

    if destination["budget_level"] == budget:
        score += 3
    elif budget == "mid" and destination["budget_level"] in {"low", "mid"}:
        score += 1

    tags = set(destination["tags"])
    score += len(interests & tags) * 2

    if duration >= 5:
        score += 1

    return score


def recommend(preferences):
    budget = preferences.get("budget_level", "mid")
    interests = {
        item.strip().lower()
        for item in preferences.get("interests", "").split(",")
        if item.strip()
    }
    duration = preferences.get("duration_days", 5)
    try:
        duration = int(duration)
    except (TypeError, ValueError):
        duration = 5

    scored = [(_score(d, budget, interests, duration), d) for d in DESTINATIONS]
    scored.sort(key=lambda item: item[0], reverse=True)

    top = scored[:5]
    ranked = []
    for index, (_, destination) in enumerate(top):
        item = dict(destination)
        item["match"] = max(55, 92 - index * 5)
        ranked.append(item)
    return ranked


def build_itinerary(destinations):
    if not destinations:
        return ["No destinations available for an itinerary."]
    return [
        f"{index}. {destination['name']} - {destination['region']}"
        for index, destination in enumerate(destinations, start=1)
    ]


def suggest_by_mood(mood):
    mood = (mood or "").strip().lower()
    if mood not in MOODS:
        return []

    matches = [
        d for d in DESTINATIONS
        if mood in d["moods"] and d["area"] in ASSISTANT_AREAS
    ]

    picked, seen = [], set()
    for area in ASSISTANT_AREAS:
        for destination in matches:
            if destination["area"] == area and destination["id"] not in seen:
                picked.append(destination)
                seen.add(destination["id"])
                break

    for destination in matches:
        if destination["id"] not in seen:
            picked.append(destination)
            seen.add(destination["id"])
        if len(picked) >= 5:
            break

    suggestions = []
    for index, destination in enumerate(picked):
        item = dict(destination)
        item["match"] = max(70, 95 - index * 5)
        suggestions.append(item)
    return suggestions
