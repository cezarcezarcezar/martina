/* =========================================================
   LUMIÈRE — script.js  |  Vanilla JavaScript
   ========================================================= */

'use strict';

// ── Artwork Data ────────────────────────────────────────────
const ARTWORKS = [
  {
    id: 'ago',
    title: 'At the Art Gallery of Ontario',
    year: '2026',
    category: 'photos',
    tag: 'Photos',
    src: 'images/ago_hands.jpg',
    alt: 'At the Art Gallery of Ontario',
    description:
      'Heart hands? At a museum? Absolutely. Snapped under the dazzling neon light installation at the AGO, this photo is equal parts art appreciation and unhinged energy. The magenta glow turns two very normal wrists into something straight out of a sci-fi rave — and honestly? We love it.',
  },
  {
    id: 'go_away',
    title: 'Go Away',
    year: '2026',
    category: 'photos',
    tag: 'Photos',
    src: 'images/go_away.jpg',
    alt: 'Go Away',
    description:
      'The subject has spoken. Palm out, face turned, camera thoroughly dismissed — this is what happens when you point a lens at someone on public transit who is absolutely not in the mood. Taken on a rainy day (relatable), this photo captures the universal language of "I said no." Bold. Iconic. Correct.',
  },
  {
    id: 'face',
    title: 'Face',
    year: '2025',
    category: 'drawings',
    tag: 'Portraits',
    src: 'images/face.jpg',
    alt: 'A portrait of a face',
    description:
      'A stylized mixed-media portrait rendered in warm burnt sienna and ochre tones on grey paper. The front-facing figure is framed by flowing silver-painted hair with visible brushstrokes, lending a luminous, almost metallic quality. The cool grey background is scattered with hand-drawn four-pointed stars and small deep red gemstone embellishments adhered to the surface. Ethereal and celestial in mood, the figure floats in a quiet, starlit void — signed "M.G."',
  },
  {
    id: 'drinking_water',
    title: 'Drinking Water',
    year: '2025',
    category: 'drawings',
    tag: 'Portraits',
    src: 'images/drinking water.jpg',
    alt: 'A portrait of a face',
    description:
      'She is hydrating. She is also staring directly into your soul. This watercolour portrait captures the deeply relatable act of drinking water — except those piercing green eyes make it feel like an interrogation. Bold brushwork, soft blue background, dark nails on the cup. Hydration has never been this intense. Signed "Martina G."',
  },
  {
    id: 'nature',
    title: 'Nature',
    year: '2025',
    category: 'drawings',
    tag: 'Portraits',
    src: 'images/nature.jpg',
    alt: 'A portrait of a face',
    description:
      'Why buy supplies when the forest has everything you need? This mixed-media collage is built entirely from real dried autumn leaves — burgundy, amber, gold — plus cotton wool, paint, and a sprinkling of iridescent glitter at the border. It depicts a misty forest arch opening onto a lily pond, and it is genuinely stunning that it was made from things found on the ground.',
  },
  {
    id: 'anna',
    title: 'Anna Dress',
    year: '2026',
    category: 'photos',
    tag: 'Photos',
    src: 'images/Anna.jpg',
    alt: 'Anna Dress on starry background',
    description:
      'From the "Autobiography: The girl from the past" series. Do you want to build a snowman? Or maybe just reign over an entire cosmic kingdom? This magical Anna inspired dress floats through a starry, intergalactic dreamscape. It’s a whimsical nod to childhood fantasies where deep blue skies, floral embroidery, and frosty adventures collide.',
  },
  {
    id: 'belle',
    title: 'Belle Dress',
    year: '2026',
    category: 'photos',
    tag: 'Photos',
    src: 'images/Belle.jpg',
    alt: 'Belle Dress on golden background',
    description:
      'From the "Autobiography: The girl from the past" series. Tale as old as time, but make it absolutely glowing. This spectacular golden-yellow Belle ballgown brings all the enchanted castle vibes. Nestled against a chaotic, paint-splattered amber backdrop, it’s a tribute to the days of wanting nothing more than a giant library and a dress that twirls perfectly.',
  },
  {
    id: 'rapunzel',
    title: 'Rapunzel Dress',
    year: '2026',
    category: 'photos',
    tag: 'Photos',
    src: 'images/Rapunzel.jpg',
    alt: 'Rapunzel Dress on pink background',
    description:
      'From the "Autobiography: The girl from the past" series. Best day ever! Floating lanterns have nothing on this electric pink and magenta dreamworld. This Rapunzel inspired purple gown, complete with laced bodice and ribbon sleeves, screams early-2000s childhood nostalgia. A vibrant trip back to the days of dreaming big, singing loudly, and demanding to see the floating lights.',
  },
];

// ── Utility: debounce ───────────────────────────────────────
function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// ── DOM refs ────────────────────────────────────────────────
const header = document.getElementById('site-header');
const galleryGrid = document.getElementById('gallery-grid');
const filterBar = document.getElementById('filter-bar');
const lightbox = document.getElementById('lightbox');
const lbOverlay = document.getElementById('lightbox-overlay');
const lbClose = document.getElementById('lightbox-close');
const lbPrev = document.getElementById('lightbox-prev');
const lbNext = document.getElementById('lightbox-next');
const lbImg = document.getElementById('lightbox-img');
const lbTag = document.getElementById('lightbox-tag');
const lbTitle = document.getElementById('lightbox-title');
const lbDesc = document.getElementById('lightbox-desc');
const lbMeta = document.getElementById('lightbox-meta');

// ── State ───────────────────────────────────────────────────
let currentFilter = 'all';
let currentLbIndex = -1;
let filteredArtworks = [...ARTWORKS];

