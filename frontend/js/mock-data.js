const MOCK_ADMIN = { username: 'laksh', password: 'laksh123' };

const MOCK_DESTINATIONS = [
  { id: 1, name: 'Santorini', region: 'Greece', area: 'Europe', budget_level: 'mid', climate: 'mediterranean', tags: ['beach', 'romance', 'food'], moods: ['romance', 'relaxation', 'food'], avg_cost_per_day: 140, description: 'Whitewashed villages and sunsets that look unreal.' },
  { id: 2, name: 'Kyoto', region: 'Japan', area: 'Japan', budget_level: 'mid', climate: 'temperate', tags: ['culture', 'history', 'food'], moods: ['culture', 'nature', 'food'], avg_cost_per_day: 120, description: 'Temples, tea houses, and cherry blossoms.' },
  { id: 3, name: 'Marrakech', region: 'Morocco', area: 'Africa', budget_level: 'low', climate: 'desert', tags: ['market', 'spa', 'adventure'], moods: ['culture', 'adventure', 'relaxation'], avg_cost_per_day: 90, description: 'Souks, riads, and the golden desert on the doorstep.' },
  { id: 4, name: 'Reykjavik', region: 'Iceland', area: 'Europe', budget_level: 'high', climate: 'cool', tags: ['nature', 'northern-lights', 'road-trip'], moods: ['nature', 'adventure'], avg_cost_per_day: 180, description: 'Hot springs, glaciers, and northern lights.' },
  { id: 5, name: 'Bali', region: 'Indonesia', area: 'Islands', budget_level: 'low', climate: 'tropical', tags: ['beach', 'wellness', 'relaxation'], moods: ['relaxation', 'nature', 'beach'], avg_cost_per_day: 80, description: 'Rice terraces, surf, and slow island mornings.' },
  { id: 6, name: 'Lisbon', region: 'Portugal', area: 'Europe', budget_level: 'mid', climate: 'mediterranean', tags: ['food', 'culture', 'beach'], moods: ['culture', 'food', 'relaxation'], avg_cost_per_day: 110, description: 'Tram rides, pastel de nata, and Atlantic sunsets.' },
  { id: 7, name: 'Queenstown', region: 'New Zealand', area: 'Oceania', budget_level: 'high', climate: 'temperate', tags: ['adventure', 'nature', 'road-trip'], moods: ['adventure', 'nature'], avg_cost_per_day: 170, description: 'Bungee jumping capital with epic mountain lakes.' },
  { id: 8, name: 'Hanoi', region: 'Vietnam', area: 'Asia', budget_level: 'low', climate: 'tropical', tags: ['food', 'history', 'market'], moods: ['food', 'culture'], avg_cost_per_day: 55, description: 'Street food, lakes, and a hundred-year-old old town.' },
  { id: 9, name: 'Paris', region: 'France', area: 'Europe', budget_level: 'high', climate: 'temperate', tags: ['culture', 'romance', 'food'], moods: ['romance', 'culture', 'food'], avg_cost_per_day: 160, description: 'Cafés, boulevards, and the Eiffel Tower.' },
  { id: 10, name: 'Rome', region: 'Italy', area: 'Europe', budget_level: 'mid', climate: 'mediterranean', tags: ['history', 'culture', 'food'], moods: ['culture', 'history', 'food'], avg_cost_per_day: 120, description: 'Two thousand years of history on every corner.' },
  { id: 11, name: 'Interlaken', region: 'Switzerland', area: 'Europe', budget_level: 'high', climate: 'temperate', tags: ['mountains', 'adventure', 'nature'], moods: ['adventure', 'nature'], avg_cost_per_day: 200, description: 'Alpine trails between two turquoise lakes.' },
  { id: 12, name: 'Barcelona', region: 'Spain', area: 'Europe', budget_level: 'mid', climate: 'mediterranean', tags: ['culture', 'food', 'beach'], moods: ['culture', 'nightlife', 'food'], avg_cost_per_day: 130, description: 'Gaudí, tapas, and a beach in the city centre.' },
  { id: 13, name: 'Amsterdam', region: 'Netherlands', area: 'Europe', budget_level: 'mid', climate: 'temperate', tags: ['culture', 'history', 'food'], moods: ['culture', 'nightlife', 'food'], avg_cost_per_day: 125, description: 'Canals, bikes, and world-class museums.' },
  { id: 14, name: 'New York', region: 'USA', area: 'North America', budget_level: 'high', climate: 'temperate', tags: ['culture', 'food', 'nightlife'], moods: ['culture', 'nightlife', 'food'], avg_cost_per_day: 170, description: 'The city that never sleeps — Broadway to Brooklyn.' },
  { id: 15, name: 'Cancun', region: 'Mexico', area: 'North America', budget_level: 'mid', climate: 'tropical', tags: ['beach', 'relaxation', 'nightlife'], moods: ['relaxation', 'nightlife', 'beach'], avg_cost_per_day: 110, description: 'Caribbean beaches and ancient ruins nearby.' },
  { id: 16, name: 'Vancouver', region: 'Canada', area: 'North America', budget_level: 'high', climate: 'temperate', tags: ['nature', 'mountains', 'food'], moods: ['nature', 'adventure', 'food'], avg_cost_per_day: 160, description: 'Ocean, forest, and mountains in one skyline.' },
  { id: 17, name: 'Rio de Janeiro', region: 'Brazil', area: 'South America', budget_level: 'mid', climate: 'tropical', tags: ['beach', 'nightlife', 'nature'], moods: ['nightlife', 'beach', 'nature'], avg_cost_per_day: 120, description: 'Samba, sugarloaf, and Copacabana.' },
  { id: 18, name: 'Cusco', region: 'Peru', area: 'South America', budget_level: 'mid', climate: 'temperate', tags: ['history', 'adventure', 'culture'], moods: ['adventure', 'culture', 'history'], avg_cost_per_day: 100, description: 'Gateway to Machu Picchu and the Andes.' },
  { id: 19, name: 'Buenos Aires', region: 'Argentina', area: 'South America', budget_level: 'low', climate: 'temperate', tags: ['culture', 'food', 'nightlife'], moods: ['culture', 'food', 'nightlife'], avg_cost_per_day: 85, description: 'Tango, steak, and late, late nights.' },
  { id: 20, name: 'Patagonia', region: 'Chile', area: 'South America', budget_level: 'high', climate: 'cool', tags: ['nature', 'adventure', 'mountains'], moods: ['adventure', 'nature'], avg_cost_per_day: 190, description: 'Granite towers, glaciers, and wild winds.' },
  { id: 21, name: 'Tokyo', region: 'Japan', area: 'Japan', budget_level: 'high', climate: 'temperate', tags: ['food', 'culture', 'nightlife'], moods: ['food', 'culture', 'nightlife'], avg_cost_per_day: 150, description: 'Neon districts and the best ramen on earth.' },
  { id: 22, name: 'Osaka', region: 'Japan', area: 'Japan', budget_level: 'mid', climate: 'temperate', tags: ['food', 'nightlife', 'culture'], moods: ['food', 'nightlife'], avg_cost_per_day: 110, description: "Japan's street-food and comedy capital." },
  { id: 23, name: 'Maldives', region: 'Maldives', area: 'Islands', budget_level: 'high', climate: 'tropical', tags: ['beach', 'relaxation', 'romance'], moods: ['relaxation', 'romance'], avg_cost_per_day: 220, description: 'Overwater villas on impossibly blue water.' },
  { id: 24, name: 'Hawaii', region: 'USA', area: 'Islands', budget_level: 'high', climate: 'tropical', tags: ['beach', 'nature', 'adventure'], moods: ['relaxation', 'nature', 'adventure'], avg_cost_per_day: 200, description: 'Volcanoes, waterfalls, and world-class waves.' },
  { id: 25, name: 'Phuket', region: 'Thailand', area: 'Islands', budget_level: 'low', climate: 'tropical', tags: ['beach', 'food', 'nightlife'], moods: ['relaxation', 'beach', 'nightlife'], avg_cost_per_day: 70, description: 'Jungle-covered bays and neon beach bars.' },
  { id: 26, name: 'Athens', region: 'Greece', area: 'Europe', budget_level: 'mid', climate: 'mediterranean', tags: ['history', 'culture', 'food'], moods: ['culture', 'history', 'food'], avg_cost_per_day: 105, description: 'The Acropolis, ancient agora, and sun-drenched tavernas.' },
  { id: 27, name: 'Florence', region: 'Italy', area: 'Europe', budget_level: 'mid', climate: 'mediterranean', tags: ['art', 'history', 'romance'], moods: ['culture', 'history', 'romance'], avg_cost_per_day: 130, description: 'Renaissance masterpieces, bridges, and gelato.' },
  { id: 28, name: 'Prague', region: 'Czechia', area: 'Europe', budget_level: 'low', climate: 'temperate', tags: ['history', 'culture', 'nightlife'], moods: ['culture', 'history', 'nightlife'], avg_cost_per_day: 85, description: 'Castle-topped old town, bridges, and beer halls.' },
  { id: 29, name: 'Bangkok', region: 'Thailand', area: 'Asia', budget_level: 'low', climate: 'tropical', tags: ['food', 'market', 'nightlife'], moods: ['food', 'nightlife', 'culture'], avg_cost_per_day: 60, description: 'Street-food stalls, golden temples, and floating markets.' },
  { id: 30, name: 'Singapore', region: 'Singapore', area: 'Asia', budget_level: 'high', climate: 'tropical', tags: ['food', 'nightlife', 'culture'], moods: ['food', 'culture', 'nightlife'], avg_cost_per_day: 140, description: 'Hawker food, futuristic gardens, and rooftop bars.' },
  { id: 31, name: 'Jaipur', region: 'India', area: 'Asia', budget_level: 'low', climate: 'desert', tags: ['history', 'culture', 'market'], moods: ['culture', 'history'], avg_cost_per_day: 55, description: 'Pink palaces, bazaars, and majestic forts.' },
  { id: 32, name: 'Kerala', region: 'India', area: 'Asia', budget_level: 'low', climate: 'tropical', tags: ['nature', 'wellness', 'relaxation'], moods: ['nature', 'relaxation', 'wellness'], avg_cost_per_day: 50, description: 'Backwater cruises, spice gardens, and Ayurveda.' },
  { id: 33, name: 'Leh-Ladakh', region: 'India', area: 'Asia', budget_level: 'mid', climate: 'cool', tags: ['mountains', 'adventure', 'nature'], moods: ['adventure', 'nature'], avg_cost_per_day: 75, description: 'High-altitude passes, monasteries, and starry skies.' },
  { id: 34, name: 'Kathmandu', region: 'Nepal', area: 'Asia', budget_level: 'low', climate: 'temperate', tags: ['mountains', 'adventure', 'culture'], moods: ['adventure', 'culture', 'history'], avg_cost_per_day: 60, description: 'Gateways to Everest and centuries-old temples.' },
  { id: 35, name: 'Cape Town', region: 'South Africa', area: 'Africa', budget_level: 'mid', climate: 'mediterranean', tags: ['nature', 'beach', 'adventure'], moods: ['nature', 'adventure', 'beach'], avg_cost_per_day: 120, description: 'Table Mountain, penguins, and vineyard valleys.' },
  { id: 36, name: 'Zanzibar', region: 'Tanzania', area: 'Africa', budget_level: 'low', climate: 'tropical', tags: ['beach', 'island', 'relaxation'], moods: ['relaxation', 'beach', 'culture'], avg_cost_per_day: 70, description: 'Turquoise shallows, spice farms, and Stone Town.' },
  { id: 37, name: 'Sydney', region: 'Australia', area: 'Oceania', budget_level: 'high', climate: 'temperate', tags: ['beach', 'food', 'nightlife'], moods: ['beach', 'food', 'nightlife'], avg_cost_per_day: 160, description: 'Harbour icons, surf beaches, and buzzy cafés.' },
  { id: 38, name: 'Cairns', region: 'Australia', area: 'Oceania', budget_level: 'mid', climate: 'tropical', tags: ['beach', 'diving', 'nature'], moods: ['adventure', 'beach', 'nature'], avg_cost_per_day: 110, description: 'Gateway to the Great Barrier Reef and Daintree.' },
  { id: 39, name: 'Dubai', region: 'UAE', area: 'Middle East', budget_level: 'high', climate: 'desert', tags: ['nightlife', 'market', 'luxury'], moods: ['nightlife', 'culture', 'relaxation'], avg_cost_per_day: 180, description: 'Desert safaris, skyline views, and souks.' },
  { id: 40, name: 'Costa Rica', region: 'Costa Rica', area: 'Central America', budget_level: 'mid', climate: 'tropical', tags: ['nature', 'wildlife', 'adventure'], moods: ['nature', 'adventure', 'relaxation'], avg_cost_per_day: 100, description: 'Rainforests, volcanoes, and sloth spotting.' },
  { id: 41, name: 'Manali', region: 'India', area: 'Asia', budget_level: 'low', climate: 'cool', tags: ['mountains', 'adventure', 'nature'], moods: ['adventure', 'nature', 'relaxation'], avg_cost_per_day: 45, description: 'Snow-capped peaks, river valleys, and camping trails.' },
  { id: 42, name: 'Goa', region: 'India', area: 'Asia', budget_level: 'low', climate: 'tropical', tags: ['beach', 'nightlife', 'food'], moods: ['beach', 'relaxation', 'nightlife'], avg_cost_per_day: 50, description: 'Sunset beaches, seafood shacks, and beach parties.' },
  { id: 43, name: 'Tromsø', region: 'Norway', area: 'Europe', budget_level: 'high', climate: 'cool', tags: ['northern-lights', 'nature', 'adventure'], moods: ['nature', 'adventure'], avg_cost_per_day: 185, description: 'Arctic city under the northern lights.' },
  { id: 44, name: 'Banff', region: 'Canada', area: 'North America', budget_level: 'high', climate: 'cool', tags: ['mountains', 'nature', 'lake'], moods: ['nature', 'adventure', 'relaxation'], avg_cost_per_day: 170, description: 'Turquoise lakes and towering Rocky peaks.' },
  { id: 45, name: 'Lake Como', region: 'Italy', area: 'Europe', budget_level: 'high', climate: 'mediterranean', tags: ['romance', 'nature', 'relaxation'], moods: ['romance', 'relaxation', 'nature'], avg_cost_per_day: 175, description: 'Lakefront villas and picture-perfect villages.' },
  { id: 46, name: 'Galle', region: 'Sri Lanka', area: 'Asia', budget_level: 'low', climate: 'tropical', tags: ['beach', 'history', 'food'], moods: ['relaxation', 'culture', 'food'], avg_cost_per_day: 65, description: 'Colonial forts, surf beaches, and spice country.' },
  { id: 47, name: 'Seychelles', region: 'Seychelles', area: 'Islands', budget_level: 'high', climate: 'tropical', tags: ['beach', 'romance', 'relaxation'], moods: ['relaxation', 'romance', 'beach'], avg_cost_per_day: 210, description: 'Granite boulders, white sand, and calm lagoons.' },
  { id: 48, name: 'Nairobi', region: 'Kenya', area: 'Africa', budget_level: 'mid', climate: 'temperate', tags: ['wildlife', 'adventure', 'nature'], moods: ['adventure', 'nature', 'culture'], avg_cost_per_day: 95, description: 'City to savannah — lions an hour away.' },
  { id: 49, name: 'Dublin', region: 'Ireland', area: 'Europe', budget_level: 'mid', climate: 'temperate', tags: ['culture', 'food', 'nightlife'], moods: ['culture', 'nightlife', 'food'], avg_cost_per_day: 115, description: 'Pubs, live music, and castle-topped cliffs nearby.' },
  { id: 50, name: 'Chefchaouen', region: 'Morocco', area: 'Africa', budget_level: 'low', climate: 'temperate', tags: ['market', 'culture', 'history'], moods: ['culture', 'relaxation'], avg_cost_per_day: 55, description: 'Blue-washed lanes in the Rif mountains.' }
];

