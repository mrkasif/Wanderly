const formatTag = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ') : '—');

const ticketTemplate = (destination, index) => `
  <article class="ticket">
    <div class="ticket-img" style="background-image:url('${destinationImage(destination)}')"></div>
    <div class="ticket-top">
      <div class="ticket-route"><span>WANDERLY → ${String(index + 1).padStart(2, '0')}</span><i></i></div>
      <h2>${destination.name}</h2>
      <p>${destination.region}</p>
      <b>${destination.match}% match</b>
    </div>
    <div class="perf"></div>
    <div class="ticket-bottom">
      <div><small>Budget</small><strong>${formatTag(destination.budget_level)}</strong></div>
      <div><small>Climate</small><strong>${formatTag(destination.climate)}</strong></div>
      <div><small>Duration fit</small><strong>${destination.duration_days} days</strong></div>
      <div><small>Top tag</small><strong>${formatTag(destination.tags[0])}</strong></div>
      <div class="barcode"></div>
    </div>
    <div class="ticket-actions">
      <button class="book-btn" data-name="${destination.name}" data-region="${destination.region}" data-budget="${destination.budget_level}" data-days="${destination.duration_days}" type="button">Book ${destination.name} →</button>
    </div>
  </article>`;

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const query = new URLSearchParams({
    budget_level: params.get('budget_level') || 'mid',
    duration_days: params.get('duration_days') || '5',
    interests: params.get('interests') || '',
  });

  const summary = document.getElementById('summary');
  const grid = document.getElementById('ticketGrid');

  try {
    const response = await fetch(`/api/recommend?${query.toString()}`);
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    const data = await response.json();
    const days = query.get('duration_days');

    summary.textContent = `Tailored for a ${days} day, ${formatTag(query.get('budget_level'))} budget trip.`;
    data.destinations.forEach((destination) => {
      destination.duration_days = days;
      grid.insertAdjacentHTML('beforeend', ticketTemplate(destination, data.destinations.indexOf(destination)));
    });
  } catch (error) {
    const data = MOCK_recommend({
      budget_level: query.get('budget_level') || 'mid',
      duration_days: query.get('duration_days') || '5',
      interests: query.get('interests') || '',
    });
    const days = query.get('duration_days');
    summary.textContent = `Tailored for a ${days} day, ${formatTag(query.get('budget_level'))} budget trip. (Offline demo results)`;
    data.destinations.forEach((destination) => {
      destination.duration_days = days;
      grid.insertAdjacentHTML('beforeend', ticketTemplate(destination, data.destinations.indexOf(destination)));
    });
  }
});
