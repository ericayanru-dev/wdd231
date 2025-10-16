// js/main.js
import { fetchWorkouts } from './data.js';
import { renderWorkouts, registerModalHandlers, registerNavToggles, setYears, showModal, wireFilterHandlers, getFavorites, isFavorite } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  setYears();
  registerNavToggles();
  registerModalHandlers();

  // theme persisted in localStorage
  const themeKey = 'fitforge.theme';
  const savedTheme = localStorage.getItem(themeKey) || 'light';
  if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme','dark');

  document.getElementById('toggleTheme')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next === 'dark' ? 'dark' : '');
    localStorage.setItem(themeKey, next);
  });

  // populate small preview list on index page + full library on workouts page
  try {
    const data = await fetchWorkouts();
    // display at most 6 on home page
    const homeGrid = document.querySelector('body#index') || null;
    const indexGrid = document.querySelector('#workoutGrid');
    // find all workoutGrid containers (index + workouts)
    document.querySelectorAll('#workoutGrid').forEach((container) => {
      // if container is inside index.html show first 6; else show all
      const isIndex = document.location.pathname.endsWith('index.html') || document.location.pathname.endsWith('/') ;
      const items = isIndex ? data.slice(0,6) : data;
      renderWorkouts(items, container);
      if (!isIndex) {
        // wire filters on the workouts page
        const renderTarget = container;
        wireFilterHandlers(data, renderTarget);
      }
    });
  } catch (err) {
    const container = document.querySelector('#workoutGrid');
    if (container) container.innerHTML = '<p class="muted">Sorry — failed to load workouts. Please try again later.</p>';
  }

  // Small demo: click a saved favorite from anywhere if present (not a UI element in this simple build)
});

 const params = new URLSearchParams(window.location.search);
    const result = document.getElementById('formResult');
    if (params.toString()) {
      const name = params.get('name') || '—';
      const email = params.get('email') || '—';
      const message = params.get('message') || '—';
      result.innerHTML = `
        <h2>Thanks for reaching out, ${escapeHtml(name)}!</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
        <p>We will reply as soon as possible.</p>
      `;
    }

    function escapeHtml(s) {
      return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
    }
    document.getElementById('year4').textContent = new Date().getFullYear();