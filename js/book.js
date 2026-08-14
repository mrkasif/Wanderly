const BOOKINGS_KEY = 'wanderly_bookings';

const loadBookings = () => JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');

const saveBookings = (bookings) => localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

const addBooking = (booking) => {
  const bookings = loadBookings();
  bookings.push({ id: Date.now(), ...booking });
  saveBookings(bookings);
  return bookings;
};

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('bookingModal');
  if (!overlay) return;

  const title = overlay.querySelector('.modal-dest');
  const form = overlay.querySelector('#bookingForm');
  const nameInput = overlay.querySelector('#bookingName');
  const dateInput = overlay.querySelector('#bookingDate');
  const travelersInput = overlay.querySelector('#bookingTravelers');
  const confirm = overlay.querySelector('.modal-confirm');

  const open = (destination) => {
    title.textContent = `${destination.name} — ${destination.region}`;
    nameInput.value = '';
    dateInput.value = new Date().toISOString().slice(0, 10);
    travelersInput.value = '2';
    confirm.hidden = true;
    form.hidden = false;
    overlay.classList.add('open');
  };

  const close = () => {
    overlay.classList.remove('open');
    confirm.hidden = true;
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.book-btn');
    if (!button) return;
    open(button.dataset);
  });

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const booking = {
      name: nameInput.value,
      destination: title.textContent.split(' — ')[0],
      region: title.textContent.split(' — ')[1],
      date: dateInput.value,
      travelers: Number(travelersInput.value),
    };
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then(() => {
        form.hidden = true;
        confirm.hidden = false;
      })
      .catch(() => {
        addBooking(booking);
        form.hidden = true;
        confirm.hidden = false;
        const note = confirm.querySelector('p');
        if (note) note.textContent = 'Offline — saved on this device only. Start the backend to sync it.';
      });
  });
});