const MOCK_BOOKINGS = [
  { id: 1, name: 'Arjun', destination: 'Santorini', region: 'Greece', date: '2026-08-09', travelers: 3 },
  { id: 2, name: 'mahesh', destination: 'Santorini', region: 'Greece', date: '2026-08-09', travelers: 3 },
  { id: 3, name: 'Priya', destination: 'Kyoto', region: 'Japan', date: '2026-09-14', travelers: 2 },
  { id: 4, name: 'Rohan', destination: 'Bali', region: 'Indonesia', date: '2026-10-02', travelers: 4 }
];

const MOCK_KEYWORDS = {
  'beach': ['beach', 'relaxation'], 'sand': ['beach'], 'sandy': ['beach'], 'island': ['beach'], 'islands': ['beach'], 'sea': ['beach'], 'ocean': ['beach'], 'swim': ['beach'], 'swimming': ['beach'], 'surf': ['beach', 'adventure'], 'waves': ['beach'], 'dive': ['beach', 'adventure'], 'diving': ['beach', 'adventure'], 'snorkel': ['beach'], 'coral': ['beach'], 'sunbathe': ['beach', 'relaxation'], 'coast': ['beach', 'nature'], 'lighthouse': ['beach', 'nature'], 'lagoon': ['beach'],
  'spice': ['market', 'food'], 'monaster': ['culture', 'history', 'mountains'], 'backwater': ['nature', 'relaxation'], 'safari': ['adventure', 'nature'], 'rainforest': ['nature', 'adventure'], 'volcano': ['nature', 'adventure'], 'volcanoes': ['nature', 'adventure'], 'desert': ['nature', 'adventure'], 'luxury': ['relaxation'], 'rooftop': ['nightlife', 'food'], 'canal': ['culture', 'romance'], 'backpack': ['adventure'],
  'mountain': ['mountains', 'nature', 'adventure'], 'mountains': ['mountains', 'nature', 'adventure'], 'hill': ['mountains', 'nature'], 'hills': ['mountains', 'nature'], 'hike': ['mountains', 'adventure', 'nature'], 'hiking': ['mountains', 'adventure', 'nature'], 'trek': ['adventure', 'mountains'], 'trekking': ['adventure', 'mountains'], 'snow': ['nature', 'mountains'], 'snowy': ['nature', 'mountains'], 'peak': ['mountains', 'nature'], 'peaks': ['mountains', 'nature'], 'alps': ['mountains', 'nature'], 'glacier': ['nature', 'adventure'], 'nature': ['nature'], 'forest': ['nature'], 'forests': ['nature'], 'lake': ['nature'], 'lakes': ['nature'], 'waterfall': ['nature', 'adventure'], 'waterfalls': ['nature', 'adventure'], 'wildlife': ['nature'], 'jungle': ['nature'], 'green': ['nature'], 'valley': ['nature', 'mountains'], 'camping': ['adventure', 'nature'], 'outdoors': ['nature', 'adventure'], 'starry': ['nature', 'romance'],
  'food': ['food'], 'eat': ['food'], 'eating': ['food'], 'cuisine': ['food'], 'restaurant': ['food'], 'restaurants': ['food'], 'street food': ['food'], 'taste': ['food'], 'tasting': ['food'], 'wine': ['food'], 'gastronomy': ['food'], 'dining': ['food'], 'eat out': ['food'], 'breakfast': ['food'], 'dessert': ['food'], 'delicious': ['food'], 'yummy': ['food'], 'gourmet': ['food'], 'tea': ['food', 'culture'], 'coffee': ['food'],
  'history': ['history', 'culture'], 'historical': ['history', 'culture'], 'old': ['history', 'culture'], 'ancient': ['history', 'culture'], 'heritage': ['history', 'culture'], 'museum': ['culture', 'history'], 'museums': ['culture', 'history'], 'temple': ['culture', 'history'], 'temples': ['culture', 'history'], 'architecture': ['culture', 'history'], 'culture': ['culture'], 'cultural': ['culture'], 'art': ['culture'], 'church': ['culture', 'history'], 'ruins': ['history', 'culture'], 'castle': ['history', 'culture'], 'palace': ['history', 'culture'], 'festival': ['culture', 'nightlife'], 'monument': ['culture', 'history'], 'tradition': ['culture'], 'traditional': ['culture'], 'market': ['market'], 'markets': ['market'], 'shopping': ['market'], 'bazaar': ['market'], 'souk': ['market'],
  'romantic': ['romance'], 'romance': ['romance'], 'honeymoon': ['romance'], 'couple': ['romance'], 'love': ['romance'], 'sunset': ['romance', 'beach'], 'sunsets': ['romance', 'beach'], 'candlelight': ['romance'], 'intimate': ['romance'], 'cozy': ['romance', 'relaxation'],
  'relax': ['relaxation'], 'relaxing': ['relaxation'], 'relaxation': ['relaxation'], 'calm': ['relaxation'], 'chill': ['relaxation'], 'spa': ['relaxation', 'wellness'], 'quiet': ['relaxation'], 'peaceful': ['relaxation'], 'rest': ['relaxation'], 'resting': ['relaxation'], 'slow': ['relaxation'], 'wellness': ['wellness', 'relaxation'], 'yoga': ['wellness', 'relaxation'], 'escape': ['relaxation'], 'tranquil': ['relaxation'], 'retreat': ['relaxation', 'wellness'], 'sleep': ['relaxation'], 'lazy': ['relaxation'],
  'adventure': ['adventure'], 'adventures': ['adventure'], 'adventurous': ['adventure'], 'thrill': ['adventure'], 'thrilling': ['adventure'], 'extreme': ['adventure'], 'adrenaline': ['adventure'], 'bungee': ['adventure'], 'ski': ['adventure', 'nature', 'mountains'], 'skiing': ['adventure', 'nature', 'mountains'], 'kayak': ['adventure'], 'kayaking': ['adventure'], 'rafting': ['adventure'], 'climb': ['adventure', 'mountains'], 'climbing': ['adventure', 'mountains'], 'road trip': ['adventure', 'road-trip'], 'explore': ['adventure', 'culture'], 'discover': ['adventure', 'culture'], 'off the beaten': ['adventure'], 'expedition': ['adventure'], 'zip line': ['adventure'], 'paraglid': ['adventure'], 'windsurf': ['beach', 'adventure'],
  'night': ['nightlife'], 'nightlife': ['nightlife'], 'party': ['nightlife'], 'partying': ['nightlife'], 'club': ['nightlife'], 'clubs': ['nightlife'], 'bars': ['nightlife'], 'dance': ['nightlife'], 'dancing': ['nightlife'], 'music': ['nightlife'], 'live music': ['nightlife'], 'city lights': ['nightlife'], 'vibrant': ['nightlife', 'culture'], 'city': ['nightlife', 'culture'], 'cities': ['nightlife', 'culture'], 'neon': ['nightlife'], 'lively': ['nightlife'], 'festive': ['nightlife'],
  'northern lights': ['northern-lights', 'nature'], 'aurora': ['northern-lights', 'nature']
};

