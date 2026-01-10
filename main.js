document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Navbar: Glass Effect on Scroll
     ========================= */
  const nav = document.querySelector(".glass-nav");
  const aboutSection = document.getElementById("about");

  if (nav) {
    let triggerY = 80;

    const computeTrigger = () => {
      triggerY = aboutSection
        ? Math.max(0, aboutSection.offsetTop - nav.offsetHeight - 16)
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

  /* =========================
     Theme Toggle (Dark/Light Mode)
     ========================= */
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.dataset.theme = savedTheme;

    const updateThemeIcon = () => {
      const isDark = document.documentElement.dataset.theme === "dark";
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    };

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme;
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      updateThemeIcon();
    });

    updateThemeIcon();
  }

  /* =========================
     Mobile Menu State Management
     ========================= */
  const menu = document.getElementById("navMenu");

  if (nav && menu) {
    menu.addEventListener("show.bs.collapse", () =>
      nav.classList.add("menu-open")
    );

    menu.addEventListener("hidden.bs.collapse", () =>
      nav.classList.remove("menu-open")
    );
  }
  /* =========================
     Email Copy Button
     ========================= */
  const copyBtn = document.getElementById("copyEmailBtn");
  const emailText = document.getElementById("emailText");

  if (copyBtn && emailText && navigator.clipboard) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(emailText.textContent)
        .then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = originalText;
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy email:", err);
        });
    });
  }

  /* =========================
     Scroll Reveal Observer
     ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* =========================
     SKILLS OLD-STYLE REVEAL
     ========================= */
  const skillCards = document.querySelectorAll("#skills .skill-card");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // pop-in once
        entry.target.classList.add("reveal-active");

        skillObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  skillCards.forEach((card) => skillObserver.observe(card));
});
