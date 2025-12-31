document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Navbar: glass on scroll
  // =========================
  const nav = document.querySelector("nav.glass-nav");
  const about = document.querySelector("#about");
  if (nav) {
    let triggerY = 80;

    const computeTrigger = () => {
      // when we reach "About" section, enable glass border
      triggerY = about
        ? Math.max(0, about.offsetTop - nav.offsetHeight - 16)
        : 80;
    };

    const updateGlass = () => {
      nav.classList.toggle("is-glass", window.scrollY >= triggerY);
    };

    computeTrigger();
    updateGlass();

    window.addEventListener("scroll", updateGlass, { passive: true });
    window.addEventListener("resize", () => {
      computeTrigger();
      updateGlass();
    });
  }

  // =========================
  // Theme toggle (dark mode)
  // =========================
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const syncIcon = () => {
      themeToggle.textContent = document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";
    };

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      syncIcon();
    });

    syncIcon();
  }

  // =========================
  // Mobile menu open/close state
  // =========================
  const menu = document.getElementById("navMenu");
  if (nav && menu) {
    menu.addEventListener("show.bs.collapse", () =>
      nav.classList.add("menu-open")
    );
    menu.addEventListener("hidden.bs.collapse", () =>
      nav.classList.remove("menu-open")
    );
  }
});
