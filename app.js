/* Babak Abdullayev portfolio — edit only siteMedia and originalWorks. */
const siteMedia = {
  slides: [
    // { type: 'image', src: 'assets/hero-01.jpg', alt: 'Studio work' },
    // { type: 'video', src: 'assets/hero-film.mp4', alt: 'Studio film', sound: true },
  ],
  backgroundAudio: '', // Example: 'assets/ambient.mp3'
};

const collections = [
  'Painting', 'Character Design (Digital & Game Art)', 'Graphic Design',
  'Printmaking vs Engraving', 'Drawing', 'Pastel Technique',
  'Performance Art', 'Clothes Design', 'Photography',
];

const originalWorks = [
  { title: 'Silent garden', year: '2026', medium: 'Acrylic on canvas', size: '100 × 80 cm', collection: 'Painting', description: 'A quiet moment suspended between memory and colour.', colors: ['#153e58', '#8cc7be', '#ffe39b', '#da6f66'] },
  { title: 'Blue hour', year: '2025', medium: 'Digital art', size: '3840 × 2160 px', collection: 'Character Design (Digital & Game Art)', description: 'The uncertain colour of day becoming night.', colors: ['#141c4e', '#5266ba', '#e4a4a9', '#e8d9b3'] },
  { title: 'Red memory', year: '2025', medium: 'Mixed media', size: '70 × 100 cm', collection: 'Graphic Design', description: 'Layers of gathered feeling, warmth and emptiness.', colors: ['#541b28', '#f06053', '#f7ad60', '#5e327b'] },
  { title: 'Inner passage', year: '2026', medium: 'Printmaking', size: '3840 × 2160 px', collection: 'Printmaking vs Engraving', description: 'A boundless experience of colour and depth on screen.', colors: ['#1c173f', '#9b4bc7', '#38d4de', '#f3e765'] },
  { title: 'Behind the surface', year: '2024', medium: 'Pencil on paper', size: '2400 × 3000 px', collection: 'Drawing', description: 'Rhythms and broken light underneath the visible surface.', colors: ['#d98145', '#e9d5a6', '#31738a', '#2b2639'] },
  { title: 'Seed', year: '2024', medium: 'Pastel on paper', size: '42 × 30 cm', collection: 'Pastel Technique', description: 'A small, instinctive gesture before a larger work.', colors: ['#e4b76e', '#b1d1b0', '#4b7688', '#df7596'] },
  { title: 'Night notes', year: '2023', medium: 'Performance documentation', size: '30 × 42 cm', collection: 'Performance Art', description: 'Quick marks made in the rhythm of night.', colors: ['#18213d', '#7d79c8', '#f5da87', '#d4737d'] },
  { title: 'Closeness', year: '2026', medium: 'Textile design', size: '120 × 90 cm', collection: 'Clothes Design', description: 'Fields of colour approaching without touching.', colors: ['#274f4b', '#8ac9b0', '#f2c068', '#d76366'] },
  { title: 'Map of light', year: '2025', medium: 'Photography', size: '3200 × 4000 px', collection: 'Photography', description: 'An imagined map where colour becomes direction and distance.', colors: ['#304993', '#8ac8ee', '#ffc86f', '#e1638a'] },
];

