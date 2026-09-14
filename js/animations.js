/**
 * ASPIRE GROUP OF COLLEGES MAILSI (AHMAD CAMPUS)
 * Animation Engine: IntersectionObserver Scroll-Reveal & Stat Counter
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initStatCounters();
});

/**
 * Modern IntersectionObserver for Scroll-Reveal animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");

  if (!("IntersectionObserver" in window)) {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target); // Trigger animation once
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Animated Stat Numbers Counter
 */
function initStatCounters() {
  const counterElements = document.querySelectorAll(".stat-number[data-target]");
  if (counterElements.length === 0) return;

  const runCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 2000; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Ease out cubic
      const progress = currentStep / totalSteps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeProgress * target);

      el.textContent = currentVal.toLocaleString();

      if (currentStep >= totalSteps) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      }
    }, stepTime);
  };

  const observerOptions = {
    threshold: 0.3
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counterElements.forEach((el) => {
    counterObserver.observe(el);
  });
}
