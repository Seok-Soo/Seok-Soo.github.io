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
const targets=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{const current=entries.find(entry=>entry.isIntersecting);if(!current)return;navLinks.forEach(link=>link.toggleAttribute('aria-current',link.getAttribute('href')===`#${current.target.id}`))},{rootMargin:'-15% 0px -72%',threshold:0});targets.forEach(target=>observer.observe(target))}
document.querySelectorAll('.problem-solving details').forEach(detail=>{detail.addEventListener('toggle',()=>{if(!detail.open)return;detail.parentElement.querySelectorAll('details[open]').forEach(openDetail=>{if(openDetail!==detail)openDetail.open=false})})});