// ── Header scroll effect ────────────────────────────────────
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Build gallery cards ─────────────────────────────────────
function buildCard(artwork, index) {
  const article = document.createElement('article');
  article.className = 'art-card';
  article.setAttribute('role', 'listitem');
  article.setAttribute('tabindex', '0');
  article.dataset.id = artwork.id;
  article.dataset.index = index;
  article.id = `art-card-${artwork.id}`;

  article.innerHTML = `
    <div class="art-card-img-wrap">
      <img
        class="art-card-img"
        src="${artwork.src}"
        alt="${artwork.alt}"
        loading="lazy"
      />
      <div class="art-card-overlay">
        <span class="art-card-overlay-label">View painting →</span>
      </div>
    </div>
    <div class="art-card-body">
      <span class="art-card-tag">${artwork.tag}</span>
      <h3 class="art-card-title">${artwork.title}</h3>
      <p class="art-card-year">Martina &nbsp;·&nbsp; ${artwork.year}</p>
    </div>
  `;

  article.addEventListener('click', () => openLightbox(index));
  article.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });

  return article;
}

// ── Intersection Observer for entrance animations ───────────
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// ── Render gallery ──────────────────────────────────────────
function renderGallery(filter) {
  currentFilter = filter;
  filteredArtworks = filter === 'all'
    ? [...ARTWORKS]
    : ARTWORKS.filter((a) => a.category === filter);

  galleryGrid.innerHTML = '';

  filteredArtworks.forEach((artwork, i) => {
    const card = buildCard(artwork, i);
    // stagger delay
    card.style.animationDelay = `${i * 80}ms`;
    galleryGrid.appendChild(card);
    cardObserver.observe(card);
  });
}

// ── Filter buttons ──────────────────────────────────────────
filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  renderGallery(btn.dataset.filter);
});

// ── Lightbox ────────────────────────────────────────────────
function openLightbox(index) {
  currentLbIndex = index;
  const art = filteredArtworks[index];

  lbImg.src = art.src;
  lbImg.alt = art.alt;
  lbTag.textContent = art.tag;
  lbTitle.textContent = art.title;
  lbDesc.textContent = art.description;
  lbMeta.textContent = `Martina  ·  ${art.year}  ·  Digital`;

  lightbox.classList.add('open');
  lbOverlay.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Update nav button visibility
  updateNavButtons();

  lbClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lbOverlay.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentLbIndex = -1;
}

function updateNavButtons() {
  lbPrev.style.opacity = currentLbIndex <= 0 ? '0.3' : '1';
  lbPrev.style.pointerEvents = currentLbIndex <= 0 ? 'none' : 'all';
  lbNext.style.opacity = currentLbIndex >= filteredArtworks.length - 1 ? '0.3' : '1';
  lbNext.style.pointerEvents = currentLbIndex >= filteredArtworks.length - 1 ? 'none' : 'all';
}

function navigateLightbox(direction) {
  const next = currentLbIndex + direction;
  if (next < 0 || next >= filteredArtworks.length) return;

  lbImg.style.opacity = '0';
  setTimeout(() => {
    openLightbox(next);
    lbImg.style.opacity = '1';
  }, 200);
}

lbClose.addEventListener('click', closeLightbox);
lbOverlay.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => navigateLightbox(-1));
lbNext.addEventListener('click', () => navigateLightbox(1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ── Smooth img fade on lightbox image load ──────────────────
lbImg.addEventListener('load', () => {
  lbImg.style.opacity = '1';
});

// ── Rotating quotes (About section) ────────────────────────
const QUOTES = [
  { text: '"Colour is my day-long obsession, joy and torment."', cite: '— Claude Monet' },
  { text: '"I am following Nature without being able to grasp her."', cite: '— Claude Monet' },
  { text: '"Every child is an artist. The problem is how to remain an artist once we grow up."', cite: '— Pablo Picasso' },
  { text: '"I paint flowers so they will not die."', cite: '— Frida Kahlo' },
  { text: '"Creativity takes courage."', cite: '— Henri Matisse' },
  { text: '"Art is what you can get away with."', cite: '— Andy Warhol' },
  { text: '"Have no fear of perfection — you\'ll never reach it."', cite: '— Salvador Dalí' },
  { text: '"I found I could say things with colour and shapes that I couldn\'t say any other way."', cite: '— Georgia O\'Keeffe' },
  { text: '"Art is how we decorate space; music is how we decorate time."', cite: '— Jean-Michel Basquiat' },
  { text: '"All painting, no matter what you\'re painting, is abstract in that it\'s got to be organised."', cite: '— David Hockney' },
  { text: '"Art is a guaranty of sanity."', cite: '— Louise Bourgeois' },
  { text: '"The things I have been interested in are not beauty as such, but vitality, power, energy."', cite: '— Roy Lichtenstein' },
];

let quoteIndex = 0;
const quoteTextEl = document.querySelector('.quote-text');
const quoteCiteEl = document.querySelector('.quote-cite');

function cycleQuote() {
  quoteIndex = (quoteIndex + 1) % QUOTES.length;
  quoteTextEl.style.opacity = '0';
  quoteCiteEl.style.opacity = '0';
  setTimeout(() => {
    quoteTextEl.textContent = QUOTES[quoteIndex].text;
    quoteCiteEl.textContent = QUOTES[quoteIndex].cite;
    quoteTextEl.style.transition = 'opacity 0.6s';
    quoteCiteEl.style.transition = 'opacity 0.6s';
    quoteTextEl.style.opacity = '1';
    quoteCiteEl.style.opacity = '1';
  }, 500);
}

setInterval(cycleQuote, 6000);

// ── Init ─────────────────────────────────────────────────────
renderGallery('all');
