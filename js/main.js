/**
 * ASPIRE GROUP OF COLLEGES MAILSI
 * Main Global JavaScript: Navigation, Scroll Tracking, Mobile Drawer & UI State
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure default clean light mode
  document.documentElement.removeAttribute("data-theme");
  try { localStorage.removeItem("aspire-theme"); } catch (e) {}

  initNavbar();
  initMobileDrawer();
  initScrollProgressBar();
  initBackToTop();
  initMarqueePause();
  setCurrentYear();
  initInquiryForms();
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
 * Reading / Page Scroll Progress Loading Line
 */
function initScrollProgressBar() {
  let bar = document.querySelector(".scroll-progress-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "scroll-progress-bar";
    document.body.appendChild(bar);
  }

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      bar.style.width = `${progress}%`;
    } else {
      bar.style.width = "0%";
    }
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
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

/**
 * Handle Contact & Help Inquiry Forms -> Direct to WhatsApp 0303-7376611
 */
function initInquiryForms() {
  // 1. Contact Us Page Inquiry Form
  const contactForm = document.getElementById("contactInquiryForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector("#contactName")?.value.trim() || "Visitor";
      const phone = contactForm.querySelector("#contactPhone")?.value.trim() || "Not provided";
      const email = contactForm.querySelector("#contactEmail")?.value.trim() || "Not provided";
      const program = contactForm.querySelector("#contactProgram")?.value || "General Inquiry";
      const message = contactForm.querySelector("#contactMessage")?.value.trim() || "No message entered";

      const waText = 
`*New Campus Inquiry - Aspire College Mailsi*
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
🎓 *Program:* ${program}
💬 *Message:* ${message}`;

      const waUrl = `https://api.whatsapp.com/send?phone=923037376611&text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank");

      alert(`Thank you, ${name}! Your inquiry has been formatted. Opening WhatsApp to deliver your message directly to Aspire College Mailsi (0303-7376611).`);
      contactForm.reset();
    });
  }

  // 2. Help Page Query Form
  const helpForm = document.getElementById("helpQueryForm");
  if (helpForm) {
    helpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = helpForm.querySelector("#helpName")?.value.trim() || "Student/Parent";
      const phone = helpForm.querySelector("#helpPhone")?.value.trim() || "Not provided";
      const category = helpForm.querySelector("#helpCategory")?.value || "General Query";
      const message = helpForm.querySelector("#helpMessage")?.value.trim() || "No details entered";

      const waText = 
`*Support / Help Query - Aspire College Mailsi*
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📂 *Category:* ${category}
💬 *Details:* ${message}`;

      const waUrl = `https://api.whatsapp.com/send?phone=923037376611&text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank");

      alert(`Thank you, ${name}! Your help query has been formatted. Opening WhatsApp to connect with the counseling desk at 0303-7376611.`);
      helpForm.reset();
    });
  }
}