function createDemoImage(colors, index) {
  const [background, mid, light, accent] = colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900"><defs><radialGradient id="g${index}" cx="30%" cy="20%"><stop stop-color="${light}"/><stop offset=".48" stop-color="${mid}"/><stop offset="1" stop-color="${background}"/></radialGradient></defs><rect width="800" height="900" fill="url(#g${index})"/><path d="M-80 ${460 - index * 19} C 150 ${120 + index * 25}, 420 720, 880 ${250 + index * 24}" stroke="${accent}" stroke-width="${88 + index * 5}" fill="none" opacity=".88"/><circle cx="${510 - index * 17}" cy="${220 + index * 23}" r="${130 + index * 9}" fill="${light}" opacity=".62"/><path d="M0 760 C 260 570, 530 1010, 800 680 L800 900 0 900Z" fill="${background}" opacity=".55"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createWorks() {
  const works = [];
  collections.forEach((collection, collectionIndex) => {
    const source = originalWorks.find((work) => work.collection === collection);
    for (let order = 1; order <= 30; order += 1) {
      const rotate = (order - 1 + collectionIndex) % source.colors.length;
      const colors = [...source.colors.slice(rotate), ...source.colors.slice(0, rotate)];
      works.push({
        ...source,
        title: order === 1 ? source.title : `${source.title} ${String(order).padStart(2, '0')}`,
        year: order === 1 ? source.year : String(2027 - (order % 5)),
        description: order === 1 ? source.description : `Editable placeholder ${order} for ${collection}.`,
        colors,
        order,
      });
    }
  });
  return works.map((work, index) => ({ ...work, image: work.image || createDemoImage(work.colors, index) }));
}

const works = createWorks();
const byId = (id) => document.getElementById(id);
const archive = byId('archive');
const artWorld = byId('artWorld');
const featuredGrid = byId('featuredGrid');
const collectionGallery = byId('collectionGallery');
const collectionWorks = byId('collectionWorks');
const slideshow = byId('slideshow');
const hero = document.querySelector('.hero');

let activeWorks = [...works];
let activeCollection = 'All';
let slideIndex = 0;
let rotationX = 0;
let rotationY = 0;
let zoom = 1;
let travel = 0;
let dragging = false;
let lastAnimationTime = 0;

function renderFolders() {
  featuredGrid.innerHTML = collections.map((collection) => {
    const folderWorks = works.filter((work) => work.collection === collection);
    const cover = folderWorks[0];
    return `<button class="folder-card" data-folder="${collection}" type="button"><img src="${cover.image}" alt="${collection} collection"/><p>${collection} <span>— ${folderWorks.length} works</span></p></button>`;
  }).join('');
}

function openCollection(collection) {
  activeWorks = works.filter((work) => work.collection === collection).sort((a, b) => a.order - b.order);
  byId('collectionTitle').textContent = collection;
  collectionWorks.innerHTML = activeWorks.map((work, index) => (`
    <button class="collection-work" data-work-index="${index}" type="button">
      <img src="${work.image}" alt="${work.title}"/>
      <p>${work.title} <span>— ${work.year}</span></p>
    </button>
  `)).join('');
  collectionGallery.classList.add('open');
  collectionGallery.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCollection() {
  collectionGallery.classList.remove('open');
  collectionGallery.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showWork(index) {
  slideIndex = Number(index);
  const work = activeWorks[slideIndex];
  if (!work) return;
  byId('slideImage').src = work.image;
  byId('slideImage').alt = work.title;
  byId('slideCounter').textContent = `${String(slideIndex + 1).padStart(2, '0')} / ${String(activeWorks.length).padStart(2, '0')} · ${work.collection.toUpperCase()}`;
  byId('slideTitle').textContent = work.title;
  byId('slideMeta').textContent = `${work.year} · ${work.medium} · ${work.size}`;
  byId('slideDescription').textContent = work.description;
  slideshow.classList.add('open');
  slideshow.setAttribute('aria-hidden', 'false');
}

function stepWork(direction) {
  showWork((slideIndex + direction + activeWorks.length) % activeWorks.length);
}

function updateWorldTransform() {
  artWorld.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})`;
}

function moveThroughWorld() {
  artWorld.querySelectorAll('.art-frame').forEach((frame) => {
    const depth = 4800;
    const z = (((Number(frame.dataset.z) + travel) % depth) + depth) % depth - depth;
    frame.style.transform = `translate3d(${frame.dataset.x}px, ${frame.dataset.y}px, ${z}px) rotateY(${frame.dataset.ry}deg) rotateX(${frame.dataset.rx}deg)`;
  });
}

function renderWorld() {
  artWorld.innerHTML = '';
  const frameCount = Math.min(180, Math.max(90, activeWorks.length * 3));
  for (let index = 0; index < frameCount; index += 1) {
    const workIndex = index % activeWorks.length;
    const angle = index * 2.39996;
    const radius = 150 + ((index * 83) % 560);
    const width = 72 + (index % 4) * 22;
    const frame = document.createElement('button');
    frame.className = 'art-frame';
    frame.type = 'button';
    frame.dataset.workIndex = workIndex;
    frame.dataset.x = Math.cos(angle) * radius;
    frame.dataset.y = Math.sin(angle) * radius * 0.62;
    frame.dataset.z = -4800 + (index / frameCount) * 4800;
    frame.dataset.ry = (index * 29) % 28 - 14;
    frame.dataset.rx = (index * 19) % 18 - 9;
    frame.style.setProperty('--w', `${width}px`);
    frame.style.setProperty('--h', `${width * (index % 3 === 0 ? 1.25 : 0.77)}px`);
    frame.innerHTML = `<img src="${activeWorks[workIndex].image}" alt="${activeWorks[workIndex].title}"/>`;
    frame.addEventListener('click', (event) => { event.stopPropagation(); showWork(workIndex); });
    artWorld.append(frame);
  }
  updateWorldTransform();
  moveThroughWorld();
}

function renderArchiveNavigation() {
  byId('collectionNav').innerHTML = ['All', ...collections].map((collection) => (`
    <button class="${collection === activeCollection ? 'active' : ''}" data-archive-collection="${collection}" type="button">${collection}</button>
  `)).join('');
}

function setArchiveCollection(collection) {
  activeCollection = collection;
  activeWorks = collection === 'All' ? [...works] : works.filter((work) => work.collection === collection);
  byId('archiveTitle').textContent = collection === 'All' ? 'All Works' : collection;
  renderWorld();
  renderArchiveNavigation();
}

function openArchive() {
  setArchiveCollection('All');
  archive.classList.add('open');
  archive.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeArchive() {
  archive.classList.remove('open');
  archive.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setupHeroMedia() {
  const image = byId('heroImage');
  const video = byId('heroVideo');
  const audio = byId('backgroundAudio');
  const soundButton = byId('soundButton');
  let currentSlide = 0;

  function renderSlide() {
    const slides = siteMedia.slides;
    image.style.display = 'none';
    video.style.display = 'none';
    video.pause();
    if (!slides.length) {
      byId('slideStatus').textContent = 'Add media';
      hero.classList.toggle('has-media', Boolean(siteMedia.backgroundAudio));
      return;
    }
    const slide = slides[currentSlide];
    byId('slideStatus').textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    hero.classList.add('has-media');
    if (slide.type === 'video') {
      video.src = slide.src;
      video.muted = !slide.sound;
      video.style.display = 'block';
      video.play().catch(() => {});
    } else {
      image.src = slide.src;
      image.alt = slide.alt || '';
      image.style.display = 'block';
    }
  }

  function changeSlide(direction) {
    if (!siteMedia.slides.length) return;
    currentSlide = (currentSlide + direction + siteMedia.slides.length) % siteMedia.slides.length;
    renderSlide();
  }

  byId('previousSlide').addEventListener('click', () => changeSlide(-1));
  byId('nextSlide').addEventListener('click', () => changeSlide(1));
  if (siteMedia.backgroundAudio) audio.src = siteMedia.backgroundAudio;
  soundButton.addEventListener('click', () => {
    if (siteMedia.backgroundAudio) {
      if (audio.paused) audio.play().catch(() => {}); else audio.pause();
      soundButton.textContent = audio.paused ? 'Sound off' : 'Sound on';
    } else if (video.style.display === 'block') {
      video.muted = !video.muted;
      soundButton.textContent = video.muted ? 'Sound off' : 'Sound on';
    }
  });
  renderSlide();
}

featuredGrid.addEventListener('click', (event) => {
  const folder = event.target.closest('[data-folder]');
  if (folder) openCollection(folder.dataset.folder);
});
collectionWorks.addEventListener('click', (event) => {
  const work = event.target.closest('[data-work-index]');
  if (work) showWork(work.dataset.workIndex);
});
byId('bubbleButton').addEventListener('click', openArchive);
byId('openArchiveSecond').addEventListener('click', openArchive);
byId('closeArchive').addEventListener('click', closeArchive);
byId('closeCollection').addEventListener('click', closeCollection);
byId('closeSlideshow').addEventListener('click', () => slideshow.classList.remove('open'));
byId('previousWork').addEventListener('click', () => stepWork(-1));
byId('nextWork').addEventListener('click', () => stepWork(1));
byId('focusMode').addEventListener('click', () => { rotationX = 0; rotationY = 0; zoom = 1; updateWorldTransform(); });
byId('randomWork').addEventListener('click', () => showWork(Math.floor(Math.random() * activeWorks.length)));
byId('collectionNav').addEventListener('click', (event) => {
  const button = event.target.closest('[data-archive-collection]');
  if (button) setArchiveCollection(button.dataset.archiveCollection);
});

const classesPage = byId('classesPage');
const joinPage = byId('joinPage');
byId('openClasses').addEventListener('click', () => {
  classesPage.classList.add('open');
  classesPage.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
});
byId('closeClasses').addEventListener('click', () => {
  classesPage.classList.remove('open');
  classesPage.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
});
byId('openJoin').addEventListener('click', () => {
  joinPage.classList.add('open');
  joinPage.setAttribute('aria-hidden', 'false');
});
byId('closeJoin').addEventListener('click', () => {
  joinPage.classList.remove('open');
  joinPage.setAttribute('aria-hidden', 'true');
});

const space = byId('space');
let dragStart = null;
space.addEventListener('pointerdown', (event) => {
  if (event.target.closest('.art-frame, button')) return;
  dragging = true;
  dragStart = { x: event.clientX, y: event.clientY, rotationX, rotationY };
  space.setPointerCapture(event.pointerId);
});
space.addEventListener('pointermove', (event) => {
  if (!dragging || !dragStart) return;
  rotationY = dragStart.rotationY + (event.clientX - dragStart.x) * 0.16;
  rotationX = Math.max(-45, Math.min(35, dragStart.rotationX - (event.clientY - dragStart.y) * 0.12));
  updateWorldTransform();
});
space.addEventListener('pointerup', () => { dragging = false; });
space.addEventListener('pointercancel', () => { dragging = false; });
space.addEventListener('wheel', (event) => {
  event.preventDefault();
  zoom = Math.max(0.6, Math.min(1.8, zoom - event.deltaY * 0.001));
  updateWorldTransform();
}, { passive: false });

function animateArchive(time) {
  if (archive.classList.contains('open') && !dragging) {
    travel = (travel + Math.min(40, time - lastAnimationTime || 0) * 0.19) % 4800;
    moveThroughWorld();
  }
  lastAnimationTime = time;
  requestAnimationFrame(animateArchive);
}

document.addEventListener('keydown', (event) => {
  if (!slideshow.classList.contains('open')) return;
  if (event.key === 'Escape') slideshow.classList.remove('open');
  if (event.key === 'ArrowLeft') stepWork(-1);
  if (event.key === 'ArrowRight') stepWork(1);
});

renderFolders();
renderArchiveNavigation();
byId('year').textContent = new Date().getFullYear();
setupHeroMedia();
requestAnimationFrame(animateArchive);
