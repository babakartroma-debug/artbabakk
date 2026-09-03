// Hero Background Media Configuration
const heroSlides = [
  { type: 'video', url: 'assets/hero-video.mp4' },
  { type: 'image', url: 'assets/hero1.jpg', audio: 'assets/music1.mp3' }
];

// Master Works Array
const works = [
  { title: 'Silent garden', year: '2026', medium: 'Acrylic on canvas', size: '100 × 80 cm', collection: 'Painting', description: 'A quiet moment suspended between memory and colour.', colors: ['#153e58','#8cc7be','#ffe39b','#da6f66'], order: 1 },
  { title: 'Blue hour', year: '2025', medium: 'Digital art', size: '3840 × 2160 px', collection: 'Character Design (Digital & Game Art)', description: 'The uncertain colour of day becoming night.', colors: ['#141c4e','#5266ba','#e4a4a9','#e8d9b3'], order: 1 },
  { title: 'Red memory', year: '2025', medium: 'Mixed media', size: '70 × 100 cm', collection: 'Graphic Design', description: 'Layers of gathered feeling, warmth and emptiness.', colors: ['#541b28','#f06053','#f7ad60','#5e327b'], order: 1 },
  { title: 'Inner passage', year: '2026', medium: 'Printmaking', size: '3840 × 2160 px', collection: 'Printmaking vs Engraving', description: 'A boundless experience of colour and depth on screen.', colors: ['#1c173f','#9b4bc7','#38d4de','#f3e765'], order: 1 },
  { title: 'Behind the surface', year: '2024', medium: 'Pencil on paper', size: '2400 × 3000 px', collection: 'Drawing', description: 'Rhythms and broken light underneath the visible surface.', colors: ['#d98145','#e9d5a6','#31738a','#2b2639'], order: 1 },
  { title: 'Seed', year: '2024', medium: 'Pastel on paper', size: '42 × 30 cm', collection: 'Pastel Technique', description: 'A small, instinctive gesture before a larger work.', colors: ['#e4b76e','#b1d1b0','#4b7688','#df7596'], order: 1 },
  { title: 'Night notes', year: '2023', medium: 'Performance documentation', size: '30 × 42 cm', collection: 'Performance Art', description: 'Quick marks made in the rhythm of night.', colors: ['#18213d','#7d79c8','#f5da87','#d4737d'], order: 1 },
  { title: 'Closeness', year: '2026', medium: 'Textile design', size: '120 × 90 cm', collection: 'Clothes Design', description: 'Fields of colour approaching without touching.', colors: ['#274f4b','#8ac9b0','#f2c068','#d76366'], order: 1 },
  { title: 'Map of light', year: '2025', medium: 'Photography', size: '3200 × 4000 px', collection: 'Photography', description: 'An imagined map where colour becomes direction and distance.', colors: ['#304993','#8ac8ee','#ffc86f','#e1638a'], order: 1 }
];

