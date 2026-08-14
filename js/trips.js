const formatTag = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ') : '—');

const chip = (value) => `<span class="chip">${value}</span>`;

const destinationTemplate = (destination) => `
  <li class="trip-card">
    <div class="card-img" style="background-image:url('${destinationImage(destination)}')"></div>
    <h3>${destination.name}</h3>
    <p>${destination.region}</p>
    <div class="meta">
      ${chip(destination.area)}
      ${chip(formatTag(destination.budget_level))}
      ${chip(formatTag(destination.climate))}
      ${chip(`₹${Math.round(destination.avg_cost_per_day * 75)}/day`)}
    </div>
    <p class="desc">${destination.description}</p>
    <div class="meta">
      ${destination.tags.map((tag) => chip(formatTag(tag))).join('')}
    </div>
    <div class="trip-actions">
      <a class="match-link" href="results.html?interests=${encodeURIComponent(destination.tags.join(','))}&budget_level=${encodeURIComponent(destination.budget_level)}">Match me →</a>
      <button class="book-btn" data-name="${destination.name}" data-region="${destination.region}" data-budget="${destination.budget_level}" data-days="5" type="button">Book ${destination.name} →</button>
    </div>
  </li>`;

document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('tripList');
  const emptyState = document.getElementById('emptyState');
  const summary = document.getElementById('summary');

  const showDestinations = (destinations, offline) => {
    summary.textContent = offline
      ? `${destinations.length} destinations ready to book. (Offline demo data)`
      : `${destinations.length} destinations ready to book.`;
    list.innerHTML = destinations.map(destinationTemplate).join('');
    emptyState.style.display = 'none';
  };

  try {
    const response = await fetch('/api/destinations');
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    showDestinations(await response.json(), false);
  } catch (error) {
    showDestinations(MOCK_DESTINATIONS, true);
  }
});
