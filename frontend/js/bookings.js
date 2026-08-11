const BOOKINGS_KEY = 'wanderly_bookings';

const loadLocal = () => JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');

const saveLocal = (bookings) => localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('bookingsList');
  const emptyState = document.getElementById('emptyState');

  let bookings = [];
  let source = 'local';

  const formatDate = (value) => {
    if (!value) return 'Not set';
    const date = new Date(`${value}T00:00:00`);
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const render = () => {
    list.innerHTML = bookings.map((booking, index) => `
      <li class="trip-card booking-card">
        <h3>${booking.destination}</h3>
        <p>${booking.region}</p>
        <div class="meta">
          ${booking.name ? `<span class="chip">${booking.name}</span>` : ''}
          ${booking.date ? `<span class="chip">${formatDate(booking.date)}</span>` : ''}
          <span class="chip">${booking.travelers} traveler${booking.travelers === 1 ? '' : 's'}</span>
          <span class="chip">Confirmed</span>
        </div>
        <button data-index="${index}" data-id="${booking.id}" aria-label="Cancel booking for ${booking.destination}">Cancel booking</button>
      </li>`).join('');
    emptyState.style.display = bookings.length ? 'none' : 'block';
  };

  const refresh = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      const data = await response.json();
      bookings = data;
      source = 'server';
    } catch (error) {
      bookings = loadLocal();
      source = 'local';
    }
    render();
  };

  list.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-index]');
    if (!button) return;
    const index = Number(button.dataset.index);
    const id = Number(button.dataset.id);
    if (source === 'server') {
      try {
        const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
      } catch (error) {
        const local = loadLocal();
        const localIndex = local.findIndex((item) => item.id === id);
        if (localIndex !== -1) {
          local.splice(localIndex, 1);
          saveLocal(local);
        }
      }
      bookings = bookings.filter((item) => item.id !== id);
      render();
      return;
    }
    const local = loadLocal();
    local.splice(index, 1);
    saveLocal(local);
    bookings = local;
    render();
  });

  refresh();
});
