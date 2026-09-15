/**
 * ASPIRE GROUP OF COLLEGES MAILSI 
 * Gallery Module: Category Filtering & Accessible Fullscreen Lightbox
 */

document.addEventListener("DOMContentLoaded", () => {
  initGalleryFilter();
  initLightbox();
});

/**
 * Filter Gallery Items by Category
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => {
            item.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

/**
 * Fullscreen Lightbox Modal with Arrow & Keyboard Navigation
 */
function initLightbox() {
  const modal = document.getElementById("galleryLightbox");
  if (!modal) return;

  const lightboxImg = modal.querySelector(".lightbox-image");
  const lightboxCaption = modal.querySelector(".lightbox-caption");
  const closeBtn = modal.querySelector(".lightbox-close");
  const prevBtn = modal.querySelector(".lightbox-prev");
  const nextBtn = modal.querySelector(".lightbox-next");
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

  let currentIndex = 0;

  const getVisibleItems = () => {
    return galleryItems.filter((item) => item.style.display !== "none");
  };

  const showImage = (index) => {
    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;

    if (index < 0) {
      currentIndex = visibleItems.length - 1;
    } else if (index >= visibleItems.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const currentItem = visibleItems[currentIndex];
    const imgSrc = currentItem.getAttribute("data-full") || currentItem.querySelector("img")?.src;
    const title = currentItem.getAttribute("data-title") || "Aspire College Mailsi";
    const category = currentItem.getAttribute("data-category") || "";

    if (lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = title;
    }
    if (lightboxCaption) {
      lightboxCaption.innerHTML = `<strong>${title}</strong> <span style="color:var(--color-gold); font-size:13px;">(${category.toUpperCase()})</span>`;
    }
  };

  const openLightbox = (item) => {
    const visibleItems = getVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    showImage(currentIndex);
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  // Close when clicking modal backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
}
