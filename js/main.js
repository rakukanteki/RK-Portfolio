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
// Active section highlight in nav
// ============================================================
const sections = document.querySelectorAll('main section[id], footer[id]');
const navByHash = {};
document.querySelectorAll('[data-navlink]').forEach(a => {
  const hash = new URL(a.href, window.location.href).hash;
  navByHash[hash] = a;
  a.addEventListener('click', () => setActiveNav(hash));
});

const setActiveNav = (hash) => {
  Object.entries(navByHash).forEach(([target, link]) => {
    const active = target === hash;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', document.querySelector('.project-detail') ? 'page' : 'location');
    else link.removeAttribute('aria-current');
  });
};

if (document.querySelector('.project-detail')) {
  setActiveNav('#projects');
} else {
  setActiveNav(window.location.hash);
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const hash = '#' + entry.target.id;
    const link = navByHash[hash];
    if (!link) return;
    if (entry.isIntersecting) {
      setActiveNav(hash);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// ============================================================
// Publication search and filters (progressive enhancement)
// ============================================================
const publicationFilters = document.getElementById('publicationFilters');
if (publicationFilters) {
  const cards = [...document.querySelectorAll('#publicationList .pubcard')];
  const query = document.getElementById('publicationQuery');
  const selects = {
    type: document.getElementById('publicationType'),
    year: document.getElementById('publicationYear'),
    area: document.getElementById('publicationArea'),
  };
  const count = document.getElementById('publicationCount');
  const empty = document.getElementById('publicationEmpty');
  const normalize = value => value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  const entries = cards.map(card => ({
    card,
    type: card.dataset.type || 'Not specified',
    year: card.dataset.year || 'Not specified',
    area: card.dataset.area || 'Not specified',
    search: normalize([card.textContent, card.dataset.authors || '', card.dataset.area || ''].join(' ')),
  }));

  Object.entries(selects).forEach(([key, select]) => {
    const values = [...new Set([
      ...entries.map(entry => entry[key]),
      ...(key === 'type' ? ['TDRs'] : []),
    ])];
    values.sort((a, b) => key === 'year' ? b.localeCompare(a, undefined, { numeric: true }) : a.localeCompare(b));
    values.forEach(value => select.add(new Option(value, value)));
  });

  const render = () => {
    const terms = normalize(query.value).split(' ').filter(Boolean);
    let visible = 0;
    entries.forEach(entry => {
      const matches = terms.every(term => entry.search.includes(term))
        && Object.entries(selects).every(([key, select]) => select.value === 'All' || entry[key] === select.value);
      entry.card.hidden = !matches;
      if (matches) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'entry' : 'entries'} of ${entries.length}`;
    empty.hidden = visible !== 0;
  };

  query.addEventListener('input', render);
  Object.values(selects).forEach(select => select.addEventListener('change', render));
  document.querySelectorAll('[data-reset-publications]').forEach(button => {
    button.addEventListener('click', () => {
      query.value = '';
      Object.values(selects).forEach(select => { select.value = 'All'; });
      render();
      query.focus();
    });
  });
  render();
  publicationFilters.hidden = false;
}

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
