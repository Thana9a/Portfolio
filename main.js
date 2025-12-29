(() => {
  const nav = document.querySelector(".glass-nav");
  const startEl = document.querySelector("#about");
  const endEl = document.querySelector("#contact");
  if (!nav || !startEl || !endEl) return;

  const NAV_OFFSET = 90; // adjust if needed (navbar height)

  let ticking = false;

  const update = () => {
    ticking = false;

    const y = window.scrollY || document.documentElement.scrollTop;

    const start = startEl.offsetTop - NAV_OFFSET;
    const end = endEl.offsetTop + endEl.offsetHeight - NAV_OFFSET;

    nav.classList.toggle("is-glass", y >= start && y <= end);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update(); // run once on load
})();

//dark mode white
const toggle = document.getElementById("themeToggle");

if (toggle) {
  const syncIcon = () => {
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  };

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    syncIcon();
  });

  syncIcon();
}
