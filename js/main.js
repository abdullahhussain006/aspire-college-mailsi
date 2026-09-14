/**
 * ASPIRE GROUP OF COLLEGES MAILSI (AHMAD CAMPUS)
 * Main Global JavaScript: Navigation, Scroll Tracking, Mobile Drawer & UI State
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileDrawer();
  initScrollProgressBar();
  initBackToTop();
  initMarqueePause();
  setCurrentYear();
});

/**
 * Sticky Navbar behavior on scroll
 */
function initNavbar() {
  const header = document.querySelector(".main-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".mobile-drawer-overlay");
  const closeBtn = document.querySelector(".drawer-close-btn");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    toggleBtn.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    toggleBtn.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", () => {
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener("click", closeDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

/**
 * Reading / Page Scroll Progress Bar
 */
function initScrollProgressBar() {
  let bar = document.querySelector(".scroll-progress-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "scroll-progress-bar";
    document.body.appendChild(bar);
  }

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * Pause Marquee on Hover for readability
 */
function initMarqueePause() {
  const marquee = document.querySelector(".ticker-text");
  if (!marquee) return;

  marquee.addEventListener("mouseenter", () => {
    marquee.style.animationPlayState = "paused";
  });

  marquee.addEventListener("mouseleave", () => {
    marquee.style.animationPlayState = "running";
  });
}

/**
 * Set Dynamic Copyright Year
 */
function setCurrentYear() {
  const yearSpans = document.querySelectorAll(".current-year");
  const year = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = year;
  });
}
