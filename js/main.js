// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.siterail__nav');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Light / dark theme
// ============================================================
const themeToggle = document.getElementById('themeToggle');

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
};

setTheme(document.documentElement.dataset.theme || 'light');

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

// ============================================================
// Interactive technical domains
// ============================================================
const domainNodes = [...document.querySelectorAll('[data-domain]')];
const domainPanels = [...document.querySelectorAll('[data-domain-panel]')];

const showDomain = (domain) => {
  domainNodes.forEach(node => {
    const active = node.dataset.domain === domain;
    node.classList.toggle('is-active', active);
    node.setAttribute('aria-selected', String(active));
    node.tabIndex = active ? 0 : -1;
  });

  domainPanels.forEach(panel => {
    const active = panel.dataset.domainPanel === domain;
    panel.classList.toggle('is-active', active);
    panel.hidden = !active;
  });
};

domainNodes.forEach((node, index) => {
  node.addEventListener('mouseenter', () => showDomain(node.dataset.domain));
  node.addEventListener('focus', () => showDomain(node.dataset.domain));
  node.addEventListener('click', () => showDomain(node.dataset.domain));
  node.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
    const next = (index + direction + domainNodes.length) % domainNodes.length;
    domainNodes[next].focus();
  });
});

// ============================================================
// Active section highlight in nav
// ============================================================
const sections = document.querySelectorAll('main section[id], footer[id]');
const navByHash = {};
document.querySelectorAll('[data-navlink]').forEach(a => {
  navByHash[a.getAttribute('href')] = a;
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const hash = '#' + entry.target.id;
    const link = navByHash[hash];
    if (!link) return;
    if (entry.isIntersecting) {
      Object.values(navByHash).forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// ============================================================
// Research publications slider
// ============================================================
document.querySelectorAll('[data-pub-slider]').forEach(slider => {
  const track = slider.querySelector('.pubslider__track');
  const prevBtn = slider.querySelector('.pubslider__button--prev');
  const nextBtn = slider.querySelector('.pubslider__button--next');

  if (!track || !prevBtn || !nextBtn) return;

  const getStep = () => {
    const card = track.querySelector('.pubcard');
    if (!card) return 320;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '20');
    return card.getBoundingClientRect().width + gap;
  };

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getStep(), behavior: 'smooth' });
  });
});

// ============================================================
// Back to top
// ============================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 600);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// Footer year
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================================
// Flag unfilled placeholders in the console for the site owner
// ============================================================
document.querySelectorAll('[data-placeholder]').forEach(el => {
  if (el.tagName === 'A' && (el.getAttribute('href') === '#' || !el.getAttribute('href'))) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      console.warn(`Placeholder link not yet set: ${el.dataset.placeholder}`);
    });
  }
});
