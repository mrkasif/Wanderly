const ADMIN_TOKEN_KEY = 'wanderly_admin_token';
const MOCK_TOKEN = 'mock-offline-admin';

const getToken = () => localStorage.getItem(ADMIN_TOKEN_KEY) || '';

const setToken = (token) => {
  if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token);
  else localStorage.removeItem(ADMIN_TOKEN_KEY);
};

const formatDate = (value) => {
  if (!value) return 'Not set';
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};

document.addEventListener('DOMContentLoaded', () => {
  const loginCard = document.getElementById('loginCard');
  const panel = document.getElementById('adminPanel');
  const form = document.getElementById('adminLoginForm');
  const error = document.getElementById('adminError');
  const rows = document.getElementById('adminRows');
  const empty = document.getElementById('adminEmpty');
  const subtitle = panel.querySelector('.admin-head p');
  const logoutBtn = document.getElementById('logoutBtn');

  const showLogin = () => {
    panel.style.display = 'none';
    loginCard.style.display = 'block';
  };

  const renderBookings = (bookings, offline) => {
    panel.style.display = 'block';
    loginCard.style.display = 'none';
    if (subtitle) subtitle.textContent = offline
      ? 'Sample bookings shown (backend offline).'
      : "Everyone's bookings and names.";
    rows.innerHTML = bookings.map((booking) => `
      <tr>
        <td><span class="chip">${booking.name || '—'}</span></td>
        <td><strong>${booking.destination}</strong></td>
        <td>${booking.region || '—'}</td>
        <td>${formatDate(booking.date)}</td>
        <td>${booking.travelers}</td>
      </tr>`).join('');
    empty.style.display = bookings.length ? 'none' : 'block';
  };

  const loadBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.status === 401) {
        setToken('');
        showLogin();
        return;
      }
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      renderBookings(await response.json(), false);
    } catch (error) {
      renderBookings(MOCK_BOOKINGS, true);
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.style.display = 'none';
    const username = document.getElementById('adminUser').value.trim();
    const password = document.getElementById('adminPass').value;
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      setToken(data.token);
      await loadBookings();
    } catch (err) {
      if (username === MOCK_ADMIN.username && password === MOCK_ADMIN.password) {
        setToken(MOCK_TOKEN);
        renderBookings(MOCK_BOOKINGS, true);
        return;
      }
      error.textContent = (err.message && err.message !== 'Failed to fetch')
        ? err.message
        : 'Could not reach the backend. Start it with: python backend/app.py';
      error.style.display = 'block';
    }
  });

  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    } catch (error) {
      // backend offline — clear the token locally anyway
    }
    setToken('');
    showLogin();
  });

  if (getToken()) loadBookings();
  else showLogin();
});
