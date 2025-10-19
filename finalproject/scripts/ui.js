// js/ui.js
const DOM = {
  grid: () => document.querySelectorAll('#workoutGrid'),
  modal: () => document.getElementById('detailModal'),
  modalTitle: () => document.getElementById('modalTitle'),
  modalImg: () => document.getElementById('modalImg'),
  modalDesc: () => document.getElementById('modalDesc'),
  modalDetails: () => document.getElementById('modalDetails'),
  favToggle: () => document.getElementById('favToggle'),
  search: () => document.getElementById('search'),
  difficulty: () => document.getElementById('difficulty'),
  clearFilters: () => document.getElementById('clearFilters'),
  navToggle: (id) => document.getElementById(id),
  yearSpans: () => document.querySelectorAll('[id^="year"]')
};

export function setYears() {
  DOM.yearSpans().forEach(el => el.textContent = new Date().getFullYear());
}

export function registerNavToggles() {
  const btns = [DOM.navToggle('navToggle'), DOM.navToggle('navToggle2')].filter(Boolean);
  btns.forEach(b => {
    b.addEventListener('click', () => {
      const nav = b.nextElementSibling;
      const expanded = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!expanded));
      if (nav) nav.setAttribute('aria-hidden', String(expanded));
    });
  });
}

function createCard(item) {
  const div = document.createElement('article');
  div.className = 'card';
  div.innerHTML = `
    <img loading="lazy" decoding="async" src="${item.image}" alt="${escapeHtml(item.name)}">
    <h3>${escapeHtml(item.name)}</h3>
    <p class="muted">${escapeHtml(item.duration)} • ${escapeHtml(item.difficulty)}</p>
    <p>${escapeHtml(item.description.slice(0,100))}...</p>
    <div class="card-actions">
      <button class="btn details" data-id="${item.id}" aria-haspopup="dialog">Details</button>
      <button class="btn alt save" data-id="${item.id}">❤</button>
    </div>
  `;
  return div;
}

function escapeHtml(s) {
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

export function renderWorkouts(items, containerEl) {
  containerEl.innerHTML = '';
  items.forEach(i => containerEl.appendChild(createCard(i)));
  // attach handlers
  containerEl.querySelectorAll('.details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const item = items.find(x => x.id === id);
      showModal(item);
    });
  });
  containerEl.querySelectorAll('.save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      toggleFavorite(id);
      e.currentTarget.classList.toggle('saved');
    });
  });
}

function openModal() {
  const m = DOM.modal();
  if (!m) return;
  m.setAttribute('aria-hidden','false');
  // trap focus simple:
  document.body.style.overflow = 'hidden';
  m.querySelector('.modal-close')?.focus();
}

function closeModal() {
  const m = DOM.modal();
  if (!m) return;
  m.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

export function showModal(item) {
  if (!item) return;
  DOM.modalTitle().textContent = item.name;
  DOM.modalDesc().textContent = item.description;
  DOM.modalDetails().innerHTML = `
    <img id="modalImg" src="${item.image}" alt="" loading="lazy" />
    <dt>Type</dt><dd>${escapeHtml(item.type)}</dd>
    <dt>Duration</dt><dd>${escapeHtml(item.duration)}</dd>
    <dt>Difficulty</dt><dd>${escapeHtml(item.difficulty)}</dd>
    <dt>Equipment</dt><dd>${escapeHtml(item.equipment || 'None')}</dd>
  `;
  DOM.favToggle()?.setAttribute('data-id', item.id);
  openModal();
}

export function registerModalHandlers() {
  const m = DOM.modal();
  if (!m) return;
  m.querySelector('.modal-close')?.addEventListener('click', closeModal);
  m.addEventListener('click', (e) => {
    if (e.target === m) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  DOM.favToggle()?.addEventListener('click', (e) => {
    const id = e.currentTarget.getAttribute('data-id');
    toggleFavorite(id);
    e.currentTarget.textContent = isFavorite(id) ? 'Saved' : 'Save Favorite';
  });
}

const STORAGE_KEY = 'fitforge.favorites';
export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '[]';
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
export function isFavorite(id) {
  return getFavorites().includes(id);
}
export function toggleFavorite(id) {
  const fav = new Set(getFavorites());
  if (fav.has(id)) fav.delete(id); else fav.add(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...fav]));
}

export function wireFilterHandlers(data, renderTarget) {
  const search = DOM.search();
  const difficulty = DOM.difficulty();
  const clear = DOM.clearFilters();
  function applyFilters() {
    const q = (search?.value || '').toLowerCase().trim();
    const diff = difficulty?.value || 'all';
    // illustrate array methods: filter and map
    const filtered = data.filter(item => {
      const matchesQ = (item.name + ' ' + item.type + ' ' + item.description).toLowerCase().includes(q);
      const matchesDiff = diff === 'all' ? true : item.difficulty === diff;
      return matchesQ && matchesDiff;
    }).map(x => x); // trivial map to demonstrate usage
    renderWorkouts(filtered, renderTarget);
  }
  search?.addEventListener('input', applyFilters);
  difficulty?.addEventListener('change', applyFilters);
  clear?.addEventListener('click', () => {
    if (search) search.value = '';
    if (difficulty) difficulty.value = 'all';
    applyFilters();
  });
}
