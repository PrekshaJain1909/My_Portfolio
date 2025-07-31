// Navigation Toggle
document.getElementById('nav-toggle')?.addEventListener('click', () => {
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.querySelector('.nav__overlay');

  navMenu?.classList.toggle('show-menu');
  navOverlay?.classList.toggle('active');
});

// Close navbar when a nav link is clicked (for mobile view)
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu?.classList.remove('show-menu');

    // Optional: If you are using an overlay (dark background behind menu), also hide it
    document.querySelector('.nav__overlay')?.classList.remove('active');
  });
});

// ScrollReveal Animations
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false,
  });

  sr.reveal('.home__data, .home__social, .contact__container, .footer__container');
  sr.reveal('.home__image', { origin: 'bottom' });
  sr.reveal('.about__data, .skills__data, .projects__content, .experience__content', { origin: 'right' });
  sr.reveal('.about__image, .skills__content, .projects__image', { origin: 'left' });
  sr.reveal('.services__title, .services__button', { origin: 'bottom' });
}

// 3D Tilt Animation for Cards
function applyTiltEffect(cards) {
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 10;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * -10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      card.style.boxShadow = `0 12px 24px rgba(255, 105, 180, 0.4), inset 0 0 20px rgba(255, 105, 180, 0.2)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
      card.style.boxShadow = `0 8px 20px rgba(255, 105, 180, 0.2)`;
    });
  });
}

applyTiltEffect(document.querySelectorAll('.experience__card'));
applyTiltEffect(document.querySelectorAll('.education__card'));

// Skills Filter
document.querySelectorAll('.filter-btn')?.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.skill__card').forEach(card => {
      card.style.display = filter === 'all' || card.classList.contains(filter) ? 'block' : 'none';
    });
  });
});

// Reveal on scroll for skill cards
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill__card').forEach(card => skillObserver.observe(card));

// Modal Logic for Services
(() => {
  const modals = document.querySelectorAll('.services__modal');
  const modalBtns = document.querySelectorAll('.services__button');
  const closeBtns = document.querySelectorAll('.services__modal-close');

  modalBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      modals[i].classList.add('active-modal');
    });
  });

  closeBtns.forEach(close => {
    close.addEventListener('click', () => {
      modals.forEach(modal => modal.classList.remove('active-modal'));
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active-modal');
      }
    });
  });
})();

// Achievement Flip Cards and Filter
(() => {
  const cards = document.querySelectorAll('.achievement');
  const filters = document.querySelectorAll('.achievements__filter-btn');

  cards.forEach(card => {
    const closeBtn = card.querySelector('.achievement__close-btn');

    card.addEventListener('click', e => {
      if (!e.target.closest('.achievement__close-btn')) {
        card.classList.toggle('is-flipped');
      }
    });

    closeBtn?.addEventListener('click', e => {
      e.stopPropagation();
      card.classList.remove('is-flipped');
    });
  });

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(' ');
        const match = filter === 'all' || tags.includes(filter);
        card.style.display = match ? '' : 'none';

        if (match) {
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
        }
      });
    });
  });

  // Scroll in view animation
  const achSection = document.querySelector('#achievements');
  if (achSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          achSection.classList.add('in-view');
          const items = achSection.querySelectorAll('.achievement');
          items.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.12}s`;
          });
          observer.unobserve(achSection);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(achSection);
  }
})();

// Work Filter
document.addEventListener('DOMContentLoaded', () => {
  const filterItems = document.querySelectorAll('.work__item');
  const cards = document.querySelectorAll('.work__card');

  filterItems.forEach(btn => {
    btn.addEventListener('click', () => {
      filterItems.forEach(b => b.classList.remove('active-work'));
      btn.classList.add('active-work');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        card.style.display = filter === 'all' || category === filter ? 'block' : 'none';
      });
    });
  });
});
const toggle = document.getElementById('dark-toggle');
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  const response = await fetch('http://localhost:5000/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  });

  const result = await response.json();
  const responseMessage = document.getElementById('responseMessage');
  responseMessage.textContent = result.message;
  responseMessage.style.color = result.success ? 'green' : 'red';

  if (result.success) {
    this.reset();
  }
});
  const form = document.getElementById("contactForm");
  const responseMessage = document.getElementById("responseMessage");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      responseMessage.textContent = "Thank you! Your message has been sent.";
      form.reset();
    } else {
      responseMessage.textContent = "Oops! Something went wrong. Please try again.";
    }
  });

