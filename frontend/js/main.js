document.addEventListener('DOMContentLoaded', () => {
  const tags = document.querySelectorAll('.tag[data-interest]');
  const interestsInput = document.querySelector('input[name="interests"]');
  tags.forEach((tag) => tag.addEventListener('click', () => {
    tag.classList.toggle('active');
    if (interestsInput) interestsInput.value = [...tags].filter((item) => item.classList.contains('active')).map((item) => item.dataset.interest).join(',');
  }));

  const slides = [...document.querySelectorAll('.hero-slide')];
  if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let activeIndex = 0;
    window.setInterval(() => {
      const current = slides[activeIndex];
      const next = slides[(activeIndex + 1) % slides.length];
      current.classList.remove('active');
      current.classList.add('leaving');
      next.classList.add('active', 'entering');
      window.setTimeout(() => {
        current.classList.remove('leaving');
        next.classList.remove('entering');
      }, 1100);
      activeIndex = (activeIndex + 1) % slides.length;
    }, 6500);
  }
});
