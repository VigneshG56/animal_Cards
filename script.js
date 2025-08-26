// ================= LOAD CARDS FROM JSON =================
const cardsRow = document.getElementById('cards-row');

fetch('data.json')
  .then(response => response.json())
  .then(cardsData => {
    cardsData.forEach(card => {
      const col = document.createElement('div');
      col.className = 'col-card mb-4';
      col.innerHTML = `
        <div class="card">
          <img src="${card.image}" class="card-img-top" alt="${card.title}">
          <div class="card-body">
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text">${card.text}</p>
          </div>
        </div>
      `;
      cardsRow.appendChild(col);
    });

    const cards = document.querySelectorAll('.card');

    // ================= CARD FADE-IN ANIMATION =================
    function checkCards() {
      const triggerBottom = window.innerHeight * 0.9;
      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < triggerBottom) {
          card.classList.add('show');
        }
      });
    }

    window.addEventListener('scroll', checkCards);
    window.addEventListener('load', checkCards);
    checkCards();
  })
  .catch(err => console.error('Error loading JSON:', err));

// ================= SMOOTH SCROLL NAV LINKS =================
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });

    // ================= AUTO-CLOSE MOBILE NAVBAR =================
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

// ================= HERO SCROLL ANIMATION =================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if(scrollY > 0) {
    hero.classList.add('scroll-up');
  } else {
    hero.classList.remove('scroll-up');
  }
});