const MOCK_analyze = (text) => {
  const lower = String(text || '').toLowerCase();
  const matched = new Set();
  Object.keys(MOCK_KEYWORDS).forEach((phrase) => {
    if (lower.includes(phrase)) MOCK_KEYWORDS[phrase].forEach((feature) => matched.add(feature));
  });
  return matched;
};

const MOCK_suggest = (text) => {
  const lower = String(text || '').toLowerCase();
  const matched = MOCK_analyze(text);
  const score = (destination) => {
    const features = new Set([...destination.tags, ...destination.moods]);
    let value = 0;
    matched.forEach((feature) => { if (features.has(feature)) value += 2; });
    if (lower.includes(destination.name.toLowerCase())) value += 6;
    if (lower.includes(destination.region.toLowerCase())) value += 4;
    if (lower.includes(destination.area.toLowerCase())) value += 3;
    if (lower.includes(destination.climate.toLowerCase())) value += 3;
    return value;
  };
  const top = MOCK_DESTINATIONS.map((destination) => ({ destination, value: score(destination) }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((item, index) => ({ ...item.destination, match: Math.max(55, 95 - index * 6) }));
  return { suggestions: top, interests: [...matched].sort().join(',') };
};

const MOCK_recommend = (preferences) => {
  const budget = preferences.budget_level || 'mid';
  const interests = new Set(String(preferences.interests || '').split(',').map((item) => item.trim().toLowerCase()).filter((item) => item));
  const duration = Number(preferences.duration_days || 5);
  const score = (destination) => {
    let value = 0;
    if (destination.budget_level === budget) value += 3;
    else if (budget === 'mid' && (destination.budget_level === 'low' || destination.budget_level === 'mid')) value += 1;
    destination.tags.forEach((tag) => { if (interests.has(tag)) value += 2; });
    if (duration >= 5) value += 1;
    return value;
  };
  const destinations = MOCK_DESTINATIONS.map((destination) => ({ destination, value: score(destination) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((item, index) => ({ ...item.destination, match: Math.max(55, 92 - index * 5) }));
  const itinerary = destinations.map((destination, index) => `${index + 1}. ${destination.name} - ${destination.region}`);
  return { destinations, itinerary };
};

const MOCK_SPECIFIC_IMAGES = {
  'Santorini': 'photo-1613395877344-13d4a8e0d49e',
  'Kyoto': 'photo-1493976040374-85c8e12f0c0e',
  'Paris': 'photo-1502602898657-3e91760cbb34',
  'Rome': 'photo-1552832230-c0197dd311b5',
  'Tokyo': 'photo-1540959733332-eab4deabeeaf',
  'Osaka': 'photo-1493780474015-ba834fd0ce2f',
  'New York': 'photo-1496442226666-8d4d0e62e6e9',
  'Bali': 'photo-1518548419970-58e3b4079ab2',
  'Maldives': 'photo-1514282401047-d79a71a590e8',
  'Dubai': 'photo-1512453979798-5ea266f8880c',
  'Reykjavik': 'photo-1476610182048-b716b8518aae',
  'Interlaken': 'photo-1506905925346-21bda4d32df4',
  'Tromsø': 'photo-1519681393784-d120267933ba',
  'Banff': 'photo-1501785888041-af3ef285b470',
  'Hawaii': 'photo-1505118380757-91f5f5632de0',
  'Phuket': 'photo-1552465011-b4e21bf6e79a',
  'Jaipur': 'photo-1524492412937-b28074a5d7da',
  'Florence': 'photo-1523906834658-6e24ef2386f9',
  'Nairobi': 'photo-1547471080-7cc2caa01a7e',
  'Kerala': 'photo-1476514525535-07fb3b4ae5f1',
  'Cairns': 'photo-1540541338287-41700207dee6',
  'Prague': 'photo-1541849546-216549ae216d',
  'Costa Rica': 'photo-1500530855697-b586d89ba3ee'
};

const MOCK_IMAGE_POOL = {
  beach: ['photo-1507525428034-b723cf961d3e', 'photo-1505118380757-91f5f5632de0', 'photo-1502680390469-be75c86b636f', 'photo-1503899036084-c55cdd92da26'],
  islands: ['photo-1540541338287-41700207dee6', 'photo-1514282401047-d79a71a590e8', 'photo-1507525428034-b723cf961d3e', 'photo-1537996194471-e657df975ab4'],
  mountains: ['photo-1464822759023-fed622ff2c3b', 'photo-1506905925346-21bda4d32df4', 'photo-1551632811-561732d1e306', 'photo-1519681393784-d120267933ba'],
  nature: ['photo-1476514525535-07fb3b4ae5f1', 'photo-1441974231531-c6227db76b6e', 'photo-1432405972618-c60b0225b8f9', 'photo-1522383225653-ed111181a951'],
  history: ['photo-1552832230-c0197dd311b5', 'photo-1524492412937-b28074a5d7da', 'photo-1523906834658-6e24ef2386f9', 'photo-1502602898657-3e91760cbb34'],
  city: ['photo-1496442226666-8d4d0e62e6e9', 'photo-1477959858617-67f85cf4f1df', 'photo-1449824913935-59a10b8d2000', 'photo-1540959733332-eab4deabeeaf'],
  nightlife: ['photo-1470229722913-7c0e2dbbafd3', 'photo-1477959858617-67f85cf4f1df', 'photo-1544550581-5f7ceaf7f992'],
  food: ['photo-1414235077428-338989a2e8c0', 'photo-1504674900247-0877df9cc836', 'photo-1509644851169-2acc08aa25b5'],
  snow: ['photo-1483347756197-71ef80e95f73', 'photo-1519681393784-d120267933ba', 'photo-1551698618-1dfe5d97d256'],
  adventure: ['photo-1551632811-561732d1e306', 'photo-1547471080-7cc2caa01a7e', 'photo-1502680390469-be75c86b636f', 'photo-1551698618-1dfe5d97d256'],
  romance: ['photo-1613395877344-13d4a8e0d49e', 'photo-1533105079780-92b9be482077', 'photo-1519046904884-53103b34b206'],
  desert: ['photo-1506929562872-bb421503ef21', 'photo-1512453979798-5ea266f8880c'],
  default: ['photo-1488646953014-85cb44e25828', 'photo-1501785888041-af3ef285b470', 'photo-1533050487297-09b450131914', 'photo-1537996194471-e657df975ab4']
};

const destinationImage = (destination) => {
  const specific = MOCK_SPECIFIC_IMAGES[destination.name];
  if (specific) return `https://images.unsplash.com/${specific}?auto=format&fit=crop&w=1000&q=70`;
  const tags = new Set([...(destination.tags || []), ...(destination.moods || [])]);
  const match = (keywords, key) => keywords.some((keyword) => tags.has(keyword)) ? key : null;
  const category = match(['beach', 'island', 'islands', 'tropical', 'lagoon', 'diving', 'coral', 'surf'], 'beach')
    || match(['mountains', 'mountain', 'hike', 'hiking', 'trekking', 'alps', 'peak', 'climbing'], 'mountains')
    || match(['snow', 'northern-lights', 'glacier'], 'snow')
    || match(['desert'], 'desert')
    || match(['history', 'temple', 'temples', 'castle', 'ruins', 'monument', 'palace', 'museum', 'market', 'spa'], 'history')
    || match(['nature', 'wildlife', 'lake', 'rainforest', 'volcano', 'waterfall', 'backwater', 'wellness'], 'nature')
    || match(['nightlife', 'party', 'bars', 'neon'], 'nightlife')
    || match(['food', 'street-food'], 'food')
    || match(['adventure', 'safari', 'trek', 'road-trip', 'camping'], 'adventure')
    || match(['romance', 'relaxation'], 'romance')
    || 'default';
  const pool = MOCK_IMAGE_POOL[category] || MOCK_IMAGE_POOL.default;
  const photo = pool[(destination.id || 0) % pool.length];
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1000&q=70`;
};
