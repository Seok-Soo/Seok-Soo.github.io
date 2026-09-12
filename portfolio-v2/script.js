const navLinks=[...document.querySelectorAll('.section-nav a')];
const targets=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{const current=entries.find(entry=>entry.isIntersecting);if(!current)return;navLinks.forEach(link=>link.toggleAttribute('aria-current',link.getAttribute('href')===`#${current.target.id}`))},{rootMargin:'-15% 0px -72%',threshold:0});targets.forEach(target=>observer.observe(target))}
document.querySelectorAll('.problem-solving details').forEach(detail=>{detail.addEventListener('toggle',()=>{if(!detail.open)return;detail.parentElement.querySelectorAll('details[open]').forEach(openDetail=>{if(openDetail!==detail)openDetail.open=false})})});
