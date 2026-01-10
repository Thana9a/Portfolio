document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Navigation: Active Section Tracking
     ========================= */
  const nav = document.querySelector(".glass-nav");
  if (!nav) return;

  // Get all navigation links with hash anchors
  const links = Array.from(nav.querySelectorAll('a.nav-link[href^="#"]'));

  // Map links to their corresponding sections
  const items = links
    .map((a) => {
      const id = decodeURIComponent(a.getAttribute("href") || "").slice(1);
      const el = document.getElementById(id);
      return el ? { id, el, a } : null;
    })
    .filter(Boolean);

  if (!items.length) return;

  // Set active section and update nav link styles
  const setActive = (id) => {
    document.body.dataset.section = id;
    items.forEach((x) => x.a.classList.toggle("section-active", x.id === id));
  };

  // Pick the section closest to the top "reading line" (33% from top)
  const pick = () => {
    const line = window.innerHeight * 0.33;
    let best = items[0];

    for (const x of items) {
      const r = x.el.getBoundingClientRect();
      const dist = Math.abs(r.top - line);
      if (dist < Math.abs(best.el.getBoundingClientRect().top - line)) best = x;
    }

    setActive(best.id);
  };

  // Use IntersectionObserver for efficient scroll tracking
  const io = new IntersectionObserver(() => pick(), {
    rootMargin: "-25% 0px -60% 0px",
    threshold: [0, 0.1, 0.2],
  });

  items.forEach((x) => io.observe(x.el));

  // Initial active section detection
  pick();

  // Update on window resize (layout changes)
  window.addEventListener("resize", pick, { passive: true });
});