function generateSVG(colors, index) {
  if (colors && colors.length >= 4) {
    const [a,b,c,d] = colors;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900"><defs><radialGradient id="g${index}" cx="30%" cy="20%"><stop stop-color="${c}"/><stop offset=".48" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></radialGradient><filter id="f${index}"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="65"/></filter></defs><rect width="800" height="900" fill="url(#g${index})"/><path d="M-80 ${460-index*19} C 150 ${120+index*25}, 420 720, 880 ${250+index*24}" stroke="${d}" stroke-width="${88+index*5}" fill="none" opacity=".88" filter="url(#f${index})"/><circle cx="${510-index*17}" cy="${220+index*23}" r="${130+index*9}" fill="${c}" opacity=".62"/><path d="M0 760 C 260 570, 530 1010, 800 680 L800 900 0 900Z" fill="${a}" opacity=".55"/></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
}

works.forEach((work, i) => { if (!work.image) work.image = generateSVG(work.colors, i); });

const featured = document.querySelector('#featuredGrid');
const collections = ['Painting','Character Design (Digital & Game Art)','Graphic Design','Printmaking vs Engraving','Drawing','Pastel Technique','Performance Art','Clothes Design','Photography'];
let currentLanguage = 'en';

const collectionTranslations = {
  en: { All: 'All', Painting: 'Painting', works: 'works' },
  tr: { All: 'Tümü', Painting: 'Resim', works: 'iş' },
  az: { All: 'Hamısı', Painting: 'Rəngkarlıq', works: 'iş' }
};

const collectionName = val => (collectionTranslations[currentLanguage] && collectionTranslations[currentLanguage][val]) || val;

function renderFolders() {
  if (!featured) return;
  featured.innerHTML = '';
  collections.forEach(collection => {
    const folderWorks = works.filter(w => w.collection === collection);
    const cover = folderWorks[0] || works[0];
    const count = folderWorks.length;
    featured.insertAdjacentHTML('beforeend', 
      `<button class="folder-card" data-folder="${collection}" type="button">
        <img src="${cover.image}" alt="${collectionName(collection)} collection"/>
        <p>${collectionName(collection)} <span>— ${count} ${collectionTranslations[currentLanguage].works}</span></p>
      </button>`
    );
  });
}
renderFolders();

const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Modal & 3D Archive Logic
const archive = document.querySelector('#archive');
const world = document.querySelector('#artWorld');
const slideshow = document.querySelector('#slideshow');
const collectionGallery = document.querySelector('#collectionGallery');
let rotationX = 0, rotationY = 0, zoom = 1, travel = 0, activeWorks = [...works], dragged = false, slideIndex = 0, previousTime = 0;
const tunnelDepth = 4800;

function renderWorld() {
  if (!world) return;
  world.innerHTML = '';
  const count = Math.max(84, activeWorks.length * 10);
  for (let i = 0; i < count; i++) {
    const actualIndex = i % activeWorks.length;
    const work = activeWorks[actualIndex];
    const angle = i * 2.39996, radius = 150 + ((i * 83) % 560);
    const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius * .62, baseZ = -tunnelDepth + (i / count) * tunnelDepth;
    const w = 72 + (i % 4) * 22, h = w * (i % 3 === 0 ? 1.25 : .77);
    const button = document.createElement('button');
    button.className = 'art-frame'; button.type = 'button'; button.style.setProperty('--w', `${w}px`); button.style.setProperty('--h', `${h}px`);
    button.dataset.x = x; button.dataset.y = y; button.dataset.z = baseZ; button.dataset.ry = (i * 29) % 28 - 14; button.dataset.rx = (i * 19) % 18 - 9;
    button.dataset.workIndex = actualIndex; 
    button.innerHTML = `<img src="${work.image}" alt="${work.title}"/>`; 
    button.addEventListener('click', e => { e.stopPropagation(); showWork(activeWorks[Number(button.dataset.workIndex)]); }); 
    world.append(button);
  }
  updateWorld();
  moveThroughTunnel();
}

function updateWorld() { if (world) world.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})`; }

function moveThroughTunnel() {
  if (!world) return;
  world.querySelectorAll('.art-frame').forEach(frame => {
    const z = (((Number(frame.dataset.z) + travel) % tunnelDepth) + tunnelDepth) % tunnelDepth - tunnelDepth;
    frame.style.transform = `translate3d(${frame.dataset.x}px,${frame.dataset.y}px,${z}px) rotateY(${frame.dataset.ry}deg) rotateX(${frame.dataset.rx}deg)`;
  });
}

function showWork(work) {
  slideIndex = Math.max(0, activeWorks.indexOf(work));
  const selected = activeWorks[slideIndex];
  document.querySelector('#slideImage').src = selected.image;
  document.querySelector('#slideImage').alt = selected.title;
  document.querySelector('#slideCounter').textContent = `${String(slideIndex + 1).padStart(2, '0')} / ${String(activeWorks.length).padStart(2, '0')} · ${(selected.collection || '').toUpperCase()}`;
  document.querySelector('#slideTitle').textContent = selected.title;
  document.querySelector('#slideMeta').textContent = `${selected.year} · ${selected.medium} · ${selected.size}`;
  document.querySelector('#slideDescription').textContent = selected.description || '';
  slideshow.classList.add('open');
  slideshow.setAttribute('aria-hidden', 'false');
}

function stepSlide(direction) { showWork(activeWorks[(slideIndex + direction + activeWorks.length) % activeWorks.length]); }

function openCollection(collection) {
  activeWorks = works.filter(work => work.collection === collection).sort((a, b) => (a.order || 999) - (b.order || 999));
  document.querySelector('#collectionTitle').textContent = collection;
  document.querySelector('#collectionWorks').innerHTML = activeWorks.map((work, i) => 
    `<button class="collection-work" data-work="${i}" type="button">
      <img src="${work.image}" alt="${work.title}"/>
      <p>${work.title} <span>— ${work.year}</span></p>
    </button>`
  ).join('');
  collectionGallery.classList.add('open');
  collectionGallery.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCollection() {
  collectionGallery.classList.remove('open');
  collectionGallery.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openArchive() { 
  if (archive) {
    archive.classList.add('open'); 
    archive.setAttribute('aria-hidden', 'false'); 
    document.body.style.overflow = 'hidden'; 
    travel = 0; 
    moveThroughTunnel(); 
  }
}

function closeArchive() { 
  if (archive) {
    archive.classList.remove('open'); 
    archive.setAttribute('aria-hidden', 'true'); 
    document.body.style.overflow = ''; 
  }
}

['#openArchiveSecond','#bubbleButton'].forEach(s => { 
  const el = document.querySelector(s); 
  if(el) el.addEventListener('click', openArchive); 
});

const closeArchiveBtn = document.querySelector('#closeArchive');
if (closeArchiveBtn) closeArchiveBtn.addEventListener('click', closeArchive);

const closeColBtn = document.querySelector('#closeCollection');
if (closeColBtn) closeColBtn.addEventListener('click', closeCollection);

const closeSlideBtn = document.querySelector('#closeSlideshow');
if (closeSlideBtn) closeSlideBtn.addEventListener('click', () => { 
  slideshow.classList.remove('open'); 
  slideshow.setAttribute('aria-hidden', 'true'); 
});

document.querySelector('#previousWork').addEventListener('click', () => stepSlide(-1));
document.querySelector('#nextWork').addEventListener('click', () => stepSlide(1));

if (featured) {
  featured.addEventListener('click', e => { 
    const card = e.target.closest('[data-folder]'); 
    if (card) openCollection(card.dataset.folder); 
  });
}

document.querySelector('#collectionWorks').addEventListener('click', e => { 
  const card = e.target.closest('[data-work]'); 
  if (card) showWork(activeWorks[card.dataset.work]); 
});

// Orbit Animation Loop
function orbit(time) {
  if (archive && archive.classList.contains('open') && !dragged) {
    const delta = Math.min(40, time - previousTime || 0);
    travel = (travel + delta * .19) % tunnelDepth;
    moveThroughTunnel();
  }
  previousTime = time;
  requestAnimationFrame(orbit);
}
requestAnimationFrame(orbit);

renderWorld();
