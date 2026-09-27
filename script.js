const navLinks=[...document.querySelectorAll('.section-nav a')];
const themeToggle = document.getElementById('theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let manualTheme = false;
try { manualTheme = ['light', 'dark'].includes(localStorage.getItem('portfolio-v2-theme')); } catch {}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#17161c' : '#ffffff';
}
applyTheme(document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  manualTheme = true;
  applyTheme(nextTheme);
  try { localStorage.setItem('portfolio-v2-theme', nextTheme); } catch {}
});
systemTheme.addEventListener('change', event => {
  if (!manualTheme) applyTheme(event.matches ? 'dark' : 'light');
});
const targets = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const projectIds = new Set(['clutch', 'daenggo', 'aideo', 'ppurio']);
let scrollUpdatePending = false;
let previousActiveId = '';
function updateCurrentSection() {
  scrollUpdatePending = false;
  const marker = Math.min(window.innerHeight * 0.32, 260) + document.querySelector('.site-header').offsetHeight;
  let activeId = '';
  for (const target of targets) {
    if (target.getBoundingClientRect().top <= marker) activeId = target.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    activeId = targets.at(-1)?.id || activeId;
  }
  for (const link of navLinks) {
    const id = link.hash.slice(1);
    if (id === activeId) link.setAttribute('aria-current', 'true');
    else if (id === 'projects' && projectIds.has(activeId)) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  if (activeId !== previousActiveId && window.innerWidth <= 600) {
    const activeLink = navLinks.find(link => link.hash === `#${activeId}`);
    if (activeLink) {
      const nav = activeLink.closest('.section-nav');
      const linkCenter = activeLink.getBoundingClientRect().left + activeLink.clientWidth / 2;
      const navCenter = nav.getBoundingClientRect().left + nav.clientWidth / 2;
      nav.scrollTo({ left: nav.scrollLeft + linkCenter - navCenter, behavior: 'smooth' });
    }
  }
  previousActiveId = activeId;
}
function requestScrollUpdate() {
  if (scrollUpdatePending) return;
  scrollUpdatePending = true;
  requestAnimationFrame(updateCurrentSection);
}
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate);
window.addEventListener('load', requestScrollUpdate);
requestScrollUpdate();
document.querySelectorAll('.problem-solving details').forEach(detail=>{detail.addEventListener('toggle',()=>{if(!detail.open)return;detail.parentElement.querySelectorAll('details[open]').forEach(openDetail=>{if(openDetail!==detail)openDetail.open=false})})});
