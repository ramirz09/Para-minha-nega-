async function initSite() {
  const response = await fetch('data.json');
  if (!response.ok) throw new Error('Não foi possível carregar data.json');
  const data = await response.json();

  const gallery = document.getElementById('gallery');
  data.photos.forEach((photo, index) => {
    const button = document.createElement('button');
    button.className = 'photo-card';
    button.type = 'button';
    button.setAttribute('aria-label', `Ampliar foto ${index + 1}`);
    button.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="lazy"><span class="photo-caption"></span>`;
    button.querySelector('.photo-caption').textContent = photo.caption;
    button.addEventListener('click', () => openPhoto(photo.src, photo.alt));
    gallery.appendChild(button);
  });

  const letter = document.getElementById('letter');
  data.letter.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    letter.appendChild(p);
  });
  const signature = document.createElement('p');
  signature.className = 'signature';
  signature.textContent = data.signature;
  letter.appendChild(signature);

  const hearts = document.getElementById('hearts');
  for (let i = 0; i < 17; i++) {
    const heart = document.createElement('span');
    heart.textContent = ['♡', '♥', 'ღ'][i % 3];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 19}px`;
    heart.style.animationDuration = `${13 + Math.random() * 14}s`;
    heart.style.animationDelay = `${-Math.random() * 24}s`;
    hearts.appendChild(heart);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function openPhoto(src, alt) {
  const modal = document.getElementById('photoModal');
  const image = document.getElementById('modalImage');
  image.src = src;
  image.alt = alt;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closePhoto() {
  document.getElementById('photoModal').classList.remove('show');
  document.body.style.overflow = '';
}
document.getElementById('photoModal').addEventListener('click', closePhoto);
document.querySelector('.close-modal').addEventListener('click', closePhoto);
document.getElementById('modalImage').addEventListener('click', event => event.stopPropagation());
document.addEventListener('keydown', event => { if (event.key === 'Escape') closePhoto(); });

document.addEventListener('DOMContentLoaded', () => {
  initSite().catch(error => console.error(error));
});
