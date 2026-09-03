document.addEventListener("DOMContentLoaded", () => {
  // Modals Toggle
  const archiveModal = document.getElementById("archiveModal");
  const openArchiveBtn = document.getElementById("openArchiveBtn");
  const closeArchiveBtn = document.getElementById("closeArchiveBtn");
  const bubbleBtn = document.getElementById("bubbleBtn");

  const classesModal = document.getElementById("classesModal");
  const openClassesBtn = document.getElementById("openClassesBtn");
  const closeClassesBtn = document.getElementById("closeClassesBtn");

  function toggleArchive(show) {
    if (show) archiveModal.classList.add("open");
    else archiveModal.classList.remove("open");
  }

  function toggleClasses(show) {
    if (show) classesModal.classList.add("open");
    else classesModal.classList.remove("open");
  }

  if (openArchiveBtn) openArchiveBtn.addEventListener("click", () => toggleArchive(true));
  if (bubbleBtn) bubbleBtn.addEventListener("click", () => toggleArchive(true));
  if (closeArchiveBtn) closeArchiveBtn.addEventListener("click", () => toggleArchive(false));

  if (openClassesBtn) openClassesBtn.addEventListener("click", () => toggleClasses(true));
  if (closeClassesBtn) closeClassesBtn.addEventListener("click", () => toggleClasses(false));

  // Generate 3D Space Elements
  const artWorld = document.getElementById("artWorld");
  if (artWorld) {
    for (let i = 0; i < 12; i++) {
      const frame = document.createElement("div");
      frame.className = "art-frame";
      
      const x = (Math.random() - 0.5) * 800;
      const y = (Math.random() - 0.5) * 600;
      const z = (Math.random() - 0.5) * 1000;
      
      frame.style.cssText = `
        position: absolute;
        width: 200px;
        height: 260px;
        background: #222;
        border: 2px solid #fff;
        transform: translate3d(${x}px, ${y}px, ${z}px);
        overflow: hidden;
      `;

      const img = document.createElement("img");
      img.src = `https://picsum.photos/300/400?random=${i + 20}`;
      img.style.cssText = "width:100%; height:100%; object-fit:cover;";
      
      frame.appendChild(img);
      artWorld.appendChild(frame);
    }
  }
});
